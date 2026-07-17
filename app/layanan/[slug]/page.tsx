import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  Bell,
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
  QrCode,
  Quote,
  ShoppingCart,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ServiceJsonLd } from '@/components/layanan/service-json-ld'
import { Button } from '@/components/ui/button'
import { services, getService, getServiceSlugs } from '@/lib/services'
import { generateServiceMetadata } from '@/lib/seo/generate-service-metadata'
import { servicePricing } from '@/lib/pricing-data'
import { siteConfig } from '@/lib/data'

const icons: Record<string, typeof Building2> = {
  Building2,
  MousePointerClick,
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
  return getServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: 'Layanan tidak ditemukan | OOS SHOP' }
  return generateServiceMetadata(service)
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const Icon = icons[service.hero.icon] ?? Building2
  const waHref = `${siteConfig.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan layanan ${service.menuLabel}. Bisa konsultasi gratis?`)}`
  const packages = servicePricing[service.slug] || null

  // Build TOC from available sections
  const toc: { id: string; label: string }[] = []
  if (service.problemSection) toc.push({ id: 'masalah', label: 'Masalah yang Sering Dihadapi' })
  if (service.solutionSection) toc.push({ id: 'solusi', label: 'Solusi dari OOS SHOP' })
  if (service.whyItMatters) toc.push({ id: 'kenapa-penting', label: 'Kenapa Ini Penting' })
  if (service.servicesOverview) toc.push({ id: 'layanan-kami', label: 'Layanan Kami' })
  toc.push({ id: 'apa-itu', label: `Apa Itu ${service.menuLabel}` })
  if (service.whyChooseUs?.length) toc.push({ id: 'kenapa-kami', label: 'Kenapa Memilih Kami' })
  if (service.features?.length) toc.push({ id: 'fitur', label: 'Fitur' })
  toc.push({ id: 'keunggulan', label: 'Keunggulan' })
  toc.push({ id: 'cocok-untuk', label: 'Cocok Untuk' })
  toc.push({ id: 'proses', label: 'Proses Kerja' })
  if (packages) toc.push({ id: 'harga', label: 'Harga' })
  toc.push({ id: 'faq', label: 'FAQ' })

  return (
    <>
      <ServiceJsonLd service={service} />
      <SiteHeader />
      <main>
        {/* ═══ Hero Section ═══ */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/30">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">Beranda</Link>
                </li>
                <ChevronRight className="size-4" aria-hidden />
                <li>
                  <Link href="/#layanan" className="transition-colors hover:text-foreground">Layanan</Link>
                </li>
                <ChevronRight className="size-4" aria-hidden />
                <li className="font-medium text-foreground" aria-current="page">{service.menuLabel}</li>
              </ol>
            </nav>

            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                {service.hero.socialProof && (
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                    <Sparkles className="size-3" aria-hidden />
                    {service.hero.socialProof}
                  </p>
                )}

                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                  <Sparkles className="size-3.5" aria-hidden />
                  {service.hero.badge}
                </span>

                {service.hero.hook && (
                  <h2 className="mt-5 text-balance text-xl font-semibold tracking-tight text-foreground/80 md:text-2xl">
                    {service.hero.hook}
                  </h2>
                )}

                <h1 className={`text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${service.hero.hook ? 'mt-2' : 'mt-4'} bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent`}>
                  {service.hero.heading}
                </h1>

                <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
                  {service.hero.subheading}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="shadow-lg shadow-primary/20" nativeButton={false} render={<a href={waHref} target="_blank" rel="noopener noreferrer" />}>
                    <MessageCircle className="size-4" aria-hidden />
                    Konsultasi Gratis
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary/20" nativeButton={false} render={<Link href="/katalog" />}>
                    Lihat Katalog Plugin
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>
              </div>

              {/* Floating icon card */}
              <div className="relative flex shrink-0 items-center justify-center">
                <div className="absolute size-32 rounded-full bg-primary/20 blur-2xl md:size-40" />
                <span className="relative flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/30 md:size-24">
                  <Icon className="size-10 md:size-12" aria-hidden />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Trust Stats Bar (optional) ═══ */}
        {service.trustStats && service.trustStats.length > 0 && (
          <section className="border-b border-border bg-gradient-to-r from-primary/5 via-background to-primary/5">
            <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {service.trustStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center text-center">
                    <p className="bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ Problem Section (optional) ═══ */}
        {service.problemSection && (
          <section className="border-b border-border bg-muted/30" id="masalah">
            <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                  {service.problemSection.title}
                </h2>
                {service.problemSection.intro && (
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                    {service.problemSection.intro}
                  </p>
                )}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {service.problemSection.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ Solution Section (optional) ═══ */}
        {service.solutionSection && (
          <section className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/20" id="solusi">
            <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                  {service.solutionSection.title}
                </h2>
                {service.solutionSection.intro && (
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                    {service.solutionSection.intro}
                  </p>
                )}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {service.solutionSection.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col rounded-2xl border border-primary/20 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <h3 className="text-base font-semibold tracking-tight text-primary">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ Why It Matters (optional) ═══ */}
        {service.whyItMatters && (
          <section className="border-b border-border bg-muted/30" id="kenapa-penting">
            <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                  {service.whyItMatters.title}
                </h2>
                {service.whyItMatters.intro && (
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                    {service.whyItMatters.intro}
                  </p>
                )}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {service.whyItMatters.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ Services Overview (optional) ═══ */}
        {service.servicesOverview && (
          <section className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/20" id="layanan-kami">
            <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                  {service.servicesOverview.title}
                </h2>
                {service.servicesOverview.intro && (
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                    {service.servicesOverview.intro}
                  </p>
                )}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {service.servicesOverview.items.map((item, index) => (
                  <div
                    key={item.title}
                    className="group relative flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <span className="absolute -top-3 -left-2 flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-xs font-bold text-primary-foreground shadow-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-base font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ TOC (Table of Contents) ═══ */}
        <nav className="mx-auto max-w-3xl px-4 py-6 md:px-6" aria-label="Daftar isi">
          <details className="group rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm">
            <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
              <ChevronRight className="size-4 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
              Daftar Isi
            </summary>
            <ol className="mt-3 flex flex-col gap-1.5 pl-6">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        </nav>

        {/* ═══ AEO Section — "Apa Itu" ═══ */}
        <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16" id="apa-itu">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{service.whatIs.title}</h2>
            <div className="mt-3 space-y-3 text-pretty leading-relaxed text-muted-foreground">
              {service.whatIs.answer.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Biaya</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{service.whatIs.priceNote}</dd>
              </div>
              <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Waktu Pengerjaan</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{service.whatIs.timelineNote}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ═══ Kenapa Memilih Kami (optional) ═══ */}
        {service.whyChooseUs && service.whyChooseUs.length > 0 && (
          <section className="border-y border-border bg-muted/30" id="kenapa-kami">
            <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                  Kenapa Memilih OOS SHOP untuk {service.menuLabel}?
                </h2>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                  Pendekatan kami yang membedakan dari penyedia jasa lain.
                </p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {service.whyChooseUs.map((item) => (
                  <div key={item.title} className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Star className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-base font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ Fitur (optional) ═══ */}
        {service.features && service.features.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20" id="fitur">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                {service.featuresTitle ?? `Fitur ${service.menuLabel} yang Anda Dapatkan`}
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {service.featuresIntro ?? 'Semua yang Anda butuhkan untuk hasil profesional dan maksimal.'}
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {service.features.map((feature) => (
                <div key={feature} className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5">
                  <CheckCircle2 className="size-4 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110" aria-hidden />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ Showcase Highlight (optional) ═══ */}
        {service.showcase && (
          <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {service.showcase.badge}
                </span>
                <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight md:text-3xl">
                  {service.showcase.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {service.showcase.description}
                </p>
                <ul className="mt-6 flex flex-col gap-4">
                  {service.showcase.highlights.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <CheckCircle2 className="size-3.5" aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative flex size-40 items-center justify-center rounded-3xl border border-border bg-card shadow-sm sm:size-48">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent" />
                  <QrCode className="relative size-20 text-primary/70 sm:size-24" aria-hidden />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══ Notification Preview (optional) ═══ */}
        {service.notificationPreview && service.notificationPreview.length > 0 && (
          <section className="border-y border-border bg-gradient-to-br from-emerald-500/5 via-background to-emerald-500/5">
            <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <Bell className="size-3.5" aria-hidden />
                    Notifikasi Otomatis
                  </span>
                  <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight md:text-3xl">
                    Update Otomatis via WhatsApp
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Pelanggan dan tim Anda mendapat notifikasi WhatsApp otomatis di setiap tahap penting, tanpa perlu pantau manual.
                  </p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {service.notificationPreview.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/90">
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-500" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-4 shadow-md">
                    <div className="flex flex-col gap-2.5">
                      {service.notificationPreview.slice(0, 3).map((item) => (
                        <div
                          key={item}
                          className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-gradient-to-br from-emerald-600 to-emerald-700 px-3 py-2 text-white shadow-sm"
                        >
                          <p className="text-xs leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-center text-xs text-muted-foreground">Contoh notifikasi WhatsApp otomatis</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══ Keunggulan / Benefits ═══ */}
        <section className="border-y border-border bg-muted/30" id="keunggulan">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Keunggulan {service.menuLabel} dari OOS SHOP
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Dibangun dengan standar profesional agar hasil tidak hanya tampil bagus, tetapi juga bekerja untuk pertumbuhan bisnis Anda.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map((benefit) => (
                <div key={benefit.title} className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-transform duration-300 group-hover:scale-110">
                    <CheckCircle2 className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Cocok Untuk + Proses Kerja ═══ */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20" id="cocok-untuk">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Use Cases */}
            <div>
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Siapa yang Cocok Menggunakan Layanan Ini?
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Beberapa contoh kebutuhan {service.menuLabel.toLowerCase()} yang paling sering kami kerjakan.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {service.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-primary/20">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <span className="text-sm leading-relaxed text-foreground/90">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process — Timeline Style */}
            <div id="proses">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Cara Kerja Jasa {service.menuLabel}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Proses yang jelas dan transparan dari konsultasi hingga selesai.
              </p>
              <ol className="mt-6 flex flex-col">
                {service.process.map((item, index) => (
                  <li key={item.step} className="relative flex gap-5 pb-8 last:pb-0">
                    {/* Timeline line */}
                    {index < service.process.length - 1 && (
                      <div className="absolute left-[17px] top-9 h-full w-px bg-gradient-to-b from-primary/30 to-transparent" />
                    )}
                    {/* Step number */}
                    <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20">
                      {item.step}
                    </span>
                    <div className="pt-0.5">
                      <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ═══ Social Proof ═══ */}
        <section className="border-y border-border bg-gradient-to-r from-primary/5 via-background to-primary/5">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Dipercaya 1.200+ Pemilik Website di Indonesia
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Kami telah membantu ribuan bisnis, UMKM, dan instansi memiliki website profesional yang menghasilkan.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: '1.200+', label: 'Website Dikerjakan' },
                { value: '4.9/5', label: 'Rating Kepuasan' },
                { value: '30 Hari', label: 'Garansi Support' },
                { value: '5–14 Hari', label: 'Waktu Pengerjaan' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/60 bg-card p-5 text-center transition-all hover:border-primary/20 hover:shadow-sm">
                  <p className="bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-3xl font-bold text-transparent">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Promo Pricing Highlight (optional) ═══ */}
        {service.promoPricing && (
          <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border-2 border-primary bg-card shadow-xl shadow-primary/10">
              <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-3 text-center">
                <p className="text-sm font-bold text-primary-foreground">{service.promoPricing.badge}</p>
              </div>
              <div className="p-8">
                <p className="text-sm text-muted-foreground line-through">{service.promoPricing.originalPrice}</p>
                <p className="mt-1 text-4xl font-bold sm:text-5xl">{service.promoPricing.price}</p>
                <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {service.promoPricing.savingsLabel}
                </p>

                <ul className="mt-7 flex flex-col gap-3">
                  {service.promoPricing.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className="mt-8 w-full shadow-lg shadow-primary/20"
                  nativeButton={false}
                  render={
                    <a
                      href={`${siteConfig.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${service.promoPricing.badge} untuk ${service.menuLabel}. Bisa info lebih lanjut?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <MessageCircle className="size-4" aria-hidden />
                  {service.promoPricing.ctaLabel}
                </Button>
                {service.promoPricing.note && (
                  <p className="mt-3 text-center text-xs text-muted-foreground">{service.promoPricing.note}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ═══ Testimonials (optional) ═══ */}
        {service.testimonials && service.testimonials.length > 0 && (
          <section className="border-y border-border bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                  Kata Mereka yang Sudah Pakai
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Testimoni dari pelanggan yang menggunakan layanan {service.menuLabel.toLowerCase()}.
                </p>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {service.testimonials.map((t) => (
                  <div key={t.name} className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/20 hover:shadow-sm">
                    <Quote className="size-5 text-primary/40" aria-hidden />
                    <p className="mt-3 text-sm italic leading-relaxed text-foreground/90">&ldquo;{t.text}&rdquo;</p>
                    <div className="mt-4">
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ Pricing (optional) ═══ */}
        {packages && (
          <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20" id="harga">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Pilihan Paket {service.menuLabel}
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Harga transparan, tanpa biaya tersembunyi. Semua paket sudah termasuk domain, hosting, SSL, dan maintenance.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {packages.map((pkg) => (
                <div key={pkg.name} className={`relative flex flex-col rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md ${pkg.popular ? 'border-primary bg-card shadow-primary/10' : 'border-border/60 bg-card'}`}>
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-primary/90 px-4 py-1 text-xs font-bold text-primary-foreground shadow-sm">
                      PALING POPULER
                    </span>
                  )}
                  <h3 className="text-lg font-bold">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{pkg.description}</p>
                  <p className="mt-4 bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-3xl font-bold text-transparent">{pkg.price}</p>
                  {pkg.renewal && <p className="mt-1 text-xs text-muted-foreground">{pkg.renewal}</p>}
                  <ul className="mt-5 flex flex-1 flex-col gap-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        <span className="text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" className={`mt-6 w-full ${pkg.popular ? 'shadow-lg shadow-primary/20' : ''}`} variant={pkg.popular ? 'default' : 'outline'} nativeButton={false} render={<a href={`${siteConfig.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${pkg.name} untuk ${service.menuLabel}. Bisa info lebih lanjut?`)}`} target="_blank" rel="noopener noreferrer" />}>
                    <MessageCircle className="size-4" aria-hidden />
                    Pilih {pkg.name}
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ FAQ ═══ */}
        <section className="border-b border-border bg-muted/30" id="faq">
          <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
            <div className="text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Pertanyaan Seputar {service.menuLabel}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Jawaban lengkap untuk pertanyaan yang sering diajukan tentang layanan {service.menuLabel.toLowerCase()} di OOS SHOP.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {service.faq.map((item) => (
                <details key={item.question} className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all [&_summary::-webkit-details-marker]:hidden [&[open]]:border-primary/20 [&[open]]:shadow-md">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium text-foreground">
                    <span className="text-sm md:text-base">{item.question}</span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90" aria-hidden />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Related Services (optional) ═══ */}
        {service.relatedServices && service.relatedServices.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
            <h2 className="text-center text-xl font-bold tracking-tight md:text-2xl">Layanan Terkait</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.relatedServices.map((relSlug) => {
                const rel = services[relSlug]
                if (!rel) return null
                return (
                  <Link key={relSlug} href={`/layanan/${relSlug}`} className="group rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
                    <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">{rel.menuLabel}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{rel.menuDescription}</p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* ═══ Final CTA ═══ */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 text-center md:p-12">
            <div className="pointer-events-none absolute -top-20 -right-20 size-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              {service.finalCta ? (
                <>
                  <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                    {service.finalCta.title}
                  </h2>
                  <div className="mx-auto mt-5 max-w-2xl space-y-1 text-pretty leading-relaxed text-muted-foreground">
                    {service.finalCta.lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  <p className="mt-5 text-base font-medium text-foreground">
                    {service.finalCta.question}
                  </p>
                  <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                    {service.finalCta.closing}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                    Siap Membangun {service.menuLabel} Anda?
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                    Konsultasikan kebutuhan Anda secara gratis. Kami bantu rancang solusi terbaik sesuai tujuan dan anggaran bisnis Anda. Tanpa commitment, tanpa biaya konsultasi.
                  </p>
                </>
              )}
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg" className="shadow-lg shadow-primary/20" nativeButton={false} render={<a href={waHref} target="_blank" rel="noopener noreferrer" />}>
                  <MessageCircle className="size-4" aria-hidden />
                  Konsultasi Gratis
                </Button>
                <Button size="lg" variant="outline" className="border-primary/20" nativeButton={false} render={<Link href="/#layanan" />}>
                  Lihat Layanan Lain
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Last Updated ═══ */}
        <div className="mx-auto max-w-6xl px-4 pb-8 text-right md:px-6">
          <time dateTime={service.updatedAt} className="text-xs text-muted-foreground">
            Terakhir diperbarui: {new Date(service.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
