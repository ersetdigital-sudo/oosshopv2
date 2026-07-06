import { siteConfig, type WebsiteService } from '@/lib/data'

const SITE_URL = siteConfig.url ?? 'https://www.oos-shop.com'

export function ServiceJsonLd({ service }: { service: WebsiteService }) {
  const pageUrl = `${SITE_URL}/layanan/${service.slug}`

  // 1. Service schema — main entity
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: service.heroHeading,
    serviceType: service.menuLabel,
    description: service.seoDescription,
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: siteConfig.name,
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+6285212150100',
        contactType: 'customer service',
        areaServed: 'ID',
        availableLanguage: ['Indonesian', 'English'],
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sumedang',
        addressRegion: 'Jawa Barat',
        addressCountry: 'ID',
      },
      sameAs: [
        'https://wa.me/6285212150100',
      ],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
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
        description: service.priceNote,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '1200',
      reviewCount: '850',
    },
    termsOfService: `${SITE_URL}/kebijakan-privasi`,
  }

  // 2. FAQPage schema — critical for AI Overview / People Also Ask
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  // 3. BreadcrumbList schema
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

  // 4. HowTo schema — helps AI Overview show step-by-step process
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
      value: service.priceNote,
    },
    step: service.process.map((item) => ({
      '@type': 'HowToStep',
      position: parseInt(item.step),
      name: item.title,
      text: item.description,
      url: `${pageUrl}#proses`,
    })),
  }

  // 5. WebPage schema — ties everything together for AI
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: service.seoTitle,
    description: service.seoDescription,
    inLanguage: 'id-ID',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: siteConfig.name,
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_URL}#organization`,
      },
    },
    about: {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
    },
    mainEntity: {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#apa-itu p', '#faq details'],
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbSchema.itemListElement,
    },
    lastReviewed: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
  }

  // 6. Organization schema — so Google knows who provides the service
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: 'OOS SHOP',
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    description: siteConfig.description,
    foundingDate: '2022',
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
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
    sameAs: [
      'https://wa.me/6285212150100',
    ],
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
