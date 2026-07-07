'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Headset,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Wallet,
  XCircle,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

type OrderItem = {
  id?: string
  name: string
  price: number
  qty: number
  variant?: string | null
  image_url?: string | null
}

type Order = {
  id: string
  invoice_number: string
  customer_name: string
  customer_domain: string | null
  items: OrderItem[]
  total_price: number
  status: string
  created_at: string
}

type BankAccount = {
  id: string
  bank_name: string
  account_name: string
  account_number: string
  is_active: boolean
  type: string | null
}

const ADMIN_WHATSAPP = '6285212150100'

function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function useCountdown(createdAt: string | undefined) {
  const [time, setTime] = useState({ h: '--', m: '--', s: '--', expired: false })

  useEffect(() => {
    if (!createdAt) return
    const deadline = new Date(createdAt).getTime() + 24 * 60 * 60 * 1000
    if (Number.isNaN(deadline)) return

    function tick() {
      const diff = deadline - Date.now()
      if (diff <= 0) {
        setTime({ h: '00', m: '00', s: '00', expired: true })
        return
      }
      setTime({
        h: String(Math.floor(diff / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
        expired: false,
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [createdAt])

  return time
}

function CopyField({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p
          className={`truncate font-mono text-base font-bold tracking-wide sm:text-lg ${
            highlight ? 'text-primary' : ''
          }`}
        >
          {value}
        </p>
      </div>
      <button
        onClick={handleCopy}
        className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
          copied
            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
            : 'bg-background text-muted-foreground hover:text-foreground'
        }`}
      >
        {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
        {copied ? 'Tersalin' : 'Salin'}
      </button>
    </div>
  )
}

export default function ThankYouPage() {
  const params = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [accounts, setAccounts] = useState<BankAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [notFoundState, setNotFoundState] = useState(false)

  const countdown = useCountdown(order?.created_at)

  useEffect(() => {
    async function fetchData() {
      const orderRes = await supabase.from('orders').select('*').eq('id', params.id).single()
      let orderData = orderRes.data as Order | null

      if (!orderData) {
        setNotFoundState(true)
        setLoading(false)
        return
      }

      // Auto-cancel if pending and past 24 hours
      if (orderData.status === 'pending') {
        const deadline = new Date(orderData.created_at).getTime() + 24 * 60 * 60 * 1000
        if (Date.now() > deadline) {
          await supabase.from('orders').update({ status: 'cancelled' }).eq('id', orderData.id)
          orderData = { ...orderData, status: 'cancelled' }
        }
      }

      setOrder(orderData)

      const { data: bankAccounts } = await supabase
        .from('bank_accounts')
        .select('*')
        .eq('is_active', true)

      setAccounts((bankAccounts as BankAccount[]) || [])
      setLoading(false)
    }
    if (params.id) fetchData()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Memuat pesanan...</p>
        </div>
      </div>
    )
  }

  if (notFoundState || !order) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-4 text-muted-foreground">Pesanan tidak ditemukan.</p>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  const isCancelled = order.status === 'cancelled'
  const isPaid = order.status === 'paid' || order.status === 'done'

  const productsList = order.items.map((item) => `• ${item.name} (x${item.qty})`).join('\n')
  const waMessage = encodeURIComponent(
    `Halo OOS SHOP! 👋\n\nKonfirmasi pembayaran:\nInvoice: ${order.invoice_number}\nNama: ${order.customer_name}\nTotal: ${formatIDR(order.total_price)}\n\nProduk:\n${productsList}\n\nMohon diproses 🙏`,
  )
  const waLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${waMessage}`

  const ewalletNames = ['dana', 'ovo', 'gopay', 'shopeepay', 'linkaja', 'isaku']
  const bankAccountsOnly = accounts.filter((b) => {
    const isEwallet = b.type === 'ewallet' || ewalletNames.some((ew) => b.bank_name.toLowerCase().includes(ew))
    return !isEwallet
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-5">
          <Link href="/" className="text-base font-bold">
            OOS<span className="text-primary"> SHOP</span>
          </Link>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-emerald-500" aria-hidden />
            Transaksi aman
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
        {/* Status icon + title */}
        <div className="mb-8 text-center">
          {isCancelled ? (
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-red-500/10">
              <XCircle className="size-8 text-red-500" aria-hidden />
            </div>
          ) : (
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/25">
              <CheckCircle2 className="size-8 text-white" aria-hidden />
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {isCancelled
              ? 'Pesanan Dibatalkan'
              : isPaid
                ? 'Pembayaran Diterima 🎉'
                : 'Pesanan Berhasil Dibuat 🎉'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isCancelled
              ? 'Batas waktu pembayaran telah habis. Silakan buat pesanan baru.'
              : isPaid
                ? 'Tim kami akan segera memproses instalasi.'
                : 'Segera lakukan pembayaran untuk memulai proses instalasi.'}
          </p>
        </div>

        {/* Order summary card */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="text-sm font-semibold">Ringkasan Pesanan</span>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                isCancelled
                  ? 'bg-red-500/10 text-red-500'
                  : isPaid
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
              }`}
            >
              {isCancelled ? 'Dibatalkan' : isPaid ? 'Lunas' : 'Menunggu Pembayaran'}
            </span>
          </div>

          <div className="px-5 py-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Invoice</p>
                <p className="font-mono font-medium">{order.invoice_number}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Nama</p>
                <p className="font-medium">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Tanggal</p>
                <p className="font-medium">{formatDate(order.created_at)}</p>
              </div>
              {order.customer_domain && (
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Domain</p>
                  <p className="font-medium">{order.customer_domain}</p>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3 border-t border-border pt-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-accent/30">
                    {item.image_url ? (
                      <Image src={item.image_url} alt={item.name} width={44} height={44} className="size-full object-cover" />
                    ) : (
                      <ShoppingBag className="size-4 text-muted-foreground/40" aria-hidden />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">×{item.qty}</p>
                  </div>
                  <span className="shrink-0 text-sm font-medium">{formatIDR(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm font-medium text-muted-foreground">Total Pembayaran</span>
              <span className="text-xl font-bold text-primary sm:text-2xl">{formatIDR(order.total_price)}</span>
            </div>
          </div>
        </div>

        {!isCancelled && !isPaid && (
          <>
            {/* Payment instructions */}
            <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                <Wallet className="size-4 text-primary" aria-hidden />
                <h2 className="text-sm font-semibold">Instruksi Transfer Bank</h2>
              </div>

              {bankAccountsOnly.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-muted-foreground">Rekening pembayaran belum tersedia.</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Hubungi kami via WhatsApp untuk info pembayaran.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {bankAccountsOnly.map((account) => (
                    <div key={account.id} className="px-5 py-4">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                          <span className="text-[10px] font-bold text-primary">
                            {account.bank_name.slice(0, 3).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{account.bank_name}</p>
                          <p className="text-xs text-muted-foreground">a.n. {account.account_name}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <CopyField label="Nomor Rekening" value={account.account_number} />
                        <CopyField label="Nominal Transfer" value={String(order.total_price)} highlight />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checklist */}
            <div className="mb-6 rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" aria-hidden />
                <h3 className="text-sm font-semibold">Pastikan transfer sesuai</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Transfer sesuai nominal yang tercantum',
                  'Simpan bukti transfer',
                  'Konfirmasi via WhatsApp setelah transfer',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-500" aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Countdown */}
            <div className="mb-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 sm:flex-row">
              <div className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-amber-500" aria-hidden />
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                  Selesaikan sebelum waktu habis
                </p>
              </div>
              <div className="flex items-center gap-1">
                {[countdown.h, countdown.m, countdown.s].map((v, i) => (
                  <div key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="text-xs font-bold text-amber-500/60">:</span>}
                    <span className="min-w-[32px] rounded-md border border-border bg-background px-2 py-1 text-center font-mono text-base font-bold">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 flex items-center justify-center gap-2.5 rounded-2xl bg-primary px-5 py-4 text-center text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="size-5" aria-hidden />
              <div>
                <p className="text-sm font-bold sm:text-base">Saya Sudah Transfer</p>
                <p className="text-xs text-primary-foreground/80">Konfirmasi & kirim bukti via WhatsApp</p>
              </div>
            </a>
          </>
        )}

        {isPaid && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 flex items-center justify-center gap-2.5 rounded-2xl bg-primary px-5 py-4 text-center text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="size-5" aria-hidden />
            <div>
              <p className="text-sm font-bold sm:text-base">Hubungi Kami via WhatsApp</p>
              <p className="text-xs text-primary-foreground/80">Untuk pertanyaan seputar pesanan Anda</p>
            </div>
          </a>
        )}

        {isCancelled && (
          <Link
            href="/katalog"
            className="mb-6 flex items-center justify-center gap-2.5 rounded-2xl bg-primary px-5 py-4 text-center text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="size-5" aria-hidden />
            Buat Pesanan Baru
          </Link>
        )}

        {/* Trust badges */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: ShieldCheck, title: 'Transaksi Aman', sub: '100% Terpercaya' },
            { icon: BadgeCheck, title: 'Lisensi Original', sub: 'Bukan Nulled' },
            { icon: Headset, title: 'Support 24/7', sub: 'Siap Membantu' },
            { icon: CheckCircle2, title: 'Garansi Layanan', sub: 'Kepuasan Terjamin' },
          ].map((b) => (
            <div
              key={b.title}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-3.5 text-center"
            >
              <b.icon className="size-5 text-primary" aria-hidden />
              <p className="text-[11px] font-semibold leading-tight">{b.title}</p>
              <p className="text-[10px] text-muted-foreground">{b.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-5">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            ← Kembali ke Beranda
          </Link>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-emerald-500" aria-hidden />
            Aman & terenkripsi
          </span>
        </div>
      </main>
    </div>
  )
}
