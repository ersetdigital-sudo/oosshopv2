import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const PROMPT = (topic: string) => `Kamu adalah penulis artikel SEO profesional sekaligus praktisi bisnis online yang telah berkecimpung di dunia e-commerce sejak tahun 2015. Tulis artikel blog tentang "${topic}" dalam bahasa Indonesia.

TUJUAN UTAMA ARTIKEL:
- Membantu pembaca menyelesaikan masalah atau menjawab pertanyaan mereka
- Membangun kepercayaan dan kredibilitas
- Mendatangkan traffic organik dari Google
- Mengarahkan pembaca secara natural ke produk atau layanan yang relevan

PANDUAN PENULISAN:
1. Bahasa Indonesia natural, santai, profesional, mudah dipahami. Hindari kalimat klise dan gaya AI generik.
2. Tulis dari sudut pandang praktisi bisnis online. Sisipkan insight secara natural (maksimal 2-4 kali per artikel).
3. Struktur: pendahuluan menarik, subjudul H2/H3, bullet point, FAQ section di akhir (3-5 pertanyaan), kesimpulan kuat.
4. SEO: gunakan kata kunci "${topic}" secara natural di judul, paragraf pertama, beberapa heading, kesimpulan. Hindari keyword stuffing.
5. Tambahkan pengalaman lapangan, analisis, kesalahan umum, opini relevan agar terasa ditulis manusia.
6. Soft selling jika relevan: sertakan 2-3 internal link ke OOS SHOP (misal <a href="https://www.oos-shop.com/katalog">katalog OOS SHOP</a>). Sebutkan harga dalam Rupiah.
7. Original, tidak mengulang informasi, setiap bagian memberi nilai tambah. Panjang 1.200-2.000 kata.
8. Sisipkan 2-3 internal link relevan di dalam konten dan section "Artikel Terkait" sebelum FAQ.

FORMAT OUTPUT — HANYA JSON, tanpa teks lain:
{
  "title": "judul artikel SEO-friendly, menarik",
  "slug": "slug-url-friendly",
  "content": "konten artikel lengkap dalam HTML (h2, h3, p, ul, li, strong, em, a, table). JANGAN pakai h1. Sertakan section Artikel Terkait sebelum FAQ. Sertakan section <h2>FAQ</h2> di akhir dengan format <strong>Pertanyaan?</strong> diikuti <p>Jawaban</p>",
  "meta_title": "max 60 karakter, SEO friendly",
  "meta_description": "max 155 karakter, bikin orang mau klik di Google"
}`

async function getSettings(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  )

  const { data } = await supabase
    .from('settings')
    .select('*')
    .in('key', ['gemini_api_key', 'ai_model', 'ai_blog_model'])

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
      .in('key', ['gemini_api_key', 'ai_model', 'ai_blog_model'])
    return authData
  }

  return null
}

async function callOpenAgentic(apiKey: string, model: string, topic: string) {
  const response = await fetch('https://openagentic.id/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || 'claude-sonnet-4.5',
      messages: [{ role: 'user', content: PROMPT(topic) }],
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
    const { topic } = await request.json()
    if (!topic) {
      return NextResponse.json({ error: 'Topik artikel diperlukan' }, { status: 400 })
    }

    const settings = await getSettings(request)
    if (!settings || settings.length === 0) {
      return NextResponse.json(
        { error: 'API Key belum diatur. Silakan tambahkan di Settings > Integrasi AI.' },
        { status: 400 },
      )
    }

    const apiKey = settings.find((s) => s.key === 'gemini_api_key')?.value
    const blogModel = settings.find((s) => s.key === 'ai_blog_model')?.value
    const fallbackModel = settings.find((s) => s.key === 'ai_model')?.value || ''
    const model = blogModel || fallbackModel

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key belum diatur. Silakan tambahkan di Settings > Integrasi AI.' },
        { status: 400 },
      )
    }

    const textContent = await callOpenAgentic(apiKey, model, topic)
    const cleanJson = textContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsed = JSON.parse(cleanJson)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Generate blog error:', error)
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
