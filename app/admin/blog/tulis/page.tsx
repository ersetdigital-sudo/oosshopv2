'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Wand2, ImagePlus, RefreshCw } from 'lucide-react'
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
}

export default function TulisArtikelPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    title: '',
    slug: '',
    content: '',
    thumbnail: '',
    meta_title: '',
    meta_description: '',
    status: 'draft',
  })
  const [saving, setSaving] = useState(false)
  const [autoSlug, setAutoSlug] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [generatingThumb, setGeneratingThumb] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [reviseInstruction, setReviseInstruction] = useState('')
  const [revising, setRevising] = useState(false)

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleGenerateThumbnail() {
    if (!form.title || generatingThumb) return
    setGeneratingThumb(true)
    try {
      const res = await fetch('/api/generate-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title }),
      })
      const data = await res.json()
      if (!res.ok) {
        showToast(data.error || 'Gagal generate thumbnail', 'error')
      } else if (data.url) {
        setForm((prev) => ({ ...prev, thumbnail: data.url }))
        showToast('Thumbnail berhasil di-generate!')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Gagal generate thumbnail', 'error')
    }
    setGeneratingThumb(false)
  }

  async function handleGenerate() {
    if (!form.title) return
    setGenerating(true)
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ topic: form.title }),
      })
      const data = await res.json()
      if (!res.ok) {
        showToast(data.error || 'Gagal generate', 'error')
        setGenerating(false)
        return
      }
      setForm((prev) => ({
        ...prev,
        title: data.title || prev.title,
        slug: data.slug || prev.slug,
        content: data.content || '',
        meta_title: data.meta_title || prev.meta_title,
        meta_description: data.meta_description || prev.meta_description,
      }))
      setAutoSlug(false)
      showToast('Artikel berhasil di-generate! Review dan edit sebelum publish.')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Terjadi kesalahan', 'error')
    } finally {
      setGenerating(false)
    }
  }

  async function handleRevise() {
    if (!reviseInstruction.trim() || !form.content || revising) return
    setRevising(true)
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const res = await fetch('/api/revise-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ content: form.content, instruction: reviseInstruction }),
      })
      const data = await res.json()
      if (!res.ok) {
        showToast(data.error || 'Gagal revisi', 'error')
      } else {
        setForm((prev) => ({ ...prev, content: data.content }))
        setReviseInstruction('')
        showToast('Artikel berhasil direvisi!')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Terjadi kesalahan', 'error')
    }
    setRevising(false)
  }

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      ...(autoSlug ? { slug: slugify(value) } : {}),
    }))
  }

  function handleSlugChange(value: string) {
    setAutoSlug(false)
    setForm((prev) => ({ ...prev, slug: slugify(value) }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.slug) {
      showToast('Judul dan slug wajib diisi', 'error')
      return
    }
    setSaving(true)

    const payload = {
      title: form.title,
      slug: form.slug,
      content: form.content,
      thumbnail: form.thumbnail || null,
      meta_title: form.meta_title || form.title.slice(0, 60),
      meta_description: form.meta_description || '',
      status: form.status,
      published_at: form.status === 'published' ? new Date().toISOString() : null,
    }

    const { error } = await supabase.from('articles').insert([payload])
    if (error) {
      showToast('Gagal menyimpan: ' + error.message, 'error')
      setSaving(false)
      return
    }

    router.push('/admin/blog')
  }

  return (
    <div className="mx-auto max-w-4xl">
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

      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/blog" className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
        <h1 className="text-xl font-bold">Tulis Artikel Baru</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Judul Artikel *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Masukkan judul atau topik artikel"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={!form.title || generating}
          className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {generating ? (
            <RefreshCw className="size-3.5 animate-spin" aria-hidden />
          ) : (
            <Sparkles className="size-3.5" aria-hidden />
          )}
          {generating ? 'Generating artikel...' : 'Generate Artikel dengan AI'}
        </button>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Slug (URL)
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">/blog/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="slug-artikel"
              className="flex-1 rounded-xl border border-border bg-card px-4 py-3 font-mono text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Thumbnail URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={form.thumbnail}
              onChange={(e) => setForm((prev) => ({ ...prev, thumbnail: e.target.value }))}
              placeholder="https://... atau generate otomatis"
              className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={handleGenerateThumbnail}
              disabled={!form.title || generatingThumb}
              className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-xs font-semibold text-indigo-500 transition-colors hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {generatingThumb ? (
                <RefreshCw className="size-3.5 animate-spin" aria-hidden />
              ) : (
                <ImagePlus className="size-3.5" aria-hidden />
              )}
              Generate AI
            </button>
          </div>
          {form.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.thumbnail}
              alt="Preview"
              className="mt-2 h-20 w-32 rounded-lg object-cover"
            />
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Konten Artikel
          </label>
          <TipTapEditor
            content={form.content}
            onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
          />
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            Tips: Tambahkan section FAQ dengan heading H2 &quot;FAQ&quot; untuk auto-generate FAQ
            Schema di halaman artikel.
          </p>
        </div>

        {form.content && (
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <Wand2 className="size-4 text-primary" aria-hidden />
              <h3 className="text-sm font-semibold">Revisi dengan AI</h3>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={reviseInstruction}
                onChange={(e) => setReviseInstruction(e.target.value)}
                placeholder='Contoh: "Bikin pembuka lebih menarik"'
                className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-xs outline-none focus:border-primary"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleRevise()
                  }
                }}
              />
              <button
                type="button"
                onClick={handleRevise}
                disabled={!reviseInstruction.trim() || revising}
                className="shrink-0 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary disabled:opacity-40"
              >
                {revising ? 'Merevisi...' : 'Revisi'}
              </button>
            </div>
          </div>
        )}

        {/* SEO */}
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">SEO Meta</h3>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Meta Title ({form.meta_title.length}/60)
            </label>
            <input
              type="text"
              value={form.meta_title}
              onChange={(e) => setForm((prev) => ({ ...prev, meta_title: e.target.value }))}
              maxLength={60}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Meta Description ({form.meta_description.length}/155)
            </label>
            <textarea
              value={form.meta_description}
              onChange={(e) => setForm((prev) => ({ ...prev, meta_description: e.target.value }))}
              maxLength={155}
              rows={2}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Status */}
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
              {saving ? 'Menyimpan...' : 'Simpan Artikel'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
