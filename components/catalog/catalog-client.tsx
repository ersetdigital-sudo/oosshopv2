'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  MessageCircle,
  Search,
  SlidersHorizontal,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/data'
import type { Product } from '@/lib/products'

type SortOption = 'newest' | 'popular' | 'price-asc' | 'price-desc' | 'name-asc'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'popular', label: 'Terlaris' },
  { value: 'price-asc', label: 'Harga: Termurah' },
  { value: 'price-desc', label: 'Harga: Termahal' },
  { value: 'name-asc', label: 'Nama: A-Z' },
]

function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

function getActivePrice(product: Product): number {
  if (
    product.flash_sale_price &&
    product.flash_sale_end &&
    new Date(product.flash_sale_end) >= new Date()
  ) {
    return product.flash_sale_price
  }
  return product.price
}

function isFlashSale(product: Product): boolean {
  return !!(
    product.flash_sale_price &&
    product.flash_sale_end &&
    new Date(product.flash_sale_end) >= new Date()
  )
}

export function CatalogClient({
  products,
  categories,
}: {
  products: Product[]
  categories: string[]
}) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [sort, setSort] = useState<SortOption>('newest')

  const filtered = useMemo(() => {
    let items = [...products]

    // Category filter
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory)
    }

    // Search filter
    const q = query.trim().toLowerCase()
    if (q) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q),
      )
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        items.sort((a, b) => getActivePrice(a) - getActivePrice(b))
        break
      case 'price-desc':
        items.sort((a, b) => getActivePrice(b) - getActivePrice(a))
        break
      case 'name-asc':
        items.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'popular':
        items.sort((a, b) => b.total_sold - a.total_sold)
        break
      case 'newest':
      default:
        // Already sorted by created_at desc from the query
        break
    }
    return items
  }, [products, query, activeCategory, sort])

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1
    }
    return counts
  }, [products])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar filter */}
        <aside className="lg:sticky lg:top-20 lg:h-fit" aria-label="Filter kategori">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="size-4 text-primary" aria-hidden />
            Kategori
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
                <span>Semua Produk</span>
                <span className="ml-2 text-xs">{products.length}</span>
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    activeCategory === cat
                      ? 'border-primary bg-accent font-medium text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="ml-2 text-xs">{categoryCounts[cat] || 0}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
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
                placeholder="Cari plugin atau theme..."
                aria-label="Cari produk"
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
            Menampilkan{' '}
            <span className="font-medium text-foreground">{filtered.length}</span> produk
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-sm text-muted-foreground">
                Produk tidak ditemukan. Coba kata kunci lain atau hubungi kami untuk request plugin.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => {
                const activePrice = getActivePrice(product)
                const onSale = isFlashSale(product)
                const waText = encodeURIComponent(
                  `Halo, saya ingin memesan ${product.name} (${formatIDR(activePrice)})`,
                )
                const productHref = `/produk/${product.slug || product.id}`

                return (
                  <article
                    key={product.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg"
                  >
                    {/* Image — clickable to detail */}
                    <Link href={productHref} className="relative block border-b border-border bg-accent/40">
                      {/* Badges */}
                      {product.badge && (
                        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                          <Star className="size-3 fill-current" aria-hidden />
                          {product.badge}
                        </span>
                      )}
                      {onSale && (
                        <span className="absolute right-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                          FLASH SALE
                        </span>
                      )}
                      {!onSale && product.category && (
                        <span className="absolute right-3 top-3 z-10 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          {product.category}
                        </span>
                      )}

                      {/* Product image */}
                      {product.image_url ? (
                        <div className="flex h-48 items-center justify-center overflow-hidden">
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="flex h-48 flex-col items-center justify-center gap-2">
                          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <BadgeCheck className="size-7" aria-hidden />
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            {product.name}
                          </span>
                        </div>
                      )}
                    </Link>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <Link href={productHref}>
                        <h2 className="line-clamp-2 text-base font-semibold tracking-tight transition-colors hover:text-primary">
                          {product.name}
                        </h2>
                      </Link>
                      {product.description && (
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {product.description}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        {product.total_sold > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="size-3 text-amber-500" aria-hidden />
                            {product.total_sold} terjual
                          </span>
                        )}
                        {product.version && <span>v{product.version}</span>}
                      </div>

                      <div className="mt-4 flex-1" />

                      {/* Price */}
                      <div className="flex items-end justify-between gap-2 border-t border-border pt-4">
                        <div>
                          {onSale && (
                            <span className="block text-xs text-muted-foreground line-through">
                              {formatIDR(product.price)}
                            </span>
                          )}
                          {!onSale && product.original_price && (
                            <span className="block text-xs text-muted-foreground line-through">
                              {formatIDR(product.original_price)}
                            </span>
                          )}
                          <span className="text-lg font-bold text-primary">
                            {formatIDR(activePrice)}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <BadgeCheck className="size-3.5 text-primary" aria-hidden />
                          Original
                        </span>
                      </div>

                      {/* Buttons — like v1: Order + Detail */}
                      <div className="mt-4 flex items-center gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          nativeButton={false}
                          render={
                            <a
                              href={`${siteConfig.whatsapp}?text=${waText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          }
                        >
                          <MessageCircle className="size-4" aria-hidden />
                          Pesan
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          nativeButton={false}
                          render={<Link href={productHref} />}
                        >
                          Detail
                          <ArrowRight className="size-4" aria-hidden />
                        </Button>
                      </div>
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
