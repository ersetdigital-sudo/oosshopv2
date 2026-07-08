/**
 * Service Landing Page Types
 * Each service has its own file (e.g., company-profile.service.ts)
 * All rendered by a single template: app/layanan/[slug]/page.tsx
 */

export interface ServiceSEO {
  title: string
  description: string
  keywords: string[]
  canonical?: string
  ogImage?: string
}

export interface ServiceHero {
  badge: string
  heading: string
  subheading: string
  icon: string // lucide icon name
  hook?: string // reflective question above the main heading
}

export interface ServiceWhatIs {
  title: string
  answer: string
  priceNote: string
  timelineNote: string
}

export interface ServiceBenefit {
  title: string
  description: string
}

export interface ServiceProblemSection {
  title: string
  intro?: string
  items: ServiceBenefit[]
}

export interface ServiceFinalCta {
  title: string
  lines: string[]
  question: string
  closing: string
}

export interface ServiceProcess {
  step: string
  title: string
  description: string
}

export interface ServiceFAQ {
  question: string
  answer: string
}

export interface ServiceRating {
  ratingValue: string
  ratingCount: string
  reviewCount: string
}

export interface ServiceTrustStat {
  value: string
  label: string
}

export interface ServiceShowcaseHighlight {
  title: string
  description: string
}

export interface ServiceShowcase {
  badge: string
  title: string
  description: string
  highlights: ServiceShowcaseHighlight[]
}

export interface ServiceTestimonial {
  text: string
  name: string
  role: string
}

export interface ServicePromoPricing {
  badge: string
  originalPrice: string
  price: string
  savingsLabel: string
  ctaLabel: string
  includes: string[]
  note?: string
}

export interface ServiceData {
  slug: string
  menuLabel: string
  menuDescription: string
  updatedAt: string

  seo: ServiceSEO
  hero: ServiceHero
  whatIs: ServiceWhatIs

  // Optional sections — only rendered if data exists
  whyChooseUs?: ServiceBenefit[]
  features?: string[]
  benefits: ServiceBenefit[]
  problemSection?: ServiceProblemSection
  useCases: string[]
  process: ServiceProcess[]
  faq: ServiceFAQ[]
  finalCta?: ServiceFinalCta
  rating?: ServiceRating // optional — omit to skip aggregateRating in schema
  relatedServices?: string[] // slugs for internal linking

  // Extra visual/marketing sections — purely presentational, NOT read by
  // ServiceJsonLd or generateServiceMetadata, so adding these never changes
  // structured data or metadata output for this or any other service.
  trustStats?: ServiceTrustStat[]
  showcase?: ServiceShowcase
  notificationPreview?: string[]
  promoPricing?: ServicePromoPricing
  testimonials?: ServiceTestimonial[]
}
