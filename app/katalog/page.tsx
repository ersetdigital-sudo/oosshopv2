import type { Metadata } from 'next'
import Link from 'next/link'
import { BadgeCheck, ChevronRight, RefreshCw, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CatalogClient } from '@/components/catalog/catalog-client'
import { CatalogJsonLd } from '@/components/catalog/catalog-json-ld'
import { siteConfig } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Katalog Jasa Instal Plugin WordPress Premium Original | OOS SHOP',
  description:
    'Katalog lengkap jasa instal plugin WordPress premium original: Elementor Pro, WP Rocket, Rank Math Pro, Crocoblock, dan lainnya. Harga mulai Rp 25.000, aktivasi lisensi resmi, bergaransi.',
  keywords: [
    'katalog plugin wordpress premium',
    'harga jasa instal plugin wordpress',
    'jasa instal elementor pro',
    'jasa instal wp rocket',
    'plugin wordpress original murah',
  ],
  alternates: { canonical: `${siteConfig.url}/katalog` },
  openGraph: {
    title: 'Katalog Jasa Instal Plugin WordPress Premium Original | OOS SHOP',
    description:
      'Pilih plugin WordPress premium original yang Anda butuhkan. Harga mulai Rp 25.000, lisensi resmi, konfigurasi profesional, bergaransi.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'OOS SHOP',
    url: `${siteConfig.url}/katalog`,
  },
}

const highlights = [
  { icon: BadgeCheck, label: 'Lisensi original & resmi' },
  { icon: RefreshCw, label: 'Update otomatis selamanya' },
  { icon: ShieldCheck, label: 'Garansi uang kembali' },
]

export default function KatalogPage() {
  return (
    <>
      <CatalogJsonLd />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border bg-accent/30">
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">
                    Beranda
                  </Link>
                </li>
                <ChevronRight className="size-4" aria-hidden />
                <li className="font-medium text-foreground" aria-current="page">
                  Katalog Plugin
                </li>
              </ol>
            </nav>

            <h1 className="mt-5 max-w-3xl text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Katalog Jasa Instal Plugin WordPress Premium
            </h1>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Pilih plugin WordPress premium original yang Anda butuhkan. Semua plugin dipasang
              dengan aktivasi lisensi resmi, dikonfigurasi profesional oleh teknisi kami, dan
              bergaransi. Harga transparan mulai dari Rp 25.000.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {highlights.map((h) => (
                <li key={h.label} className="flex items-center gap-2 text-sm text-foreground">
                  <h.icon className="size-4 text-primary" aria-hidden />
                  {h.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CatalogClient />
      </main>
      <SiteFooter />
    </>
  )
}
