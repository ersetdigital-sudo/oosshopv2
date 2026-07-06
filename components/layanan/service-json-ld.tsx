import { siteConfig, type WebsiteService } from '@/lib/data'

const SITE_URL = siteConfig.url ?? 'https://oosshop.com'

export function ServiceJsonLd({ service }: { service: WebsiteService }) {
  const pageUrl = `${SITE_URL}/layanan/${service.slug}`

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.heroHeading,
    serviceType: service.menuLabel,
    description: service.seoDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    url: pageUrl,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'IDR',
      url: pageUrl,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Layanan',
        item: `${SITE_URL}/#layanan`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.menuLabel,
        item: pageUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
