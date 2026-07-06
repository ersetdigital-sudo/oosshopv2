import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Database,
  GraduationCap,
  HeartPulse,
  Hotel,
  House,
  LayoutDashboard,
  MousePointerClick,
  Package,
  Plane,
  ShoppingCart,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/data'

const packages = [
  {
    name: 'Company Profile & Landing Page',
    icon: Building2,
    description:
      'Website profesional yang membangun kredibilitas bisnis Anda. Desain modern, cepat diakses, dan mudah dikelola sendiri tanpa perlu keahlian teknis.',
    features: [
      'Desain modern & mobile responsive',
      'SEO friendly, siap ditemukan di Google',
      'Fast loading untuk pengalaman terbaik',
      'Dashboard mudah dikelola sendiri',
    ],
  },
  {
    name: 'Website Toko Online',
    icon: ShoppingCart,
    description:
      'Toko online lengkap untuk menjual produk kapan saja. Katalog rapi, checkout online, dan manajemen pesanan yang memudahkan Anda melayani pelanggan.',
    features: [
      'Katalog produk & keranjang belanja',
      'Checkout online & pembayaran otomatis',
      'Manajemen pesanan & stok terpusat',
      'Dashboard admin mudah digunakan',
    ],
    featured: true,
  },
  {
    name: 'Website & Aplikasi Custom',
    icon: Database,
    description:
      'Solusi digital dirancang sesuai alur kerja bisnis Anda. Dari sistem booking, dashboard, hingga aplikasi web dengan fitur khusus yang siap berkembang.',
    features: [
      'Fitur custom sesuai kebutuhan operasional',
      'Aman & mudah dikembangkan ke depan',
      'Terintegrasi dengan sistem yang Anda pakai',
      'Konsultasi kebutuhan sebelum pengerjaan',
    ],
  },
]

const websiteTypes = [
  { label: 'Landing Page', icon: MousePointerClick },
  { label: 'Company Profile', icon: Building2 },
  { label: 'Toko Online', icon: ShoppingCart },
  { label: 'Website Sekolah', icon: GraduationCap },
  { label: 'Website Travel', icon: Plane },
  { label: 'Website Klinik', icon: HeartPulse },
  { label: 'Website Booking', icon: CalendarDays },
  { label: 'Website Hotel', icon: Hotel },
  { label: 'Website Properti', icon: House },
  { label: 'Dashboard Admin', icon: LayoutDashboard },
  { label: 'Sistem Inventory', icon: Package },
  { label: 'CRM & ERP', icon: Users },
]

export function WebsiteDevelopment() {
  return (
    <section
      id="website-development"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full border border-border bg-accent/50 px-3 py-1 text-xs font-medium text-primary">
          Jasa Pembuatan Website
        </span>
        <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Bangun Website Profesional untuk Pertumbuhan Bisnis
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Belum punya website? Kami rancang dari nol dengan teknologi yang paling tepat untuk
          kebutuhan Anda — fokus pada desain modern, performa cepat, dan hasil yang mendukung bisnis.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => {
          const Icon = pkg.icon
          return (
            <article
              key={pkg.name}
              className={`group flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 md:p-8 ${
                pkg.featured
                  ? 'border-primary/40 bg-accent/40 shadow-md ring-1 ring-primary/20 hover:shadow-xl'
                  : 'border-border bg-card shadow-sm hover:border-primary/30 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                    pkg.featured ? 'bg-primary text-primary-foreground' : 'bg-accent text-primary'
                  }`}
                >
                  <Icon className="size-7" aria-hidden />
                </div>
                {pkg.featured && (
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Paling Populer
                  </span>
                )}
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-tight">{pkg.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pkg.description}</p>

              <ul className="mt-5 flex flex-col gap-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex-1" />
              <Button
                variant={pkg.featured ? 'default' : 'ghost'}
                size="sm"
                className={
                  pkg.featured
                    ? 'group/btn w-fit'
                    : 'group/btn w-fit px-0 text-primary hover:bg-transparent hover:text-primary'
                }
                nativeButton={false}
                render={
                  <a
                    href={`${siteConfig.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan paket ${pkg.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Pelajari Selengkapnya
                <ArrowRight
                  className="ml-1 size-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                  aria-hidden
                />
              </Button>
            </article>
          )
        })}
      </div>

      <div className="mt-14">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Berbagai jenis website yang kami bangun
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {websiteTypes.map((type) => {
            const Icon = type.icon
            return (
              <div
                key={type.label}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:flex-row sm:gap-3 sm:p-4 sm:text-left"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-xs font-medium leading-tight text-foreground sm:text-sm">
                  {type.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
