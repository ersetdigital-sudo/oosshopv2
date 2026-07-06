import { NextResponse } from 'next/server'
import { getAllProducts } from '@/lib/products'
import { siteConfig } from '@/lib/data'

// Dynamic route — always reflects live Supabase data.
// Consumed by: llms.txt generator, AI crawlers (ChatGPT, Perplexity, Google AI Overview),
// and can be fetched directly at /api/ai/services for machine-readable product data.
export const dynamic = 'force-dynamic'

export async function GET() {
  const products = await getAllProducts()

  const services = products.map((p) => ({
    slug: p.slug || p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    priceCurrency: 'IDR',
    description: p.description || '',
    image: p.image_url || null,
    bestSeller: p.total_sold > 50,
    inStock: true,
    url: `${siteConfig.url}/produk/${p.slug || p.id}`,
    lastUpdated: p.created_at,
  }))

  return NextResponse.json(
    {
      source: siteConfig.name,
      url: siteConfig.url,
      totalServices: services.length,
      generatedAt: new Date().toISOString(),
      services,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
      },
    },
  )
}
