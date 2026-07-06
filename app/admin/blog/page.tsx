'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, FileText, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Article } from '@/lib/blog'

function formatDate(dateStr: string | null) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
    setArticles((data as Article[]) || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin hapus artikel ini?')) return
    await supabase.from('articles').delete().eq('id', id)
    setArticles((prev) => prev.filter((a) => a.id !== id))
  }

  async function toggleStatus(article: Article) {
    const newStatus = article.status === 'published' ? 'draft' : 'published'
    const updates: Partial<Article> = { status: newStatus }
    if (newStatus === 'published' && !article.published_at) {
      updates.published_at = new Date().toISOString()
    }
    await supabase.from('articles').update(updates).eq('id', article.id)
    setArticles((prev) => prev.map((a) => (a.id === article.id ? { ...a, ...updates } : a)))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">Blog</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{articles.length} artikel</p>
        </div>
        <Link
          href="/admin/blog/tulis"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
        >
          <Plus className="size-4" aria-hidden />
          Tulis Artikel
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted">
            <FileText className="size-8 text-muted-foreground" aria-hidden />
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Belum ada artikel. Mulai tulis artikel pertama!
          </p>
          <Link
            href="/admin/blog/tulis"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Tulis Artikel Baru
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
            >
              {article.thumbnail && (
                <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-20">
                  <Image
                    src={article.thumbnail}
                    alt=""
                    width={80}
                    height={80}
                    className="size-full object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold sm:text-base">{article.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">/blog/{article.slug}</p>
                  </div>
                  <button
                    onClick={() => toggleStatus(article)}
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      article.status === 'published'
                        ? 'bg-emerald-500/15 text-emerald-600'
                        : 'bg-amber-500/15 text-amber-600'
                    }`}
                  >
                    {article.status === 'published' ? 'Published' : 'Draft'}
                  </button>
                </div>

                <div className="mt-2.5 flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(article.published_at || article.created_at)}
                  </span>
                  <Link
                    href={`/admin/blog/edit/${article.id}`}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-xs font-medium text-destructive hover:underline"
                  >
                    Hapus
                  </button>
                  {article.status === 'published' && (
                    <a
                      href={`/blog/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Lihat <ExternalLink className="size-3" aria-hidden />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
