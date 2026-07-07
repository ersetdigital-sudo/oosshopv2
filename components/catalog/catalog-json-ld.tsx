import { siteConfig } from '@/lib/data'
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

// IMPORTANT: this must mirror exactly what CatalogClient renders (same Supabase
// products, same URLs). Google's structured data guidelines require markup to
// describe the actual page content — mismatched/stale data risks manual action
// and was the root cause of the "URL points to homepage" issue found in v1.
// Product/Offer markup here intentionally points each item to its own
// /produk/[slug] page, never to this listing page itself.
export function CatalogJsonLd({ products }: { products: Product[] }) {
  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${catalogUrl}#collection`,
    name: 'Katalog Plugin & Theme WordPress Premium',
    description:
      'Katalog lengkap plugin & theme WordPress premium original OOS SHOP: page builder, SEO, cache, dynamic content, form builder, dan email marketing. Harga mulai Rp 25.000, lisensi resmi, bergaransi.',
    url: catalogUrl,
    inLanguage: 'id-ID',
    isPartOf: { '@id': `${siteConfig.url}#website` },
    provider: { '@id': `${siteConfig.url}#organization` },
  }

  const itemList = {
    '@context': 'https://schema.org',
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
            seller: { '@id': `${siteConfig.url}#organization` },
          },
        },
      }
    }),
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
