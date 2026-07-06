import { supabase } from './supabase'

export type Article = {
  id: string
  title: string
  slug: string
  content: string
  thumbnail: string | null
  meta_title: string | null
  meta_description: string | null
  status: 'draft' | 'published'
  published_at: string | null
  updated_at: string | null
  created_at: string
}

export async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }
  return (data as Article[]) || []
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) return null
  return data as Article
}

export async function getRelatedArticles(excludeId: string, limit = 3): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, thumbnail, published_at')
    .eq('status', 'published')
    .neq('id', excludeId)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data as Article[]) || []
}
