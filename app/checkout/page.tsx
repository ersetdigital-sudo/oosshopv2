'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { siteConfig } from '@/lib/data'

function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQty, clearCart, totalItems, totalPrice } = useCart()
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    domain: '',
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (cart.length === 0) {
    return (
      <>
        <SiteHeader />
        <main className="mx-auto max-w-lg px-4 py-20 text-center">
          <ShoppingBag className="mx-auto mb-4 size-16 text-muted-foreground/30" aria-hidden />
          <p className="text-lg text-muted-foreground">Keranjang kosong, tidak bisa checkout.</p>
          <Button size="lg" className="mt-6" nativeButton={false} render={<Link href="/katalog" />}>
            Jelajahi Produk
          </Button>
        </main>
        <SiteFooter />
      </>
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    // Build WhatsApp message with order details
    const itemsList = cart
      .map((item) => `• ${item.name}${item.variant ? ` (${item.variant})` : ''} x${item.qty} = ${formatIDR(item.price * item.qty)}`)
      .join('\n')

    const message = `Halo OOS SHOP, saya ingin order:\n\n${itemsList}\n\n💰 Total: ${formatIDR(totalPrice)}\n\n📋 Data Instalasi:\nNama: ${form.name}\nWhatsApp: ${form.phone}\nDomain: ${form.domain}\nUsername: ${form.username}\nPassword: ${form.password}\n\nMohon diproses. Terima kasih!`

    const waUrl = `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`

    // Clear cart and redirect to WhatsApp
    clearCart()
    window.open(waUrl, '_blank')
    router.push('/')
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/katalog" className="transition-colors hover:text-foreground">
                Katalog
              </Link>
            </li>
            <ChevronRight className="size-4" aria-hidden />
            <li className="font-medium text-foreground" aria-current="page">
              Checkout
            </li>
          </ol>
        </nav>

        <h1 className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">Checkout</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left — Form */}
          <div>
            <form onSubmit={handleSubmit} id="checkout-form" className="space-y-5">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold">Data Instalasi</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Isi data WordPress Anda untuk proses instalasi plugin.
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                      Nama Lengkap *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nama Anda"
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium">
                      Nomor WhatsApp *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="08xxxxxxxxxx"
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="domain" className="block text-sm font-medium">
                      Domain WordPress *
                    </label>
                    <input
                      id="domain"
                      type="text"
                      required
                      value={form.domain}
                      onChange={(e) => setForm({ ...form, domain: e.target.value })}
                      placeholder="contoh.com"
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium">
                        Username WP-Admin *
                      </label>
                      <input
                        id="username"
                        type="text"
                        required
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        placeholder="admin"
                        className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium">
                        Password WP-Admin *
                      </label>
                      <div className="relative mt-1.5">
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-16 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? 'Sembunyikan' : 'Lihat'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right — Order Summary */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Ringkasan Pesanan</h2>

              <div className="mt-4 flex flex-col gap-3">
                {cart.map((item) => (
                  <div key={item.cartKey} className="flex gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-accent">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <ShoppingBag className="size-5 text-muted-foreground/40" aria-hidden />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatIDR(item.price)} × {item.qty}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQty(item.cartKey, item.qty - 1)}
                          className="rounded p-0.5 text-muted-foreground hover:text-foreground"
                          aria-label="Kurangi"
                        >
                          <Minus className="size-3.5" aria-hidden />
                        </button>
                        <span className="w-5 text-center text-xs font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.cartKey, item.qty + 1)}
                          className="rounded p-0.5 text-muted-foreground hover:text-foreground"
                          aria-label="Tambah"
                        >
                          <Plus className="size-3.5" aria-hidden />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.cartKey)}
                          className="ml-1 rounded p-0.5 text-muted-foreground hover:text-red-500"
                          aria-label="Hapus"
                        >
                          <Trash2 className="size-3.5" aria-hidden />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Item</span>
                  <span className="font-medium">{totalItems} produk</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Harga</span>
                  <span className="text-xl font-bold text-primary">{formatIDR(totalPrice)}</span>
                </div>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                size="lg"
                className="mt-5 w-full"
                disabled={submitting}
              >
                {submitting ? 'Memproses...' : 'Pesan via WhatsApp'}
              </Button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Pesanan akan dikirim ke WhatsApp OOS SHOP untuk diproses.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
