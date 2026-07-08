import type { ServiceData } from '@/lib/services'

const SITE_URL = 'https://www.oos-shop.com'
const SITE_NAME = 'OOS SHOP'

/**
 * Renders all structured data schemas for a service page using a single @graph.
 * Organization and WebSite are defined once with @id; all other entities reference them.
 */
export function ServiceJsonLd({ service }: { service: ServiceData }) {
  const pageUrl = `${SITE_URL}/layanan/${service.slug}`

  const graph = [
    // 1. Organization — defined ONCE, referenced by @id elsewhere
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#logo`,
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
        caption: SITE_NAME,
      },
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
      sameAs: [
        'https://www.instagram.com/oos.shop/',
        'https://www.tiktok.com/@oos.shop',
        'https://shopee.co.id/oos.shop',
        'https://www.facebook.com/share/18ZRZ3XiBH/',
        'https://t.me/Oos_shop',
        'https://wa.me/6285212150100',
      ],
      founder: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
        name: 'Andri',
        url: `${SITE_URL}/tentang-kami`,
      },
    },

    // 2. WebSite — defined ONCE, referenced by @id elsewhere
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'id-ID',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },

    // 3. WebPage
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

    // 4. Service
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

    // 5. FAQPage
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: service.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },

    // 6. BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Layanan', item: `${SITE_URL}/#layanan` },
        { '@type': 'ListItem', position: 3, name: service.menuLabel, item: pageUrl },
      ],
    },

    // 7. HowTo
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
