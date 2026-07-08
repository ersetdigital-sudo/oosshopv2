# Structural Improvement: Company Profile Landing Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a hero hook question, a Problem section, and an improved closing CTA with one-line rhythm to the company profile landing page without breaking other service pages.

**Architecture:** Extend the existing `ServiceData` type with optional fields (`hero.hook`, `problemSection`, `finalCta`) and conditionally render them in the shared `app/layanan/[slug]/page.tsx` template. Populate the new fields in `company-profile.service.ts`. All changes are backward compatible.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.7, Tailwind CSS 4

---

## Task 1: Extend ServiceData Types

**Files:**
- Modify: `lib/services/types.ts`

**Step 1:** Add `hook?: string` to `ServiceHero` interface.

**Step 2:** Add `problemSection` and `finalCta` to `ServiceData` interface.

```typescript
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
```

**Step 3:** Add optional fields to `ServiceData`:

```typescript
problemSection?: ServiceProblemSection
finalCta?: ServiceFinalCta
```

---

## Task 2: Conditionally Render New Sections in Page Template

**Files:**
- Modify: `app/layanan/[slug]/page.tsx`

**Step 1:** Render hero hook above `<h1>` when `service.hero.hook` exists.

**Step 2:** Add Problem section after Trust Stats and before the "Apa Itu" section.

**Step 3:** Update Final CTA section to use `service.finalCta` when available, falling back to current generic CTA.

---

## Task 3: Populate New Fields for Company Profile

**Files:**
- Modify: `lib/services/company-profile.service.ts`

**Step 1:** Add `hero.hook` with a compelling question.

**Step 2:** Add `problemSection` with 4-5 pain points.

**Step 3:** Add `finalCta` with title, one-line rhythm lines, question, and closing.

---

## Task 4: Verify Type Safety

**Files:**
- All modified files

**Step 1:** Run `npm install` to install dependencies.

**Step 2:** Run `npx tsc --noEmit` to check for TypeScript errors.

**Step 3:** Fix any type errors that appear.

---

## Task 5: Commit and Push

**Step 1:** Stage all modified files.

**Step 2:** Commit with message:
```
feat(company-profile): add hero hook, problem section, and improved closing CTA

- Extend ServiceData with optional hook, problemSection, and finalCta
- Render new sections conditionally in service page template
- Populate company profile service with optimized structural copy
- All changes are backward compatible with existing services
```

**Step 3:** Push directly to `main`.

---

## Self-Review Checklist

- [ ] Types extended without breaking existing service files
- [ ] Page template renders new sections conditionally
- [ ] Company profile content uses new fields
- [ ] `tsc --noEmit` passes with zero errors
- [ ] Commit message is descriptive
- [ ] Push to main succeeds
