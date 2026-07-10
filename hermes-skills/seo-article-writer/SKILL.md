---
name: seo-article-writer
description: When the user asks to write an SEO article, blog post, or content based on keyword research. This skill generates high-quality Indonesian SEO content with proper structure, internal links to EXISTING articles only, and natural keyword placement.
version: 1.0.0
author: chemz
required_environment_variables:
  - SUPABASE_URL
  - SUPABASE_SERVICE_ROLE_KEY
---

# SEO Article Writer for OOS SHOP Blog

## Overview

Generate SEO-optimized blog articles in Indonesian for oos-shop.com. Articles must be data-driven (from research skill output), link ONLY to existing articles, and follow the owner's writing style.

## When to Use

- User says "tulis artikel tentang [topic]"
- User provides a research brief and wants content generated
- User asks to create blog content for a specific keyword
- After seo-research skill has been run

## Prerequisites

- Research brief from seo-research skill (preferred)
- OR at minimum: a target keyword from the user
- Existing articles list from Supabase (for internal linking)

## Procedure

### Step 1: Fetch Existing Articles

Before writing, query Supabase for all published articles:

```python
# Query: SELECT id, title, slug, meta_description FROM articles WHERE status = 'published'
```

This is CRITICAL — internal links MUST only point to articles that actually exist.

### Step 2: Determine Article Parameters

From research brief (or user input):
- Target keyword
- Search intent
- Recommended word count (default: 1800-2200 words)
- Competitor gaps to exploit
- People Also Ask → FAQ section
- Existing articles for internal linking

### Step 3: Generate Article Content

Write the article following these STRICT rules:

**Style Guidelines:**
- Bahasa Indonesia natural, santai, profesional
- Tulis dari sudut pandang praktisi bisnis online berpengalaman
- JANGAN pakai kalimat klise: "di era digital saat ini", "sangat penting untuk"
- Variasikan panjang kalimat dan paragraf
- Sisipkan insight praktis (maks 2-4x per artikel)
- Variasikan pembuka artikel — jangan selalu sama

**Structure:**
- H1: Judul SEO (include primary keyword)
- Intro: 150-200 kata, langsung ke inti, keyword di paragraf pertama
- H2/H3: Subheading yang jelas, beberapa mengandung keyword variation
- Bullet points untuk list
- Tabel jika perlu perbandingan
- FAQ section (3-5 pertanyaan dari People Also Ask)
- Penutup dengan CTA

**SEO Rules:**
- Primary keyword di: judul, paragraf 1, 1-2 heading, kesimpulan
- Secondary keywords tersebar natural di body
- JANGAN keyword stuffing
- Meta title: max 60 karakter
- Meta description: max 155 karakter, bikin penasaran

**Internal Linking Rules (CRITICAL):**
- HANYA link ke artikel yang ADA di database (dari Step 1)
- Sisipkan 2-3 internal link natural di body content
- Anchor text harus deskriptif (bukan "klik di sini")
- Tambah section "Artikel Terkait" sebelum FAQ (3-5 link)
- Format link: `<a href="https://www.oos-shop.com/blog/[slug]">Judul</a>`

**Soft Selling:**
- Sisipkan CTA ke layanan/produk OOS SHOP secara natural
- Alur: Edukasi → Trust → Solusi → Soft Sell
- Max 2x CTA per artikel
- Link ke: `https://www.oos-shop.com/katalog` atau halaman layanan

### Step 4: Output Format

Return as JSON:

```json
{
  "title": "Judul SEO (menarik, include keyword)",
  "slug": "slug-url-friendly",
  "content": "<h2>...</h2><p>...</p>... (full HTML, NO h1)",
  "meta_title": "max 60 char",
  "meta_description": "max 155 char, bikin klik",
  "thumbnail_prompt": "prompt untuk generate thumbnail image",
  "internal_links_used": ["slug-1", "slug-2"],
  "keywords": {
    "primary": "keyword utama",
    "secondary": ["kw1", "kw2"],
    "long_tail": ["kw1", "kw2"]
  },
  "word_count": 1850,
  "faq_count": 4
}
```

## Pitfalls

- NEVER invent internal links to articles that don't exist. This is the #1 rule.
- Don't start every article with "Banyak pemilik bisnis..." or similar template opener.
- Don't exceed 2200 words — longer isn't always better.
- Don't use more than 2 CTA to OOS SHOP products.
- If no research brief is available, run seo-research skill first.
- HTML content must NOT contain h1 tags (Next.js adds h1 from title).
- FAQ section must use `<h2>FAQ</h2>` then `<strong>Question?</strong>` + `<p>Answer</p>` format.

## Verification

- Word count between 1800-2200
- Primary keyword appears in title, first paragraph, at least 1 heading, and conclusion
- All internal links point to existing slugs (cross-check with Step 1 data)
- Meta title ≤ 60 characters
- Meta description ≤ 155 characters
- FAQ section has 3-5 questions
- No h1 tags in content HTML
- Article reads naturally — not robotic or keyword-stuffed
