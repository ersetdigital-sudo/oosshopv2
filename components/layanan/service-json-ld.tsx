import type { ServiceData } from '@/lib/services'

const SITE_URL = 'https://www.oos-shop.com'
const SITE_NAME = 'OOS SHOP'

/**
 * Renders all structured data schemas for a service page:
 * Organization, Service, FAQPage, BreadcrumbList, WebPage, HowTo
 */
export function ServiceJsonLd({ service }: { service: ServiceData }) {
  const pageUrl = `${SITE_URL}/layanan/${service.slug}`

  // 1. Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    description:
      'Jasa pembuatan website profesional dan plugin WordPress premium untuk bisnis di Indonesia.',
    foundingDate: '2022',
    areaServed: { '@type': 'Country', name: 'Indonesia' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+6285212150100',
      contactType: 'customer service',
      areaServed: 'ID',
      availableLanguage: ['Indonesian', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calangcang No.82, Legok Kidul',
      addressLocality: 'Paseh',
      addressRegion: 'Jawa Barat',
      postalCode: '45381',
      addressCountry: 'ID',
    },
    sameAs: ['https://wa.me/6285212150100'],
  }

  // 2. Service schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: service.hero.heading,
    serviceType: service.menuLabel,
    description: service.seo.description,
    url: pageUrl,
    provider: { '@type': 'Organization', '@id': `${SITE_URL}#organization` },
    areaServed: { '@type': 'Country', name: 'Indonesia' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Paket ${service.menuLabel}`,
      itemListElement: service.benefits.map((b, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: b.title,
          description: b.description,
        },
        position: i + 1,
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
    ...(service.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: service.rating.ratingValue,
        bestRating: '5',
        ratingCount: service.rating.ratingCount,
        reviewCount: service.rating.reviewCount,
      },
    }),
    termsOfService: `${SITE_URL}/kebijakan-privasi`,
  }

  // 3. FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: service.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  // 4. BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE_URL },
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

  // 5. HowTo schema
  const howToSchema = {
    '@context': 'https://schema.org',
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
  }

  // 6. WebPage schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: service.seo.title,
    description: service.seo.description,
    inLanguage: 'id-ID',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@type': 'Organization', '@id': `${SITE_URL}#organization` },
    },
    about: { '@type': 'Service', '@id': `${pageUrl}#service` },
    mainEntity: { '@type': 'Service', '@id': `${pageUrl}#service` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#apa-itu p', '#faq details'],
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbSchema.itemListElement,
    },
    dateModified: service.updatedAt,
    lastReviewed: service.updatedAt,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  )
}
