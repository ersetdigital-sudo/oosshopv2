import { supabase } from './supabase'

export type Product = {
  id: string
  name: string
  slug: string | null
  description: string | null
  price: number
  original_price: number | null
  category: string
  version: string | null
  badge: string | null
  image_url: string | null
  is_featured: boolean
  views: number
  total_sold: number
  flash_sale_price: number | null
  flash_sale_end: string | null
  flash_sale_sold: number | null
  created_at: string
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return (data as Product[]) || []
}

export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase.from('products').select('category')

  if (error) return []
  const categories = [
    ...new Set((data || []).map((p: { category: string }) => p.category).filter(Boolean)),
  ]
  return categories
}
