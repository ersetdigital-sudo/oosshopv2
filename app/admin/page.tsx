'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Package,
  ShoppingBag,
  Clock,
  Wallet,
  TrendingUp,
  ArrowRight,
  Star,
  Eye,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/products'

type Order = {
  id: string
  invoice_number: string
  customer_name: string
  total_price: number
  status: 'pending' | 'processing' | 'done' | 'cancelled'
  created_at: string
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const statusConfig: Record<Order['status'], { label: string; color: string }> = {
  pending: { label: 'Menunggu', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  processing: { label: 'Diproses', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  done: { label: 'Selesai', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  cancelled: { label: 'Dibatalkan', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const [{ data: productsData }, { data: ordersData }] = await Promise.all([
      supabase.from('products').select('*'),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
    ])
    setProducts((productsData as Product[]) || [])
    setOrders((ordersData as Order[]) || [])
    setLoading(false)
  }

  const stats = useMemo(() => {
    const pending = orders.filter((o) => o.status === 'pending').length
    const done = orders.filter((o) => o.status === 'done')
    const revenue = done.reduce((sum, o) => sum + (o.total_price || 0), 0)

    // Revenue this week vs before, for a simple trend indicator
    const now = Date.now()
    const weekMs = 7 * 24 * 60 * 60 * 1000
    const thisWeekRevenue = done
      .filter((o) => now - new Date(o.created_at).getTime() < weekMs)
      .reduce((sum, o) => sum + (o.total_price || 0), 0)

    return {
      totalProducts: products.length,
      pendingOrders: pending,
      totalOrders: orders.length,
      revenue,
      thisWeekRevenue,
    }
  }, [products, orders])

  const recentOrders = orders.slice(0, 5)
  const topProducts = useMemo(
    () => [...products].sort((a, b) => (b.total_sold || 0) - (a.total_sold || 0)).slice(0, 5),
    [products],
  )

  const statCards = [
    {
      label: 'Total Produk',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-primary bg-primary/10',
      href: '/admin/produk',
    },
    {
      label: 'Pesanan Pending',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'text-amber-500 bg-amber-500/10',
      href: '/admin/orders',
    },
    {
      label: 'Total Pesanan',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'text-blue-500 bg-blue-500/10',
      href: '/admin/orders',
    },
    {
      label: 'Revenue',
      value: formatPrice(stats.revenue),
      icon: Wallet,
      color: 'text-emerald-500 bg-emerald-500/10',
      href: '/admin/orders',
    },
  ]

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px] space-y-4 sm:space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-border bg-card" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl font-bold sm:text-2xl">Dashboard</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Ringkasan performa toko kamu</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:p-5"
            >
              <div className={`mb-3 flex size-9 items-center justify-center rounded-xl sm:size-10 ${card.color}`}>
                <Icon className="size-4 sm:size-5" aria-hidden />
              </div>
              <p className="text-[11px] text-muted-foreground sm:text-sm">{card.label}</p>
              <p className="mt-1 truncate text-lg font-bold sm:text-2xl">{card.value}</p>
            </Link>
          )
        })}
      </div>

      {/* Revenue trend banner */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <TrendingUp className="size-5" aria-hidden />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Revenue 7 hari terakhir</p>
            <p className="text-lg font-bold">{formatPrice(stats.thisWeekRevenue)}</p>
          </div>
        </div>
        <Link
          href="/admin/orders"
          className="flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Lihat Semua Pesanan
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Pesanan Terbaru</h3>
            <Link href="/admin/orders" className="text-xs font-medium text-primary hover:underline">
              Lihat semua
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Belum ada pesanan.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{order.customer_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.invoice_number} · {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-sm font-semibold">{formatPrice(order.total_price)}</span>
                    <span
                      className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusConfig[order.status].color}`}
                    >
                      {statusConfig[order.status].label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Produk Terlaris</h3>
            <Link href="/admin/produk" className="text-xs font-medium text-primary hover:underline">
              Kelola produk
            </Link>
          </div>
          {topProducts.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Belum ada produk.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {topProducts.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={p.name}
                      width={36}
                      height={36}
                      className="size-9 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Package className="size-4 text-muted-foreground" aria-hidden />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <ShoppingBag className="size-3" aria-hidden />
                        {p.total_sold || 0} terjual
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Eye className="size-3" aria-hidden />
                        {p.views || 0}
                      </span>
                    </div>
                  </div>
                  {p.is_featured && (
                    <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" aria-hidden />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
