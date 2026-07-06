import { ChevronDown } from 'lucide-react'
import { faqs } from '@/lib/data'

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 border-y border-border bg-muted/50">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Jawaban atas pertanyaan umum seputar jasa instal plugin WordPress premium.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-border bg-card shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left text-sm font-medium md:text-base [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
