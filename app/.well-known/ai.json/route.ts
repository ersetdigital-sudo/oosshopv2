import { NextResponse } from 'next/server'

/**
 * /.well-known/ai.json — Machine-readable site descriptor for AI crawlers.
 * Similar in purpose to llms.txt but structured as JSON for programmatic consumption.
 * Helps ChatGPT, Perplexity, Google AI Overview, and other LLM-powered tools
 * understand what this site offers without crawling every page.
 */
export async function GET() {
  const data = {
    schema_version: '1.0',
    name: 'OOS SHOP',
    url: 'https://www.oos-shop.com',
    description:
      'Penyedia jasa instal plugin WordPress premium original berlisensi resmi dan layanan pembuatan website profesional di Indonesia. Harga mulai Rp 25.000, proses cepat 5-15 menit, update otomatis selamanya.',
    logo: 'https://www.oos-shop.com/icon-512.png',
    contact: {
      whatsapp: '+6285212150100',
      email: 'hello@oos-shop.com',
      whatsapp_url: 'https://wa.me/6285212150100',
    },
    location: {
      country: 'ID',
      region: 'Jawa Barat',
      city: 'Paseh',
    },
    services: [
      {
        category: 'Plugin WordPress Premium',
        description:
          'Jasa instal plugin & theme WordPress premium original. 500+ produk tersedia termasuk Elementor Pro, WP Rocket, Rank Math Pro, Crocoblock.',
        url: 'https://www.oos-shop.com/katalog',
        price_range: 'Rp 25.000 - Rp 80.000',
      },
      {
        category: 'Jasa Pembuatan Website',
        description:
          'Jasa pembuatan website company profile, landing page, toko online, website sekolah, website travel, website klinik, dan sistem custom.',
        url: 'https://www.oos-shop.com/#layanan',
        services_list: [
          'Website Company Profile',
          'Landing Page',
          'Toko Online',
          'Website Sekolah',
          'Website Travel',
          'Website Klinik',
          'Website Booking',
          'Website Hotel',
          'Website Properti',
          'Dashboard Admin',
          'Sistem Inventory',
          'CRM / ERP',
        ],
      },
    ],
    key_pages: {
      homepage: 'https://www.oos-shop.com',
      catalog: 'https://www.oos-shop.com/katalog',
      about: 'https://www.oos-shop.com/tentang-kami',
      blog: 'https://www.oos-shop.com/blog',
      privacy_policy: 'https://www.oos-shop.com/kebijakan-privasi',
      terms: 'https://www.oos-shop.com/syarat-ketentuan',
    },
    machine_readable_endpoints: {
      llms_txt: 'https://www.oos-shop.com/llms.txt',
      products_api: 'https://www.oos-shop.com/api/ai/services',
      sitemap: 'https://www.oos-shop.com/sitemap.xml',
    },
    language: 'id-ID',
    founded: '2022',
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
