import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BadgeCheck,
  ChevronRight,
  Clock3,
  Headset,
  Layers,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Tentang Kami | OOS SHOP',
  description:
    'Kenali lebih dekat OOS SHOP — penyedia jasa instal plugin WordPress original berlisensi resmi dan layanan pembuatan website profesional di Indonesia.',
  alternates: { canonical: `${siteConfig.url}/tentang-kami` },
}

const stats = [
  { value: '500+', label: 'Plugin Tersedia' },
  { value: '10.000+', label: 'Pelanggan Puas' },
  { value: '24/7', label: 'Support Online' },
  { value: '100%', label: 'Original Berlisensi' },
]

const misi = [
  'Menyediakan plugin dan theme WordPress original dengan lisensi resmi',
  'Menawarkan layanan digital dengan harga terjangkau dan kualitas profesional',
  'Memberikan proses instalasi, pembuatan website, dan pengembangan sistem yang cepat, aman, dan terstruktur',
  'Menyediakan support responsif melalui WhatsApp',
  'Membantu UMKM, bisnis, organisasi, dan instansi memiliki aset digital profesional dan siap digunakan',
]

const whyUs = [
  { icon: ShieldCheck, title: '100% Original Berlisensi', desc: 'Semua plugin dan theme yang kami sediakan adalah original dengan lisensi resmi dari developer.' },
  { icon: Layers, title: 'Layanan Lengkap', desc: 'Mulai dari plugin WordPress, website bisnis, hingga sistem digital custom dalam satu tempat.' },
  { icon: Wallet, title: 'Harga Terjangkau', desc: 'Solusi profesional dengan biaya yang tetap ramah untuk UMKM maupun bisnis yang sedang berkembang.' },
  { icon: Clock3, title: 'Proses Cepat', desc: 'Instalasi plugin umumnya selesai dalam 5–15 menit. Maksimal 1x24 jam setelah pembayaran dikonfirmasi.' },
  { icon: Headset, title: 'Support Responsif', desc: 'Tim kami siap membantu melalui WhatsApp untuk konsultasi, order, dan kendala teknis.' },
  { icon: Target, title: 'Fokus pada Kebutuhan Nyata', desc: 'Setiap layanan dirancang untuk membantu bisnis tampil lebih profesional dan siap berkembang secara digital.' },
]

export default function TentangKamiPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-20">
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Beranda
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden />
              <li className="font-medium text-foreground" aria-current="page">
                Tentang Kami
              </li>
            </ol>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-16 md:px-6">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-accent/60 [mask-image:radial-gradient(70%_100%_at_50%_0%,black,transparent)]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs sm:text-sm">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              <span className="font-medium">Tentang OOS SHOP</span>
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Kenali Lebih Dekat <span className="text-primary">Siapa Kami</span>
            </h1>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              Kenali lebih dekat siapa di balik <strong className="text-foreground">OOS SHOP</strong> dan
              mengapa kami hadir untuk membantu kebutuhan WordPress, website, dan sistem bisnis Anda.
            </p>
          </div>
        </section>

        {/* Siapa Kami */}
        <section className="border-t border-border px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Siapa Kami</h2>
                <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    <strong className="text-foreground">OOS SHOP</strong> adalah penyedia jasa instal
                    plugin dan theme WordPress premium original berlisensi resmi, serta layanan
                    pembuatan website dan pengembangan sistem bisnis profesional. Kami beroperasi
                    secara online dan melayani pelanggan di seluruh Indonesia.
                  </p>
                  <p className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <strong className="text-primary">{siteConfig.url} adalah website resmi OOS SHOP</strong>{' '}
                    untuk pembelian plugin WordPress original berlisensi, jasa instal plugin, pembuatan
                    website profesional, dan pengembangan sistem digital bisnis di Indonesia.
                  </p>
                  <p>
                    Kami hadir untuk membantu pemilik bisnis, freelancer, UMKM, instansi, dan organisasi
                    mendapatkan solusi digital yang lebih praktis, profesional, dan terjangkau — mulai
                    dari plugin WordPress premium hingga website dan sistem custom sesuai kebutuhan.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/25"
                  >
                    <p className="text-3xl font-bold text-primary">{s.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="border-t border-border px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Target className="size-6 text-primary" aria-hidden />
                </div>
                <h3 className="text-xl font-bold">Visi</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Menjadi platform terpercaya untuk kebutuhan WordPress, website, dan sistem digital
                  bisnis di Indonesia, dengan mengutamakan kualitas layanan, kemudahan proses, dan
                  kepuasan pelanggan.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-accent">
                  <ShieldCheck className="size-6 text-primary" aria-hidden />
                </div>
                <h3 className="text-xl font-bold">Misi</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {misi.map((m) => (
                    <li key={m} className="flex items-start gap-2.5">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mengapa Memilih Kami */}
        <section className="border-t border-border px-4 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Mengapa Memilih Kami</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Alasan mengapa ribuan pelanggan mempercayakan kebutuhan digital mereka kepada OOS SHOP
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {whyUs.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/25 hover:-translate-y-0.5"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <item.icon className="size-6" aria-hidden />
                  </div>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kontak / CTA */}
        <section className="border-t border-border px-4 py-16 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-8 text-center sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Hubungi Kami</h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                Kami siap membantu Anda. Untuk mendapatkan informasi yang akurat dan layanan resmi,
                silakan hubungi OOS SHOP melalui kontak berikut:
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
                    <MessageCircle className="size-5 text-emerald-500" aria-hidden />
                  </div>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="mt-1 text-sm font-semibold">62 852-1215-0100</p>
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <BadgeCheck className="size-5 text-primary" aria-hidden />
                  </div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="mt-1 text-sm font-semibold">hello@oos-shop.com</p>
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-amber-500/10">
                    <Clock3 className="size-5 text-amber-500" aria-hidden />
                  </div>
                  <p className="text-xs text-muted-foreground">Jam Operasional</p>
                  <p className="mt-1 text-sm font-semibold">Senin – Minggu</p>
                  <p className="text-xs text-muted-foreground">08.00 – 22.00 WIB</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="px-8"
                  nativeButton={false}
                  render={<a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" />}
                >
                  <MessageCircle className="size-5" aria-hidden />
                  Chat WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="px-8" nativeButton={false} render={<Link href="/katalog" />}>
                  Jelajahi Katalog
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
