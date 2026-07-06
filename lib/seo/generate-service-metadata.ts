import type { Metadata } from 'next'
import type { ServiceData } from '@/lib/services'

const SITE_URL = 'https://www.oos-shop.com'
const SITE_NAME = 'OOS SHOP'

/**
 * Appends the current year to the SEO title dynamically.
 * e.g. "Jasa Pembuatan Website Company Profile Profesional | OOS SHOP"
 *   → "Jasa Pembuatan Website Company Profile Profesional 2026 | OOS SHOP"
 */
function withYear(title: string): string {
  const year = new Date().getFullYear().toString()
  // If title already contains the year, skip
  if (title.includes(year)) return title
  // Insert year before " | OOS SHOP" or append at end
  if (title.includes(' | ')) {
    return title.replace(' | ', ` ${year} | `)
  }
  return `${title} ${year}`
}

/**
 * Generates Next.js Metadata object from ServiceData.
 * Used in app/layanan/[slug]/page.tsx generateMetadata().
 */
export function generateServiceMetadata(service: ServiceData): Metadata {
  const url = `${SITE_URL}/layanan/${service.slug}`
  const title = withYear(service.seo.title)

  return {
    title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: {
      canonical: service.seo.canonical ?? url,
    },
    openGraph: {
      title,
      description: service.seo.description,
      type: 'website',
      locale: 'id_ID',
      siteName: SITE_NAME,
      url,
      ...(service.seo.ogImage && {
        images: [{ url: service.seo.ogImage, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: service.seo.description,
    },
    other: {
      'last-modified': service.updatedAt,
    },
  }
}
