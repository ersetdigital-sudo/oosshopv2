import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/data'

export function FinalCta() {
  return (
    <section aria-label="Ajakan terakhir" className="bg-primary">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center md:px-6 md:py-24">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
          Siap Upgrade Website WordPress Anda?
        </h2>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/85">
          Konsultasikan kebutuhan Anda secara gratis — kami bantu pilih plugin yang tepat, lalu
          pasang dan konfigurasi sampai berjalan sempurna. Original, bergaransi, selesai 1×24 jam.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            variant="secondary"
            className="bg-[#25D366] hover:bg-[#20BD5A] text-white border-0 px-8"
            nativeButton={false}
            render={<a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" />}
          >
            Chat WhatsApp Sekarang
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            nativeButton={false}
            render={<a href="#layanan" />}
          >
            Lihat Semua Layanan
          </Button>
        </div>
      </div>
    </section>
  )
}
