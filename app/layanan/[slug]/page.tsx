import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Hotel,
  House,
  LayoutDashboard,
  MessageCircle,
  MousePointerClick,
  Package,
  Plane,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Users,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ServiceJsonLd } from '@/components/layanan/service-json-ld'
import { Button } from '@/components/ui/button'
import { getWebsiteService, websiteServices, siteConfig } from '@/lib/data'

const icons: Record<string, typeof Building2> = {
  Building2,
  MousePointerClick,
  ShoppingBag,
  ShoppingCart,
  GraduationCap,
  Plane,
  HeartPulse,
  CalendarDays,
  Hotel,
  House,
  LayoutDashboard,
  Package,
  Users,
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
  const waHref = `${siteConfig.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan layanan ${service.menuLabel}. Bisa konsultasi gratis?`)}`

  return (
    <>
      <ServiceJsonLd service={service} />
      <SiteHeader />
      <main>
        {/* ═══ Hero Section ═══ */}
        <section className="border-b border-border bg-accent/30">
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
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

                {/* H1 — Primary keyword in heading */}
                <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {service.heroHeading}
                </h1>

                {/* Supporting paragraph with secondary keywords */}
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground md:text-lg">
                  {service.heroSubheading}
                </p>

                {/* CTA buttons */}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={
                      <a href={waHref} target="_blank" rel="noopener noreferrer" />
                    }
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    Konsultasi Gratis via WhatsApp
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

                {/* Trust signals */}
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-primary" aria-hidden />
                    1.200+ website dibuat
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-primary" aria-hidden />
                    Garansi 30 hari
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-primary" aria-hidden />
                    Revisi hingga puas
                  </span>
                </div>
              </div>

              <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm md:size-20">
                <Icon className="size-8 md:size-10" aria-hidden />
              </span>
            </div>
          </div>
        </section>

        {/* ═══ AEO Section — Direct answer for AI Overview ═══ */}
        <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16" id="apa-itu">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Apa Itu {service.menuLabel}?
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
                  Waktu Pengerjaan
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {service.timelineNote}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ═══ Benefits / Keunggulan ═══ */}
        <section className="border-y border-border bg-muted/30" id="keunggulan">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Keunggulan {service.menuLabel} dari OOS SHOP
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Dibangun dengan standar profesional agar website Anda tidak hanya tampil bagus,
                tetapi juga bekerja untuk pertumbuhan bisnis dan ranking Google.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* ═══ Use Cases + Process (GEO content) ═══ */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20" id="proses">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Use Cases */}
            <div>
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Siapa yang Cocok Menggunakan Layanan Ini?
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Beberapa contoh kebutuhan {service.menuLabel.toLowerCase()} yang paling sering kami
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

            {/* Process / Cara Kerja */}
            <div>
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Cara Kerja Jasa Pembuatan {service.menuLabel}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Proses yang jelas dan transparan dari konsultasi hingga website Anda online dan siap
                menghasilkan.
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

        {/* ═══ Social Proof / Trust Section ═══ */}
        <section className="border-y border-border bg-accent/20">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Dipercaya 1.200+ Pemilik Website di Indonesia
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Kami telah membantu ribuan bisnis, UMKM, dan instansi memiliki website company
                profile yang profesional dan menghasilkan.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-card p-5 text-center">
                <p className="text-3xl font-bold text-primary">1.200+</p>
                <p className="mt-1 text-sm text-muted-foreground">Website Dikerjakan</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 text-center">
                <p className="text-3xl font-bold text-primary">4.9/5</p>
                <p className="mt-1 text-sm text-muted-foreground">Rating Kepuasan</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 text-center">
                <p className="text-3xl font-bold text-primary">30 Hari</p>
                <p className="mt-1 text-sm text-muted-foreground">Garansi Support</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 text-center">
                <p className="text-3xl font-bold text-primary">5–14 Hari</p>
                <p className="mt-1 text-sm text-muted-foreground">Waktu Pengerjaan</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FAQ Section — keyword-rich for featured snippets ═══ */}
        <section className="border-b border-border bg-muted/30" id="faq">
          <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
            <div className="text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Pertanyaan Seputar Jasa Pembuatan {service.menuLabel}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Jawaban lengkap untuk pertanyaan yang sering diajukan tentang layanan jasa pembuatan{' '}
                {service.menuLabel.toLowerCase()} di OOS SHOP.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {service.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium text-foreground">
                    <span className="text-sm md:text-base">{faq.question}</span>
                    <ChevronRight
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Final CTA ═══ */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="rounded-3xl border border-primary/30 bg-accent/40 p-8 text-center md:p-12">
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
              Siap Membangun {service.menuLabel} Anda?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Konsultasikan kebutuhan Anda secara gratis. Kami bantu rancang solusi terbaik sesuai
              tujuan dan anggaran bisnis Anda. Tanpa commitment, tanpa biaya konsultasi.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                nativeButton={false}
                render={<a href={waHref} target="_blank" rel="noopener noreferrer" />}
              >
                <MessageCircle className="size-4" aria-hidden />
                Konsultasi Gratis via WhatsApp
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
