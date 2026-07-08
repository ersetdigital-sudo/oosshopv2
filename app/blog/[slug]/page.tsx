import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getArticleBySlug, getRelatedArticles } from '@/lib/blog'
import { siteConfig } from '@/lib/data'

export const revalidate = 300

// Extract FAQ from HTML content (looks for FAQ heading + list structure)
function extractFAQ(content: string): { question: string; answer: string }[] {
  if (!content) return []
  const faqs: { question: string; answer: string }[] = []
  const faqSectionRegex =
    /<h[23][^>]*>.*?(FAQ|Pertanyaan|Tanya Jawab|Frequently Asked).*?<\/h[23]>([\s\S]*?)(?=<h[23]|$)/i
  const match = content.match(faqSectionRegex)
  if (!match) return []

  const faqContent = match[2]

  const pattern1 = /<p[^>]*>\s*<(?:strong|b)>(.*?)<\/(?:strong|b)>\s*<\/p>\s*<p[^>]*>(.*?)<\/p>/gi
  let m: RegExpExecArray | null
  while ((m = pattern1.exec(faqContent)) !== null) {
    const q = m[1].replace(/<[^>]*>/g, '').trim()
    const a = m[2].replace(/<[^>]*>/g, '').trim()
    if (q && a && (q.includes('?') || q.length > 10)) faqs.push({ question: q, answer: a })
  }

  if (faqs.length === 0) {
    const pattern3 = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gi
    while ((m = pattern3.exec(faqContent)) !== null) {
      const q = m[1].replace(/<[^>]*>/g, '').trim()
      const a = m[2].replace(/<[^>]*>/g, '').trim()
      if (q && a) faqs.push({ question: q, answer: a })
    }
  }

  return faqs
}

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
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Artikel Tidak Ditemukan | OOS SHOP' }

  const title = article.meta_title || article.title
  const description = article.meta_description || `Baca artikel ${article.title} di OOS SHOP Blog.`

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/blog/${article.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/blog/${article.slug}`,
      type: 'article',
      images: article.thumbnail ? [{ url: article.thumbnail, width: 1200, height: 630 }] : [],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const relatedArticles = await getRelatedArticles(article.id)
  const faqs = extractFAQ(article.content)

  const publishedAt = article.published_at || article.created_at
  const modifiedAt = article.updated_at || publishedAt
  const postUrl = `${siteConfig.url}/blog/${article.slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#blogpost`,
        url: postUrl,
        headline: article.title,
        description: article.meta_description || `Baca ${article.title} di OOS SHOP Blog.`,
        image: article.thumbnail ? [article.thumbnail] : undefined,
        author: {
          '@type': 'Person',
          '@id': `${siteConfig.url}/#founder`,
          name: 'Andri',
          url: `${siteConfig.url}/tentang-kami`,
        },
        publisher: { '@id': `${siteConfig.url}/#organization` },
        datePublished: publishedAt,
        dateModified: modifiedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${postUrl}#webpage`,
          url: postUrl,
          isPartOf: { '@id': `${siteConfig.url}/#website` },
        },
        inLanguage: 'id-ID',
        isPartOf: { '@id': `${siteConfig.url}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${postUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
          { '@type': 'ListItem', position: 3, name: article.title, item: postUrl },
        ],
      },
    ],
  }

  const faqJsonLd =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null

  const articleJsonLdScript = JSON.stringify(articleJsonLd)
  const faqJsonLdScript = faqJsonLd ? JSON.stringify(faqJsonLd) : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLdScript }} />
      {faqJsonLdScript && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLdScript }} />
      )}
      <SiteHeader />
      <main className="pb-16">
        <article className="mx-auto max-w-3xl px-4 py-8 md:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
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
              <li className="line-clamp-1 font-medium text-foreground" aria-current="page">
                {article.title}
              </li>
            </ol>
          </nav>

          {/* Article header */}
          <header className="mt-6 mb-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
              {article.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={article.published_at || article.created_at}>
                {formatDate(article.published_at || article.created_at)}
              </time>
              <span className="size-1 rounded-full bg-muted-foreground" />
              <span>Andri</span>
            </div>
          </header>

          {/* Thumbnail */}
          {article.thumbnail && (
            <div className="relative mb-8 h-48 w-full overflow-hidden rounded-2xl bg-accent/30 sm:h-64 md:h-80">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {/* Article content */}
          <div
            className="prose prose-sm max-w-none dark:prose-invert sm:prose-base
              prose-headings:font-semibold
              prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-xl sm:prose-h2:text-2xl
              prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-lg
              prose-p:my-4 prose-p:leading-relaxed prose-p:text-muted-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-li:text-muted-foreground
              prose-img:rounded-xl prose-img:border prose-img:border-border
              prose-blockquote:border-primary prose-blockquote:text-muted-foreground
              prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary
              prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-card
 prose-table:w-full prose-table:border-collapse prose-table:my-6 prose-table:overflow-hidden prose-table:rounded-lg
 prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-4 prose-th:py-2.5 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
 prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2.5 prose-td:text-muted-foreground"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-primary/20 bg-card p-6 text-center">
            <h3 className="text-lg font-bold">Butuh Plugin WordPress atau Jasa Website?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              OOS SHOP menyediakan 500+ plugin premium berlisensi resmi dan jasa pembuatan website
              profesional.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/katalog"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Jelajahi Plugin
              </Link>
              <Link
                href="/layanan"
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold hover:bg-muted"
              >
                Lihat Layanan
              </Link>
            </div>
          </div>

          {/* Author bio — E-E-A-T signal for Google & AI crawlers */}
          <div className="mt-12 flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              A
            </div>
            <div>
              <p className="font-semibold text-foreground">Andri</p>
              <p className="text-sm text-muted-foreground">Founder &amp; Penulis di OOS SHOP</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Berpengalaman di bidang web development dan ekosistem WordPress sejak 2022.
                Membantu UMKM dan bisnis di Indonesia memiliki aset digital profesional melalui
                plugin premium berlisensi resmi dan layanan pembuatan website.
              </p>
              <Link
                href="/tentang-kami"
                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
              >
                Selengkapnya tentang kami &rarr;
              </Link>
            </div>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <h3 className="mb-5 text-lg font-bold">Artikel Lainnya</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30"
                  >
                    {related.thumbnail && (
                      <div className="relative h-28 overflow-hidden bg-accent/30">
                        <Image
                          src={related.thumbnail}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="200px"
                        />
                      </div>
                    )}
                    <div className="p-3">
                      <h4 className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-primary">
                        {related.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
