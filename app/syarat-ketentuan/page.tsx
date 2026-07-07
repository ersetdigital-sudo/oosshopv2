import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { siteConfig } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan | OOS SHOP',
  description:
    'Syarat dan ketentuan penggunaan layanan OOS SHOP. Ketahui hak dan kewajiban Anda sebagai pelanggan.',
  alternates: { canonical: `${siteConfig.url}/syarat-ketentuan` },
}

export default function SyaratKetentuanPage() {
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
                Syarat &amp; Ketentuan
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">Syarat &amp; Ketentuan</h1>
          <p className="mt-3 text-sm text-muted-foreground">Terakhir diperbarui: Januari 2025</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Dengan menggunakan layanan OOS SHOP, Anda dianggap telah membaca, memahami, dan menyetujui
            seluruh syarat dan ketentuan yang berlaku di bawah ini.
          </p>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Definisi</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">OOS SHOP</span> adalah penyedia jasa
              instalasi plugin/theme WordPress dan pembuatan website yang beroperasi melalui website{' '}
              {siteConfig.url}
            </li>
            <li>
              <span className="font-medium text-foreground">Pelanggan</span> adalah individu atau
              badan usaha yang menggunakan layanan OOS SHOP
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Layanan Kami</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">OOS SHOP menyediakan layanan berikut:</p>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>Jasa instal plugin WordPress premium original berlisensi resmi</li>
            <li>Jasa instal theme WordPress premium original berlisensi resmi</li>
            <li>Jasa pembuatan website custom (landing page, company profile, toko online, sistem custom)</li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Proses Pemesanan</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">Berikut alur pemesanan di OOS SHOP:</p>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>Pilih produk atau layanan yang diinginkan</li>
            <li>Isi data yang diperlukan (nama, WhatsApp, domain website)</li>
            <li>Lakukan pembayaran sesuai metode yang tersedia</li>
            <li>Instalasi akan diproses setelah pembayaran dikonfirmasi</li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Pembayaran</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>Pembayaran dapat dilakukan melalui transfer bank atau e-wallet</li>
            <li>
              Batas waktu pembayaran adalah{' '}
              <span className="font-medium text-foreground">24 jam</span> setelah order dibuat
            </li>
            <li>
              Order akan <span className="font-medium text-foreground">otomatis dibatalkan</span> jika
              pembayaran tidak dilakukan dalam batas waktu tersebut
            </li>
            <li>Konfirmasi pembayaran dilakukan melalui WhatsApp atau sistem otomatis</li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Instalasi &amp; Aktivasi</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>
              Pelanggan wajib memberikan akses{' '}
              <span className="font-medium text-foreground">wp-admin</span> untuk proses instalasi
            </li>
            <li>
              Proses instalasi membutuhkan waktu{' '}
              <span className="font-medium text-foreground">1–24 jam</span> setelah pembayaran
              dikonfirmasi
            </li>
            <li>Kami akan menghubungi Anda via WhatsApp setelah instalasi selesai</li>
            <li>Akses wp-admin yang diberikan hanya digunakan untuk keperluan instalasi</li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Garansi</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>
              Kami memberikan{' '}
              <span className="font-medium text-foreground">garansi instalasi ulang</span> jika proses
              instalasi gagal atau terjadi error
            </li>
            <li>Garansi ini bukan garansi refund (pengembalian dana) untuk produk digital</li>
            <li>Garansi berlaku selama masa lisensi produk aktif</li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Pembatalan &amp; Refund</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Sebelum instalasi:</span> pelanggan berhak
              mendapatkan refund penuh
            </li>
            <li>
              <span className="font-medium text-foreground">Setelah instalasi:</span> tidak dapat
              dilakukan refund karena produk digital sudah terinstal
            </li>
            <li>Pembatalan order dapat dilakukan dengan menghubungi kami via WhatsApp</li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Lisensi Produk</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>
              Semua plugin dan theme yang kami sediakan adalah{' '}
              <span className="font-medium text-foreground">100% original</span> dengan lisensi resmi
            </li>
            <li>Produk mendapatkan update otomatis langsung dari developer</li>
            <li>
              Satu lisensi berlaku untuk <span className="font-medium text-foreground">1 domain</span>,
              kecuali disebutkan lain pada deskripsi produk
            </li>
            <li>Lisensi tidak dapat dipindahtangankan ke domain lain tanpa persetujuan</li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Batasan Tanggung Jawab</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>
              OOS SHOP <span className="font-medium text-foreground">tidak bertanggung jawab</span>{' '}
              atas kerusakan website yang disebabkan oleh konflik antar plugin
            </li>
            <li>
              Backup website sebelum instalasi adalah{' '}
              <span className="font-medium text-foreground">tanggung jawab pelanggan</span>
            </li>
            <li>
              Kami tidak bertanggung jawab atas kerugian yang timbul akibat penggunaan produk yang
              tidak sesuai dengan ketentuan developer
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold sm:text-xl">Perubahan Ketentuan</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            OOS SHOP berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan
            terlebih dahulu. Perubahan akan berlaku efektif setelah dipublikasikan di halaman ini.
            Penggunaan layanan setelah perubahan dianggap sebagai persetujuan terhadap ketentuan yang
            baru.
          </p>

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
