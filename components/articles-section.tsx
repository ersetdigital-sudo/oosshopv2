import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Article } from '@/lib/blog'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function ArticlesSection({ articles = [] }: { articles?: Article[] }) {
  if (articles.length === 0) return null

  return (
    <section id="artikel" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Panduan &amp; Edukasi WordPress
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Artikel edukasi untuk membantu Anda mengelola website WordPress dengan lebih baik.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg"
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-primary/70" aria-hidden />
            {article.thumbnail && (
              <div className="relative mb-4 -mt-2 -mx-2 h-36 overflow-hidden rounded-xl bg-accent/30">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}
            <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
              {formatDate(article.published_at || article.created_at)}
            </span>
            <h3 className="mt-4 text-balance text-lg font-semibold leading-snug tracking-tight line-clamp-2">
              {article.title}
            </h3>
            {article.meta_description && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {article.meta_description}
              </p>
            )}
            <div className="mt-4 flex-1" />
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">
              Baca selengkapnya
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
        >
          Lihat Semua Artikel
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  )
}
