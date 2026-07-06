/**
 * Service Registry — O(1) lookup by slug
 * Single source of truth for all service landing page data.
 */
import type { ServiceData } from './types'
import { companyProfile } from './company-profile.service'
import { landingPage } from './landing-page.service'
import { tokoOnline } from './toko-online.service'
import { sekolah } from './sekolah.service'
import { travel } from './travel.service'
import { klinik } from './klinik.service'
import { booking } from './booking.service'
import { hotel } from './hotel.service'
import { properti } from './properti.service'
import { dashboard } from './dashboard.service'
import { inventory } from './inventory.service'
import { crmErp } from './crm-erp.service'

export type { ServiceData } from './types'

/** Object registry for O(1) slug lookup */
export const services: Record<string, ServiceData> = {
  'jasa-pembuatan-company-profile': companyProfile,
  'jasa-pembuatan-landing-page': landingPage,
  'jasa-pembuatan-toko-online': tokoOnline,
  'jasa-pembuatan-website-sekolah': sekolah,
  'jasa-pembuatan-website-travel': travel,
  'jasa-pembuatan-website-klinik': klinik,
  'jasa-pembuatan-website-booking': booking,
  'jasa-pembuatan-website-hotel': hotel,
  'jasa-pembuatan-website-properti': properti,
  'jasa-pembuatan-dashboard-admin': dashboard,
  'jasa-pembuatan-sistem-inventory': inventory,
  'jasa-pembuatan-crm-erp': crmErp,
}

/** Get a service by slug (O(1) lookup) */
export function getService(slug: string): ServiceData | undefined {
  return services[slug]
}

/** All service slugs (for generateStaticParams) */
export function getServiceSlugs(): string[] {
  return Object.keys(services)
}
