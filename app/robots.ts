import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/checkout', '/api/', '/admin'],
      },
      // Explicitly allow known AI crawlers to access llms.txt and AI data endpoints
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'CCBot'],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/.well-known/ai-plugin.json', '/api/ai/'],
        disallow: ['/dashboard', '/checkout'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
