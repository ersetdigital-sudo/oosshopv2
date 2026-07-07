'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, RefreshCw, Plus, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/products'

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

type FeatureItem = { title: string; desc: string }
type FaqItem = { q: string; a: string }
type VariantItem = { name: string; price: string }

type FormData = {
  name: string
  slug: string
  description: string
  long_description: string
  price: string
  original_price: string
  category: string
  version: string
  badge: string
  is_featured: boolean
  meta_title: string
  meta_description: string
}

export default function EditProdukPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    description: '',
    long_description: '',
    price: '',
    original_price: '',
    category: 'Plugin',
    version: '',
    badge: '',
    is_featured: false,
    meta_title: '',
    meta_description: '',
  })
  const [features, setFeatures] = useState<FeatureItem[]>([])
  const [faq, setFaq] = useState<FaqItem[]>([])
  const [variants, setVariants] = useState<VariantItem[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single()

      if (data) {
        const p = data as Product
        setFormData({
          name: p.name || '',
          slug: p.slug || '',
          description: p.description || '',
          long_description: p.long_description || '',
          price: String(p.price ?? ''),
          original_price: p.original_price ? String(p.original_price) : '',
          category: p.category || 'Plugin',
          version: p.version || '',
          badge: p.badge || '',
          is_featured: p.is_featured || false,
          meta_title: p.meta_title || '',
          meta_description: p.meta_description || '',
        })
        setFeatures(
          (p.features || []).map((f) => ({ title: f.title || '', desc: f.desc || '' })),
        )
        setFaq(
          (p.faq || []).map((f) => ({ q: f.q || f.question || '', a: f.a || f.answer || '' })),
        )
        setVariants((p.variants || []).map((v) => ({ name: v.name, price: String(v.price) })))
        setImagePreview(p.image_url || null)
      }
      setLoading(false)
    }
    if (params.id) fetchProduct()
  }, [params.id])

  async function compressImage(file: File, maxWidth = 800, quality = 0.7): Promise<Blob> {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new window.Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          canvas.toBlob((blob) => resolve(blob as Blob), 'image/webp', quality)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    let image_url: string | null = imagePreview
    if (!imagePreview && !imageFile) {
      image_url = null
    } else if (imageFile) {
      const compressedBlob = await compressImage(imageFile, 800, 0.7)
      const fileName = `${Date.now()}.webp`
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, compressedBlob, { contentType: 'image/webp' })
      if (!uploadError) {
        const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
        image_url = data.publicUrl
      }
    }

    const derivedDescription =
 formData.meta_description.trim() || formData.description.trim() || formData.long_description.trim().slice(0, 160)

 const productData = {
 name: formData.name,
 slug: formData.slug || generateSlug(formData.name),
 description: derivedDescription,
 long_description: formData.long_description || null,
      price: Number(formData.price),
      original_price: formData.original_price ? Number(formData.original_price) : null,
      category: formData.category,
      version: formData.version || null,
      badge: formData.badge || null,
      is_featured: formData.is_featured,
      image_url,
      meta_title: formData.meta_title || null,
      meta_description: formData.meta_description || null,
      features: features.length > 0 ? features.filter((f) => f.title) : null,
      faq: faq.length > 0 ? faq.filter((f) => f.q) : null,
      variants:
        variants.length > 0
          ? variants
              .filter((v) => v.name && v.price)
              .map((v) => ({ name: v.name, price: Number(v.price) }))
          : null,
    }

    const { error } = await supabase.from('products').update(productData).eq('id', params.id)
    if (error) {
      showToast('Gagal menyimpan: ' + error.message, 'error')
      setSubmitting(false)
      return
    }

    // Best-effort: refresh ISR cache for /katalog and this product's page
    // immediately, instead of waiting for the revalidate window to elapse.
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: productData.slug }),
      })
    } catch {
      // Non-critical — page will still refresh on its own within the ISR window
    }

    router.push('/admin/produk')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="size-6 animate-spin text-muted-foreground" aria-hidden />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {toast && (
        <div
          className={`fixed right-4 top-20 z-50 flex items-center gap-3 rounded-xl border px-5 py-3.5 shadow-2xl ${
            toast.type === 'error'
              ? 'border-destructive/30 bg-destructive/10 text-destructive'
              : 'border-green-500/30 bg-green-500/10 text-green-600'
          }`}
        >
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      )}

      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/produk"
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">Edit Produk</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{formData.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7">
          <h2 className="mb-1 text-sm font-semibold">Informasi Produk</h2>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Nama Produk *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Slug (URL)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">/produk/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Deskripsi Lengkap
            </label>
            <textarea
              value={formData.long_description}
              onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
              rows={5}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Harga *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Harga Asli
              </label>
              <input
                type="number"
                value={formData.original_price}
                onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              >
                <option value="Plugin">Plugin</option>
                <option value="Theme">Theme</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Badge
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Best Seller"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Versi
            </label>
            <input
              type="text"
              value={formData.version}
              onChange={(e) => setFormData({ ...formData, version: e.target.value })}
              placeholder="3.24.0"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Gambar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setImageFile(file)
                  setImagePreview(URL.createObjectURL(file))
                }
              }}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            {imagePreview && (
              <div className="mt-2 flex items-center gap-3">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null)
                    setImageFile(null)
                  }}
                  className="text-xs font-medium text-destructive hover:underline"
                >
                  Hapus gambar
                </button>
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="size-4 rounded border-border"
            />
            Tampilkan di homepage (featured)
          </label>
        </div>

        {/* SEO */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7">
          <h2 className="mb-1 text-sm font-semibold">SEO Meta</h2>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Meta Title
            </label>
            <input
              type="text"
              value={formData.meta_title}
              onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-xs font-medium text-muted-foreground">
                Meta Description <span className="text-muted-foreground/70">(kosongkan untuk pakai Deskripsi Singkat)</span>
              </label>
              <span
                className={`shrink-0 text-xs font-medium ${
                  formData.meta_description.length > 160 ? 'text-destructive' : 'text-muted-foreground'
                }`}
              >
                {formData.meta_description.length}/160 karakter
              </span>
            </div>
            <textarea
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Rekomendasi: maksimal 160 karakter. Ini yang tampil di hasil pencarian Google jika diisi.
            </p>
          </div>
        </div>

        {/* Variants */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Varian Harga</h2>
            <button
              type="button"
              onClick={() => setVariants([...variants, { name: '', price: '' }])}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <Plus className="size-3.5" aria-hidden /> Tambah
            </button>
          </div>
          {variants.map((v, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={v.name}
                onChange={(e) => {
                  const next = [...variants]
                  next[i] = { ...next[i], name: e.target.value }
                  setVariants(next)
                }}
                placeholder="1 Site (1 Tahun)"
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <input
                type="number"
                value={v.price}
                onChange={(e) => {
                  const next = [...variants]
                  next[i] = { ...next[i], price: e.target.value }
                  setVariants(next)
                }}
                placeholder="Harga"
                className="w-32 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setVariants(variants.filter((_, idx) => idx !== i))}
                className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Fitur Produk</h2>
            <button
              type="button"
              onClick={() => setFeatures([...features, { title: '', desc: '' }])}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <Plus className="size-3.5" aria-hidden /> Tambah
            </button>
          </div>
          {features.map((f, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={f.title}
                onChange={(e) => {
                  const next = [...features]
                  next[i] = { ...next[i], title: e.target.value }
                  setFeatures(next)
                }}
                placeholder="Nama fitur"
                className="w-1/3 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <input
                type="text"
                value={f.desc}
                onChange={(e) => {
                  const next = [...features]
                  next[i] = { ...next[i], desc: e.target.value }
                  setFeatures(next)
                }}
                placeholder="Deskripsi fitur"
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setFeatures(features.filter((_, idx) => idx !== i))}
                className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">FAQ Produk</h2>
            <button
              type="button"
              onClick={() => setFaq([...faq, { q: '', a: '' }])}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <Plus className="size-3.5" aria-hidden /> Tambah
            </button>
          </div>
          {faq.map((item, i) => (
            <div key={i} className="space-y-2 rounded-xl border border-border p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={item.q}
                  onChange={(e) => {
                    const next = [...faq]
                    next[i] = { ...next[i], q: e.target.value }
                    setFaq(next)
                  }}
                  placeholder="Pertanyaan"
                  className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setFaq(faq.filter((_, idx) => idx !== i))}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
              <textarea
                value={item.a}
                onChange={(e) => {
                  const next = [...faq]
                  next[i] = { ...next[i], a: e.target.value }
                  setFaq(next)
                }}
                placeholder="Jawaban"
                rows={2}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/produk"
            className="flex-1 rounded-xl border border-border py-3 text-center text-sm font-medium hover:bg-muted"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {submitting ? <RefreshCw className="size-4 animate-spin" aria-hidden /> : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  )
}
