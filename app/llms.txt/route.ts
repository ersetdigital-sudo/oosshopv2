import { NextResponse } from 'next/server'
import summary from '@/public/data/summary.json'
import services from '@/public/data/service.json'
import faqs from '@/public/data/faq.json'

export async function GET() {
  const serviceList = services
    .map((s) => `- ${s.name} (${s.plugin}) — Rp ${s.price.toLocaleString('id-ID')}`)
    .join('\n')

  const faqList = faqs
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join('\n\n')

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

## Layanan Utama

### Jasa Instal Plugin WordPress Premium

${serviceList}

### Jasa Pembuatan Website
- Website Company Profile — profesional untuk kredibilitas bisnis
- Landing Page — halaman fokus konversi untuk iklan & campaign
- Website Toko Online — e-commerce lengkap dengan checkout & manajemen pesanan
- Website Sekolah — situs resmi lembaga pendidikan
- Website Travel — agen travel, tour, & paket wisata
- Website Klinik — klinik, praktik dokter, & fasilitas kesehatan

## Halaman Penting

- Homepage: ${summary.url}
- Katalog Plugin: ${summary.url}/katalog
- Layanan Website: ${summary.url}/layanan
- Kontak WhatsApp: ${summary.contact.whatsappUrl}

## FAQ

${faqList}

## Kontak

- WhatsApp: ${summary.contact.whatsapp}
- Email: ${summary.contact.email}
- Alamat: ${summary.contact.address}
- Jam Operasional: ${summary.operatingHours}

---
Terakhir diperbarui: ${new Date().toISOString().split('T')[0]}
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
