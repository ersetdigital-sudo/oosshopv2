import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type NotifyAdminBody = {
  invoiceNumber: string
  customerName: string
  customerPhone: string
  items: { name: string; qty: number }[]
  totalPrice: number
  domain?: string | null
}

function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NotifyAdminBody
    const { invoiceNumber, customerName, customerPhone, items, totalPrice, domain } = body

    if (!invoiceNumber) {
      return NextResponse.json({ error: 'Invoice number required' }, { status: 400 })
    }

    // Fonnte API key & admin phone are stored in Supabase `settings` table,
    // shared with v1 — reuse whatever the admin already configured there.
    const { data: settings } = await supabase
      .from('settings')
      .select('*')
      .in('key', ['fonnte_api_key', 'admin_phone'])

    const apiKey = settings?.find((s) => s.key === 'fonnte_api_key')?.value
    const adminPhone = settings?.find((s) => s.key === 'admin_phone')?.value || '6285212150100'

    if (!apiKey) {
      return NextResponse.json({ error: 'Fonnte API key belum diatur' }, { status: 400 })
    }

    const itemsList = items?.map((i) => `- ${i.name} x${i.qty}`).join('\n') || '-'
    const message = `🔔 *ORDER BARU MASUK!*\n\n📋 Invoice: ${invoiceNumber}\n👤 Nama: ${customerName}\n📱 WA: ${customerPhone}\n🌐 Domain: ${domain || '-'}\n\n🛒 Produk:\n${itemsList}\n\n💰 Total: ${formatIDR(totalPrice)}\n\nSegera proses di admin panel!`

    const formData = new FormData()
    formData.append('target', adminPhone)
    formData.append('message', message)

    const fonnteResponse = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: { Authorization: apiKey },
      body: formData,
    })

    const fonnteResult = await fonnteResponse.json()

    if (fonnteResult.status === false) {
      return NextResponse.json(
        { error: 'Fonnte error: ' + (fonnteResult.reason || 'Unknown') },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
