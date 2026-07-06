import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const OPEN_AGENTIC_URL = 'https://aimurah.my.id/api/v1/images/generations'

async function getApiKey() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  )
  const { data } = await supabase.from('settings').select('value').eq('key', 'gemini_api_key').single()

  if (data?.value) return data.value
  return process.env.OPEN_AGENTIC_IMAGE_KEY || process.env.OPEN_AGENTIC_API_KEY || null
}

async function uploadToStorage(b64Data: string, filename: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  )

  const buffer = Buffer.from(b64Data, 'base64')

  const { data, error } = await supabase.storage.from('thumbnails').upload(filename, buffer, {
    contentType: 'image/png',
    upsert: true,
  })

  if (error) {
    console.error('Upload error:', error.message)
    return `data:image/png;base64,${b64Data.slice(0, 100)}...`
  }

  const { data: publicUrl } = supabase.storage.from('thumbnails').getPublicUrl(data.path)
  return publicUrl.publicUrl
}

function generatePromptFromTitle(title: string) {
  const cleaned = title
    .replace(/\d{4}/g, '')
    .replace(/[|:\-–—]/g, ' ')
    .replace(/OOS\s*SHOP/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

  return `Modern flat illustration for blog article about "${cleaned}". Minimal vector style, soft gradients, indigo (#5B5CEB) and slate blue color palette, abstract tech elements like browser windows and code brackets floating, clean white background, professional SaaS aesthetic, no text, no people faces, suitable as 1:1 thumbnail`
}

export async function POST(request: Request) {
  try {
    const { title, customPrompt } = await request.json()

    if (!title && !customPrompt) {
      return NextResponse.json({ error: 'Judul artikel atau custom prompt diperlukan' }, { status: 400 })
    }

    const apiKey = await getApiKey()
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key belum diset. Masukkan di Admin -> Setting -> Integrasi AI' },
        { status: 500 },
      )
    }

    const prompt = customPrompt || generatePromptFromTitle(title)

    const response = await fetch(OPEN_AGENTIC_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'flux-2-klein-4b',
        prompt,
        n: 1,
        size: '1024x1024',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Image generation failed: ${response.status} - ${errorText.slice(0, 200)}` },
        { status: response.status },
      )
    }

    const data = await response.json()

    const imageUrl = data.data?.[0]?.url || null
    const b64 = data.data?.[0]?.b64_json || null

    if (!imageUrl && !b64) {
      return NextResponse.json({ error: 'Tidak ada gambar yang dihasilkan' }, { status: 500 })
    }

    let finalUrl = imageUrl
    if (!finalUrl && b64) {
      const filename = `blog-${Date.now()}.png`
      finalUrl = await uploadToStorage(b64, filename)
    }

    return NextResponse.json({ url: finalUrl, prompt })
  } catch (error) {
    console.error('Thumbnail generation error:', error)
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
