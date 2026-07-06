'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, RefreshCw, Package, Search, Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/products'

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function AdminProdukPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts((data as Product[]) || [])
    setLoading(false)
  }

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products],
  )

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
      const matchCategory = categoryFilter ? p.category === categoryFilter : true
      return matchSearch && matchCategory
    })
  }, [products, search, categoryFilter])

  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus produk ini?')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold">Kelola Produk</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {filtered.length} dari {products.length} produk
          </p>
        </div>
        <Link
          href="/admin/produk/tambah"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
        >
          <Plus className="size-4" aria-hidden />
          Tambah Produk
        </Link>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama produk..."
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary sm:w-48"
        >
          <option value="">Semua Kategori</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <RefreshCw className="size-6 animate-spin text-muted-foreground" aria-hidden />
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted">
            <Package className="size-8 text-muted-foreground" aria-hidden />
          </div>
          <p className="text-sm text-muted-foreground">
            {products.length === 0
              ? 'Belum ada produk. Klik "Tambah Produk" untuk mulai.'
              : 'Tidak ada produk yang cocok dengan pencarian.'}
          </p>
        </div>
      )}

      {/* Mobile: Card layout */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
              {p.image_url ? (
                <Image
                  src={p.image_url}
                  alt={p.name}
                  width={56}
                  height={56}
                  className="size-14 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Package className="size-6 text-muted-foreground" aria-hidden />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">{formatPrice(p.price)}</span>
                  {p.is_featured && (
                    <span className="flex items-center gap-0.5 rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-500">
                      <Star className="size-2.5 fill-current" aria-hidden /> Featured
                    </span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <Link
                  href={`/admin/produk/edit/${p.id}`}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Pencil className="size-4" aria-hidden />
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Desktop: Table layout */}
      {!loading && filtered.length > 0 && (
        <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card sm:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="p-4 font-medium">Produk</th>
                <th className="p-4 font-medium">Kategori</th>
                <th className="p-4 font-medium">Harga</th>
                <th className="p-4 font-medium">Terjual</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <Image
                          src={p.image_url}
                          alt={p.name}
                          width={40}
                          height={40}
                          className="size-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                          <Package className="size-5 text-muted-foreground" aria-hidden />
                        </div>
                      )}
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{p.category}</td>
                  <td className="p-4 font-medium">{formatPrice(p.price)}</td>
                  <td className="p-4 text-muted-foreground">{p.total_sold || 0}</td>
                  <td className="p-4">
                    {p.is_featured && (
                      <span className="flex w-fit items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-500">
                        <Star className="size-3 fill-current" aria-hidden /> Featured
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/produk/edit/${p.id}`}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Pencil className="size-4" aria-hidden />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
