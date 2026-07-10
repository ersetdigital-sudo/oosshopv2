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
  article_type_id: string | null
}

export type ArticleWithMeta = Article & {
  category?: { id: string; name: string; slug: string } | null
  article_type?: { id: string; name: string; slug: string; color: string } | null
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

export async function getRelatedArticlesByCategory(excludeId: string, categoryId: string, limit = 3): Promise<Article[]> {
  // Get article IDs in same category
  const { data: links } = await supabase
    .from('article_categories')
    .select('article_id')
    .eq('category_id', categoryId)

  if (!links || links.length === 0) return getRelatedArticles(excludeId, limit)

  const articleIds = links.map((l) => l.article_id).filter((id) => id !== excludeId)

  if (articleIds.length === 0) return getRelatedArticles(excludeId, limit)

  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, thumbnail, published_at')
    .in('id', articleIds)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) return getRelatedArticles(excludeId, limit)
  return (data as Article[]) || []
}

export async function getArticleWithMeta(slug: string): Promise<ArticleWithMeta | null> {
  const article = await getArticleBySlug(slug)
  if (!article) return null

  // Get category
  const { data: categoryLink } = await supabase
    .from('article_categories')
    .select('category_id')
    .eq('article_id', article.id)
    .limit(1)
    .single()

  let category = null
  if (categoryLink) {
    const { data } = await supabase
      .from('categories')
      .select('id, name, slug')
      .eq('id', categoryLink.category_id)
      .single()
    category = data
  }

  // Get article type
  let article_type = null
  if (article.article_type_id) {
    const { data } = await supabase
      .from('article_types')
      .select('id, name, slug, color')
      .eq('id', article.article_type_id)
      .single()
    article_type = data
  }

  return { ...article, category, article_type }
}
