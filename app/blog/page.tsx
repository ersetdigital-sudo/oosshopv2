import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getPublishedArticles } from '@/lib/blog'
import { siteConfig } from '@/lib/data'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog - Tips WordPress, Plugin & Pembuatan Website | OOS SHOP',
  description:
    'Baca artikel terbaru seputar tips WordPress, panduan plugin premium, tutorial pembuatan website, dan informasi digital marketing untuk bisnis Indonesia.',
  keywords: ['blog wordpress', 'tips plugin wordpress', 'tutorial website', 'panduan digital marketing'],
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: 'Blog - Tips WordPress & Pembuatan Website | OOS SHOP',
    description: 'Artikel seputar WordPress, plugin premium, dan tips pembuatan website profesional.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage() {
  const articles = await getPublishedArticles()

  const jsonLd =
    articles.length > 0
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `${siteConfig.url}/blog#webpage`,
              url: `${siteConfig.url}/blog`,
              name: 'Blog - Tips WordPress, Plugin & Pembuatan Website | OOS SHOP',
              description: 'Artikel seputar WordPress, plugin premium, dan tips pembuatan website profesional.',
              isPartOf: { '@id': `${siteConfig.url}#website` },
              inLanguage: 'id-ID',
            },
            {
              '@type': 'ItemList',
              '@id': `${siteConfig.url}/blog#itemlist`,
              name: 'Artikel Blog OOS SHOP',
              numberOfItems: articles.length,
              itemListElement: articles.slice(0, 10).map((article, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${siteConfig.url}/blog/${article.slug}`,
                name: article.title,
              })),
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${siteConfig.url}/blog#breadcrumb`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
                { '@type': 'ListItem', position: 2, name: 'Blog' },
              ],
            },
          ],
        }
      : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
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
              <li className="font-medium text-foreground" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>

          <div className="mt-6 mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog OOS SHOP</h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              Tips WordPress, panduan plugin premium, tutorial pembuatan website, dan informasi seputar
              bisnis digital di Indonesia.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <p className="mb-4 text-lg text-muted-foreground">
                Belum ada artikel. Nantikan konten menarik dari kami!
              </p>
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Jelajahi Produk
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
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
