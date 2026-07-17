import type { ServiceData } from '@/lib/services'
import { organizationSchema, websiteSchema } from '@/lib/schema/organization'

const SITE_URL = 'https://www.oos-shop.com'

/**
 * Service page structured data — single @graph containing ALL entities.
 * Organization and WebSite included from shared module (single source of truth).
 * Only ONE <script type="application/ld+json"> is output per page.
 */
export function ServiceJsonLd({ service }: { service: ServiceData }) {
  const pageUrl = `${SITE_URL}/layanan/${service.slug}`

  const graph = [
    // Global entities (from shared module)
    organizationSchema,
    websiteSchema,

    // Page-specific entities
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

    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: service.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },

    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Layanan', item: `${SITE_URL}/layanan` },
        { '@type': 'ListItem', position: 3, name: service.menuLabel, item: pageUrl },
      ],
    },

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
