import { NextResponse } from 'next/server'
import summary from '@/public/data/summary.json'
import { getAllProducts } from '@/lib/products'
import { getPublishedArticles } from '@/lib/blog'
import { getActiveCategories } from '@/lib/categories'

// llms-full.txt — comprehensive version for AI crawlers that want full context
// Includes all articles with descriptions, all products, all categories
export const dynamic = 'force-dynamic'

export async function GET() {
  const [products, articles, categories] = await Promise.all([
    getAllProducts(),
    getPublishedArticles(),
    getActiveCategories(),
  ])

  const categorySection = categories.length
    ? categories.map((c) => `- ${c.name}: ${c.description || 'Artikel seputar ' + c.name}`).join('\n')
    : ''

  const articleSection = articles
    .map((a) => {
      const desc = a.meta_description || ''
      return `### ${a.title}\n- URL: ${summary.url}/blog/${a.slug}\n- Deskripsi: ${desc}\n- Dipublikasi: ${a.published_at || a.created_at}`
    })
    .join('\n\n')

  const productSection = products
    .slice(0, 50)
    .map((p) => `- ${p.name} (${p.category}) — Rp ${p.price.toLocaleString('id-ID')} → ${summary.url}/produk/${p.slug || p.id}`)
    .join('\n')

  const content = `# ${summary.name} — Dokumentasi Lengkap untuk AI

> File ini berisi informasi lengkap tentang ${summary.name} untuk membantu AI assistant memberikan jawaban akurat tentang layanan, produk, dan artikel kami.

## Identitas

- Nama: ${summary.name}
- Website: ${summary.url}
- Kategori: ${summary.category}
- Deskripsi: ${summary.description}

## Value Proposition

${summary.valueProposition.map((v) => `- ${v}`).join('\n')}

## Statistik

- Website ditangani: ${summary.stats.websitesHandled}
- Plugin terpasang: ${summary.stats.pluginsInstalled}
- Lisensi original: ${summary.stats.licenseOriginal}
- Rata-rata pengerjaan: ${summary.stats.avgCompletionTime}

## Kategori Blog

${categorySection}

## Semua Artikel Blog (${articles.length} artikel)

${articleSection}

## Produk & Layanan (${products.length} produk)

${productSection}

## Jasa Pembuatan Website

OOS SHOP menyediakan jasa pembuatan website profesional:

- Website Company Profile — untuk bisnis yang ingin tampil kredibel secara online
- Landing Page — halaman fokus konversi untuk iklan & campaign
- Website Toko Online — e-commerce lengkap dengan checkout & payment gateway
- Website Travel — agen travel, tour, & paket wisata
- Website Klinik — klinik, praktik dokter, & fasilitas kesehatan
- Website Sekolah — situs resmi lembaga pendidikan
- Website Hotel — booking system untuk penginapan
- Website Properti — listing & showcase properti
- Website Booking — sistem reservasi online
- Dashboard Admin — panel admin custom
- Sistem Inventory — manajemen stok & gudang
- CRM & ERP — sistem manajemen pelanggan & enterprise

## Navigasi

- Homepage: ${summary.url}
- Blog: ${summary.url}/blog
- Katalog: ${summary.url}/katalog
- Layanan: ${summary.url}/layanan
- Tentang Kami: ${summary.url}/tentang-kami
- API Produk (JSON): ${summary.url}/api/ai/services

## Kontak

- WhatsApp: ${summary.contact.whatsapp}
- Email: ${summary.contact.email}
- Alamat: ${summary.contact.address}
- Jam Operasional: ${summary.operatingHours}

---
Generated: ${new Date().toISOString()}
Total: ${articles.length} artikel, ${products.length} produk, ${categories.length} kategori
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=1200',
    },
  })
}
