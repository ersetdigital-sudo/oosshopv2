'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  Clock,
  Loader2,
  LogOut,
  Package,
  RefreshCw,
  ShoppingBag,
  User,
  XCircle,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

// --- Helpers ---
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null
  return null
}

function setCookie(name: string, value: string, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

type OrderItem = { id?: string; name: string; qty: number; price: number }
type Order = {
  id: string
  invoice_number: string
  customer_name: string
  customer_phone: string
  customer_domain?: string
  items: OrderItem[]
  total_price: number
  status: 'pending' | 'processing' | 'done' | 'cancelled'
  created_at: string
}

type Review = {
  id: string
  product_id: string
  order_id: string
  customer_name: string
  customer_phone: string
  rating: number
  comment: string | null
}

// --- StarRating ---
function StarRating({ rating, onRate, interactive = false, size = 'size-5' }: { rating: number; onRate?: (r: number) => void; interactive?: boolean; size?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate?.(star)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <svg className={`${size} ${star <= rating ? 'text-amber-400' : 'text-muted-foreground/30'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

// --- ReviewForm ---
function ReviewForm({ item, orderId, customerName, customerPhone, onSubmitted }: { item: OrderItem; orderId: string; customerName: string; customerPhone: string; onSubmitted: () => void }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) return alert('Pilih rating dulu!')
    setSubmitting(true)

    const { error } = await supabase.from('reviews').insert({
      product_id: item.id,
      order_id: orderId,
      customer_name: customerName,
      customer_phone: customerPhone,
      rating,
      comment: comment.trim() || null,
    })

    if (error) {
      alert('Gagal mengirim ulasan: ' + error.message)
    } else {
      onSubmitted()
    }
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 rounded-lg border border-border bg-accent/30 p-3">
      <p className="text-xs font-medium text-muted-foreground mb-2">
        Beri ulasan untuk <span className="text-foreground">{item.name}</span>
      </p>
      <StarRating rating={rating} onRate={setRating} interactive size="size-6" />
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Tulis ulasan (opsional)..."
        rows={2}
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
      />
      <button
        type="submit"
        disabled={submitting || rating === 0}
        className="mt-2 rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
      </button>
    </form>
  )
}

const statusConfig = {
  pending: { label: 'Menunggu Pembayaran', icon: Clock, color: 'bg-amber-100 text-amber-700 border-amber-200' },
  processing: { label: 'Sedang Diproses', icon: RefreshCw, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  done: { label: 'Selesai', icon: CheckCircle2, color: 'bg-green-100 text-green-700 border-green-200' },
  cancelled: { label: 'Dibatalkan', icon: XCircle, color: 'bg-red-100 text-red-700 border-red-200' },
}

export default function DashboardPage() {
  const [phone, setPhone] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [noOrdersFound, setNoOrdersFound] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewFormOpen, setReviewFormOpen] = useState<string | null>(null)

  useEffect(() => {
    async function checkSession() {
      const storedWa = localStorage.getItem('customer_wa')
      if (storedWa) {
        setPhone(storedWa)
        setLoggedIn(true)
        fetchOrders(storedWa)
        setLoading(false)
        return
      }

      const token = getCookie('cs_token')
      if (!token) { setLoading(false); return }

      const { data: session } = await supabase
        .from('customer_sessions')
        .select('*')
        .eq('token', token)
        .single()

      if (session) {
        setPhone(session.phone)
        setCustomerName(session.customer_name)
        setLoggedIn(true)
        localStorage.setItem('customer_wa', session.phone)
        fetchOrders(session.phone)
      } else {
        deleteCookie('cs_token')
      }
      setLoading(false)
    }
    checkSession()
  }, [])

  async function fetchOrders(phoneNumber: string) {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_phone', phoneNumber)
      .order('created_at', { ascending: false })

    if (data && data.length > 0) {
      // Auto-cancel expired pending orders (>24h)
      const now = Date.now()
      for (const order of data) {
        if (order.status === 'pending') {
          const deadline = new Date(order.created_at).getTime() + 24 * 60 * 60 * 1000
          if (now > deadline) {
            await supabase.from('orders').update({ status: 'cancelled' }).eq('id', order.id)
            order.status = 'cancelled'
          }
        }
      }
      setOrders(data)
      setCustomerName(data[0].customer_name)
    } else {
      setOrders([])
    }

    // Fetch existing reviews by this customer
    const { data: reviewData } = await supabase
      .from('reviews')
      .select('*')
      .eq('customer_phone', phoneNumber)
    setReviews(reviewData || [])
  }

  function hasReviewed(orderId: string, productId?: string) {
    return reviews.some(r => r.order_id === orderId && r.product_id === productId)
  }

  function getReview(orderId: string, productId?: string) {
    return reviews.find(r => r.order_id === orderId && r.product_id === productId)
  }

  function handleReviewSubmitted() {
    supabase.from('reviews').select('*').eq('customer_phone', phone).then(({ data }) => setReviews(data || []))
    setReviewFormOpen(null)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!phone.trim()) return
    setLoading(true)
    setNoOrdersFound(false)

    const { data: orderData } = await supabase
      .from('orders')
      .select('customer_name')
      .eq('customer_phone', phone)
      .limit(1)

    if (!orderData || orderData.length === 0) {
      setNoOrdersFound(true)
      setLoading(false)
      return
    }

    const name = orderData[0]?.customer_name || ''
    const token = crypto.randomUUID()

    await supabase.from('customer_sessions').insert({ token, phone, customer_name: name })
    setCookie('cs_token', token, 30)
    localStorage.setItem('customer_wa', phone)

    setCustomerName(name)
    setLoggedIn(true)
    fetchOrders(phone)
    setLoading(false)
  }

  async function handleLogout() {
    const token = getCookie('cs_token')
    if (token) {
      await supabase.from('customer_sessions').delete().eq('token', token)
      deleteCookie('cs_token')
    }
    localStorage.removeItem('customer_wa')
    setLoggedIn(false)
    setPhone('')
    setCustomerName('')
    setOrders([])
  }

  // Stats
  const totalOrders = orders.length
  const completedOrders = orders.filter(o => o.status === 'done').length
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length
  const totalSpent = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total_price, 0)

  // Filter
  const filteredOrders = activeTab === 'all' ? orders : orders.filter(o => o.status === activeTab)

  // ═══ LOGIN FORM ═══
  if (!loggedIn) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="text-center mb-6">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <User className="size-7 text-primary" />
              </span>
              <h1 className="mt-4 text-2xl font-bold tracking-tight">Pesanan Saya</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Masukkan nomor WhatsApp yang kamu gunakan saat checkout untuk melihat riwayat pesananmu.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">No WhatsApp</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Contoh: 08521215xxxx"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                Lihat Pesanan Saya
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Belum pernah order?{' '}
              <Link href="/katalog" className="text-primary hover:underline">Jelajahi Katalog</Link>
            </p>

            {noOrdersFound && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                <p className="text-sm font-medium text-amber-800 mb-1">Nomor WhatsApp ini belum memiliki pesanan.</p>
                <p className="text-xs text-amber-600 mb-3">Yuk mulai order pertamamu!</p>
                <Button size="sm" nativeButton={false} render={<Link href="/katalog" />}>
                  Jelajahi Katalog
                </Button>
              </div>
            )}
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  // ═══ DASHBOARD (logged in) ═══
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Halo, {customerName || 'Customer'}! 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{phone}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="size-4" />
            Ganti Nomor
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 mb-6">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Pesanan</p>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Selesai</p>
            <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Dalam Proses</p>
            <p className="text-2xl font-bold text-blue-600">{pendingOrders}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Belanja</p>
            <p className="text-xl font-bold text-primary">{formatPrice(totalSpent)}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            { key: 'all', label: 'Semua' },
            { key: 'pending', label: 'Menunggu' },
            { key: 'processing', label: 'Diproses' },
            { key: 'done', label: 'Selesai' },
            { key: 'cancelled', label: 'Dibatalkan' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <Loader2 className="size-6 animate-spin mx-auto text-muted-foreground" />
            <p className="text-muted-foreground mt-2">Memuat pesanan...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <ShoppingBag className="size-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-lg font-medium text-foreground mb-1">Belum ada pesanan</p>
            <p className="text-sm text-muted-foreground mb-4">
              {activeTab === 'all' ? 'Kamu belum pernah order dengan nomor ini.' : 'Tidak ada pesanan dengan status ini.'}
            </p>
            {activeTab === 'all' && (
              <Button nativeButton={false} render={<Link href="/katalog" />}>
                Jelajahi Katalog
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => {
              const status = statusConfig[order.status]
              const StatusIcon = status.icon
              return (
                <div key={order.id} className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  {/* Order Header */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-mono text-sm font-bold text-primary">{order.invoice_number}</p>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                          <StatusIcon className="size-3" />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{formatDate(order.created_at)}</p>
                    </div>
                    <p className="text-lg font-bold">{formatPrice(order.total_price)}</p>
                  </div>

                  {/* Items */}
                  <div className="rounded-lg bg-accent/50 p-3">
                    {(order.items || []).map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 text-sm">
                        <span className="text-foreground/80">
                          {item.name} <span className="text-muted-foreground">x{item.qty}</span>
                        </span>
                        <span className="font-medium">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 flex items-center gap-1">
                    <div className={`h-1.5 flex-1 rounded-full ${order.status === 'cancelled' ? 'bg-red-200' : 'bg-green-500'}`} />
                    <div className={`h-1.5 flex-1 rounded-full ${order.status === 'processing' || order.status === 'done' ? 'bg-green-500' : 'bg-muted'}`} />
                    <div className={`h-1.5 flex-1 rounded-full ${order.status === 'done' ? 'bg-green-500' : 'bg-muted'}`} />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted-foreground">Dipesan</span>
                    <span className="text-[10px] text-muted-foreground">Diproses</span>
                    <span className="text-[10px] text-muted-foreground">Selesai</span>
                  </div>

                  {/* Review section for completed orders */}
                  {order.status === 'done' && (
                    <div className="mt-3 border-t border-border pt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Ulasan Produk</p>
                      <div className="space-y-2">
                        {(order.items || []).map((item, i) => {
                          const reviewed = hasReviewed(order.id, item.id)
                          const existingReview = getReview(order.id, item.id)
                          const formKey = `${order.id}-${item.id}`

                          return (
                            <div key={i} className="rounded-lg bg-accent/40 p-2.5 sm:p-3">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <span className="text-sm text-foreground/80">{item.name}</span>
                                {reviewed ? (
                                  <div className="flex items-center gap-2">
                                    <StarRating rating={existingReview?.rating ?? 0} size="size-4" />
                                    <span className="text-xs text-green-600 font-medium">Sudah diulas</span>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setReviewFormOpen(reviewFormOpen === formKey ? null : formKey)}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-all"
                                  >
                                    <svg className="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Beri Ulasan
                                  </button>
                                )}
                              </div>
                              {existingReview?.comment && (
                                <p className="mt-1.5 text-xs italic text-muted-foreground">&ldquo;{existingReview.comment}&rdquo;</p>
                              )}
                              {!reviewed && reviewFormOpen === formKey && (
                                <ReviewForm
                                  item={item}
                                  orderId={order.id}
                                  customerName={customerName}
                                  customerPhone={phone}
                                  onSubmitted={handleReviewSubmitted}
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
