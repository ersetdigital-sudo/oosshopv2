'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export type CartItem = {
  id: string
  cartKey: string
  name: string
  price: number
  image_url: string | null
  category: string
  variant: string | null
  qty: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: { id: string; name: string; price: number; image_url: string | null; category: string }, variant?: string | null) => void
  removeFromCart: (cartKey: string) => void
  updateQty: (cartKey: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('oos-cart')
    if (saved) {
      try {
        setCart(JSON.parse(saved))
      } catch {}
    }
    setHydrated(true)
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('oos-cart', JSON.stringify(cart))
    }
  }, [cart, hydrated])

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])

  function addToCart(
    product: { id: string; name: string; price: number; image_url: string | null; category: string },
    variant: string | null = null,
  ) {
    const cartKey = variant ? `${product.id}_${variant}` : product.id
    setCart((prev) => {
      const exists = prev.find((item) => item.cartKey === cartKey)
      if (exists) {
        return prev.map((item) =>
          item.cartKey === cartKey ? { ...item, qty: item.qty + 1 } : item,
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          cartKey,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          category: product.category,
          variant,
          qty: 1,
        },
      ]
    })
    setIsCartOpen(true)
  }

  function removeFromCart(cartKey: string) {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey))
  }

  function updateQty(cartKey: string, qty: number) {
    if (qty <= 0) return removeFromCart(cartKey)
    setCart((prev) =>
      prev.map((item) => (item.cartKey === cartKey ? { ...item, qty } : item)),
    )
  }

  function clearCart() {
    setCart([])
  }

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
