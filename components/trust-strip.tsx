const stats = [
  { value: '1.200+', label: 'Website ditangani' },
  { value: '5.000+', label: 'Plugin terpasang' },
  { value: '100%', label: 'Lisensi original' },
  { value: '1×24 jam', label: 'Rata-rata pengerjaan' },
]

export function TrustStrip() {
  return (
    <section aria-label="Statistik kepercayaan" className="border-y border-border bg-muted/50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
            <span className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
              {stat.value}
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
