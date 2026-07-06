'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Database,
  Gauge,
  LayoutTemplate,
  Mail,
  Search,
  SlidersHorizontal,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  catalogCategories,
  catalogItems,
  formatIDR,
  siteConfig,
  type CatalogItem,
} from '@/lib/data'

const categoryIcons: Record<string, typeof LayoutTemplate> = {
  'page-builder': LayoutTemplate,
  'dynamic-website': Database,
  performa: Gauge,
  seo: Search,
  marketing: Mail,
}

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'name-asc'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Terpopuler' },
  { value: 'price-asc', label: 'Harga: Termurah' },
  { value: 'price-desc', label: 'Harga: Termahal' },
  { value: 'name-asc', label: 'Nama: A-Z' },
]

export function CatalogClient() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [sort, setSort] = useState<SortOption>('popular')

  const filtered = useMemo(() => {
    let items: CatalogItem[] = catalogItems

    if (activeCategory !== 'all') {
      items = items.filter((item) => item.categoryId === activeCategory)
    }

    const q = query.trim().toLowerCase()
    if (q) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.plugin.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      )
    }

    const sorted = [...items]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        sorted.sort((a, b) => a.plugin.localeCompare(b.plugin))
        break
      default:
        sorted.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller))
    }
    return sorted
  }, [query, activeCategory, sort])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar filter */}
        <aside className="lg:sticky lg:top-20 lg:h-fit" aria-label="Filter kategori">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="size-4 text-primary" aria-hidden />
            Kategori Plugin
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col">
            <li>
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                aria-pressed={activeCategory === 'all'}
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  activeCategory === 'all'
                    ? 'border-primary bg-accent font-medium text-primary'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                <span>Semua Plugin</span>
                <span className="ml-2 text-xs">{catalogItems.length}</span>
              </button>
            </li>
            {catalogCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={activeCategory === cat.id}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    activeCategory === cat.id
                      ? 'border-primary bg-accent font-medium text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="ml-2 text-xs">{cat.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <div>
          {/* Toolbar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari plugin, mis. Elementor..."
                aria-label="Cari plugin"
                className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="sr-only">
                Urutkan
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
            Menampilkan <span className="font-medium text-foreground">{filtered.length}</span> plugin
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-sm text-muted-foreground">
                Plugin tidak ditemukan. Coba kata kunci lain atau hubungi kami untuk request plugin.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item) => {
                const Icon = categoryIcons[item.categoryId] ?? LayoutTemplate
                return (
                  <article
                    key={item.slug}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg"
                  >
                    {/* Visual header */}
                    <div className="relative flex h-36 items-center justify-center border-b border-border bg-accent/40">
                      {item.bestSeller && (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                          <Star className="size-3 fill-current" aria-hidden />
                          Best Seller
                        </span>
                      )}
                      <span className="absolute right-3 top-3 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        {item.categoryLabel}
                      </span>
                      <div className="flex flex-col items-center gap-2">
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                          <Icon className="size-7" aria-hidden />
                        </span>
                        <span className="text-sm font-semibold text-foreground">{item.plugin}</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-base font-semibold tracking-tight">{item.name}</h2>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>

                      <ul className="mt-3 flex flex-col gap-1.5">
                        {item.benefits.slice(0, 2).map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-xs">
                            <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex-1" />

                      <div className="flex items-end justify-between gap-2 border-t border-border pt-4">
                        <div>
                          <span className="block text-xs text-muted-foreground">Mulai dari</span>
                          <span className="text-lg font-bold text-primary">
                            {formatIDR(item.price)}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <BadgeCheck className="size-3.5 text-primary" aria-hidden />
                          Original
                        </span>
                      </div>

                      <Button
                        size="sm"
                        className="mt-4 w-full"
                        nativeButton={false}
                        render={
                          <a
                            href={`${siteConfig.whatsapp}?text=${encodeURIComponent(
                              `Halo, saya ingin memesan ${item.name} (${formatIDR(item.price)})`,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                      >
                        Pesan Sekarang
                        <ArrowRight
                          className="ml-1 size-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
