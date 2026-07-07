import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

type SendWaBody = {
  phone: string
  customerName?: string
  invoiceNumber?: string
  items?: { name: string; qty: number }[]
  domain?: string | null
}

export async function POST(request: Request) {
  try {
    // Require the admin's auth token — only a logged-in admin can trigger this
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    })

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { phone, customerName, invoiceNumber, items, domain } = (await request.json()) as SendWaBody

    if (!phone) {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 })
    }

    const { data: settings } = await supabase
      .from('settings')
      .select('*')
      .in('key', ['fonnte_api_key', 'fonnte_message'])

    const apiKey = settings?.find((s) => s.key === 'fonnte_api_key')?.value
    const messageTemplate = settings?.find((s) => s.key === 'fonnte_message')?.value

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Fonnte API key belum diatur. Buka Pengaturan > Notifikasi WhatsApp.' },
        { status: 400 },
      )
    }

    const itemsList = items?.map((i) => `- ${i.name} x${i.qty}`).join('\n') || '-'
    const defaultMessage =
      'Halo {nama}! 👋\n\n✅ *Pesanan Kamu Sudah Selesai!*\n\n📋 Detail Order:\nInvoice : {invoice}\nProduk  : {items}\nDomain  : {domain}\n\nPlugin sudah berhasil diinstal di website kamu. Silakan cek WordPress Dashboard kamu ya!\n\nJika ada kendala, balas pesan ini.\nTerima kasih sudah belanja di OOS SHOP! 🙏'

    const message = (messageTemplate || defaultMessage)
      .replace(/{nama}/g, customerName || 'Customer')
      .replace(/{invoice}/g, invoiceNumber || '-')
      .replace(/{items}/g, itemsList)
      .replace(/{domain}/g, domain || '-')

    const formData = new FormData()
    formData.append('target', phone)
    formData.append('message', message)

    const fonnteResponse = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: { Authorization: apiKey },
      body: formData,
    })

    const fonnteResult = await fonnteResponse.json()

    if (fonnteResult.status === false) {
      return NextResponse.json(
        { error: 'Fonnte error: ' + (fonnteResult.reason || 'Unknown error') },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, message: 'Notifikasi WA terkirim!' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: 'Server error: ' + message }, { status: 500 })
  }
}
