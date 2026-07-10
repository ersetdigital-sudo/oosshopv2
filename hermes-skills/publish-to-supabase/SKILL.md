---
name: publish-to-supabase
description: When the user wants to publish a generated article to the OOS SHOP blog, save it as draft, or insert it into the Supabase articles database. Use after article generation is complete.
version: 1.0.0
author: chemz
required_environment_variables:
  - SUPABASE_URL
  - SUPABASE_SERVICE_ROLE_KEY
---

# Publish Article to Supabase

## Overview

Insert a generated article into the Supabase `articles` table for OOS SHOP blog. Supports publishing immediately or saving as draft for review.

## When to Use

- User says "publish" or "terbitin" after article is generated
- User says "simpan draft" to save for later review
- After seo-article-writer skill produces output
- User explicitly asks to push content to the blog

## Procedure

### Step 1: Validate Article Data

Ensure all required fields are present:
- `title` (string, required)
- `slug` (string, required, URL-safe)
- `content` (string/HTML, required)
- `meta_title` (string, max 60 chars)
- `meta_description` (string, max 155 chars)
- `thumbnail` (string/URL, optional)
- `status` ("draft" or "published")

### Step 2: Check for Duplicate Slug

Query Supabase to ensure slug doesn't already exist:

```
GET /rest/v1/articles?slug=eq.[slug]&select=id,slug
```

If duplicate found:
- Append `-2`, `-3` etc. to slug
- OR ask user if they want to update existing article

### Step 3: Insert Article

Make POST request to Supabase REST API:

```
POST https://[SUPABASE_URL]/rest/v1/articles
Headers:
  apikey: [SUPABASE_SERVICE_ROLE_KEY]
  Authorization: Bearer [SUPABASE_SERVICE_ROLE_KEY]
  Content-Type: application/json
  Prefer: return=representation

Body:
{
  "title": "[title]",
  "slug": "[slug]",
  "content": "[HTML content]",
  "thumbnail": "[thumbnail URL or null]",
  "meta_title": "[meta_title]",
  "meta_description": "[meta_description]",
  "status": "[draft|published]",
  "published_at": "[ISO datetime if published, null if draft]"
}
```

### Step 4: Trigger Revalidation (if published)

If status is "published", call the revalidation endpoint:

```
GET https://www.oos-shop.com/api/revalidate?path=/blog&secret=[REVALIDATE_SECRET]
GET https://www.oos-shop.com/api/revalidate?path=/blog/[slug]&secret=[REVALIDATE_SECRET]
```

### Step 5: Confirm to User

Report back:
- Article ID
- Status (draft/published)
- URL: `https://www.oos-shop.com/blog/[slug]`
- Revalidation status

## Pitfalls

- Always check for duplicate slugs before inserting
- Use SUPABASE_SERVICE_ROLE_KEY (not anon key) for write operations
- published_at must be ISO 8601 format: `2025-07-09T00:00:00.000Z`
- If publishing, set published_at to current timestamp
- If saving as draft, set published_at to null
- Content must be valid HTML — no markdown
- Thumbnail can be null if not generated yet

## Verification

- Article appears in Supabase table with correct status
- If published: URL `https://www.oos-shop.com/blog/[slug]` returns 200 after revalidation
- No duplicate slugs in database
- All fields populated correctly
