import { BadgeCheck, FileCheck, KeyRound, RefreshCw, ShieldCheck, Undo2 } from 'lucide-react'

const guarantees = [
  {
    icon: BadgeCheck,
    title: 'Lisensi original, bukan nulled',
    description:
      'Setiap plugin diaktivasi dengan lisensi resmi dari developer. Kami tidak pernah menggunakan plugin nulled, crack, atau GPL tidak resmi yang berisiko malware dan backdoor.',
  },
  {
    icon: RefreshCw,
    title: 'Update otomatis berjalan',
    description:
      'Karena aktivasi resmi, plugin menerima update keamanan dan fitur langsung dari developer — hal yang tidak mungkin didapat dari plugin nulled.',
  },
  {
    icon: KeyRound,
    title: 'Prosedur akses yang aman',
    description:
      'Kami bekerja lewat user admin sementara yang bisa Anda hapus setelah selesai. Seluruh kredensial dihapus dari sisi kami begitu pekerjaan tuntas.',
  },
  {
    icon: FileCheck,
    title: 'Backup sebelum instalasi',
    description:
      'Website Anda di-backup sebelum instalasi dimulai. Jika terjadi konflik, kami kembalikan ke kondisi semula tanpa biaya tambahan.',
  },
  {
    icon: ShieldCheck,
    title: 'Pengujian menyeluruh',
    description:
      'Setiap instalasi diuji kompatibilitasnya dengan tema dan plugin yang sudah terpasang sebelum kami serahkan kembali.',
  },
  {
    icon: Undo2,
    title: 'Garansi uang kembali',
    description:
      'Jika kami tidak dapat menyelesaikan instalasi, dana Anda kembali 100%. Kesalahan instalasi dari sisi kami diperbaiki gratis.',
  },
]

export function TrustSecurity() {
  return (
    <section id="keamanan" className="scroll-mt-20 bg-[#131318]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="size-3.5" aria-hidden />
            Standar Keamanan OOS SHOP
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            Original, Aman, dan Bergaransi — Bukan Nulled
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Banyak jasa murah menggunakan plugin nulled yang disusupi malware, mencuri data
            pelanggan, dan membuat website Anda di-blacklist Google. Di OOS SHOP, keamanan website
            Anda adalah prioritas — inilah standar kerja kami di setiap pemesanan.
          </p>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#1A1A22] ring-1 ring-border">
                <item.icon className="size-6 text-primary" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
