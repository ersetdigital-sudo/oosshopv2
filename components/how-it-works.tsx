import { CheckCircle2, CreditCard, MousePointerClick, Wrench } from 'lucide-react'

const steps = [
  {
    icon: MousePointerClick,
    title: 'Pilih Plugin',
    description:
      'Tentukan plugin yang Anda butuhkan. Belum yakin? Konsultasikan gratis via WhatsApp — kami bantu pilih sesuai kebutuhan website Anda.',
  },
  {
    icon: CreditCard,
    title: 'Lakukan Pembayaran',
    description:
      'Bayar via transfer bank, e-wallet, atau QRIS. Anda menerima konfirmasi dan estimasi waktu pengerjaan.',
  },
  {
    icon: Wrench,
    title: 'Kami Instal & Konfigurasi',
    description:
      'Tim kami melakukan backup, instalasi, aktivasi lisensi resmi, konfigurasi, dan pengujian menyeluruh di website Anda.',
  },
  {
    icon: CheckCircle2,
    title: 'Selesai & Laporan',
    description:
      'Anda menerima laporan hasil pekerjaan. Dukungan purna jual 30 hari termasuk untuk setiap pemesanan.',
  },
]

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="scroll-mt-20 border-y border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Cara Kerja: 4 Langkah Sederhana
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Dari pemesanan sampai selesai, prosesnya transparan dan cepat — umumnya dalam 1×24 jam.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <span
                  className="absolute left-[calc(50%+2.25rem)] top-7 hidden h-px w-[calc(100%-4.5rem)] bg-border lg:block"
                  aria-hidden
                />
              )}
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                <step.icon className="size-7" aria-hidden />
                <span className="absolute -right-1.5 -top-1.5 flex size-6 items-center justify-center rounded-full border-2 border-background bg-foreground text-xs font-semibold text-background">
                  {index + 1}
                </span>
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
