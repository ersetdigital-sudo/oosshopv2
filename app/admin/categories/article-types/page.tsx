'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { ArticleType } from '@/lib/article-types'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

type FormState = {
  id?: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
}

const emptyForm: FormState = {
  name: '',
  slug: '',
  description: '',
  color: '#5B5CEB',
  icon: '',
}

export default function AdminArticleTypesPage() {
  const [types, setTypes] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  async function fetchTypes() {
    const { data } = await supabase
      .from('article_types')
      .select('*')
      .order('name', { ascending: true })
    setTypes((data as ArticleType[]) || [])
    setLoading(false)
  }

  function handleNew() {
    setForm(emptyForm)
    setShowForm(true)
  }

  function handleEdit(t: ArticleType) {
    setForm({
      id: t.id,
      name: t.name,
      slug: t.slug,
      description: t.description || '',
      color: t.color || '#5B5CEB',
      icon: t.icon || '',
    })
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.name || !form.slug) {
      showToast('Nama dan slug wajib diisi', 'error')
      return
    }
    setSaving(true)

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      color: form.color || '#5B5CEB',
      icon: form.icon || null,
    }

    if (form.id) {
      const { error } = await supabase.from('article_types').update(payload).eq('id', form.id)
      if (error) {
        showToast('Gagal update: ' + error.message, 'error')
        setSaving(false)
        return
      }
      showToast('Article type berhasil diupdate!')
    } else {
      const { error } = await supabase.from('article_types').insert([payload])
      if (error) {
        showToast('Gagal simpan: ' + error.message, 'error')
        setSaving(false)
        return
      }
      showToast('Article type berhasil ditambahkan!')
    }

    setSaving(false)
    setShowForm(false)
    setForm(emptyForm)
    fetchTypes()
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin hapus article type ini?')) return
    await supabase.from('article_types').delete().eq('id', id)
    setTypes((prev) => prev.filter((t) => t.id !== id))
    showToast('Article type dihapus')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
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

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/categories" className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
            <ArrowLeft className="size-5" aria-hidden />
          </Link>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Article Types</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{types.length} tipe artikel</p>
          </div>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" aria-hidden />
          Tambah
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold">{form.id ? 'Edit Article Type' : 'Tambah Article Type'}</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Nama *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.id ? form.slug : slugify(e.target.value) })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="Guide"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-primary"
                  placeholder="guide"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Deskripsi</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="Panduan lengkap step-by-step"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Warna</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="size-9 cursor-pointer rounded-lg border border-border"
                    />
                    <input
                      type="text"
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Icon (emoji)</label>
                  <input
                    type="text"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                    placeholder="📖"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => { setShowForm(false); setForm(emptyForm) }}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Types Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {types.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-xl text-lg"
              style={{ backgroundColor: `${t.color}20`, color: t.color }}
            >
              {t.icon || t.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold">{t.name}</h3>
              {t.description && (
                <p className="truncate text-xs text-muted-foreground">{t.description}</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(t)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                title="Edit"
              >
                <Pencil className="size-4" />
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
                title="Hapus"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Link to categories */}
      <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Article Type adalah metadata jenis artikel (Guide, Tutorial, Review, dll). Bukan kategori topik.
        </p>
      </div>
    </div>
  )
}
