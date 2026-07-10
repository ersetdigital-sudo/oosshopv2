---
name: seo-research
description: When the user asks to research a keyword, analyze SERP competition, find People Also Ask questions, or prepare data before writing an SEO article. Use this skill for any keyword research or SERP analysis request.
version: 1.0.0
author: chemz
required_environment_variables:
  - TAVILY_API_KEY
  - SERPER_API_KEY
  - SERPAPI_KEY
---

# SEO Keyword Research & SERP Analysis

## Overview

Perform comprehensive keyword research and SERP analysis for Indonesian market SEO content. This skill gathers real search data to inform article creation — not assumptions.

## When to Use

- User asks to "riset keyword [topic]"
- User wants to know what competitors rank for
- Before writing any SEO article
- User asks for People Also Ask data
- User wants search intent analysis

## Procedure

### Step 1: Primary SERP Analysis (Serper)

Use the `web_search` tool to search Google via Serper API:

```
Query: [user's keyword]
Parameters: gl=id, hl=id, num=10
```

Extract from results:
- Top 10 organic titles + URLs + meta descriptions
- People Also Ask questions (ALL of them)
- Related Searches at bottom
- Featured snippets if any

### Step 1b: Enhanced SERP Data (SerpAPI)

Use SerpAPI for additional data that Serper doesn't provide:

```
Endpoint: https://serpapi.com/search
Parameters: engine=google, q=[keyword], gl=id, hl=id, google_domain=google.co.id
```

Extract:
- Knowledge Panel data (if available)
- Featured Snippets (full text)
- Local Pack results (if relevant)
- Top Stories / News
- Search volume estimation from related data
- Ads data (to understand commercial value of keyword)

### Step 2: Competitor Content Analysis (Tavily)

Use `web_extract` on top 3-5 ranking URLs to analyze:
- Word count (approximate)
- H2/H3 heading structure
- Topics covered
- Content gaps (what they DON'T cover)
- Internal/external linking patterns

### Step 3: Search Intent Classification

Classify the keyword into:
- **Informational**: user wants to learn (apa itu, cara, panduan)
- **Commercial Investigation**: user comparing options (terbaik, review, vs)
- **Transactional**: user ready to buy (jasa, harga, beli, order)
- **Navigational**: user looking for specific brand/site

### Step 4: Keyword Expansion

From SERP data, extract:
- **Primary keyword**: the main target
- **Secondary keywords**: variations found in top titles
- **Long-tail keywords**: from People Also Ask + Related Searches
- **LSI/Entity keywords**: related concepts mentioned across top results

### Step 5: Compile Research Brief

Output a structured research brief with:

```
## Research Brief: [keyword]

### Search Intent: [type]
### Recommended Word Count: [avg of top 3 + 20%]
### Target Audience: [inferred from SERP]

### Top Competitors:
1. [title] - [url] - [word count] - [key angle]
2. ...

### People Also Ask:
- [question 1]
- [question 2]
- ...

### Related Searches:
- [term 1]
- [term 2]
- ...

### Content Gaps (competitors miss):
- [gap 1]
- [gap 2]

### Recommended Outline Angle:
[1-2 sentences on how to differentiate]

### Keywords to Target:
- Primary: [keyword]
- Secondary: [list]
- Long-tail: [list]
- Entities: [list]
```

## Pitfalls

- Serper free tier has rate limits (2,500 queries/month). Don't waste on broad queries.
- Always search in Indonesian (gl=id, hl=id) unless user specifies otherwise.
- People Also Ask data may not always be available — use Related Searches as fallback.
- Don't assume search volume from SERP position alone.
- Some competitor pages may be paywalled — skip those in content analysis.

## Verification

- Research brief must contain at least 5 People Also Ask questions OR 5 Related Searches
- At least 3 competitor pages analyzed
- Word count recommendation must be based on actual competitor data
- All keywords must come from actual SERP data, not invented
