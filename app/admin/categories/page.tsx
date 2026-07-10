'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Category } from '@/lib/categories'

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
  icon: string
  cover_image: string
  seo_title: string
  seo_description: string
  is_active: boolean
}

const emptyForm: FormState = {
  name: '',
  slug: '',
  description: '',
  icon: '',
  cover_image: '',
  seo_title: '',
  seo_description: '',
  is_active: true,
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
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
    fetchCategories()
  }, [])

  async function fetchCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
    setCategories((data as Category[]) || [])
    setLoading(false)
  }

  function handleNew() {
    setForm(emptyForm)
    setShowForm(true)
  }

  function handleEdit(cat: Category) {
    setForm({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      icon: cat.icon || '',
      cover_image: cat.cover_image || '',
      seo_title: cat.seo_title || '',
      seo_description: cat.seo_description || '',
      is_active: cat.is_active,
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
      icon: form.icon || null,
      cover_image: form.cover_image || null,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      is_active: form.is_active,
      updated_at: new Date().toISOString(),
    }

    if (form.id) {
      const { error } = await supabase.from('categories').update(payload).eq('id', form.id)
      if (error) {
        showToast('Gagal update: ' + error.message, 'error')
        setSaving(false)
        return
      }
      showToast('Kategori berhasil diupdate!')
    } else {
      const maxOrder = categories.length > 0 ? Math.max(...categories.map((c) => c.sort_order)) : 0
      const { error } = await supabase.from('categories').insert([{ ...payload, sort_order: maxOrder + 1 }])
      if (error) {
        showToast('Gagal simpan: ' + error.message, 'error')
        setSaving(false)
        return
      }
      showToast('Kategori berhasil ditambahkan!')
    }

    setSaving(false)
    setShowForm(false)
    setForm(emptyForm)
    fetchCategories()
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin hapus kategori ini? Artikel yang terhubung tidak akan terhapus.')) return
    await supabase.from('categories').delete().eq('id', id)
    setCategories((prev) => prev.filter((c) => c.id !== id))
    showToast('Kategori dihapus')
  }

  async function handleToggleActive(cat: Category) {
    const newActive = !cat.is_active
    await supabase.from('categories').update({ is_active: newActive }).eq('id', cat.id)
    setCategories((prev) =>
      prev.map((c) => (c.id === cat.id ? { ...c, is_active: newActive } : c))
    )
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return
    const updated = [...categories]
    const temp = updated[index - 1]
    updated[index - 1] = updated[index]
    updated[index] = temp

    // Update sort_order in DB
    await supabase.from('categories').update({ sort_order: index - 1 }).eq('id', updated[index - 1].id)
    await supabase.from('categories').update({ sort_order: index }).eq('id', updated[index].id)

    setCategories(updated.map((c, i) => ({ ...c, sort_order: i })))
  }

  async function handleMoveDown(index: number) {
    if (index === categories.length - 1) return
    const updated = [...categories]
    const temp = updated[index + 1]
    updated[index + 1] = updated[index]
    updated[index] = temp

    await supabase.from('categories').update({ sort_order: index + 1 }).eq('id', updated[index + 1].id)
    await supabase.from('categories').update({ sort_order: index }).eq('id', updated[index].id)

    setCategories(updated.map((c, i) => ({ ...c, sort_order: i })))
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
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">Kategori Blog</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{categories.length} kategori</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/categories/article-types"
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted"
          >
            Article Types
          </Link>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" aria-hidden />
            Tambah
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold">{form.id ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Nama *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.id ? form.slug : slugify(e.target.value) })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="Elementor"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 font-mono text-sm outline-none focus:border-primary"
                  placeholder="elementor"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Deskripsi</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  rows={2}
                  placeholder="Deskripsi singkat kategori"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Icon (emoji/text)</label>
                  <input
                    type="text"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                    placeholder="🔧"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Cover Image URL</label>
                  <input
                    type="text"
                    value={form.cover_image}
                    onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">SEO Title</label>
                <input
                  type="text"
                  value={form.seo_title}
                  onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="max 60 karakter"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">SEO Description</label>
                <input
                  type="text"
                  value={form.seo_description}
                  onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="max 155 karakter"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="size-4 rounded border-border"
                />
                Aktif (tampil di frontend)
              </label>
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

      {/* Category List */}
      <div className="space-y-2">
        {categories.map((cat, index) => (
          <div
            key={cat.id}
            className={`flex items-center gap-3 rounded-2xl border border-border bg-card p-4 ${!cat.is_active ? 'opacity-50' : ''}`}
          >
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="rounded p-0.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
                aria-label="Move up"
              >
                <GripVertical className="size-4 rotate-0" />
              </button>
            </div>

            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg">
              {cat.icon || cat.name.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">/blog/category/{cat.slug}</p>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleToggleActive(cat)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                title={cat.is_active ? 'Nonaktifkan' : 'Aktifkan'}
              >
                {cat.is_active ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </button>
              <button
                onClick={() => handleEdit(cat)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                title="Edit"
              >
                <Pencil className="size-4" />
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
                title="Hapus"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
