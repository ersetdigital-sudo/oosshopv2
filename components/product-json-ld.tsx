import { siteConfig } from '@/lib/data'
import type { Product } from '@/lib/products'
import type { Review } from '@/app/produk/[slug]/page'

type ProductJsonLdProps = {
  product: Product
  activePrice: number
  reviews: Review[]
  avgRating: string
  faqItems?: { question: string; answer: string }[]
}

// Product schema for rich snippets (price, rating, availability) — critical for
// Google Shopping-style results and being cited in AI Overview / ChatGPT answers.
// Reusable MerchantReturnPolicy — referenced by @id from every product's Offer.
// Keeping it as a single shared entity (rather than duplicating on every page)
// matches the pattern schema.org expects and avoids inconsistent policies.
function returnPolicy(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MerchantReturnPolicy' as const,
    '@id': `${siteUrl}#return-policy`,
    name: 'Garansi Refund 7 Hari',
    url: `${siteUrl}/syarat-ketentuan`,
    applicableCountry: 'ID',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 7,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',
  }
}

export function ProductJsonLd({ product, activePrice, reviews, avgRating, faqItems = [] }: ProductJsonLdProps) {
  const url = `${siteConfig.url}/produk/${product.slug || product.id}`

  const productSchema = {
    '@context': 'https://schema.org',
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
      seller: { '@id': `${siteConfig.url}#organization` },
      hasMerchantReturnPolicy: { '@id': `${siteConfig.url}#return-policy` },
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
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Katalog', item: `${siteConfig.url}/katalog` },
      { '@type': 'ListItem', position: 3, name: product.name, item: url },
    ],
  }

  const faqSchema =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null

  const schemas = [
    returnPolicy(siteConfig.url),
    productSchema,
    breadcrumb,
    ...(faqSchema ? [faqSchema] : []),
  ]

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
