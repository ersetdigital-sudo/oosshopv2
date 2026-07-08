/**
 * Shared Organization & WebSite schema entities.
 * Single source of truth — imported by every page-level JSON-LD component.
 * Each page includes these in its own @graph so there is only ONE <script>
 * tag per page, eliminating cross-script @id resolution issues.
 */

const SITE_URL = 'https://www.oos-shop.com'

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'OOS SHOP',
  url: SITE_URL,
  description:
    'OOS SHOP adalah penyedia jasa instal plugin WordPress premium original berlisensi resmi dan jasa pembuatan website custom profesional di Indonesia.',
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/icon-512.png`,
    width: 512,
    height: 512,
    caption: 'OOS SHOP',
  },
  foundingDate: '2022',
  founder: {
    '@type': 'Person',
    '@id': `${SITE_URL}/#founder`,
    name: 'Andri',
    url: `${SITE_URL}/tentang-kami`,
  },
  areaServed: { '@type': 'Country', name: 'Indonesia' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calangcang No.82, Legok Kidul',
    addressLocality: 'Paseh',
    addressRegion: 'Jawa Barat',
    postalCode: '45381',
    addressCountry: 'ID',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+6285212150100',
    contactType: 'customer service',
    availableLanguage: ['Indonesian', 'English'],
    areaServed: 'ID',
  },
  sameAs: [
    'https://www.instagram.com/oos.shop/',
    'https://www.tiktok.com/@oos.shop',
    'https://shopee.co.id/oos.shop',
    'https://www.facebook.com/share/18ZRZ3XiBH/',
    'https://t.me/Oos_shop',
    'https://wa.me/6285212150100',
  ],
  knowsAbout: [
    'WordPress Plugin Installation',
    'Jasa Pembuatan Website Company Profile',
    'Jasa Pembuatan Landing Page',
    'Jasa Pembuatan Toko Online',
    'SEO Optimization',
    'Web Development Indonesia',
  ],
} as const

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'OOS SHOP',
  url: SITE_URL,
  description:
    'Jasa instal plugin WordPress premium original berlisensi resmi dan jasa pembuatan website profesional di Indonesia.',
  inLanguage: 'id-ID',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/katalog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
} as const
