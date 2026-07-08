import { allServices, faqs, websiteServices, siteConfig } from '@/lib/data'
import { organizationSchema, websiteSchema } from '@/lib/schema/organization'

const SITE_URL = siteConfig.url ?? 'https://www.oos-shop.com'

/**
 * Homepage structured data — single @graph containing ALL entities.
 * Organization and WebSite are included from shared module (single source of truth).
 * Only ONE <script type="application/ld+json"> is output per page.
 */
export function JsonLd() {
  const graph = [
    // Global entities (from shared module)
    organizationSchema,
    websiteSchema,

    // Page-specific entities
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Jasa Instal Plugin WordPress Premium Original & Bergaransi | OOS SHOP',
      description: siteConfig.description,
      inLanguage: 'id-ID',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hero-description', '#faq details'],
      },
      datePublished: '2022-01-01',
      lastReviewed: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0],
    },

    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#plugin-service`,
      name: 'Jasa Instal Plugin WordPress Premium Original & Bergaransi',
      serviceType: 'WordPress Plugin Installation Service',
      description:
        'Jasa instal plugin WordPress premium original berlisensi resmi. Proses cepat 5-15 menit, update otomatis selamanya, harga mulai Rp 25.000. Tersedia 500+ plugin termasuk Elementor Pro, WP Rocket, Rank Math Pro, dan Crocoblock.',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'Indonesia' },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'IDR',
        lowPrice: '25000',
        highPrice: '50000',
        offerCount: String(allServices.length),
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Katalog Plugin WordPress Premium',
        itemListElement: allServices.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.name,
            description: s.description,
            url: `${SITE_URL}/katalog`,
          },
        })),
      },
    },

    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#webdev-service`,
      name: 'Jasa Pembuatan Website Profesional',
      serviceType: 'Website Development Service',
      description:
        'Jasa pembuatan website company profile, landing page, toko online, website sekolah, website travel, dan sistem custom. Desain modern, mobile responsive, SEO friendly, dan mudah dikelola sendiri.',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'Indonesia' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Layanan Pembuatan Website',
        itemListElement: websiteServices.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.heroHeading,
            description: s.seoDescription,
            url: `${SITE_URL}/layanan/${s.slug}`,
          },
        })),
      },
    },

    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },

    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE_URL },
      ],
    },

    {
      '@type': 'ItemList',
      name: 'Layanan OOS SHOP',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Katalog Plugin WordPress Premium',
          url: `${SITE_URL}/katalog`,
        },
        ...websiteServices.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: s.menuLabel,
          url: `${SITE_URL}/layanan/${s.slug}`,
        })),
      ],
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
