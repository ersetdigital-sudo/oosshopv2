import type { ServiceData } from '@/lib/services'

const SITE_URL = 'https://www.oos-shop.com'

/**
 * Renders page-specific structured data for a service page using a single @graph.
 * Organization and WebSite are NOT defined here — they come from layout.tsx.
 * All references use @id to point to the global definitions.
 */
export function ServiceJsonLd({ service }: { service: ServiceData }) {
  const pageUrl = `${SITE_URL}/layanan/${service.slug}`

  const graph = [
    // 1. WebPage
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: service.seo.title,
      description: service.seo.description,
      inLanguage: 'id-ID',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${pageUrl}#service` },
      mainEntity: { '@id': `${pageUrl}#service` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '#apa-itu p', '#faq details'],
      },
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      dateModified: service.updatedAt,
      lastReviewed: service.updatedAt,
    },

    // 2. Service
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: service.hero.heading,
      serviceType: service.menuLabel,
      description: service.seo.description,
      url: pageUrl,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'Indonesia' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `Paket ${service.menuLabel}`,
        itemListElement: service.benefits.map((b) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: b.title,
            description: b.description,
          },
        })),
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'IDR',
        url: pageUrl,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'IDR',
          description: service.whatIs.priceNote,
        },
      },
      termsOfService: `${SITE_URL}/kebijakan-privasi`,
    },

    // 3. FAQPage
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: service.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },

    // 4. BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Layanan', item: `${SITE_URL}/#layanan` },
        { '@type': 'ListItem', position: 3, name: service.menuLabel, item: pageUrl },
      ],
    },

    // 5. HowTo
    {
      '@type': 'HowTo',
      '@id': `${pageUrl}#howto`,
      name: `Cara Memesan ${service.menuLabel} di OOS SHOP`,
      description: `Langkah-langkah memesan layanan ${service.menuLabel.toLowerCase()} di OOS SHOP, dari konsultasi hingga website online.`,
      totalTime: 'P14D',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'IDR',
        value: service.whatIs.priceNote,
      },
      step: service.process.map((item) => ({
        '@type': 'HowToStep',
        position: parseInt(item.step),
        name: item.title,
        text: item.description,
        url: `${pageUrl}#proses`,
      })),
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
