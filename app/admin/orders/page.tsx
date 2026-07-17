'use client'
import { useState, useEffect } from 'react'
import { Trash2, Eye, EyeOff, Copy, Check, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Order = {
  id: string
  invoice_number: string
  customer_name: string
  customer_phone: string
  customer_domain: string | null
  customer_username: string | null
  customer_password: string | null
  items: { id?: string; name: string; qty?: number; price: number }[]
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
    year: 'numeric',
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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders()
      })
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function fetchOrders() {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders((data as Order[]) || [])
  }

  async function updateStatus(orderId: string, newStatus: Order['status']) {
    if (updatingId) return
    setUpdatingId(orderId)
    const order = orders.find((o) => o.id === orderId)
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
    await fetchOrders()

    // Send WA notification to customer + bump total_sold when marked as done
    if (newStatus === 'done' && order) {
      for (const item of order.items || []) {
        if (item.id) {
          const { data: product } = await supabase
            .from('products')
            .select('total_sold')
            .eq('id', item.id)
            .single()
          if (product) {
            await supabase
              .from('products')
              .update({ total_sold: (product.total_sold || 0) + (item.qty || 1) })
              .eq('id', item.id)
          }
        }
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()
      const token = session?.access_token
      if (token) {
        fetch('/api/send-wa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            phone: order.customer_phone,
            customerName: order.customer_name,
            invoiceNumber: order.invoice_number,
            items: order.items,
            domain: order.customer_domain,
          }),
        }).catch(() => {})
      }
    }

    setUpdatingId(null)
  }

  async function deleteOrder(orderId: string) {
    if (!confirm('Yakin ingin HAPUS PERMANEN orderan ini?')) return
    await supabase.from('orders').delete().eq('id', orderId)
    fetchOrders()
  }

  async function copyToClipboard(text: string, field: string) {
    await navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const filtered = orders.filter((o) => {
    const matchFilter = filter ? o.status === filter : true
    const matchSearch = search
      ? o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
        o.invoice_number?.toLowerCase().includes(search.toLowerCase()) ||
        o.customer_phone?.includes(search)
      : true
    return matchFilter && matchSearch
  })

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    done: orders.filter((o) => o.status === 'done').length,
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div>
        <h2 className="text-xl font-bold">Kelola Pesanan</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{orders.length} pesanan total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {[
            { key: '', label: `Semua (${counts.all})` },
            { key: 'pending', label: `Menunggu (${counts.pending})` },
            { key: 'processing', label: `Diproses (${counts.processing})` },
            { key: 'done', label: `Selesai (${counts.done})` },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f.key
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari invoice, nama, telepon..."
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary sm:max-w-xs"
        />
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">Tidak ada pesanan.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((order) => (
            <div key={order.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{order.invoice_number}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer_name} · {order.customer_phone}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDate(order.created_at)}</p>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusConfig[order.status].color}`}
                >
                  {statusConfig[order.status].label}
                </span>
              </div>

              <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3 text-sm">
                {(order.items || []).map((item, i) => (
                  <div key={i} className="flex justify-between text-muted-foreground">
                    <span>
                      {item.name} {item.qty ? `x${item.qty}` : ''}
                    </span>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                ))}
                <div className="mt-1 flex justify-between border-t border-border pt-2 font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(order.total_price)}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {(['pending', 'processing', 'done', 'cancelled'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(order.id, s)}
                    disabled={updatingId === order.id || order.status === s}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
                      order.status === s
                        ? statusConfig[s].color
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {statusConfig[s].label}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  Detail
                </button>
                <button
                  onClick={() => deleteOrder(order.id)}
                  className="ml-auto rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { setSelectedOrder(null); setShowPassword(false) }}>
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">{selectedOrder.invoice_number}</h3>
                <p className="text-sm text-muted-foreground">{formatDate(selectedOrder.created_at)}</p>
              </div>
              <button
                onClick={() => { setSelectedOrder(null); setShowPassword(false) }}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {/* Customer Info */}
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs font-medium text-muted-foreground">Data Customer</p>
                <p className="mt-1 font-medium">{selectedOrder.customer_name}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customer_phone}</p>
              </div>

              {/* WP Credentials */}
              {(selectedOrder.customer_domain || selectedOrder.customer_username || selectedOrder.customer_password) && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <p className="text-xs font-medium text-primary">Akses WordPress</p>
                  <div className="mt-2 space-y-2">
                    {selectedOrder.customer_domain && (
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Domain</p>
                          <p className="truncate text-sm font-medium">{selectedOrder.customer_domain}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(selectedOrder.customer_domain!, 'domain')}
                          className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {copiedField === 'domain' ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                        </button>
                      </div>
                    )}
                    {selectedOrder.customer_username && (
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Username</p>
                          <p className="truncate text-sm font-medium">{selectedOrder.customer_username}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(selectedOrder.customer_username!, 'username')}
                          className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {copiedField === 'username' ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                        </button>
                      </div>
                    )}
                    {selectedOrder.customer_password && (
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Password</p>
                          <p className="truncate text-sm font-medium">
                            {showPassword ? selectedOrder.customer_password : '••••••••'}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-1">
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(selectedOrder.customer_password!, 'password')}
                            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            {copiedField === 'password' ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs font-medium text-muted-foreground">Item Pesanan</p>
                <div className="mt-2 space-y-1">
                  {(selectedOrder.items || []).map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} {item.qty ? `x${item.qty}` : ''}
                      </span>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-border pt-2 font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(selectedOrder.total_price)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
