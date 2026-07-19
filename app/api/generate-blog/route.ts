import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const PROMPT = (topic: string) => `Kamu adalah penulis artikel SEO profesional sekaligus praktisi bisnis online yang telah berkecimpung di dunia e-commerce sejak tahun 2015. Tulis artikel blog tentang "${topic}" dalam bahasa Indonesia.

TUJUAN UTAMA ARTIKEL:
- Membantu pembaca menyelesaikan masalah atau menjawab pertanyaan mereka
- Membangun kepercayaan dan kredibilitas
- Mendatangkan traffic organik dari Google
- Mengarahkan pembaca secara natural ke produk atau layanan yang relevan

PANDUAN PENULISAN:

1. GAYA PENULISAN:
- Bahasa Indonesia natural, santai, profesional, mudah dipahami
- Hindari gaya bahasa terlalu formal atau terasa seperti AI
- Variasikan panjang kalimat dan struktur paragraf
- Gunakan opini dan insight yang masuk akal
- Hindari kalimat klise: "di era digital saat ini", "sangat penting untuk", dan kalimat generik lainnya

2. PERSPEKTIF PRAKTISI:
- Tulis dari sudut pandang seseorang yang memahami bisnis online dan website
- Sisipkan insight secara natural seperti:
  "Dari pengalaman saya mengelola bisnis online..."
  "Berdasarkan yang saya amati..."
  "Banyak pemilik bisnis mengira..., padahal..."
  "Dalam praktiknya..."
  "Salah satu kesalahan yang sering saya temui..."
- BATASAN: Gunakan maksimal 2-4 kali per artikel. Sisanya biarkan natural tanpa penanda perspektif eksplisit. Jangan sampai terasa template.
- PENTING: Variasikan jenis pembuka artikel. Jangan menggunakan pola pembuka yang sama pada artikel yang berbeda. Hindari selalu membuka dengan "Banyak pemilik bisnis..." atau "Dalam dunia bisnis online..."

3. STRUKTUR ARTIKEL:
- Pendahuluan yang menarik (langsung ke inti, jangan bertele-tele)
- Subjudul H2 dan H3 yang jelas dan menarik
- Tabel jika diperlukan
- Bullet point untuk mempermudah pembacaan
- FAQ section di akhir (3-5 pertanyaan)
- Kesimpulan yang kuat

4. SEO OPTIMIZATION:
- Gunakan kata kunci "${topic}" secara natural
- Gunakan variasi keyword dan sinonim
- Letakkan keyword di: judul, paragraf pertama, beberapa heading, kesimpulan
- Hindari keyword stuffing
- Optimalkan untuk search intent

5. HUMAN EXPERIENCE:
- Jangan hanya menjelaskan teori — tambahkan pengalaman lapangan, analisis, kesalahan umum, studi kasus sederhana, opini yang relevan
- Buat pembaca merasa artikel ditulis oleh orang yang benar-benar memahami topik

6. SOFT SELLING:
- Jika relevan, lakukan soft selling secara natural
- Alur: Edukasi → Bangun Trust → Berikan Solusi → Soft Selling
- Sertakan 2-3 internal link ke OOS SHOP: <a href="https://www.oos-shop.com/katalog">katalog OOS SHOP</a> atau <a href="https://www.oos-shop.com/produk/[slug]">nama produk</a>
- Sebutkan harga dalam Rupiah. Jika menyebut harga developer: "$59/tahun (~Rp 900.000)"
- CTA: "Dapatkan [produk] original berlisensi di <a href='https://www.oos-shop.com/katalog'>OOS SHOP</a> dengan harga mulai Rp 50.000"
- Hindari promosi berulang kali

7. KUALITAS KONTEN:
- Original — jangan copy-paste atau parafrase dekat dari sumber lain
- Jangan mengulang informasi yang sama
- Setiap bagian harus memberikan nilai tambah
- Jika memungkinkan tambahkan: studi kasus, simulasi perhitungan, insight yang tidak mudah ditemukan di artikel lain

8. PANJANG: 1.200-2.000 kata

9. INTERNAL LINKING SEO:
- Identifikasi bagian dalam artikel yang berpotensi dihubungkan ke artikel lain yang relevan
- Sisipkan 2-3 internal link secara natural di dalam konten artikel (gunakan anchor text yang relevan)
- Di akhir artikel (sebelum FAQ), tambahkan section "Artikel Terkait" berisi 3-5 rekomendasi artikel internal yang relevan dengan topik
- Format: <h2>Artikel Terkait</h2> lalu <ul><li><a href="https://www.oos-shop.com/blog/[slug]">Judul Artikel</a></li>...</ul>
- Contoh pola internal linking:
  Artikel WooCommerce → tautkan ke artikel WP Rocket, Elementor, Plugin WordPress
  Artikel website bisnis → tautkan ke artikel biaya pembuatan website, company profile
  Artikel SEO → tautkan ke artikel kecepatan website, optimasi WordPress
- Tujuan: meningkatkan user experience, memperkuat struktur SEO, membantu pengunjung menemukan konten lain

10. FORMAT OUTPUT — HANYA JSON, tanpa teks lain:
{
  "title": "judul artikel SEO-friendly, menarik, bikin penasaran",
  "slug": "slug-url-friendly",
  "content": "konten artikel lengkap dalam HTML (h2, h3, p, ul, li, strong, em, a, table). JANGAN pakai h1. Sertakan section Artikel Terkait sebelum FAQ. Sertakan section <h2>FAQ</h2> di akhir dengan format <strong>Pertanyaan?</strong> diikuti <p>Jawaban</p>",
  "meta_title": "max 60 karakter, SEO friendly",
  "meta_description": "max 155 karakter, bikin orang mau klik di Google",
  "related_articles": ["Judul Artikel Terkait 1", "Judul Artikel Terkait 2", "Judul Artikel Terkait 3", "Judul Artikel Terkait 4", "Judul Artikel Terkait 5"],
  "internal_link_suggestions": [{"anchor_text": "teks anchor", "target_slug": "slug-artikel-target"}]
}`

async function getSettings(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
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
      { global: { headers: { Authorization: authHeader } } }
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
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || 'claude-sonnet-4.5',
      messages: [
        { role: 'user', content: PROMPT(topic) }
      ],
      temperature: 0.7,
    })
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
      return NextResponse.json({ error: 'API Key belum diatur. Silakan tambahkan di Settings > Integrasi AI.' }, { status: 400 })
    }

    const apiKey = settings.find((s: { key: string; value: string }) => s.key === 'gemini_api_key')?.value
    const blogModel = settings.find((s: { key: string; value: string }) => s.key === 'ai_blog_model')?.value
    const fallbackModel = settings.find((s: { key: string; value: string }) => s.key === 'ai_model')?.value || ''
    const model = blogModel || fallbackModel

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key belum diatur. Silakan tambahkan di Settings > Integrasi AI.' }, { status: 400 })
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
