'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'

function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

export function CartDrawer() {
  const { cart, removeFromCart, updateQty, clearCart, totalItems, totalPrice, isCartOpen, closeCart } =
    useCart()

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden
      />

      {/* Drawer panel */}
      <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-[420px] animate-in slide-in-from-right duration-300 flex-col bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-bold">
            Keranjang{' '}
            {totalItems > 0 && <span className="text-primary">({totalItems})</span>}
          </h2>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="rounded-lg px-2 py-1 text-xs text-red-500 transition-colors hover:bg-red-500/10"
              >
                Hapus Semua
              </button>
            )}
            <button
              type="button"
              onClick={closeCart}
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Tutup keranjang"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        {/* Body */}
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="mb-4 size-16 text-muted-foreground/30" aria-hidden />
            <p className="text-muted-foreground">Keranjang kamu masih kosong</p>
            <Button
              size="sm"
              className="mt-5"
              nativeButton={false}
              render={<Link href="/katalog" onClick={closeCart} />}
            >
              Jelajahi Produk
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="flex flex-col gap-3">
                {cart.map((item) => (
                  <div
                    key={item.cartKey}
                    className="flex gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    {/* Image */}
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-accent">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <ShoppingBag className="size-6 text-muted-foreground/40" aria-hidden />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold">{item.name}</h3>
                          {item.variant && (
                            <p className="mt-0.5 text-xs text-primary">{item.variant}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartKey)}
                          className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                          aria-label={`Hapus ${item.name}`}
                        >
                          <Trash2 className="size-4" aria-hidden />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm font-bold text-primary">
                          {formatIDR(item.price * item.qty)}
                        </p>

                        {/* Qty controls */}
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            onClick={() => updateQty(item.cartKey, item.qty - 1)}
                            className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Kurangi"
                          >
                            <Minus className="size-3.5" aria-hidden />
                          </button>
                          <span className="flex w-8 items-center justify-center text-xs font-medium">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.cartKey, item.qty + 1)}
                            className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Tambah"
                          >
                            <Plus className="size-3.5" aria-hidden />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-4" style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Item</span>
                <span className="font-medium">{totalItems} produk</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Harga</span>
                <span className="text-xl font-bold">{formatIDR(totalPrice)}</span>
              </div>
              <Button
                size="lg"
                className="w-full"
                nativeButton={false}
                render={<Link href="/checkout" onClick={closeCart} />}
              >
                Checkout Sekarang
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
