'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { TipTapEditor } from '@/components/tiptap-editor'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

type FormState = {
  title: string
  slug: string
  content: string
  thumbnail: string
  meta_title: string
  meta_description: string
  status: 'draft' | 'published'
  category_id: string
  article_type_id: string
}

export default function EditArtikelPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [form, setForm] = useState<FormState>({
    title: '',
    slug: '',
    content: '',
    thumbnail: '',
    meta_title: '',
    meta_description: '',
    status: 'draft',
    category_id: '',
    article_type_id: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [articleTypes, setArticleTypes] = useState<{ id: string; name: string; color: string }[]>([])

  useEffect(() => {
    async function fetchArticle() {
      const [articleRes, catRes, typeRes] = await Promise.all([
        supabase.from('articles').select('*').eq('id', params.id).single(),
        supabase.from('categories').select('id, name').eq('is_active', true).order('sort_order'),
        supabase.from('article_types').select('id, name, color').order('name'),
      ])

      if (catRes.data) setCategories(catRes.data)
      if (typeRes.data) setArticleTypes(typeRes.data)

      if (articleRes.data) {
        const data = articleRes.data
        // Get category for this article
        const { data: catLink } = await supabase
          .from('article_categories')
          .select('category_id')
          .eq('article_id', params.id)
          .limit(1)
          .single()

        setForm({
          title: data.title || '',
          slug: data.slug || '',
          content: data.content || '',
          thumbnail: data.thumbnail || '',
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
          status: data.status || 'draft',
          category_id: catLink?.category_id || '',
          article_type_id: data.article_type_id || '',
        })
      }
      setLoading(false)
    }
    if (params.id) fetchArticle()
  }, [params.id])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.slug) {
      alert('Judul dan slug wajib diisi')
      return
    }
    setSaving(true)

    const payload: Record<string, unknown> = {
      title: form.title,
      slug: form.slug,
      content: form.content,
      thumbnail: form.thumbnail || null,
      meta_title: form.meta_title || form.title.slice(0, 60),
      meta_description: form.meta_description || '',
      status: form.status,
      updated_at: new Date().toISOString(),
      article_type_id: form.article_type_id || null,
    }
    if (form.status === 'published') {
      payload.published_at = new Date().toISOString()
    }

    const { error } = await supabase.from('articles').update(payload).eq('id', params.id)
    if (error) {
      alert('Gagal update: ' + error.message)
      setSaving(false)
      return
    }

    // Update category
    await supabase.from('article_categories').delete().eq('article_id', params.id)
    if (form.category_id) {
      await supabase.from('article_categories').insert({ article_id: params.id, category_id: form.category_id })
    }

    router.push('/admin/blog')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="size-6 animate-spin text-muted-foreground" aria-hidden />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/blog"
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
        <h1 className="text-xl font-bold">Edit Artikel</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Judul Artikel *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Slug (URL)
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">/blog/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
              className="flex-1 rounded-xl border border-border bg-card px-4 py-3 font-mono text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Thumbnail URL
          </label>
          <input
            type="url"
            value={form.thumbnail}
            onChange={(e) => setForm((prev) => ({ ...prev, thumbnail: e.target.value }))}
            placeholder="https://..."
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {form.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.thumbnail}
              alt="Preview"
              className="mt-2 h-20 w-32 rounded-lg object-cover"
            />
          )}
        </div>

        {/* Category & Article Type */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Kategori *
            </label>
            <select
              value={form.category_id}
              onChange={(e) => setForm((prev) => ({ ...prev, category_id: e.target.value }))}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Pilih kategori...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Article Type *
            </label>
            <select
              value={form.article_type_id}
              onChange={(e) => setForm((prev) => ({ ...prev, article_type_id: e.target.value }))}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Pilih tipe artikel...</option>
              {articleTypes.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Konten Artikel
          </label>
          <TipTapEditor
            content={form.content}
            onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
          />
        </div>

        <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">SEO Meta</h3>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Meta Title ({form.meta_title.length}/60)
            </label>
            <input
              type="text"
              value={form.meta_title}
              onChange={(e) => setForm((prev) => ({ ...prev, meta_title: e.target.value.slice(0, 60) }))}
              maxLength={60}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Meta Description ({form.meta_description.length}/160)
            </label>
            <textarea
              value={form.meta_description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, meta_description: e.target.value.slice(0, 160) }))
              }
              maxLength={160}
              rows={2}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-col items-stretch justify-between gap-4 border-t border-border pt-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-muted-foreground">Status:</label>
            <select
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
              className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/blog" className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground">
              Batal
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? 'Menyimpan...' : 'Update Artikel'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
