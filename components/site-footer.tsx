import Link from 'next/link'
import { allServices, siteConfig } from '@/lib/data'

const serviceLinksCol1 = allServices.slice(0, 7)
const serviceLinksCol2 = allServices.slice(7)

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="OOS SHOP - Beranda">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                O
              </span>
              <span className="text-lg font-semibold tracking-tight">OOS SHOP</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Jasa instal plugin WordPress premium original dan pembuatan website profesional untuk
              UMKM, toko online, dan bisnis di Indonesia.
            </p>
          </div>

          <nav aria-label="Layanan instal plugin (bagian 1)">
            <h3 className="text-sm font-semibold">Layanan Instal Plugin</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {serviceLinksCol1.map((service) => (
                <li key={service.slug}>
                  <a
                    href="#layanan"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Layanan instal plugin (bagian 2)">
            <h3 className="text-sm font-semibold">Layanan Lainnya</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {serviceLinksCol2.map((service) => (
                <li key={service.slug}>
                  <a
                    href="#layanan"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#website-development"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Jasa Pembuatan Website
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Informasi">
            <h3 className="text-sm font-semibold">Informasi</h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a href="#cara-kerja" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Cara Kerja
                </a>
              </li>
              <li>
                <a href="#perbandingan" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Perbandingan Layanan
                </a>
              </li>
              <li>
                <a href="#keamanan" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Keamanan &amp; Garansi
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#artikel" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Artikel &amp; Panduan
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
            <Link href="/tentang-kami" className="transition-colors hover:text-foreground">
              Tentang Kami
            </Link>
            <span className="hidden text-border sm:inline">·</span>
            <Link href="/kebijakan-privasi" className="transition-colors hover:text-foreground">
              Kebijakan Privasi
            </Link>
            <span className="hidden text-border sm:inline">·</span>
            <Link href="/syarat-ketentuan" className="transition-colors hover:text-foreground">
              Syarat &amp; Ketentuan
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} OOS SHOP. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
