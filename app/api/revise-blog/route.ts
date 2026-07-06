import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

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

export async function POST(request: Request) {
  try {
    const { content, instruction } = await request.json()
    if (!content || !instruction) {
      return NextResponse.json({ error: 'Konten dan instruksi revisi diperlukan' }, { status: 400 })
    }

    const settings = await getSettings(request)
    if (!settings || settings.length === 0) {
      return NextResponse.json({ error: 'API Key belum diatur.' }, { status: 400 })
    }

    const apiKey = settings.find((s) => s.key === 'gemini_api_key')?.value
    const blogModel = settings.find((s) => s.key === 'ai_blog_model')?.value
    const fallbackModel = settings.find((s) => s.key === 'ai_model')?.value || ''
    const model = blogModel || fallbackModel

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key belum diatur.' }, { status: 400 })
    }

    const prompt = `Kamu adalah editor artikel SEO profesional. Berikut adalah artikel HTML yang sudah ada:

---ARTIKEL---
${content}
---END ARTIKEL---

Instruksi revisi dari penulis:
"${instruction}"

Lakukan revisi sesuai instruksi di atas. Pertahankan format HTML yang sama (h2, h3, p, ul, li, strong, em, a). Jangan ubah bagian yang tidak diminta untuk diubah. Kembalikan HANYA konten HTML yang sudah direvisi, tanpa penjelasan tambahan.`

    const response = await fetch('https://openagentic.id/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'claude-sonnet-4.5',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(`AI error: ${err.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const revisedContent = data.choices?.[0]?.message?.content
    if (!revisedContent) throw new Error('Tidak ada response dari AI')

    const cleaned = revisedContent.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim()

    return NextResponse.json({ content: cleaned })
  } catch (error) {
    console.error('Revise blog error:', error)
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
