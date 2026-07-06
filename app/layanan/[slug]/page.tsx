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
  ShoppingCart,
  Sparkles,
  Users,
  Star,
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
  const toc: { id: string; label: string }[] = [
    { id: 'apa-itu', label: `Apa Itu ${service.menuLabel}` },
  ]
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
        <section className="border-b border-border bg-accent/30">
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
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

            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary">
                  <Sparkles className="size-3.5" aria-hidden />
                  {service.hero.badge}
                </span>

                <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {service.hero.heading}
                </h1>

                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground md:text-lg">
                  {service.hero.subheading}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" nativeButton={false} render={<a href={waHref} target="_blank" rel="noopener noreferrer" />}>
                    <MessageCircle className="size-4" aria-hidden />
                    Konsultasi Gratis via WhatsApp
                  </Button>
                  <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/katalog" />}>
                    Lihat Katalog Plugin
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>

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

        {/* ═══ TOC (Table of Contents) ═══ */}
        <nav className="mx-auto max-w-3xl px-4 py-6 md:px-6" aria-label="Daftar isi">
          <details className="group rounded-xl border border-border bg-card p-4">
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
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{service.whatIs.title}</h2>
            <div className="mt-3 space-y-3 text-pretty leading-relaxed text-muted-foreground">
              {service.whatIs.answer.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-accent/50 p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Biaya</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{service.whatIs.priceNote}</dd>
              </div>
              <div className="rounded-xl bg-accent/50 p-4">
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
                  <div key={item.title} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
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
                Fitur {service.menuLabel} yang Anda Dapatkan
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Semua yang Anda butuhkan untuk hasil profesional dan maksimal.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                  <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ Keunggulan / Benefits ═══ */}
        <section className={`border-y border-border ${service.features?.length ? 'bg-muted/30' : 'bg-muted/30'}`} id="keunggulan">
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
                <div key={benefit.title} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
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
                  <li key={useCase} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <span className="text-sm leading-relaxed text-foreground/90">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div id="proses">
              <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Cara Kerja Jasa {service.menuLabel}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Proses yang jelas dan transparan dari konsultasi hingga selesai.
              </p>
              <ol className="mt-6 flex flex-col gap-4">
                {service.process.map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {item.step}
                    </span>
                    <div>
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
        <section className="border-y border-border bg-accent/20">
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
                <div key={pkg.name} className={`relative flex flex-col rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md ${pkg.popular ? 'border-primary bg-card shadow-primary/10' : 'border-border bg-card'}`}>
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                      PALING POPULER
                    </span>
                  )}
                  <h3 className="text-lg font-bold">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{pkg.description}</p>
                  <p className="mt-4 text-3xl font-bold text-primary">{pkg.price}</p>
                  {pkg.renewal && <p className="mt-1 text-xs text-muted-foreground">{pkg.renewal}</p>}
                  <ul className="mt-5 flex flex-1 flex-col gap-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        <span className="text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" className="mt-6 w-full" variant={pkg.popular ? 'default' : 'outline'} nativeButton={false} render={<a href={`${siteConfig.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${pkg.name} untuk ${service.menuLabel}. Bisa info lebih lanjut?`)}`} target="_blank" rel="noopener noreferrer" />}>
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
                <details key={item.question} className="group rounded-2xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium text-foreground">
                    <span className="text-sm md:text-base">{item.question}</span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
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
                  <Link key={relSlug} href={`/layanan/${relSlug}`} className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">{rel.menuLabel}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{rel.menuDescription}</p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* ═══ Final CTA ═══ */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="rounded-3xl border border-primary/30 bg-accent/40 p-8 text-center md:p-12">
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
              Siap Membangun {service.menuLabel} Anda?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Konsultasikan kebutuhan Anda secara gratis. Kami bantu rancang solusi terbaik sesuai tujuan dan anggaran bisnis Anda. Tanpa commitment, tanpa biaya konsultasi.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" nativeButton={false} render={<a href={waHref} target="_blank" rel="noopener noreferrer" />}>
                <MessageCircle className="size-4" aria-hidden />
                Konsultasi Gratis via WhatsApp
              </Button>
              <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/#layanan" />}>
                Lihat Layanan Lain
              </Button>
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
