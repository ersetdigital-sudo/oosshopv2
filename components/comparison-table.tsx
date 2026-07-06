import { Check, X } from 'lucide-react'

const rows = [
  {
    aspect: 'Harga',
    direct: 'Harga internasional penuh ($49–$599/tahun) + kurs dolar',
    oos: 'Jauh lebih hemat, bayar dalam Rupiah',
    directGood: false,
  },
  {
    aspect: 'Instalasi & konfigurasi',
    direct: 'Pasang dan konfigurasi sendiri',
    oos: 'Dikerjakan teknisi berpengalaman sampai selesai',
    directGood: false,
  },
  {
    aspect: 'Lisensi',
    direct: 'Original, atas nama Anda',
    oos: 'Original, aktivasi resmi, update otomatis berjalan',
    directGood: true,
  },
  {
    aspect: 'Risiko salah konfigurasi',
    direct: 'Ditanggung sendiri, bisa membuat website error',
    oos: 'Backup sebelum instalasi + pengujian menyeluruh',
    directGood: false,
  },
  {
    aspect: 'Dukungan',
    direct: 'Support developer dalam Bahasa Inggris',
    oos: 'Dukungan 30 hari via WhatsApp dalam Bahasa Indonesia',
    directGood: false,
  },
  {
    aspect: 'Garansi',
    direct: 'Refund policy developer (bervariasi)',
    oos: 'Uang kembali 100% jika instalasi gagal',
    directGood: false,
  },
]

export function ComparisonTable() {
  return (
    <section id="perbandingan" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Beli Lisensi Sendiri vs Menggunakan OOS SHOP
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Keduanya sama-sama original. Bedanya ada di biaya, tenaga, dan risiko yang Anda tanggung.
        </p>
      </div>

      {/* Mobile: stacked cards per aspek */}
      <div className="mt-10 flex flex-col gap-4 md:hidden">
        {rows.map((row) => (
          <div key={row.aspect} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <p className="border-b border-border px-4 py-3 font-semibold text-foreground">{row.aspect}</p>
            <div className="grid grid-cols-1 divide-y divide-border">
              <div className="flex items-start gap-3 px-4 py-3">
                {row.directGood ? (
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                ) : (
                  <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                )}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Beli Langsung Sendiri</p>
                  <p className="mt-1 text-sm text-foreground">{row.direct}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-accent/30 px-4 py-3">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-accent-foreground">Via OOS SHOP</p>
                  <p className="mt-1 text-sm text-foreground">{row.oos}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: tabel */}
      <div className="mt-12 hidden overflow-hidden rounded-2xl border border-border shadow-sm md:block">
        <table className="w-full border-collapse bg-card text-left text-sm">
          <caption className="sr-only">
            Perbandingan antara membeli lisensi plugin sendiri dan menggunakan jasa OOS SHOP
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="p-4 font-semibold text-muted-foreground">
                Aspek
              </th>
              <th scope="col" className="p-4 font-semibold">
                Beli Langsung Sendiri
              </th>
              <th scope="col" className="bg-accent/50 p-4 font-semibold text-accent-foreground">
                Via OOS SHOP
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.aspect} className="border-b border-border last:border-0">
                <th scope="row" className="p-4 font-medium text-foreground">
                  {row.aspect}
                </th>
                <td className="p-4 text-muted-foreground">
                  <span className="flex items-start gap-2">
                    {row.directGood ? (
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    ) : (
                      <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                    )}
                    {row.direct}
                  </span>
                </td>
                <td className="bg-accent/30 p-4">
                  <span className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {row.oos}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
