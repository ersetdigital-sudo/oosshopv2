import type { Metadata } from 'next'
import { ServiceJsonLd } from '@/components/layanan/service-json-ld'
import { inventory } from '@/lib/services/inventory.service'
import { siteConfig } from '@/lib/data'

const service = inventory

export const metadata: Metadata = {
  title: service.seo.title,
  description: service.seo.description,
  keywords: service.seo.keywords,
  alternates: { canonical: `${siteConfig.url}/layanan/${service.slug}` },
  openGraph: {
    title: service.seo.title,
    description: service.seo.description,
    type: 'website',
    locale: 'id_ID',
    siteName: 'OOS SHOP',
    url: `${siteConfig.url}/layanan/${service.slug}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: service.seo.title,
    description: service.seo.description,
  },
}

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceJsonLd service={service} />
      {children}
    </>
  )
}
