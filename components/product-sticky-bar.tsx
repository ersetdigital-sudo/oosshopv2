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
      // Show after scrolling 300px
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
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Gradient fade at the top edge for a modern look */}
      <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-background/80 to-transparent" />

      <div className="border-t border-border bg-background/95 backdrop-blur-xl px-4 py-3">
        {/* Price row */}
        <div className="mb-2.5 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Total harga</p>
            <p className="text-lg font-bold text-primary leading-tight">{formattedPrice}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            <Check className="size-3" aria-hidden />
            Original
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            size="lg"
            variant="outline"
            className="flex-1 gap-2"
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check className="size-4" aria-hidden />
                Ditambahkan!
              </>
            ) : (
              <>
                <ShoppingBag className="size-4" aria-hidden />
                Keranjang
              </>
            )}
          </Button>
          <Button
            size="lg"
            className="flex-[1.3] gap-2"
            nativeButton={false}
            render={<a href={waLink} target="_blank" rel="noopener noreferrer" />}
          >
            <MessageCircle className="size-4" aria-hidden />
            Pesan Sekarang
          </Button>
        </div>
      </div>
    </div>
  )
}
