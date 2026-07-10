---
name: internal-linking
description: When a new article is published, update existing related articles to add backlinks to the new article. Creates bidirectional internal links between related content for SEO topical authority.
version: 1.0.0
author: chemz
required_environment_variables:
  - SUPABASE_URL
  - SUPABASE_SERVICE_ROLE_KEY
---

# Bidirectional Internal Linking

## Overview

After a new article is published, find related existing articles and inject a natural internal link pointing to the new article. This creates a bidirectional link structure (new→old AND old→new) that strengthens topical authority.

## When to Use

- Immediately after publishing a new article
- User asks to "update internal links" or "tambah backlink"
- User asks to "link artikel lama ke artikel baru"
- Periodically to improve link structure across all articles

## Procedure

### Step 1: Identify the New Article

Get the newly published article's:
- `id`
- `title`
- `slug`
- `content` (to see what topics it covers)
- Primary keyword / topic

### Step 2: Find Related Existing Articles

Query all published articles from Supabase:

```
GET /rest/v1/articles?status=eq.published&select=id,title,slug,content,meta_description
```

Score relevance based on:
- Keyword overlap in titles
- Similar topics in meta_description
- Same content cluster/category
- Complementary topics (e.g., "biaya website" relates to "tips memilih jasa website")

Select top 2-3 most related articles.

### Step 3: Determine Link Placement

For each related article, find the best spot to insert a link:
- Look for paragraphs that discuss a related topic
- Find a natural sentence where the new article's topic fits
- The link should ADD VALUE, not feel forced

**Good placement:**
- "Untuk informasi lebih lengkap tentang [topic], baca panduan kami tentang <a href="/blog/[new-slug]">[anchor text]</a>."
- Naturally within an existing paragraph where the topic is already mentioned

**Bad placement:**
- Random insertion that breaks flow
- At the very top (looks spammy)
- Multiple links in same paragraph

### Step 4: Craft Anchor Text

Rules for anchor text:
- Descriptive (contains keyword variation)
- Natural in context
- NOT "klik di sini" or "baca selengkapnya"
- 3-7 words ideal

Examples:
- ✅ "panduan biaya pembuatan website company profile"
- ✅ "tips memilih jasa website yang tepat"
- ❌ "klik di sini"
- ❌ "artikel ini"

### Step 5: Update Articles in Supabase

For each article to update, use PATCH:

```
PATCH https://[SUPABASE_URL]/rest/v1/articles?id=eq.[article_id]
Headers:
  apikey: [SUPABASE_SERVICE_ROLE_KEY]
  Authorization: Bearer [SUPABASE_SERVICE_ROLE_KEY]
  Content-Type: application/json

Body:
{
  "content": "[updated HTML with new internal link inserted]",
  "updated_at": "[current ISO timestamp]"
}
```

### Step 6: Log Changes

Report what was done:
```
## Internal Links Updated:

1. Article: "[old article title]"
   - Added link to: /blog/[new-slug]
   - Anchor text: "[anchor text used]"
   - Placement: [paragraph/section description]

2. Article: "[old article title 2]"
   - Added link to: /blog/[new-slug]
   - ...
```

### Step 7: Trigger Revalidation

Revalidate all modified article pages:
```
GET https://www.oos-shop.com/api/revalidate?path=/blog/[modified-slug-1]
GET https://www.oos-shop.com/api/revalidate?path=/blog/[modified-slug-2]
```

## Pitfalls

- NEVER add more than 1 link per updated article (avoid over-optimization)
- Don't add links to articles that already link to the new article (avoid circular/duplicate)
- Don't modify the first paragraph of existing articles
- Don't change the meaning or flow of existing content
- Check that the article doesn't already have too many outbound links (max ~5-7 internal links per article is ideal)
- Always preserve existing HTML structure — don't break formatting
- If an article has no natural fit for the link, SKIP it. Don't force.

## Verification

- Each modified article still renders correctly (valid HTML)
- New links point to valid, published slugs
- Anchor text is relevant to the linked article's topic
- No duplicate links (same target) within an article
- Link is placed naturally in a relevant paragraph
- Max 1 new link added per existing article per run
