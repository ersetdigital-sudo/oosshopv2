import { siteConfig } from '@/lib/data'
import { organizationSchema, websiteSchema } from '@/lib/schema/organization'
import type { Product } from '@/lib/products'

const catalogUrl = `${siteConfig.url}/katalog`

function getActivePrice(product: Product): number {
  if (
    product.flash_sale_price &&
    product.flash_sale_end &&
    new Date(product.flash_sale_end) >= new Date()
  ) {
    return product.flash_sale_price
  }
  return product.price
}

/**
 * Catalog page structured data — single @graph containing ALL entities.
 * Organization and WebSite included from shared module (single source of truth).
 */
export function CatalogJsonLd({ products }: { products: Product[] }) {
  const graph = [
    // Global entities
    organizationSchema,
    websiteSchema,

    // CollectionPage
    {
      '@type': 'CollectionPage',
      '@id': `${catalogUrl}#collection`,
      name: 'Katalog Plugin & Theme WordPress Premium',
      description:
        'Katalog lengkap plugin & theme WordPress premium original OOS SHOP: page builder, SEO, cache, dynamic content, form builder, dan email marketing. Harga mulai Rp 25.000, lisensi resmi, bergaransi.',
      url: catalogUrl,
      inLanguage: 'id-ID',
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      provider: { '@id': `${siteConfig.url}/#organization` },
    },

    // ItemList
    {
      '@type': 'ItemList',
      '@id': `${catalogUrl}#itemlist`,
      name: 'Daftar Plugin & Theme WordPress Premium',
      numberOfItems: products.length,
      itemListElement: products.map((product, i) => {
        const productUrl = `${siteConfig.url}/produk/${product.slug || product.id}`
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            '@id': `${productUrl}#product`,
            name: product.name,
            url: productUrl,
            category: product.category,
            ...(product.description ? { description: product.description } : {}),
            ...(product.image_url ? { image: product.image_url } : {}),
            brand: { '@type': 'Brand', name: 'OOS SHOP' },
            offers: {
              '@type': 'Offer',
              url: productUrl,
              priceCurrency: 'IDR',
              price: getActivePrice(product),
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              seller: { '@id': `${siteConfig.url}/#organization` },
            },
          },
        }
      }),
    },

    // BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${catalogUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Katalog Plugin', item: catalogUrl },
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
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
