import { siteConfig } from '@/lib/data'
import { organizationSchema, websiteSchema } from '@/lib/schema/organization'
import type { Product } from '@/lib/products'
import type { Review } from '@/app/produk/[slug]/page'

type ProductJsonLdProps = {
  product: Product
  activePrice: number
  reviews: Review[]
  avgRating: string
  faqItems?: { question: string; answer: string }[]
}

/**
 * Product page structured data — single @graph containing ALL entities.
 * Organization and WebSite included from shared module (single source of truth).
 */
export function ProductJsonLd({ product, activePrice, reviews, avgRating, faqItems = [] }: ProductJsonLdProps) {
  const url = `${siteConfig.url}/produk/${product.slug || product.id}`

  const graph: Record<string, unknown>[] = [
    // Global entities
    organizationSchema,
    websiteSchema,

    // Return policy
    {
      '@type': 'MerchantReturnPolicy',
      '@id': `${siteConfig.url}/#return-policy`,
      name: 'Garansi Refund 7 Hari',
      url: `${siteConfig.url}/syarat-ketentuan`,
      applicableCountry: 'ID',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 7,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn',
    },

    // WebPage
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: product.name,
      description: product.description || product.name,
      inLanguage: 'id-ID',
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      datePublished: product.created_at,
      dateModified: product.updated_at || product.created_at,
      breadcrumb: { '@id': `${url}#breadcrumb` },
      mainEntity: { '@id': `${url}#product` },
    },

    // Product
    {
      '@type': 'Product',
      '@id': `${url}#product`,
      name: product.name,
      description: product.description || product.name,
      category: product.category,
      image: product.image_url || `${siteConfig.url}/icon-512.png`,
      sku: product.id,
      brand: { '@type': 'Brand', name: 'OOS SHOP' },
      url,
      offers: {
        '@type': 'Offer',
        url,
        priceCurrency: 'IDR',
        price: activePrice,
        priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@id': `${siteConfig.url}/#organization` },
        hasMerchantReturnPolicy: { '@id': `${siteConfig.url}/#return-policy` },
      },
      ...(reviews.length > 0 && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: avgRating,
          reviewCount: reviews.length,
          bestRating: '5',
          worstRating: '1',
        },
        review: reviews.slice(0, 5).map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.customer_name },
          datePublished: r.created_at,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: String(r.rating),
            bestRating: '5',
          },
          reviewBody: r.comment || '',
        })),
      }),
    },

    // BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Katalog', item: `${siteConfig.url}/katalog` },
        { '@type': 'ListItem', position: 3, name: product.name, item: url },
      ],
    },
  ]

  // FAQ (optional)
  if (faqItems.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

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
