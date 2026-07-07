import { allServices, faqs, websiteServices, siteConfig } from '@/lib/data'

const SITE_URL = siteConfig.url ?? 'https://www.oos-shop.com'

export function JsonLd() {
  // 1. Organization — identitas bisnis lengkap
  const organization = {
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
    sameAs: ['https://wa.me/6285212150100'],
    knowsAbout: [
      'WordPress Plugin Installation',
      'Jasa Pembuatan Website Company Profile',
      'Jasa Pembuatan Landing Page',
      'Jasa Pembuatan Toko Online',
      'SEO Optimization',
      'Web Development Indonesia',
    ],
  }

  // 2. WebSite — with SearchAction for sitelinks search box
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    name: siteConfig.name,
    url: SITE_URL,
    description: siteConfig.description,
    inLanguage: 'id-ID',
    publisher: { '@id': `${SITE_URL}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/katalog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // 3. WebPage — homepage entity
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': SITE_URL,
    url: SITE_URL,
    name: 'Jasa Instal Plugin WordPress Premium Original & Bergaransi | OOS SHOP',
    description: siteConfig.description,
    inLanguage: 'id-ID',
    isPartOf: { '@id': `${SITE_URL}#website` },
    about: { '@id': `${SITE_URL}#organization` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.hero-description', '#faq details'],
    },
    datePublished: '2022-01-01',
 lastReviewed: new Date().toISOString().split('T')[0],
 dateModified: new Date().toISOString().split('T')[0],
  }

  // 4. Service — plugin installation service (primary)
  const pluginService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}#plugin-service`,
    name: 'Jasa Instal Plugin WordPress Premium Original & Bergaransi',
    serviceType: 'WordPress Plugin Installation Service',
    description:
      'Jasa instal plugin WordPress premium original berlisensi resmi. Proses cepat 5-15 menit, update otomatis selamanya, harga mulai Rp 25.000. Tersedia 500+ plugin termasuk Elementor Pro, WP Rocket, Rank Math Pro, dan Crocoblock.',
    provider: { '@id': `${SITE_URL}#organization` },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    // No aggregateRating here — Google requires rating data to be sourced from
    // real customer reviews (see components/product-json-ld.tsx which pulls
    // genuine Supabase `reviews` per product). A site-wide rating aggregated
    // across all services with no real backing data risks a manual action for
    // spammy structured data. Service schema is still fully valid without it.
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
      itemListElement: allServices.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
          url: `${SITE_URL}/katalog`,
        },
      })),
    },
  }

  // 5. Service — website development service (secondary)
  const webDevService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}#webdev-service`,
    name: 'Jasa Pembuatan Website Profesional',
    serviceType: 'Website Development Service',
    description:
      'Jasa pembuatan website company profile, landing page, toko online, website sekolah, website travel, dan sistem custom. Desain modern, mobile responsive, SEO friendly, dan mudah dikelola sendiri.',
    provider: { '@id': `${SITE_URL}#organization` },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Pembuatan Website',
      itemListElement: websiteServices.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: s.heroHeading,
          description: s.seoDescription,
          url: `${SITE_URL}/layanan/${s.slug}`,
        },
      })),
    },
  }

  // 6. FAQPage — critical for featured snippets & AI Overview
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  // 7. BreadcrumbList
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: SITE_URL,
      },
    ],
  }

  // 8. ItemList — for sitelinks & internal pages
  const itemList = {
    '@context': 'https://schema.org',
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
  }

  const schemas = [
    organization,
    website,
    webPage,
    pluginService,
    webDevService,
    faqPage,
    breadcrumb,
    itemList,
  ]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
