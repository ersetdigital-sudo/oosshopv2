import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Halaman Tidak Ditemukan</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Mungkin URL yang Anda masukkan salah.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/katalog"
          className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Lihat Katalog
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Baca Blog
        </Link>
      </div>
    </div>
  )
}
