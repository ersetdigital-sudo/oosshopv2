---
name: seo-publish-pipeline
description: Full SEO article pipeline - from keyword research to published article with internal links. Use when user says "buatkan artikel SEO tentang [keyword]" or "riset dan publish artikel tentang [topic]". This is the master orchestrator that chains all SEO skills together.
version: 1.0.0
author: chemz
required_environment_variables:
  - TAVILY_API_KEY
  - SERPER_API_KEY
  - SERPAPI_KEY
  - SUPABASE_URL
  - SUPABASE_SERVICE_ROLE_KEY
---

# SEO Publish Pipeline (Full Orchestrator)

## Overview

End-to-end pipeline: keyword research → article generation → internal linking → publish. One command, full execution. Chains the individual skills (seo-research, seo-article-writer, internal-linking, publish-to-supabase) into a single workflow.

## When to Use

- User says "buatkan artikel SEO tentang [keyword]"
- User says "riset dan publish artikel [topic]"
- User says "full pipeline untuk keyword [X]"
- User provides a keyword and wants the complete workflow
- Scheduled cron job triggers article creation

## Procedure

### Phase 1: Research (seo-research skill)

1. Take the user's keyword/topic
2. Run SERP analysis via Serper (top 10, PAA, related searches)
3. Crawl top 3 competitor articles via Tavily
4. Compile research brief with:
   - Search intent
   - Competitor analysis
   - Content gaps
   - Keyword list
   - Recommended word count
   - People Also Ask for FAQ

**Decision point:** Show research brief to user.
- If via Telegram: send summary, ask "Lanjut generate?" 
- If confidence >90% (scheduled/cron): proceed automatically

### Phase 2: Generate Article (seo-article-writer skill)

1. Fetch ALL existing published articles from Supabase (for internal linking)
2. Generate article using research data + existing articles context
3. Ensure:
   - Word count matches recommendation
   - Internal links ONLY to existing articles
   - FAQ from People Also Ask data
   - Proper keyword placement
   - Natural writing style

**Decision point:** Show article preview to user.
- If via Telegram: send title + meta + first 200 chars, ask "Publish atau edit?"
- If confidence >90% (scheduled): proceed to publish

### Phase 3: Publish (publish-to-supabase skill)

1. Validate all fields
2. Check duplicate slug
3. Insert into Supabase `articles` table
4. Status: "published" (or "draft" if user prefers)
5. Trigger Next.js revalidation

### Phase 4: Internal Linking (internal-linking skill)

1. Find 2-3 related existing articles
2. Insert natural backlink to new article in each
3. Update those articles in Supabase
4. Revalidate modified pages

### Phase 5: Report

Send final report to user:

```
✅ Artikel Published!

📝 Judul: [title]
🔗 URL: https://www.oos-shop.com/blog/[slug]
📊 Word Count: [count]
🎯 Primary KW: [keyword]
🔄 Internal Links: [X] links ke artikel lama, [Y] backlinks dari artikel lama

Backlinks ditambahkan ke:
- [article 1 title] ← link ke artikel baru
- [article 2 title] ← link ke artikel baru

Next scheduled: [next keyword from content plan]
```

## Confidence Scoring

The pipeline uses confidence scoring to decide autonomy level:

| Score | Behavior |
|-------|----------|
| 95-100% | Full autopilot — research, write, publish without asking |
| 80-94% | Show brief + preview, wait for "lanjut" confirmation |
| <80% | Show brief, ask for specific guidance |

Confidence is based on:
- Is there a research brief? (+30%)
- Does keyword have clear search intent? (+20%)
- Are there existing articles for internal linking? (+20%)
- Does the topic match the site's niche? (+15%)
- Has a similar article been successfully published before? (+15%)

## Cron Mode

When triggered by cron/schedule (not direct user command):
1. Pick next keyword from content plan (Supabase `content_plan` table)
2. Run full pipeline
3. Set status to "draft" (safer for automated)
4. Send Telegram notification: "Draft ready for review: [title]"
5. Wait for user to approve via Telegram

## Pitfalls

- NEVER publish without internal links validation
- If Serper/Tavily API fails, abort and notify user — don't write without research
- If no existing articles in database, skip internal linking phase (first article scenario)
- Don't generate more than 1 article per hour (API rate limits)
- Always check that generated slug doesn't conflict with existing pages (produk, layanan, etc.)
- If article quality feels low (repetitive, generic), regenerate once before publishing

## Verification

- Article URL returns 200 after publish
- Article appears in /blog listing
- Internal links in new article all resolve to real pages
- Backlinks in old articles point to correct new slug
- Telegram notification sent successfully
- Word count within target range
- No duplicate content with existing articles
