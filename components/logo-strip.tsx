type Brand = {
  name: string
  src: string
  wordmark?: boolean
}

const brands: Brand[] = [
  { name: 'Elementor', src: '/logos/elementor.svg' },
  { name: 'GeneratePress', src: '/logos/generatepress.png', wordmark: true },
  { name: 'RankMath', src: '/logos/rankmath.png', wordmark: true },
  { name: 'WP Rocket', src: '/logos/wp-rocket.svg' },
  { name: 'Astra', src: '/logos/astra.svg' },
]

export function LogoStrip() {
  return (
    <section aria-label="Brand plugin yang kami pasang" className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <p className="mx-auto max-w-3xl text-pretty text-center text-sm leading-relaxed text-muted-foreground">
          OOS SHOP melayani jasa instal plugin WordPress untuk{' '}
          <span className="font-semibold text-foreground">
            Elementor Pro, WP Rocket, Rank Math Pro, Astra Pro, Crocoblock, JetEngine, LiteSpeed
            Cache,
          </span>{' '}
          dan berbagai plugin premium lainnya.
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12">
          {brands.map((brand) => (
            <li key={brand.name} className="flex items-center justify-center">
              {brand.wordmark ? (
                <span className="flex items-center rounded-md bg-white px-3 py-1.5 opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                  <img
                    src={brand.src || '/placeholder.svg'}
                    alt={`Logo ${brand.name}`}
                    className="h-5 w-auto md:h-6"
                    loading="lazy"
                  />
                </span>
              ) : (
                <span className="group flex items-center gap-2.5 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                  <img
                    src={brand.src || '/placeholder.svg'}
                    alt={`Logo ${brand.name}`}
                    width={28}
                    height={28}
                    className="size-7 shrink-0"
                    loading="lazy"
                  />
                  <span className="text-sm font-semibold tracking-tight text-foreground/80 transition-colors group-hover:text-foreground">
                    {brand.name}
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
