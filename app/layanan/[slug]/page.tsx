import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  MousePointerClick,
  ShoppingCart,
  Sparkles,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ServiceJsonLd } from '@/components/layanan/service-json-ld'
import { Button } from '@/components/ui/button'
import { getWebsiteService, websiteServices, siteConfig } from '@/lib/data'

const icons: Record<string, typeof Building2> = {
  Building2,
  MousePointerClick,
  ShoppingCart,
}

export function generateStaticParams() {
  return websiteServices.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getWebsiteService(slug)
  if (!service) {
    return { title: 'Layanan tidak ditemukan | OOS SHOP' }
  }
  const url = `${siteConfig.url}/layanan/${service.slug}`
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      type: 'website',
      locale: 'id_ID',
      siteName: siteConfig.name,
      url,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getWebsiteService(slug)
  if (!service) notFound()

  const Icon = icons[service.icon] ?? Building2
  const waHref = `${siteConfig.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${service.menuLabel}`)}`

  return (
    <>
      <ServiceJsonLd service={service} />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border bg-accent/30">
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">
                    Beranda
                  </Link>
                </li>
                <ChevronRight className="size-4" aria-hidden />
                <li>
                  <Link href="/#layanan" className="transition-colors hover:text-foreground">
                    Layanan
                  </Link>
                </li>
                <ChevronRight className="size-4" aria-hidden />
                <li className="font-medium text-foreground" aria-current="page">
                  {service.menuLabel}
                </li>
              </ol>
            </nav>

            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary">
                  <Sparkles className="size-3.5" aria-hidden />
                  {service.heroBadge}
                </span>
                <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {service.heroHeading}
                </h1>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground md:text-lg">
                  {service.heroSubheading}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={
                      <a href={waHref} target="_blank" rel="noopener noreferrer" />
                    }
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    Konsultasi Gratis
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    nativeButton={false}
                    render={<Link href="/katalog" />}
                  >
                    Lihat Katalog Plugin
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>
              </div>

              <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm md:size-20">
                <Icon className="size-8 md:size-10" aria-hidden />
              </span>
            </div>
          </div>
        </section>

        {/* AEO: Jawaban ringkas */}
        <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Apa itu {service.menuLabel}?
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {service.shortAnswer}
            </p>
            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-accent/50 p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Biaya
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{service.priceNote}</dd>
              </div>
              <div className="rounded-xl bg-accent/50 p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Pengerjaan
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {service.timelineNote}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Kenapa Memilih Layanan Kami
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Dibangun dengan standar profesional agar website Anda tidak hanya tampil bagus,
                tetapi juga bekerja untuk pertumbuhan bisnis.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                    <CheckCircle2 className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GEO: Use cases + Process */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Cocok Untuk Kebutuhan Ini
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Beberapa contoh penggunaan {service.menuLabel.toLowerCase()} yang paling sering kami
                kerjakan untuk klien di seluruh Indonesia.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {service.useCases.map((useCase) => (
                  <li
                    key={useCase}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <span className="text-sm leading-relaxed text-foreground/90">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Cara Kerja Kami
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Proses yang jelas dan transparan dari konsultasi hingga website Anda online.
              </p>
              <ol className="mt-6 flex flex-col gap-4">
                {service.process.map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
            <div className="text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Seputar {service.menuLabel.toLowerCase()} di OOS SHOP.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {service.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium text-foreground">
                    {faq.question}
                    <ChevronRight
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="rounded-3xl border border-primary/30 bg-accent/40 p-8 text-center md:p-12">
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
              Siap Membangun {service.menuLabel} Anda?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Konsultasikan kebutuhan Anda secara gratis. Kami bantu rancang solusi terbaik sesuai
              tujuan dan anggaran bisnis Anda.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                nativeButton={false}
                render={<a href={waHref} target="_blank" rel="noopener noreferrer" />}
              >
                <MessageCircle className="size-4" aria-hidden />
                Konsultasi via WhatsApp
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/#layanan" />}
              >
                Lihat Layanan Lain
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
