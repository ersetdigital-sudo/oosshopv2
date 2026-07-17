import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { siteConfig } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi | OOS SHOP',
  description:
    'Kebijakan privasi OOS SHOP menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi pelanggan.',
  alternates: { canonical: `${siteConfig.url}/kebijakan-privasi` },
  openGraph: {
    title: 'Kebijakan Privasi | OOS SHOP',
    description:
      'Kebijakan privasi OOS SHOP menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi pelanggan.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'OOS SHOP',
    url: `${siteConfig.url}/kebijakan-privasi`,
  },
  twitter: {
    card: 'summary',
    title: 'Kebijakan Privasi | OOS SHOP',
    description:
      'Kebijakan privasi OOS SHOP menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi pelanggan.',
  },
}

export default function KebijakanPrivasiPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Beranda
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden />
              <li className="font-medium text-foreground" aria-current="page">
                Kebijakan Privasi
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">Kebijakan Privasi</h1>
          <p className="mt-3 text-sm text-muted-foreground">Terakhir diperbarui: Januari 2025</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            OOS SHOP berkomitmen untuk melindungi privasi pelanggan kami. Kebijakan ini menjelaskan
            bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat
            menggunakan layanan kami.
          </p>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Informasi yang Kami Kumpulkan</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Saat Anda menggunakan layanan OOS SHOP, kami dapat mengumpulkan informasi berikut:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>Nama lengkap</li>
            <li>Nomor WhatsApp</li>
            <li>Alamat domain website Anda</li>
            <li>Data pembayaran (bukti transfer, metode pembayaran)</li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Penggunaan Informasi</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Informasi yang kami kumpulkan digunakan untuk:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>Memproses instalasi plugin/theme WordPress pada website Anda</li>
            <li>Komunikasi terkait status order dan konfirmasi pembayaran</li>
            <li>Peningkatan kualitas layanan kami</li>
            <li>Mengirimkan informasi penting terkait layanan yang Anda gunakan</li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Perlindungan Data</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Kami menjaga keamanan data Anda dengan serius:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>Data disimpan secara aman dengan enkripsi yang memadai</li>
            <li>
              Kami <span className="font-medium text-foreground">tidak menjual</span> data pribadi Anda
              kepada pihak ketiga
            </li>
            <li>Akses ke data pelanggan dibatasi hanya untuk tim yang berwenang</li>
            <li>
              Akses wp-admin yang Anda berikan hanya digunakan untuk proses instalasi dan akan dihapus
              setelah selesai
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Cookie &amp; Penyimpanan Lokal</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Website kami menggunakan localStorage pada browser Anda untuk:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>Menyimpan data sesi keranjang belanja</li>
            <li>Menyimpan preferensi tampilan Anda</li>
            <li>Meningkatkan pengalaman pengguna saat menggunakan website</li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Hak Pelanggan</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Sebagai pelanggan, Anda memiliki hak untuk:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>Mengakses data pribadi yang kami simpan tentang Anda</li>
            <li>Meminta penghapusan data pribadi Anda dari sistem kami</li>
            <li>Menghubungi kami via WhatsApp untuk pertanyaan terkait data Anda</li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Perubahan Kebijakan</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Kebijakan privasi ini dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.
            Perubahan akan diperbarui pada halaman ini. Kami menyarankan Anda untuk memeriksa halaman
            ini secara berkala.
          </p>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Kontak</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>
              WhatsApp: <span className="font-medium text-foreground">0852-1215-0100</span>
            </li>
            <li>
              Email: <span className="font-medium text-foreground">hello@oos-shop.com</span>
            </li>
          </ul>

          <div className="mt-12 border-t border-border pt-6">
            <Link href="/" className="text-sm font-medium text-primary hover:underline">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
