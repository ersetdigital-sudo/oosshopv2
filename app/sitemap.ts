import type { MetadataRoute } from 'next'
import { siteConfig, websiteServices } from '@/lib/data'
import { getAllProducts } from '@/lib/products'
import { getPublishedArticles } from '@/lib/blog'
import { getActiveCategories } from '@/lib/categories'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/katalog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/layanan`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tentang-kami`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/kebijakan-privasi`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/syarat-ketentuan`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const layananRoutes: MetadataRoute.Sitemap = websiteServices.map((s) => ({
    url: `${baseUrl}/layanan/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const products = await getAllProducts()
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/produk/${p.slug || p.id}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const articles = await getPublishedArticles()
  const blogRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    ...articles.map((a) => ({
      url: `${baseUrl}/blog/${a.slug}`,
      lastModified: new Date(a.updated_at || a.published_at || a.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]

  const categories = await getActiveCategories()
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: new Date(cat.updated_at || cat.created_at),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...layananRoutes, ...productRoutes, ...blogRoutes, ...categoryRoutes]
}
