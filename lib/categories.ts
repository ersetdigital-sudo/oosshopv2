import { supabase } from './supabase'

export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  cover_image: string | null
  seo_title: string | null
  seo_description: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type CategoryWithCount = Category & {
  article_count: number
}

// ─── Public Queries ───────────────────────────────────────────

export async function getActiveCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return (data as Category[]) || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) return null
  return data as Category
}

export async function getCategoriesWithCount(): Promise<CategoryWithCount[]> {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error || !categories) return []

  // Get article counts per category
  const { data: counts } = await supabase
    .from('article_categories')
    .select('category_id')

  const countMap: Record<string, number> = {}
  if (counts) {
    for (const row of counts) {
      countMap[row.category_id] = (countMap[row.category_id] || 0) + 1
    }
  }

  return categories.map((cat) => ({
    ...cat,
    article_count: countMap[cat.id] || 0,
  })) as CategoryWithCount[]
}

export async function getArticlesByCategory(categorySlug: string) {
  // First get category id
  const category = await getCategoryBySlug(categorySlug)
  if (!category) return []

  // Get article IDs for this category
  const { data: links } = await supabase
    .from('article_categories')
    .select('article_id')
    .eq('category_id', category.id)

  if (!links || links.length === 0) return []

  const articleIds = links.map((l) => l.article_id)

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .in('id', articleIds)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return articles || []
}

// ─── Admin Queries ────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) return []
  return (data as Category[]) || []
}

export async function getCategoryArticleIds(articleId: string): Promise<string[]> {
  const { data } = await supabase
    .from('article_categories')
    .select('category_id')
    .eq('article_id', articleId)

  if (!data) return []
  return data.map((d) => d.category_id)
}

export async function setArticleCategory(articleId: string, categoryId: string) {
  // Remove existing categories for this article
  await supabase.from('article_categories').delete().eq('article_id', articleId)

  // Insert new category
  if (categoryId) {
    await supabase.from('article_categories').insert({ article_id: articleId, category_id: categoryId })
  }
}
