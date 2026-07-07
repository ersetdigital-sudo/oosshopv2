'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Sparkles, RefreshCw, Plus, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

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

type FormData = {
  name: string
  description: string
  long_description: string
  price: string
  original_price: string
  category: string
  badge: string
  is_featured: boolean
  slug: string
  meta_title: string
  meta_description: string
}

export default function TambahProdukPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    long_description: '',
    price: '',
    original_price: '',
    category: 'Plugin',
    badge: '',
    is_featured: false,
    slug: '',
    meta_title: '',
    meta_description: '',
  })
  const [features, setFeatures] = useState<FeatureItem[]>([])
  const [faq, setFaq] = useState<FaqItem[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleGenerate() {
    if (!formData.name) return
    setGenerating(true)
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const res = await fetch('/api/generate-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ productName: formData.name }),
      })
      const data = await res.json()
      if (!res.ok) {
        showToast(data.error || 'Gagal generate', 'error')
        setGenerating(false)
        return
      }

      setFormData((prev) => ({
        ...prev,
        description: data.short_description || prev.description,
        long_description: data.long_description || prev.long_description,
        meta_title: data.meta_title || prev.meta_title,
        meta_description: data.meta_description || prev.meta_description,
      }))
      if (data.features?.length > 0) setFeatures(data.features)
      if (data.faq?.length > 0) setFaq(data.faq)

      showToast('Konten berhasil di-generate! Semua field sudah terisi.')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Terjadi kesalahan', 'error')
    } finally {
      setGenerating(false)
    }
  }

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

    let image_url: string | null = null
    if (imageFile) {
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

    const productData = {
      name: formData.name,
      description: formData.description,
      long_description: formData.long_description || null,
      price: Number(formData.price),
      original_price: formData.original_price ? Number(formData.original_price) : null,
      category: formData.category,
      badge: formData.badge || null,
      is_featured: formData.is_featured,
      image_url,
      slug: formData.slug || generateSlug(formData.name),
      meta_title: formData.meta_title || null,
      meta_description: formData.meta_description || null,
      features: features.length > 0 ? features.filter((f) => f.title) : null,
      faq: faq.length > 0 ? faq.filter((f) => f.q) : null,
    }

    const { error } = await supabase.from('products').insert([productData])
    if (error) {
      showToast('Gagal menyimpan produk: ' + error.message, 'error')
      setSubmitting(false)
      return
    }

    // Best-effort: refresh ISR cache for /katalog and the new product page
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
        <Link href="/admin/produk" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">Tambah Produk Baru</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Isi detail produk di bawah ini</p>
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })
              }
              required
              placeholder="Contoh: Elementor Pro"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {formData.slug && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                URL: /produk/<span className="text-primary">{formData.slug}</span>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!formData.name || generating}
            className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {generating ? (
              <RefreshCw className="size-4 animate-spin" aria-hidden />
            ) : (
              <Sparkles className="size-4" aria-hidden />
            )}
            {generating ? 'Generating...' : 'Generate dengan AI'}
          </button>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-xs font-medium text-muted-foreground">
                Deskripsi Singkat <span className="text-muted-foreground/70">(preview katalog & fallback meta description)</span>
              </label>
              <span
                className={`shrink-0 text-xs font-medium ${
                  formData.description.length > 160 ? 'text-destructive' : 'text-muted-foreground'
                }`}
              >
                {formData.description.length}/160 karakter
              </span>
            </div>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Rekomendasi: maksimal 160 karakter. Lebih dari itu akan terpotong di hasil pencarian Google.
            </p>
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
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Harga *</label>
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
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Badge</label>
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
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Gambar</label>
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
              <Image
                src={imagePreview}
                alt="Preview"
                width={100}
                height={100}
                className="mt-2 rounded-lg object-cover"
              />
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

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {submitting ? (
            <RefreshCw className="size-4 animate-spin" aria-hidden />
          ) : (
            'Simpan Produk'
          )}
        </button>
      </form>
    </div>
  )
}
