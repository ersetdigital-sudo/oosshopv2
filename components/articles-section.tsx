import { ArrowRight } from 'lucide-react'

const articles = [
  {
    title: 'Plugin Nulled vs Original: Risiko yang Jarang Dibahas',
    excerpt:
      'Mengapa plugin nulled bisa membuat website Anda diretas, di-blacklist Google, dan kehilangan data pelanggan — beserta cara mengeceknya.',
    category: 'Keamanan',
    href: '#',
  },
  {
    title: 'Cara Mempercepat WordPress: Panduan WP Rocket untuk Pemula',
    excerpt:
      'Konfigurasi WP Rocket yang benar bisa memangkas waktu loading hingga separuhnya. Panduan langkah demi langkah tanpa istilah teknis rumit.',
    category: 'Performa',
    href: '#',
  },
  {
    title: 'Elementor Pro vs Gratis: Fitur Mana yang Benar-Benar Anda Butuhkan?',
    excerpt:
      'Theme Builder, Popup Builder, dan widget WooCommerce — kapan versi gratis cukup, dan kapan saatnya upgrade ke Pro.',
    category: 'Page Builder',
    href: '#',
  },
]

export function ArticlesSection() {
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
          <article
            key={article.title}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg"
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-primary/70" aria-hidden />
            <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
              {article.category}
            </span>
            <h3 className="mt-4 text-balance text-lg font-semibold leading-snug tracking-tight">
              {article.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
            <div className="mt-4 flex-1" />
            <a
              href={article.href}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Baca selengkapnya
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
