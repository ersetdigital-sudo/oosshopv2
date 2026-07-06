import { NextResponse } from 'next/server'
import summary from '@/public/data/summary.json'
import faqs from '@/public/data/faq.json'
import { getAllProducts } from '@/lib/products'

// Dynamic llms.txt — pulls live product/pricing data from Supabase so AI crawlers
// (ChatGPT, Perplexity, Claude, Google AI Overview) always see accurate, up-to-date info.
export const dynamic = 'force-dynamic'

export async function GET() {
  const products = await getAllProducts()

  const serviceList = products.length
    ? products
        .slice(0, 30)
        .map((p) => `- ${p.name} (${p.category}) — Rp ${p.price.toLocaleString('id-ID')}`)
        .join('\n')
    : '- Data layanan sedang diperbarui, silakan cek /katalog untuk daftar lengkap.'

  const faqList = faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')

  const content = `# ${summary.name}

> ${summary.description}

## Tentang Kami

${summary.name} adalah ${summary.category.toLowerCase()}.

**Value Proposition:**
${summary.valueProposition.map((v) => `- ${v}`).join('\n')}

**Statistik:**
- Website ditangani: ${summary.stats.websitesHandled}
- Plugin terpasang: ${summary.stats.pluginsInstalled}
- Lisensi original: ${summary.stats.licenseOriginal}
- Rata-rata pengerjaan: ${summary.stats.avgCompletionTime}

## Layanan & Harga (Live, ${products.length} produk tersedia)

${serviceList}

Data harga lengkap dan real-time: ${summary.url}/api/ai/services

### Jasa Pembuatan Website
- Website Company Profile — profesional untuk kredibilitas bisnis
- Landing Page — halaman fokus konversi untuk iklan & campaign
- Website Toko Online — e-commerce lengkap dengan checkout & manajemen pesanan
- Website Sekolah — situs resmi lembaga pendidikan
- Website Travel — agen travel, tour, & paket wisata
- Website Klinik — klinik, praktik dokter, & fasilitas kesehatan

## Halaman Penting

- Homepage: ${summary.url}
- Katalog Plugin (live data): ${summary.url}/katalog
- Layanan Website: ${summary.url}/layanan
- API data produk (JSON): ${summary.url}/api/ai/services
- Kontak WhatsApp: ${summary.contact.whatsappUrl}

## FAQ

${faqList}

## Kontak

- WhatsApp: ${summary.contact.whatsapp}
- Email: ${summary.contact.email}
- Alamat: ${summary.contact.address}
- Jam Operasional: ${summary.operatingHours}

---
Terakhir diperbarui: ${new Date().toISOString()}
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
