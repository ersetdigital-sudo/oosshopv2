import { supabase } from './supabase'

export type ArticleType = {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
  icon: string | null
  created_at: string
}

// ─── Public Queries ───────────────────────────────────────────

export async function getAllArticleTypes(): Promise<ArticleType[]> {
  const { data, error } = await supabase
    .from('article_types')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching article types:', error)
    return []
  }
  return (data as ArticleType[]) || []
}

export async function getArticleTypeById(id: string): Promise<ArticleType | null> {
  const { data, error } = await supabase
    .from('article_types')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as ArticleType
}

export async function getArticleTypeBySlug(slug: string): Promise<ArticleType | null> {
  const { data, error } = await supabase
    .from('article_types')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as ArticleType
}
