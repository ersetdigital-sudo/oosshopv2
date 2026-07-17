import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getCategoryBySlug, getArticlesByCategory, getActiveCategories } from '@/lib/categories'
import { CategoryIcon } from '@/lib/category-icons'
import { siteConfig } from '@/lib/data'
import { organizationSchema, websiteSchema } from '@/lib/schema/organization'

export const revalidate = 300

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Kategori Tidak Ditemukan | OOS SHOP' }

  const title = category.seo_title || `${category.name} - Blog | OOS SHOP`
  const description = category.seo_description || category.description || `Artikel tentang ${category.name} di OOS SHOP Blog.`

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/blog/category/${category.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/blog/category/${category.slug}`,
      type: 'website',
      locale: 'id_ID',
      siteName: 'OOS SHOP',
      images: category.cover_image ? [{ url: category.cover_image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: category.cover_image ? [category.cover_image] : [],
    },
  }
}

export async function generateStaticParams() {
  const categories = await getActiveCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const articles = await getArticlesByCategory(slug)
  const allCategories = await getActiveCategories()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      {
        '@type': 'CollectionPage',
        '@id': `${siteConfig.url}/blog/category/${category.slug}#webpage`,
        url: `${siteConfig.url}/blog/category/${category.slug}`,
        name: category.seo_title || `${category.name} - Blog | OOS SHOP`,
        description: category.seo_description || category.description || `Artikel tentang ${category.name}`,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        inLanguage: 'id-ID',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteConfig.url}/blog/category/${category.slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
          { '@type': 'ListItem', position: 3, name: category.name },
        ],
      },
      ...(articles.length > 0
        ? [
            {
              '@type': 'ItemList',
              '@id': `${siteConfig.url}/blog/category/${category.slug}#itemlist`,
              name: `Artikel ${category.name}`,
              numberOfItems: articles.length,
              itemListElement: articles.slice(0, 10).map((article: { slug: string; title: string }, index: number) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${siteConfig.url}/blog/${article.slug}`,
                name: article.title,
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="pb-16">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Beranda
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden />
              <li>
                <Link href="/blog" className="transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden />
              <li className="font-medium text-foreground" aria-current="page">
                {category.name}
              </li>
            </ol>
          </nav>

          {/* Category Header */}
          <div className="mt-6 mb-10">
            {category.cover_image && (
              <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl bg-accent/30 sm:h-56">
                <Image
                  src={category.cover_image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <CategoryIcon slug={category.slug} className="size-5 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {category.name}
                  </h1>
                </div>
              </div>
            )}
            {!category.cover_image && (
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                  <CategoryIcon slug={category.slug} className="size-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {category.name}
                </h1>
              </div>
            )}
            {category.description && (
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                {category.description}
              </p>
            )}
            <p className="mt-2 text-sm text-muted-foreground">
              {articles.length} artikel
            </p>
          </div>

          {/* Category Navigation */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Semua
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  cat.slug === category.slug
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                <CategoryIcon slug={cat.slug} className="size-3.5" />
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Articles Grid */}
          {articles.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">
                Belum ada artikel dalam kategori ini.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Lihat Semua Artikel
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article: { id: string; title: string; slug: string; thumbnail: string | null; published_at: string | null; created_at: string; meta_description: string | null }) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg"
                >
                  {article.thumbnail && (
                    <div className="relative h-44 overflow-hidden bg-accent/30">
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="mb-2 text-xs text-muted-foreground">
                      {formatDate(article.published_at || article.created_at)}
                    </p>
                    <h2 className="mb-2 line-clamp-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                      {article.title}
                    </h2>
                    {article.meta_description && (
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {article.meta_description}
                      </p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary transition-all group-hover:gap-2">
                      Baca selengkapnya
                      <ArrowRight className="size-3" aria-hidden />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
