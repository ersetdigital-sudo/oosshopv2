import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Package,
  QrCode,
  Quote,
  Star,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ServiceJsonLd } from '@/components/layanan/service-json-ld'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/services'
import { inventory } from '@/lib/services/inventory.service'
import { siteConfig } from '@/lib/data'

const service = inventory
const waHref = `${siteConfig.whatsapp}?text=${encodeURIComponent('Halo, saya tertarik dengan layanan Sistem Inventory. Bisa konsultasi gratis?')}`

export const metadata: Metadata = {
  title: service.seo.title,
  description: service.seo.description,
  keywords: service.seo.keywords,
  alternates: { canonical: `${siteConfig.url}/layanan/${service.slug}` },
  openGraph: {
    title: service.seo.title,
    description: service.seo.description,
    type: 'website',
    locale: 'id_ID',
    siteName: 'OOS SHOP',
    url: `${siteConfig.url}/layanan/${service.slug}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: service.seo.title,
    description: service.seo.description,
  },
}

const toc = [
  { id: 'apa-itu', label: 'Apa Itu Sistem Inventory' },
  { id: 'kenapa-kami', label: 'Kenapa Memilih Kami' },
  { id: 'fitur', label: 'Fitur' },
  { id: 'keunggulan', label: 'Keunggulan' },
  { id: 'cocok-untuk', label: 'Cocok Untuk' },
  { id: 'proses', label: 'Proses Kerja' },
  { id: 'faq', label: 'FAQ' },
]

export default function InventoryPage() {
  return (
    <>
      <ServiceJsonLd service={service} />
      <SiteHeader />
      <main>
        {/* ═══ Hero ═══ */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <li><Link href="/" className="transition-colors hover:text-foreground">Beranda</Link></li>
                <ChevronRight className="size-4" aria-hidden />
                <li><Link href="/#layanan" className="transition-colors hover:text-foreground">Layanan</Link></li>
                <ChevronRight className="size-4" aria-hidden />
                <li className="font-medium text-foreground" aria-current="page">{service.menuLabel}</li>
              </ol>
            </nav>

            <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <span className="eyebrow">◇ {service.hero.badge}</span>

                <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.5rem]">
                  Jasa Pembuatan Sistem Inventory &amp; Manajemen <em className="font-serif italic">Stok</em>
                </h1>

                <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  {service.hero.subheading}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" nativeButton={false} render={<a href={waHref} target="_blank" rel="noopener noreferrer" />}>
                    <MessageCircle className="size-4" aria-hidden />
                    Konsultasi Gratis
                  </Button>
                  <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/katalog" />}>
                    Lihat Katalog Plugin
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span>no commitment</span>
                  <span className="text-border">·</span>
                  <span>konsultasi gratis</span>
                  <span className="text-border">·</span>
                  <span>respon &lt; 1 jam</span>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-center">
                <div className="flex size-20 items-center justify-center rounded-2xl border border-border bg-card shadow-sm md:size-24">
                  <Package className="size-10 text-foreground/80 md:size-12" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TOC ═══ */}
        <nav className="mx-auto max-w-3xl px-4 py-6 md:px-6" aria-label="Daftar isi">
          <details className="group rounded-xl border border-border bg-card p-4">
            <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
              <ChevronRight className="size-4 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
              Daftar Isi
            </summary>
            <ol className="mt-3 flex flex-col gap-1.5 pl-6">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        </nav>

        {/* ═══ Apa Itu ═══ */}
        <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16" id="apa-itu">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <span className="eyebrow">◇ penjelasan</span>
            <h2 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">{service.whatIs.title}</h2>
            <div className="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              {service.whatIs.answer.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Biaya</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{service.whatIs.priceNote}</dd>
              </div>
              <div className="rounded-xl border border-border p-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Waktu Pengerjaan</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{service.whatIs.timelineNote}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ═══ Kenapa Memilih Kami ═══ */}
        <section className="border-y border-border bg-muted/30" id="kenapa-kami">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <div className="section-head">
              <div>
                <span className="eyebrow">◇ keunggulan</span>
                <h2 className="section-title">Kenapa Memilih OOS SHOP untuk <em className="font-serif italic">Sistem Inventory</em>?</h2>
              </div>
              <p className="section-desc">Pendekatan kami yang membedakan dari penyedia jasa lain.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.whyChooseUs.map((item) => (
                <div key={item.title} className="card">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground/70">
                    <Star className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Fitur ═══ */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" id="fitur">
          <div className="section-head">
            <div>
              <span className="eyebrow">◇ fitur</span>
              <h2 className="section-title">Fitur Sistem Inventory yang Anda <em className="font-serif italic">Dapatkan</em></h2>
            </div>
            <p className="section-desc">Semua yang Anda butuhkan untuk hasil profesional dan maksimal.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/20">
                <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden />
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Keunggulan ═══ */}
        <section className="border-y border-border bg-muted/30" id="keunggulan">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <div className="section-head">
              <div>
                <span className="eyebrow">◇ manfaat</span>
                <h2 className="section-title">Keunggulan <em className="font-serif italic">Sistem Inventory</em> dari OOS SHOP</h2>
              </div>
              <p className="section-desc">Dibangun dengan standar profesional agar hasil tidak hanya tampil bagus, tetapi juga bekerja untuk pertumbuhan bisnis Anda.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map((benefit) => (
                <div key={benefit.title} className="card">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground/70">
                    <CheckCircle2 className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Cocok Untuk + Proses ═══ */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" id="cocok-untuk">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow">◇ cocok untuk</span>
              <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Siapa yang Cocok Menggunakan <em className="font-serif italic">Layanan</em> Ini?
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Beberapa contoh kebutuhan sistem inventory yang paling sering kami kerjakan.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {service.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <span className="text-sm leading-relaxed text-foreground/90">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="proses">
              <span className="eyebrow">◇ proses kerja</span>
              <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Cara Kerja Jasa <em className="font-serif italic">Sistem Inventory</em>
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Proses yang jelas dan transparan dari konsultasi hingga selesai.
              </p>
              <ol className="mt-8 flex flex-col">
                {service.process.map((item, index) => (
                  <li key={item.step} className="relative flex gap-5 pb-8 last:pb-0">
                    {index < service.process.length - 1 && (
                      <div className="absolute left-[17px] top-9 h-full w-px bg-border" />
                    )}
                    <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
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
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <div className="section-head">
              <div>
                <span className="eyebrow">◇ bukti</span>
                <h2 className="section-title">Dipercaya 1.200+ Pemilik Website di <em className="font-serif italic">Indonesia</em></h2>
              </div>
              <p className="section-desc">Kami telah membantu ribuan bisnis, UMKM, dan instansi memiliki website profesional yang menghasilkan.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: '1.200+', label: 'Website Dikerjakan', note: 'Sejak 2020, setiap project ditangani tim berpengalaman.' },
                { value: '4.9/5', label: 'Rating Kepuasan', note: 'Dari 500+ review verified pelanggan di Google & WhatsApp.' },
                { value: '30 Hari', label: 'Garansi Support', note: 'Gratis revisi & support teknis setelah project selesai.' },
                { value: '5–14 Hari', label: 'Waktu Pengerjaan', note: 'Tergantung kompleksitas, selalu ada estimasi di awal.' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-card p-6">
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="border-b border-border" id="faq">
          <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
            <div className="text-center">
              <span className="eyebrow">◇ faq</span>
              <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight md:text-3xl">
                Pertanyaan Seputar <em className="font-serif italic">Sistem Inventory</em>
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Jawaban lengkap untuk pertanyaan yang sering diajukan tentang layanan sistem inventory di OOS SHOP.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3">
              {service.faq.map((item) => (
                <details key={item.question} className="group rounded-2xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden [&[open]]:shadow-sm">
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

        {/* ═══ Related Services ═══ */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <span className="eyebrow">◇ terkait</span>
          <h2 className="mt-3 text-xl font-bold tracking-tight md:text-2xl">Layanan Lainnya</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.relatedServices.map((relSlug) => {
              const rel = services[relSlug]
              if (!rel) return null
              return (
                <Link key={relSlug} href={`/layanan/${relSlug}`} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20">
                  <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">{rel.menuLabel}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{rel.menuDescription}</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ═══ Final CTA ═══ */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-12">
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
              Siap Membangun <em className="font-serif italic">Sistem Inventory</em> Anda?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Konsultasikan kebutuhan Anda secara gratis. Kami bantu rancang solusi terbaik sesuai tujuan dan anggaran bisnis Anda. Tanpa commitment, tanpa biaya konsultasi.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" nativeButton={false} render={<a href={waHref} target="_blank" rel="noopener noreferrer" />}>
                <MessageCircle className="size-4" aria-hidden />
                Konsultasi Gratis
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
