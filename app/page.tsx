import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { LogoStrip } from '@/components/logo-strip'
import { TrustStrip } from '@/components/trust-strip'
import { ServicesSection } from '@/components/services-section'
import { HowItWorks } from '@/components/how-it-works'
import { ComparisonTable } from '@/components/comparison-table'
import { TrustSecurity } from '@/components/trust-security'
import { WebsiteDevelopment } from '@/components/website-development'
import { FaqSection } from '@/components/faq-section'
import { ArticlesSection } from '@/components/articles-section'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'
import { JsonLd } from '@/components/json-ld'
import { getPublishedArticles } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const articles = await getPublishedArticles()

  return (
    <>
      <JsonLd />
      <SiteHeader />
      <main>
        <Hero />
        <LogoStrip />
        <TrustStrip />
        <ServicesSection />
        <HowItWorks />
        <ComparisonTable />
        <TrustSecurity />
        <WebsiteDevelopment />
        <FaqSection />
        <ArticlesSection articles={articles.slice(0, 3)} />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
