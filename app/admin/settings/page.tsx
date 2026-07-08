'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminSettingsPage() {
  const [banks, setBanks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingBank, setEditingBank] = useState(null)
  const [formData, setFormData] = useState({ bank_name: '', account_name: '', account_number: '', type: 'bank' })
  const [submitting, setSubmitting] = useState(false)
  // Fonnte settings
  const [fonnteKey, setFonnteKey] = useState('')
  const [fonnteMessage, setFonnteMessage] = useState('Halo {nama}! \u{1F44B}\n\n\u2705 *Pesanan Kamu Sudah Selesai!*\n\n\u{1F4CB} Detail Order:\nInvoice : {invoice}\nProduk  : {items}\nDomain  : {domain}\n\nPlugin sudah berhasil diinstal di website kamu. Silakan cek WordPress Dashboard kamu ya!\n\nJika ada kendala, balas pesan ini.\nTerima kasih sudah belanja di OOS SHOP! \u{1F64F}')
  const [adminPhone, setAdminPhone] = useState('6285212150100')
  const [fonnteSaving, setFonnteSaving] = useState(false)
  const [fonnteLoaded, setFonnteLoaded] = useState(false)
  const [showFonnteKey, setShowFonnteKey] = useState(false)
  // AI settings
  const [geminiKey, setGeminiKey] = useState('')
  const [showGeminiKey, setShowGeminiKey] = useState(false)
  const [geminiSaving, setGeminiSaving] = useState(false)
  const [aiProvider, setAiProvider] = useState('openagentic')
  const [aiModel, setAiModel] = useState('')
  const [aiBlogModel, setAiBlogModel] = useState('')
  const [activeTab, setActiveTab] = useState('bank')
  // Payment gateway settings
  const [pgEnabled, setPgEnabled] = useState(false)
  const [pgSaving, setPgSaving] = useState(false)
  // Social media settings
  const [social, setSocial] = useState({ instagram: '', facebook: '', shopee: '', tiktok: '', telegram: '' })
  const [socialSaving, setSocialSaving] = useState(false)
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error'} | null>(null)

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    fetchBanks()
    fetchFonnteSettings()
  }, [])
  async function fetchFonnteSettings() {
    const { data } = await supabase
      .from('settings')
      .select('*')
      .in('key', ['fonnte_api_key', 'fonnte_message', 'admin_phone', 'gemini_api_key', 'ai_provider', 'ai_model', 'ai_blog_model', 'payment_gateway_enabled', 'social_instagram', 'social_facebook', 'social_shopee', 'social_tiktok', 'social_telegram'])
    if (data) {
      const keyRow = data.find(d => d.key === 'fonnte_api_key')
      const msgRow = data.find(d => d.key === 'fonnte_message')
      const phoneRow = data.find(d => d.key === 'admin_phone')
      const geminiRow = data.find(d => d.key === 'gemini_api_key')
      const providerRow = data.find(d => d.key === 'ai_provider')
      const modelRow = data.find(d => d.key === 'ai_model')
      const blogModelRow = data.find(d => d.key === 'ai_blog_model')
      if (keyRow) setFonnteKey(keyRow.value)
      if (msgRow) setFonnteMessage(msgRow.value)
      if (phoneRow) setAdminPhone(phoneRow.value)
      if (geminiRow) setGeminiKey(geminiRow.value)
      if (providerRow) setAiProvider(providerRow.value)
      if (modelRow) setAiModel(modelRow.value)
      if (blogModelRow) setAiBlogModel(blogModelRow.value)
      const pgRow = data.find(d => d.key === 'payment_gateway_enabled')
      if (pgRow) setPgEnabled(pgRow.value === 'true')
      setSocial({
        instagram: data.find(d => d.key === 'social_instagram')?.value || '',
        facebook: data.find(d => d.key === 'social_facebook')?.value || '',
        shopee: data.find(d => d.key === 'social_shopee')?.value || '',
        tiktok: data.find(d => d.key === 'social_tiktok')?.value || '',
        telegram: data.find(d => d.key === 'social_telegram')?.value || '',
      })
    }
    setFonnteLoaded(true)
  }

  async function saveFonnteSettings() {
    setFonnteSaving(true)
    await supabase.from('settings').upsert({ key: 'fonnte_api_key', value: fonnteKey }, { onConflict: 'key' })
    await supabase.from('settings').upsert({ key: 'fonnte_message', value: fonnteMessage }, { onConflict: 'key' })
    await supabase.from('settings').upsert({ key: 'admin_phone', value: adminPhone }, { onConflict: 'key' })
    setFonnteSaving(false)
    showToast('Pengaturan WhatsApp berhasil disimpan!')
  }

  async function saveGeminiSettings() {
    setGeminiSaving(true)
    await supabase.from('settings').upsert({ key: 'gemini_api_key', value: geminiKey }, { onConflict: 'key' })
    await supabase.from('settings').upsert({ key: 'ai_provider', value: aiProvider }, { onConflict: 'key' })
    await supabase.from('settings').upsert({ key: 'ai_model', value: aiModel }, { onConflict: 'key' })
    await supabase.from('settings').upsert({ key: 'ai_blog_model', value: aiBlogModel }, { onConflict: 'key' })
    setGeminiSaving(false)
    showToast('Pengaturan AI berhasil disimpan!')
  }

  async function saveSocialSettings() {
    setSocialSaving(true)
    await supabase.from('settings').upsert({ key: 'social_instagram', value: social.instagram }, { onConflict: 'key' })
    await supabase.from('settings').upsert({ key: 'social_facebook', value: social.facebook }, { onConflict: 'key' })
    await supabase.from('settings').upsert({ key: 'social_shopee', value: social.shopee }, { onConflict: 'key' })
    await supabase.from('settings').upsert({ key: 'social_tiktok', value: social.tiktok }, { onConflict: 'key' })
    await supabase.from('settings').upsert({ key: 'social_telegram', value: social.telegram }, { onConflict: 'key' })
    setSocialSaving(false)
    showToast('Social media berhasil disimpan!')
  }

  async function fetchBanks() {
    const { data } = await supabase.from('bank_accounts').select('*').order('created_at', { ascending: true })
    setBanks(data || [])
  }

  function openForm(bank = null) {
    if (bank) {
      setEditingBank(bank)
      setFormData({ bank_name: bank.bank_name, account_name: bank.account_name, account_number: bank.account_number, type: bank.type || 'bank' })
    } else {
      setEditingBank(null)
      // Auto-set type based on active tab
      const autoType = activeTab === 'ewallet' ? 'ewallet' : 'bank'
      setFormData({ bank_name: '', account_name: '', account_number: '', type: autoType })
    }
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    if (editingBank) {
      await supabase.from('bank_accounts').update(formData).eq('id', editingBank.id)
    } else {
      await supabase.from('bank_accounts').insert([{ ...formData, is_active: true }])
    }
    setShowForm(false)
    setSubmitting(false)
    fetchBanks()
  }

  async function handleDelete(id) {
    if (!confirm('Yakin ingin menghapus rekening ini?')) return
    await supabase.from('bank_accounts').delete().eq('id', id)
    fetchBanks()
  }

  async function toggleActive(id, currentActive) {
    await supabase.from('bank_accounts').update({ is_active: !currentActive }).eq('id', id)
    fetchBanks()
  }

  const tabs = [
    { key: 'bank', label: 'Bank Transfer', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    )},
    { key: 'ewallet', label: 'E-Wallet', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    )},
    { key: 'whatsapp', label: 'WhatsApp', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
    )},
    { key: 'ai', label: 'Integrasi AI', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
    )},
    { key: 'payment', label: 'Payment Gateway', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
    )},
    { key: 'social', label: 'Social Media', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
    )},
  ]

  // Filter banks by type based on active tab
  const ewalletNames = ['dana', 'ovo', 'gopay', 'shopeepay', 'linkaja', 'isaku']
  const filteredBanks = banks.filter(b => {
    const name = b.bank_name.toLowerCase()
    const isEwallet = b.type === 'ewallet' || ewalletNames.some(ew => name.includes(ew))
    if (activeTab === 'ewallet') return isEwallet
    if (activeTab === 'bank') return !isEwallet
    return false
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 rounded-xl border px-5 py-3.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 ${
          toast.type === 'error'
            ? 'border-red-500/30 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
            : 'border-green-500/30 bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20'
        }`}>
          {toast.type === 'success' ? (
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ) : (
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )}
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      )}
      {/* Header */}
      <div>
        <h2 className="font-heading text-xl font-bold text-white">Pengaturan</h2>
        <p className="text-muted-foreground text-sm mt-0.5">Kelola rekening pembayaran dan notifikasi WhatsApp</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1.5 sm:gap-2 p-1 bg-dark-900/60 border border-dark-800 rounded-xl w-full sm:w-fit overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-1 sm:flex-none justify-center sm:justify-start ${
              activeTab === tab.key
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.key === 'bank' ? 'Bank' : tab.key === 'ewallet' ? 'E-Wallet' : tab.key === 'whatsapp' ? 'WA' : tab.key === 'ai' ? 'AI' : tab.key === 'payment' ? 'Bayar' : 'Social'}</span>
          </button>
        ))}
      </div>

      {/* Bank / E-Wallet Tab */}
      {(activeTab === 'bank' || activeTab === 'ewallet') && (
        <div className="space-y-4">
          {/* Add Button */}
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground text-sm">{filteredBanks.length} {activeTab === 'ewallet' ? 'e-wallet' : 'rekening'} terdaftar</p>
            <button onClick={() => openForm()} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Tambah {activeTab === 'ewallet' ? 'E-Wallet' : 'Rekening'}
            </button>
          </div>

          {/* List */}
          {filteredBanks.length === 0 ? (
            <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-dark-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </div>
              <p className="text-muted-foreground text-sm">Belum ada {activeTab === 'ewallet' ? 'e-wallet' : 'rekening'}. Tambahkan agar muncul di halaman pembayaran.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBanks.map(bank => (
                <div key={bank.id} className={`bg-dark-900/60 border border-dark-800 rounded-2xl p-5 hover:border-dark-700 transition-all ${!bank.is_active ? 'opacity-50' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-dark-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-dark-700">
                        <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-foreground font-semibold text-sm">{bank.bank_name}</p>
                          {!bank.is_active && (
                            <span className="text-[10px] px-2 py-0.5 bg-dark-800 text-dark-400 rounded-full border border-dark-700">Nonaktif</span>
                          )}
                        </div>
                        <p className="text-foreground font-mono text-base font-bold">{bank.account_number}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">a.n. {bank.account_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-16 sm:ml-0">
                      <button
                        onClick={() => toggleActive(bank.id, bank.is_active)}
                        className={`p-2 rounded-lg border transition-all ${bank.is_active ? 'text-green-400 bg-green-500/10 border-green-500/20 hover:bg-green-500 hover:text-white' : 'text-dark-400 bg-dark-800 border-dark-700 hover:bg-dark-700 hover:text-white'}`}
                        title={bank.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={bank.is_active ? "M5 13l4 4L19 7" : "M12 8v4m0 4h.01"} /></svg>
                      </button>
                      <button
                        onClick={() => openForm(bank)}
                        className="p-2 text-dark-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg border border-transparent hover:border-primary-500/20 transition-all"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button
                        onClick={() => handleDelete(bank.id)}
                        className="p-2 text-dark-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg border border-transparent hover:border-red-500/20 transition-all"
                        title="Hapus"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* WhatsApp Tab */}
      {activeTab === 'whatsapp' && fonnteLoaded && (
        <div className="space-y-4">
          <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm">Notifikasi WhatsApp (Fonnte)</h3>
                <p className="text-muted-foreground text-xs">Kirim notifikasi otomatis ke customer saat pesanan selesai</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* API Key */}
              <div>
                <label className="text-dark-300 text-xs font-medium mb-2 block">Fonnte API Key</label>
                <div className="relative">
                  <input
                    type={showFonnteKey ? 'text' : 'password'}
                    value={fonnteKey}
                    onChange={e => setFonnteKey(e.target.value)}
                    placeholder="Masukkan API key dari fonnte.com"
                    className="w-full px-4 py-3 pr-12 bg-dark-800/70 border border-dark-700 rounded-xl text-foreground text-sm placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowFonnteKey(!showFonnteKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-dark-500 hover:text-dark-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showFonnteKey ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                    </svg>
                  </button>
                </div>
                <p className="text-dark-500 text-[11px] mt-1.5 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Tersimpan aman di database
                </p>
              </div>

              {/* Admin Phone */}
              <div>
                <label className="text-dark-300 text-xs font-medium mb-2 block">No WA Admin (notif order masuk)</label>
                <input
                  type="tel"
                  value={adminPhone}
                  onChange={e => setAdminPhone(e.target.value)}
                  placeholder="6285212150100"
                  className="w-full px-4 py-3 bg-dark-800/70 border border-dark-700 rounded-xl text-foreground text-sm placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
                <p className="text-dark-500 text-[11px] mt-1.5">Format: 628xxx (tanpa + atau 0)</p>
              </div>

              {/* Message Template */}
              <div>
                <label className="text-dark-300 text-xs font-medium mb-2 block">Template Pesan</label>
                <textarea
                  value={fonnteMessage}
                  onChange={e => setFonnteMessage(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-800/70 border border-dark-700 rounded-xl text-foreground text-sm placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none font-mono leading-relaxed"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {['{nama}', '{invoice}', '{items}', '{domain}'].map(v => (
                    <span key={v} className="text-[11px] text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-md border border-primary-500/20">{v}</span>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={saveFonnteSettings}
                disabled={fonnteSaving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
              >
                {fonnteSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Simpan Pengaturan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Integration Tab */}
      {activeTab === 'ai' && fonnteLoaded && (
        <div className="space-y-4">
          <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm">Integrasi AI — Generate Konten Produk</h3>
                <p className="text-muted-foreground text-xs">Generate deskripsi produk, SEO meta, fitur, dan FAQ otomatis dengan AI</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Provider Selection */}
              <div>
                <label className="text-dark-300 text-xs font-medium mb-2 block">AI Provider</label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="p-3 rounded-xl border bg-primary-600/15 border-primary-500/30 ring-1 ring-primary-500/20">
                    <p className="text-sm font-semibold text-primary-400">OpenAgentic.id</p>
                    <p className="text-dark-500 text-[10px] mt-0.5">Claude, GPT, DeepSeek (IDR)</p>
                  </div>
                </div>
              </div>

              {/* API Key */}
              <div>
                <label className="text-dark-300 text-xs font-medium mb-2 block">API Key</label>
                <div className="relative">
                  <input
                    type={showGeminiKey ? 'text' : 'password'}
                    value={geminiKey}
                    onChange={e => setGeminiKey(e.target.value)}
                    placeholder="Masukkan API key dari OpenAgentic.id"
                    className="w-full px-4 py-3 pr-12 bg-dark-800/70 border border-dark-700 rounded-xl text-foreground text-sm placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowGeminiKey(!showGeminiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-dark-500 hover:text-dark-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showGeminiKey ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                    </svg>
                  </button>
                </div>
                <p className="text-dark-500 text-[11px] mt-1.5">
                  Daftar gratis di <a href="https://openagentic.id/register" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">openagentic.id</a> → Dashboard → API Keys
                </p>
              </div>

              {/* Model Selection */}
              <div>
                  <label className="text-dark-300 text-xs font-medium mb-2 block">Model untuk Produk</label>
                  <select value={aiModel} onChange={e => setAiModel(e.target.value)} className="w-full px-4 py-3 bg-dark-800/70 border border-dark-700 rounded-xl text-foreground text-sm focus:outline-none focus:border-primary-500 transition-all">
                    <option value="">— Pilih Model —</option>
                    <optgroup label="🆓 Gratis (Free Tier)">
                      <option value="claude-sonnet-4.5">Claude Sonnet 4.5 (Free)</option>
                      <option value="claude-sonnet-4.5-1m">Claude Sonnet 4.5 1M (Free)</option>
                      <option value="open-agentic">Open Agentic (Free)</option>
                      <option value="deepseek-3.2">DeepSeek 3.2 (Free)</option>
                      <option value="deepseek-v4-flash">DeepSeek V4 Flash (Free)</option>
                      <option value="minimax-m2.5">MiniMax M2.5 (Free)</option>
                      <option value="minimax-m2.1">MiniMax M2.1 (Free)</option>
                      <option value="glm-5">GLM-5 Zhipu AI (Free)</option>
                    </optgroup>
                    <optgroup label="🧠 Anthropic (PRO)">
                      <option value="claude-opus-4.8">Claude Opus 4.8</option>
                      <option value="claude-opus-4.8-thinking">Claude Opus 4.8 Thinking</option>
                      <option value="claude-opus-4.7">Claude Opus 4.7</option>
                      <option value="claude-opus-4.7-thinking">Claude Opus 4.7 Thinking</option>
                      <option value="claude-opus-4.6">Claude Opus 4.6</option>
                      <option value="claude-opus-4.6-thinking">Claude Opus 4.6 Thinking</option>
                      <option value="claude-sonnet-4.6">Claude Sonnet 4.6</option>
                      <option value="claude-sonnet-4">Claude Sonnet 4</option>
                    </optgroup>
                    <optgroup label="🤖 OpenAI (PRO)">
                      <option value="gpt-5.5">GPT-5.5</option>
                      <option value="gpt-5.4">GPT-5.4</option>
                      <option value="gpt-5.3-codex">GPT-5.3 Codex</option>
                      <option value="gpt-5.3-codex-review">GPT-5.3 Codex Review</option>
                      <option value="gpt-5.2">GPT-5.2</option>
                      <option value="oa-gpt-5.5">OA GPT-5.5</option>
                      <option value="oa-gpt-5.4">OA GPT-5.4</option>
                    </optgroup>
                    <optgroup label="💎 Google (PRO)">
                      <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
                      <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro Preview</option>
                      <option value="gemini-3.1-flash-tts-preview">Gemini 3.1 Flash TTS Preview</option>
                      <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                      <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                      <option value="gemini-2.5-flash-image">Gemini 2.5 Flash Image</option>
                    </optgroup>
                    <optgroup label="🔥 DeepSeek (PRO)">
                      <option value="deepseek-v4-pro">DeepSeek V4 Pro</option>
                    </optgroup>
                    <optgroup label="🚀 Others (PRO)">
                      <option value="mimo-v2.5-pro">MIMO V2.5 Pro</option>
                      <option value="mimo-v2.5">MIMO V2.5</option>
                      <option value="mimo-v2-pro">MIMO V2 Pro</option>
                      <option value="mimo-v2-omni">MIMO V2 Omni</option>
                      <option value="kimi-k2.6">Kimi K2.6 (Moonshot)</option>
                      <option value="minimax-m3">MiniMax M3</option>
                      <option value="minimax-m2.7">MiniMax M2.7</option>
                      <option value="glm-5.1">GLM 5.1 (Zhipu AI)</option>
                      <option value="qwen-3.7-max">Qwen 3.7 Max</option>
                      <option value="qwen-3.6-27b">Qwen 3.6 27B</option>
                      <option value="qwen-3.5-9b">Qwen 3.5 9B</option>
                      <option value="flux-2-klein-4b">FLUX.2 Klein 4B (Image)</option>
                    </optgroup>
                  </select>
                  <p className="text-dark-500 text-[10px] mt-1.5">Dipakai saat Generate di form Tambah Produk.</p>
                </div>

              {/* Blog Model Selection */}
              <div>
                  <label className="text-dark-300 text-xs font-medium mb-2 block">Model untuk Blog</label>
                  <select value={aiBlogModel} onChange={e => setAiBlogModel(e.target.value)} className="w-full px-4 py-3 bg-dark-800/70 border border-dark-700 rounded-xl text-foreground text-sm focus:outline-none focus:border-primary-500 transition-all">
                    <option value="">— Sama dengan Produk —</option>
                    <optgroup label="🆓 Gratis (Free Tier)">
                      <option value="claude-sonnet-4.5">Claude Sonnet 4.5 (Free)</option>
                      <option value="claude-sonnet-4.5-1m">Claude Sonnet 4.5 1M (Free)</option>
                      <option value="open-agentic">Open Agentic (Free)</option>
                      <option value="deepseek-3.2">DeepSeek 3.2 (Free)</option>
                      <option value="deepseek-v4-flash">DeepSeek V4 Flash (Free)</option>
                      <option value="minimax-m2.5">MiniMax M2.5 (Free)</option>
                      <option value="minimax-m2.1">MiniMax M2.1 (Free)</option>
                      <option value="glm-5">GLM-5 Zhipu AI (Free)</option>
                    </optgroup>
                    <optgroup label="🧠 Anthropic (PRO)">
                      <option value="claude-opus-4.8">Claude Opus 4.8</option>
                      <option value="claude-opus-4.8-thinking">Claude Opus 4.8 Thinking</option>
                      <option value="claude-opus-4.7">Claude Opus 4.7</option>
                      <option value="claude-opus-4.7-thinking">Claude Opus 4.7 Thinking</option>
                      <option value="claude-opus-4.6">Claude Opus 4.6</option>
                      <option value="claude-opus-4.6-thinking">Claude Opus 4.6 Thinking</option>
                      <option value="claude-sonnet-4.6">Claude Sonnet 4.6</option>
                      <option value="claude-sonnet-4">Claude Sonnet 4</option>
                    </optgroup>
                    <optgroup label="🤖 OpenAI (PRO)">
                      <option value="gpt-5.5">GPT-5.5</option>
                      <option value="gpt-5.4">GPT-5.4</option>
                      <option value="gpt-5.3-codex">GPT-5.3 Codex</option>
                      <option value="gpt-5.3-codex-review">GPT-5.3 Codex Review</option>
                      <option value="gpt-5.2">GPT-5.2</option>
                      <option value="oa-gpt-5.5">OA GPT-5.5</option>
                      <option value="oa-gpt-5.4">OA GPT-5.4</option>
                    </optgroup>
                    <optgroup label="💎 Google (PRO)">
                      <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
                      <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro Preview</option>
                      <option value="gemini-3.1-flash-tts-preview">Gemini 3.1 Flash TTS Preview</option>
                      <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                      <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                      <option value="gemini-2.5-flash-image">Gemini 2.5 Flash Image</option>
                    </optgroup>
                    <optgroup label="🔥 DeepSeek (PRO)">
                      <option value="deepseek-v4-pro">DeepSeek V4 Pro</option>
                    </optgroup>
                    <optgroup label="🚀 Others (PRO)">
                      <option value="mimo-v2.5-pro">MIMO V2.5 Pro</option>
                      <option value="mimo-v2.5">MIMO V2.5</option>
                      <option value="mimo-v2-pro">MIMO V2 Pro</option>
                      <option value="mimo-v2-omni">MIMO V2 Omni</option>
                      <option value="kimi-k2.6">Kimi K2.6 (Moonshot)</option>
                      <option value="minimax-m3">MiniMax M3</option>
                      <option value="minimax-m2.7">MiniMax M2.7</option>
                      <option value="glm-5.1">GLM 5.1 (Zhipu AI)</option>
                      <option value="qwen-3.7-max">Qwen 3.7 Max</option>
                      <option value="qwen-3.6-27b">Qwen 3.6 27B</option>
                      <option value="qwen-3.5-9b">Qwen 3.5 9B</option>
                      <option value="flux-2-klein-4b">FLUX.2 Klein 4B (Image)</option>
                    </optgroup>
                  </select>
                  <p className="text-dark-500 text-[10px] mt-1.5">Dipakai saat Generate di form Tulis Artikel. Kosong = pakai model produk.</p>
                </div>

              <button
                onClick={saveGeminiSettings}
                disabled={geminiSaving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
              >
                {geminiSaving ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Menyimpan...</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Simpan Pengaturan AI</>
                )}
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-dark-800">
              <h4 className="text-dark-300 text-xs font-medium mb-2">Cara penggunaan:</h4>
              <ol className="text-dark-500 text-xs space-y-1.5 list-decimal list-inside">
                <li>Pilih provider dan simpan API Key di atas</li>
                <li>Buka form <span className="text-white">Tambah Produk</span></li>
                <li>Isi <span className="text-white">Nama Produk</span> (misal: "Elementor Pro")</li>
                <li>Klik tombol <span className="text-purple-400">✨ Generate dengan AI</span></li>
                <li>Deskripsi, meta SEO, fitur, dan FAQ terisi otomatis!</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Payment Gateway Tab */}
      {activeTab === 'payment' && (
        <div className="space-y-4">
          <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </div>
              <div>
                <h3 className="text-white text-base font-bold">Payment Gateway (iPaymu)</h3>
                <p className="text-dark-500 text-xs">Aktifkan untuk menerima pembayaran otomatis via VA & QRIS</p>
              </div>
            </div>

            {/* Toggle */}
            <div className="flex items-center justify-between p-4 bg-dark-800/50 border border-dark-700/50 rounded-xl mb-5">
              <div>
                <p className="text-foreground text-sm font-medium">Aktifkan Payment Gateway</p>
                <p className="text-dark-500 text-xs mt-0.5">Jika nonaktif, customer hanya melihat rekening manual</p>
              </div>
              <button
                onClick={() => setPgEnabled(!pgEnabled)}
                className={`relative w-12 h-7 rounded-full transition-colors ${pgEnabled ? 'bg-emerald-500' : 'bg-dark-700'}`}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${pgEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            {pgEnabled && (
              <div className="space-y-4 p-4 bg-dark-800/30 border border-dark-700/30 rounded-xl">
                <p className="text-muted-foreground text-xs">API Key dan VA Number dikonfigurasi di environment variables (Vercel).</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-dark-800/50 rounded-lg">
                    <p className="text-dark-500 text-[10px] uppercase tracking-wider">Status</p>
                    <p className="text-emerald-400 text-sm font-semibold mt-0.5">✓ Aktif</p>
                  </div>
                  <div className="p-3 bg-dark-800/50 rounded-lg">
                    <p className="text-dark-500 text-[10px] uppercase tracking-wider">Provider</p>
                    <p className="text-foreground text-sm font-semibold mt-0.5">iPaymu</p>
                  </div>
                </div>
                <p className="text-dark-500 text-[11px]">Metode: Virtual Account (BCA, BNI, Mandiri, BRI) + QRIS</p>
              </div>
            )}

            <button
              onClick={async () => {
                setPgSaving(true)
                await supabase.from('settings').upsert({ key: 'payment_gateway_enabled', value: pgEnabled ? 'true' : 'false' }, { onConflict: 'key' })
                setPgSaving(false)
              }}
              disabled={pgSaving}
              className="mt-5 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {pgSaving ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Menyimpan...</>
              ) : (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Simpan Pengaturan</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Social Media Tab */}
      {activeTab === 'social' && (
        <div className="space-y-4">
          <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </div>
              <div>
                <h3 className="text-white text-base font-bold">Social Media & Marketplace</h3>
                <p className="text-dark-500 text-xs">Link akan muncul di footer website. Kosongkan jika tidak ada.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/oosshop_com' },
                { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/oosshop' },
                { key: 'shopee', label: 'Shopee', placeholder: 'https://shopee.co.id/oos_shop' },
                { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@oosshop' },
                { key: 'telegram', label: 'Telegram', placeholder: 'https://t.me/oosshop' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-dark-300 text-xs font-medium mb-2 block">{f.label}</label>
                  <input
                    type="url"
                    value={social[f.key]}
                    onChange={e => setSocial({ ...social, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 bg-dark-800/70 border border-dark-700 rounded-xl text-foreground text-sm placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>
              ))}

              <button
                onClick={saveSocialSettings}
                disabled={socialSaving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-pink-500/20 disabled:opacity-50"
              >
                {socialSaving ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Menyimpan...</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Simpan Social Media</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bank Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
          <div className="bg-dark-900 border border-dark-800 p-5 sm:p-7 w-full sm:max-w-md min-h-screen sm:min-h-0 sm:rounded-2xl rounded-none shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-lg font-bold text-white">
                {editingBank ? 'Edit Rekening' : 'Tambah Rekening Baru'}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-dark-300 text-xs font-medium mb-1.5 block">Tipe *</label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setFormData({ ...formData, type: 'bank' })} className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${formData.type === 'bank' ? 'bg-primary-600/15 text-primary-400 border-primary-500/30' : 'bg-dark-800/50 text-dark-400 border-dark-700 hover:border-dark-600'}`}>
                    Bank Transfer
                  </button>
                  <button type="button" onClick={() => setFormData({ ...formData, type: 'ewallet' })} className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${formData.type === 'ewallet' ? 'bg-primary-600/15 text-primary-400 border-primary-500/30' : 'bg-dark-800/50 text-dark-400 border-dark-700 hover:border-dark-600'}`}>
                    E-Wallet
                  </button>
                </div>
              </div>
              <div>
                <label className="text-dark-300 text-xs font-medium mb-1.5 block">{formData.type === 'ewallet' ? 'Nama E-Wallet' : 'Nama Bank'} *</label>
                <input
                  type="text"
                  value={formData.bank_name}
                  onChange={e => setFormData({ ...formData, bank_name: e.target.value })}
                  required
                  placeholder="BCA, BRI, Mandiri, Dana, OVO, dll"
                  className="w-full px-4 py-3 bg-dark-800/70 border border-dark-700 rounded-xl text-foreground text-sm placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
              <div>
                <label className="text-dark-300 text-xs font-medium mb-1.5 block">Nama Pemilik *</label>
                <input
                  type="text"
                  value={formData.account_name}
                  onChange={e => setFormData({ ...formData, account_name: e.target.value })}
                  required
                  placeholder="Nama sesuai rekening"
                  className="w-full px-4 py-3 bg-dark-800/70 border border-dark-700 rounded-xl text-foreground text-sm placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
              <div>
                <label className="text-dark-300 text-xs font-medium mb-1.5 block">Nomor {formData.type === 'ewallet' ? 'E-Wallet' : 'Rekening'} *</label>
                <input
                  type="text"
                  value={formData.account_number}
                  onChange={e => setFormData({ ...formData, account_number: e.target.value })}
                  required
                  placeholder="1234567890"
                  className="w-full px-4 py-3 bg-dark-800/70 border border-dark-700 rounded-xl text-foreground text-sm placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
              <div className="flex gap-3 pt-3">
                <button type="submit" disabled={submitting} className="flex-1 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/20 disabled:opacity-50">
                  {submitting ? 'Menyimpan...' : (editingBank ? 'Update' : 'Simpan')}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 bg-dark-800 hover:bg-dark-700 text-dark-300 font-medium rounded-xl transition-all border border-dark-700">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
