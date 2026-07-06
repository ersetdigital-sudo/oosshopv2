import { catalogItems, siteConfig } from '@/lib/data'

const catalogUrl = `${siteConfig.url}/katalog`

export function CatalogJsonLd() {
  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${catalogUrl}/#collection`,
    name: 'Katalog Jasa Instal Plugin WordPress Premium',
    description:
      'Katalog lengkap jasa instal plugin WordPress premium original OOS SHOP: page builder, SEO, cache, dynamic content, form builder, dan email marketing. Harga mulai Rp 25.000, lisensi resmi, bergaransi.',
    url: catalogUrl,
    inLanguage: 'id-ID',
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    provider: { '@id': `${siteConfig.url}/#organization` },
  }

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${catalogUrl}/#itemlist`,
    name: 'Daftar Jasa Instal Plugin WordPress Premium',
    numberOfItems: catalogItems.length,
    itemListElement: catalogItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        '@id': `${catalogUrl}/#${item.slug}`,
        name: item.name,
        category: item.category,
        description: item.description,
        brand: { '@type': 'Brand', name: item.plugin },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'IDR',
          price: String(item.price),
          availability: 'https://schema.org/InStock',
          url: catalogUrl,
          seller: { '@id': `${siteConfig.url}/#organization` },
        },
      },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Katalog Plugin', item: catalogUrl },
    ],
  }

  const schemas = [collectionPage, itemList, breadcrumb]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
