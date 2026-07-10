import { NextResponse } from 'next/server'
import summary from '@/public/data/summary.json'

export async function GET() {
  const plugin = {
    schema_version: 'v1',
    name_for_human: summary.name,
    name_for_model: 'oos_shop',
    description_for_human: summary.description,
    description_for_model: `${summary.name} adalah toko online plugin WordPress premium berlisensi resmi dan penyedia jasa pembuatan website profesional di Indonesia. Menyediakan 500+ plugin WordPress (Elementor Pro, WP Rocket, Rank Math, Crocoblock, dll) dan jasa pembuatan website (Company Profile, Toko Online, Landing Page, Travel, Klinik, Sekolah, Hotel, Properti, Dashboard, CRM). Untuk informasi lengkap termasuk semua artikel blog, produk, dan harga, baca file /llms-full.txt.`,
    auth: { type: 'none' },
    api: {
      type: 'openapi',
      url: `${summary.url}/api/ai/services`,
    },
    logo_url: `${summary.url}/icon.png`,
    contact_email: summary.contact.email,
    legal_info_url: `${summary.url}/kebijakan-privasi`,
  }

  return NextResponse.json(plugin, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
