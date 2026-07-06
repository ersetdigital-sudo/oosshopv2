import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// NOTE: Prompt is framed around the *product/license* (features, FAQ) rather than
// the installation service, to keep generated titles/descriptions Google Merchant
// Center compliant (see "sale of services" policy — avoid "jasa instal" framing).
const PROMPT = (productName: string) => `Kamu adalah copywriter untuk toko plugin WordPress bernama OOS SHOP yang menjual plugin original berlisensi resmi. Buatkan konten produk untuk "${productName}" dalam bahasa Indonesia.

Ketentuan:
- Tulis natural, informatif, tidak terlalu hard selling
- Fokus pada manfaat & fitur spesifik produk, BUKAN proses instalasinya
- Judul/nama produk jangan pakai kata "jasa instal" atau "install" — cukup nama produknya
- Sebutkan OOS SHOP maksimal 1x di long_description
- FAQ harus menjawab pertanyaan yang benar-benar dicari orang di Google
- Untuk features: tulis fitur TEKNIS SPESIFIK dari produk, JANGAN tulis fitur generic seperti "Dokumentasi lengkap", "Support 24/7", "Update otomatis", "Garansi" — itu bukan fitur produk, itu fitur toko

Response HANYA dalam JSON tanpa teks lain:
{
  "short_description": "1-2 kalimat, fokus manfaat utama produk",
  "long_description": "3 paragraf plain text (TANPA HTML tags), pisahkan antar paragraf dengan \\n\\n. Paragraph 1: apa itu produk, paragraph 2: fitur unggulan, paragraph 3: kenapa beli di OOS SHOP",
  "meta_title": "max 60 karakter, format: [nama produk] Original Lisensi Resmi | OOS SHOP",
  "meta_description": "max 160 karakter, natural, ada keyword nama produk",
  "features": [{"title": "nama fitur", "desc": "penjelasan singkat 1 kalimat"}],
  "faq": [{"q": "pertanyaan yang dicari orang di Google", "a": "jawaban jelas dan informatif"}]
}`

async function getSettings(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  )

  const { data } = await supabase.from('settings').select('*').in('key', ['gemini_api_key', 'ai_model'])
  if (data && data.length > 0) return data

  const authHeader = request.headers.get('authorization')
  if (authHeader) {
    const authClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      { global: { headers: { Authorization: authHeader } } },
    )
    const { data: authData } = await authClient
      .from('settings')
      .select('*')
      .in('key', ['gemini_api_key', 'ai_model'])
    return authData
  }

  return null
}

async function callOpenAgentic(apiKey: string, model: string, productName: string) {
  const response = await fetch('https://openagentic.id/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || 'claude-sonnet-4.5',
      messages: [{ role: 'user', content: PROMPT(productName) }],
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    let errorMessage = response.statusText
    try {
      const errorData = JSON.parse(text)
      errorMessage = errorData.error?.message || response.statusText
    } catch {
      errorMessage = `HTTP ${response.status}: ${text.substring(0, 200)}`
    }
    throw new Error(`OpenAgentic error: ${errorMessage}`)
  }

  const data = await response.json()
  const textContent = data.choices?.[0]?.message?.content
  if (!textContent) throw new Error('Tidak ada response dari OpenAgentic')
  return textContent
}

export async function POST(request: Request) {
  try {
    const { productName } = await request.json()
    if (!productName) {
      return NextResponse.json({ error: 'Nama produk diperlukan' }, { status: 400 })
    }

    const settings = await getSettings(request)
    if (!settings || settings.length === 0) {
      return NextResponse.json(
        { error: 'API Key belum diatur. Silakan tambahkan di Settings > Integrasi AI.' },
        { status: 400 },
      )
    }

    const apiKey = settings.find((s) => s.key === 'gemini_api_key')?.value
    const model = settings.find((s) => s.key === 'ai_model')?.value || ''

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key belum diatur. Silakan tambahkan di Settings > Integrasi AI.' },
        { status: 400 },
      )
    }

    const textContent = await callOpenAgentic(apiKey, model, productName)
    const cleanJson = textContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsed = JSON.parse(cleanJson)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Generate product error:', error)
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
