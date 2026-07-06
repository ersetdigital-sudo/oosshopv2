---
inclusion: manual
---

# Phase 1: Layanan Architecture Rebuild — Execution Brief

## Context
Project: OOS Shop v2 (Next.js 16, TypeScript, Tailwind, shadcn/ui, Supabase)
Repo: https://github.com/ersetdigital-sudo/oosshopv2
Status: Website already live on Vercel. Currently has a generic `app/layanan/[slug]/page.tsx` template that reads from `lib/data.ts`. Needs full refactor to proper architecture.

## What Already Exists
- `lib/services/types.ts` — TypeScript interfaces (already created, needs update)
- `lib/pricing-data.ts` — Pricing packages per slug (already works)
- `app/layanan/[slug]/page.tsx` — Current template (needs rewrite)
- `components/layanan/service-json-ld.tsx` — Schema component (needs update)
- 12 services defined in `lib/data.ts` under `websiteServices` array

## Architecture Decision (APPROVED)

### File Structure
```
lib/
├── services/
│   ├── types.ts                        ← Interfaces
│   ├── company-profile.service.ts
│   ├── landing-page.service.ts
│   ├── toko-online.service.ts
│   ├── sekolah.service.ts
│   ├── travel.service.ts
│   ├── klinik.service.ts
│   ├── booking.service.ts
│   ├── hotel.service.ts
│   ├── properti.service.ts
│   ├── dashboard.service.ts
│   ├── inventory.service.ts
│   ├── crm-erp.service.ts
│   └── index.ts                        ← Registry (object, O(1) lookup)
├── pricing-data.ts                     ← Pricing packages (already done)
└── seo/
    └── generate-service-metadata.ts    ← Metadata helper

components/layanan/
└── service-json-ld.tsx                 ← Single component, renders all schemas

app/layanan/
├── [slug]/
│   └── page.tsx                        ← 1 template, reads from registry
├── layout.tsx                          ← (optional)
└── not-found.tsx                       ← (optional)
```

### TypeScript Interface (ServiceData)
```ts
interface ServiceData {
  slug: string
  menuLabel: string
  menuDescription: string
  updatedAt: string  // ISO date string, for freshness signal

  seo: {
    title: string
    description: string
    keywords: string[]
    canonical?: string
    ogImage?: string
  }

  hero: {
    badge: string
    heading: string
    subheading: string
    icon: string  // lucide icon name
  }

  whatIs: {
    title: string
    answer: string  // 2-3 paragraphs, AEO-optimized
    priceNote: string
    timelineNote: string
  }

  // Optional — only renders if data exists
  whyChooseUs?: { title: string; description: string }[]
  features?: string[]  // checklist grid
  benefits: { title: string; description: string }[]
  useCases: string[]
  process: { step: string; title: string; description: string }[]
  faq: { question: string; answer: string }[]
  relatedServices?: string[]  // slugs for internal linking
}
```

### Registry (index.ts)
```ts
// Object for O(1) lookup, NOT array
export const services: Record<string, ServiceData> = {
  "jasa-pembuatan-company-profile": companyProfile,
  "jasa-pembuatan-landing-page": landingPage,
  ...
}
```

### Template renders these sections (in order):
1. Breadcrumb
2. Hero + trust signals
3. TOC (auto-generated from available sections)
4. "Apa itu" (AEO direct answer)
5. Kenapa Memilih Kami (whyChooseUs) — optional
6. Fitur (features grid checklist) — optional
7. Keunggulan (benefits cards)
8. Cocok Untuk (useCases)
9. Proses Kerja (process steps)
10. Pricing (from pricing-data.ts) — optional
11. FAQ (accordions)
12. Related Services (internal links) — optional
13. CTA
14. `<time>` lastUpdated

### Key Rules
- Registry as object (O(1) lookup), not array
- `generateStaticParams()` from registry keys
- Metadata from helper (`lib/seo/generate-service-metadata.ts`)
- JSON-LD: single `<ServiceJsonLd>` component that renders Organization + Service + FAQ + Breadcrumb + WebPage + HowTo all at once
- Section is optional: if data is undefined/empty, don't render
- Each service content MUST be truly unique (not keyword swapping)
- Pricing stays in `lib/pricing-data.ts` (separate concern)
- `updatedAt` rendered as `<time>` element + used in schema `dateModified`
- TOC auto-generated from sections that have content

### Content Requirements Per Service
- 2000+ words unique content
- FAQ answers specific questions that real users search for (not generic)
- Hero copy speaks to the target audience's pain points
- `whatIs.answer` structured for AI to quote directly
- Features list specific to the service type (not copy-paste between services)

### Source of Content
Reference v1 landing pages at: `c:\Users\user\Downloads\OOS SHOP\oosshop\app\layanan\`
- company-profile/page.js — Full content
- landing-page/LandingPageLanding.jsx — Full content  
- toko-online/landing.tsx — Full content
- travel-tour/TravelLanding.jsx + page.js — Full content
- organisasi/OrganisasiLanding.jsx — Full content
- custom-plugin/page.js — Full content
- sistem-inventory/page.js — Full content
- toko-digital/page.js — Full content
- sekolah/page.js — Minimal (needs enrichment)
- pemerintahan/page.js — Minimal (needs enrichment)

### What to Remove After Done
- Remove the old `websiteServices` array from `lib/data.ts` (or keep as legacy, redirect imports)
- Remove old service data that's been moved to individual files
- Keep `lib/data.ts` for other data (catalog items, site config, etc.)

## V1 Reference — Pricing Per Service
Already in `lib/pricing-data.ts`:
- Company Profile: UMKM 1.25M, Bisnis 2.35M, Corporate 3.25M
- Landing Page: Starter 600K, Profesional 1.5M, Custom
- Toko Online: Starter 1.5M, Professional 3.5M, Enterprise
- Sekolah: Basic 500K, Lengkap 1.5M, Custom
- Travel: Standard 1.5M, Premium 3.5M, Custom
- Klinik: Basic 1.25M, Professional 2.5M, Custom

## How to Start Next Session
Just say: "Kerjain Phase 1 sesuai brief di .kiro/steering/phase1-layanan-rebuild.md"
