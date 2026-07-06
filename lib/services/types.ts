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
  useCases: string[]
  process: ServiceProcess[]
  faq: ServiceFAQ[]
  rating?: ServiceRating // optional — omit to skip aggregateRating in schema
  relatedServices?: string[] // slugs for internal linking
}
