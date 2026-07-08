'use client'
import { useState, useEffect } from 'react'
import { Save, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const SETTINGS_KEYS = [
  'gemini_api_key',
  'ai_provider',
  'ai_model',
  'ai_blog_model',
  'admin_phone',
  'fonnte_api_key',
 'social_instagram',
 'social_facebook',
 'social_shopee',
 'social_tiktok',
 'social_telegram',
]

export default function AdminSettingsPage() {
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [geminiKey, setGeminiKey] = useState('')
  const [showGeminiKey, setShowGeminiKey] = useState(false)
  const [aiModel, setAiModel] = useState('')
  const [aiBlogModel, setAiBlogModel] = useState('')
  const [adminPhone, setAdminPhone] = useState('')
  const [fonnteKey, setFonnteKey] = useState('')
  const [showFonnteKey, setShowFonnteKey] = useState(false)
  const [socialIG, setSocialIG] = useState('')
  const [socialFB, setSocialFB] = useState('')
  const [socialShopee, setSocialShopee] = useState('')
  const [socialTiktok, setSocialTiktok] = useState('')
  const [socialTelegram, setSocialTelegram] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    const { data } = await supabase.from('settings').select('*').in('key', SETTINGS_KEYS)
    if (data) {
      setGeminiKey(data.find((d) => d.key === 'gemini_api_key')?.value || '')
      setAiModel(data.find((d) => d.key === 'ai_model')?.value || '')
      setAiBlogModel(data.find((d) => d.key === 'ai_blog_model')?.value || '')
      setAdminPhone(data.find((d) => d.key === 'admin_phone')?.value || '')
      setFonnteKey(data.find((d) => d.key === 'fonnte_api_key')?.value || '')
      setSocialIG(data.find((d) => d.key === 'social_instagram')?.value || '')
      setSocialFB(data.find((d) => d.key === 'social_facebook')?.value || '')
      setSocialShopee(data.find((d) => d.key === 'social_shopee')?.value || '')
      setSocialTiktok(data.find((d) => d.key === 'social_tiktok')?.value || '')
      setSocialTelegram(data.find((d) => d.key === 'social_telegram')?.value || '')
    }
    setLoaded(true)
  }

  async function saveSettings() {
    setSaving(true)
    await Promise.all([
      supabase.from('settings').upsert({ key: 'gemini_api_key', value: geminiKey }, { onConflict: 'key' }),
      supabase.from('settings').upsert({ key: 'ai_provider', value: 'openagentic' }, { onConflict: 'key' }),
      supabase.from('settings').upsert({ key: 'ai_model', value: aiModel }, { onConflict: 'key' }),
      supabase.from('settings').upsert({ key: 'ai_blog_model', value: aiBlogModel }, { onConflict: 'key' }),
      supabase.from('settings').upsert({ key: 'admin_phone', value: adminPhone }, { onConflict: 'key' }),
      supabase.from('settings').upsert({ key: 'fonnte_api_key', value: fonnteKey }, { onConflict: 'key' }),
      supabase.from('settings').upsert({ key: 'social_instagram', value: socialIG }, { onConflict: 'key' }),
      supabase.from('settings').upsert({ key: 'social_facebook', value: socialFB }, { onConflict: 'key' }),
      supabase.from('settings').upsert({ key: 'social_shopee', value: socialShopee }, { onConflict: 'key' }),
      supabase.from('settings').upsert({ key: 'social_tiktok', value: socialTiktok }, { onConflict: 'key' }),
      supabase.from('settings').upsert({ key: 'social_telegram', value: socialTelegram }, { onConflict: 'key' }),
    ])
    setSaving(false)
  }

  if (!loaded) {
    return <div className="p-6 text-sm text-muted-foreground">Memuat...</div>
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold">Pengaturan</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Integrasi AI, WhatsApp, dan konfigurasi umum
        </p>
      </div>

      {/* AI Integration */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h3 className="mb-1 text-sm font-semibold">Integrasi AI — Generate Konten Produk</h3>
        <p className="mb-5 text-xs text-muted-foreground">
          Generate deskripsi produk, SEO meta, fitur, dan FAQ otomatis dengan AI (via OpenAgentic.id)
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">API Key</label>
            <div className="relative">
              <input
                type={showGeminiKey ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Masukkan API key dari OpenAgentic.id"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-12 text-sm font-mono outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => setShowGeminiKey(!showGeminiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showGeminiKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Daftar gratis di{' '}
              <a
                href="https://openagentic.id/register"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                openagentic.id
              </a>{' '}
              → Dashboard → API Keys
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Model untuk Produk
            </label>
            <input
              type="text"
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              placeholder="misal: claude-sonnet-4.5"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1.5 text-[10px] text-muted-foreground">
              Cek daftar model tersedia di dashboard OpenAgentic.id. Dipakai saat generate di form
              tambah produk.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Model untuk Blog (opsional)
            </label>
            <input
              type="text"
              value={aiBlogModel}
              onChange={(e) => setAiBlogModel(e.target.value)}
              placeholder="Kosongkan untuk pakai model produk"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* WhatsApp Integration */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h3 className="mb-1 text-sm font-semibold">Notifikasi WhatsApp (Fonnte)</h3>
        <p className="mb-5 text-xs text-muted-foreground">
          Kirim notifikasi otomatis saat ada pesanan baru atau selesai
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Fonnte API Key
            </label>
            <div className="relative">
              <input
                type={showFonnteKey ? 'text' : 'password'}
                value={fonnteKey}
                onChange={(e) => setFonnteKey(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-12 text-sm font-mono outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => setShowFonnteKey(!showFonnteKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showFonnteKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              No WA Admin (notif order masuk)
            </label>
            <input
              type="tel"
              value={adminPhone}
              onChange={(e) => setAdminPhone(e.target.value)}
              placeholder="6285212150100"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1.5 text-[11px] text-muted-foreground">Format: 628xxx (tanpa + atau 0)</p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h3 className="mb-1 text-sm font-semibold">Social Media</h3>
        <p className="mb-5 text-xs text-muted-foreground">Link akun sosial media yang tampil di footer website</p>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Instagram</label>
            <input type="text" value={socialIG} onChange={(e) => setSocialIG(e.target.value)} placeholder="https://instagram.com/..." className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Facebook</label>
            <input type="text" value={socialFB} onChange={(e) => setSocialFB(e.target.value)} placeholder="https://facebook.com/..." className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Shopee</label>
            <input type="text" value={socialShopee} onChange={(e) => setSocialShopee(e.target.value)} placeholder="https://shopee.co.id/..." className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">TikTok</label>
            <input type="text" value={socialTiktok} onChange={(e) => setSocialTiktok(e.target.value)} placeholder="https://tiktok.com/@..." className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Telegram</label>
            <input type="text" value={socialTelegram} onChange={(e) => setSocialTelegram(e.target.value)} placeholder="https://t.me/..." className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
        </div>
      </div>

      <button
        onClick={saveSettings}
        disabled={saving}
        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {saving ? (
          <>
            <div className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
            Menyimpan...
          </>
        ) : (
          <>
            <Save className="size-4" aria-hidden />
            Simpan Pengaturan
          </>
        )}
      </button>
    </div>
  )
}
