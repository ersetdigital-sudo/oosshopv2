'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, ShoppingBag, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'

type Props = {
  product: {
    id: string
    name: string
    price: number
    image_url: string | null
    category: string
  }
  waLink: string
  formattedPrice: string
}

export function ProductStickyBar({ product, waLink, formattedPrice }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      className={`fixed bottom-16 left-0 right-0 z-40 md:hidden transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-3 mb-2 flex items-center gap-3 rounded-2xl border border-border bg-background/95 p-3 shadow-lg backdrop-blur-xl">
        {/* Price */}
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold leading-tight text-primary">{formattedPrice}</p>
          <p className="text-[10px] text-muted-foreground">Termasuk instalasi</p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex size-10 items-center justify-center rounded-xl border transition-all ${
              added
                ? 'border-green-500 bg-green-500/10 text-green-600'
                : 'border-border bg-card text-foreground hover:border-primary hover:bg-primary/5'
            }`}
            aria-label="Tambah ke keranjang"
          >
            {added ? (
              <Check className="size-5" aria-hidden />
            ) : (
              <ShoppingBag className="size-5" aria-hidden />
            )}
          </button>
          <Button
            size="default"
            className="gap-1.5 rounded-xl px-4"
            nativeButton={false}
            render={<a href={waLink} target="_blank" rel="noopener noreferrer" />}
          >
            <MessageCircle className="size-4" aria-hidden />
            Pesan
          </Button>
        </div>
      </div>
    </div>
  )
}
