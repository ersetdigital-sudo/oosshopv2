import Link from 'next/link'
import {
  ArrowRight,
  Check,
  Database,
  Gauge,
  LayoutTemplate,
  Mail,
  Search,
  ShoppingBag,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { serviceClusters, siteConfig } from '@/lib/data'

const clusterIcons: Record<string, typeof LayoutTemplate> = {
  'page-builder': LayoutTemplate,
  'dynamic-website': Database,
  performa: Gauge,
  seo: Search,
  marketing: Mail,
}

const featuredSlug = 'jasa-instal-elementor-pro'

export function ServicesSection() {
  return (
    <section id="layanan" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Jasa Instal Plugin WordPress Premium
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Sedang mencari <strong className="font-semibold text-foreground">jasa instal plugin WordPress</strong>{' '}
          yang aman dan terpercaya? OOS SHOP melayani instalasi berbagai plugin WordPress premium
          untuk website bisnis, toko online, landing page, company profile, hingga website custom.
          Mulai dari plugin page builder, SEO, cache, dynamic content, hingga marketing automation,
          semuanya dipasang secara profesional sesuai kebutuhan website Anda.
        </p>
      </div>

      <div className="mt-14 flex flex-col gap-16">
        {serviceClusters.map((cluster) => {
          const ClusterIcon = clusterIcons[cluster.id] ?? LayoutTemplate
          return (
            <div key={cluster.id} id={cluster.id} className="scroll-mt-20">
              <div className="mb-7 flex items-start gap-3 md:gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary md:size-14 md:rounded-2xl">
                  <ClusterIcon className="size-6 md:size-7" aria-hidden />
                </span>
                <div className="max-w-2xl">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {cluster.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {cluster.intro}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
                {cluster.services.map((service) => {
                  const isFeatured = service.slug === featuredSlug
                  return (
                    <article
                      key={service.slug}
                      className={`group relative flex flex-col rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:p-6 ${
                        isFeatured
                          ? 'border-primary/40 bg-accent/40 pt-7 md:pt-6'
                          : 'border-border bg-card hover:border-primary/25'
                      }`}
                    >
                      {isFeatured && (
                        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          <Star className="size-3 fill-current" aria-hidden />
                          Terpopuler
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-lg font-semibold tracking-tight">{service.name}</h4>
                        <span className="shrink-0 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          {service.plugin}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                      <ul className="mt-4 flex flex-col gap-2">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                            <span className="text-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex-1" />
                      <Button
                        variant={isFeatured ? 'default' : 'outline'}
                        size="sm"
                        className={isFeatured ? 'w-fit' : 'w-fit bg-transparent'}
                        nativeButton={false}
                        render={
                          <a
                            href={`${siteConfig.whatsapp}?text=${encodeURIComponent(`Halo, saya ingin memesan ${service.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                      >
                        Pesan {service.plugin}
                        <ArrowRight
                          className="ml-1 size-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Button>
                    </article>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl border border-border bg-accent/30 px-6 py-10 text-center">
        <h3 className="text-balance text-xl font-semibold tracking-tight md:text-2xl">
          Lihat semua plugin premium yang tersedia
        </h3>
        <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
          Jelajahi katalog lengkap kami dengan harga transparan, filter kategori, dan pencarian
          cepat untuk menemukan plugin yang Anda butuhkan.
        </p>
        <Button size="lg" className="mt-2 px-8" nativeButton={false} render={<Link href="/katalog" />}>
          <ShoppingBag className="size-5" aria-hidden />
          Lihat Semua Katalog
        </Button>
      </div>
    </section>
  )
}
