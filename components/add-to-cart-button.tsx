'use client'

import { ShoppingBag } from 'lucide-react'
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
  size?: 'sm' | 'lg' | 'default'
  className?: string
  fullWidth?: boolean
}

export function AddToCartButton({ product, size = 'lg', className = '', fullWidth = true }: Props) {
  const { addToCart } = useCart()

  return (
    <Button
      size={size}
      variant="outline"
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={() => addToCart(product)}
    >
      <ShoppingBag className="size-5" aria-hidden />
      Tambah ke Keranjang
    </Button>
  )
}
