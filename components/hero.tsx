import Image from 'next/image'
import { BadgeCheck, MessageCircle, ShieldCheck, ShoppingBag, Star, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/data'

const trustBadges = [
  { icon: BadgeCheck, label: 'Lisensi 100% Original' },
  { icon: Timer, label: 'Selesai 1×24 Jam' },
  { icon: ShieldCheck, label: 'Garansi Uang Kembali' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-accent/60 [mask-image:radial-gradient(70%_100%_at_50%_0%,black,transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-14 md:px-6 md:pb-24 md:pt-20 lg:grid-cols-2 lg:gap-12">
        {/* Text column */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs sm:text-sm lg:justify-start">
            <span className="flex items-center gap-0.5 text-primary" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <span className="font-medium text-foreground">4.9/5</span>
            <span className="whitespace-nowrap text-muted-foreground">dari 1.200+ pemilik</span>
          </div>

          <h1 className="max-w-xl text-balance text-2xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Jasa Instal Plugin WordPress Premium Original &amp; Bergaransi
          </h1>

          <p className="hero-description mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-5 md:text-lg">
            Dapatkan plugin WordPress premium original berlisensi resmi langsung dari developer.
            Proses instal cepat 5–15 menit, update otomatis selamanya, dan harga mulai Rp 25.000.
            Tersedia 500+ plugin termasuk Elementor Pro, WP Rocket, Astra Pro, dan Crocoblock.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button size="lg" className="px-8" nativeButton={false} render={<a href="#layanan" />}>
              <ShoppingBag className="size-5" aria-hidden />
              Lihat Layanan &amp; Harga
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent px-8"
              nativeButton={false}
              render={<a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" />}
            >
              <MessageCircle className="size-5" aria-hidden />
              Konsultasi Gratis
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            {trustBadges.map((badge) => (
              <li
                key={badge.label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <badge.icon className="size-4 text-primary" aria-hidden />
                {badge.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual column */}
        <div className="relative w-full">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              className="absolute -inset-4 rounded-3xl bg-primary/5 [mask-image:radial-gradient(80%_80%_at_50%_50%,black,transparent)]"
              aria-hidden
            />
            <Image
              src="/hero-dashboard.png"
              alt="Dashboard WordPress dengan plugin premium terpasang menampilkan skor PageSpeed, lisensi aktif, dan analisis SEO"
              width={1024}
              height={1024}
              priority
              className="relative w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
