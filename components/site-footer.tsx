'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/data'
import { supabase } from '@/lib/supabase'

type FooterProduct = {
  id: string
  name: string
  slug: string | null
}

export function SiteFooter() {
  const [products, setProducts] = useState<FooterProduct[]>([])

  // Fetch real products from Supabase so footer links always match an actual
  // /produk/[slug] page — the previous static list (lib/data.ts) used
  // placeholder slugs that didn't exist in the database and 404'd.
  useEffect(() => {
    supabase
      .from('products')
      .select('id, name, slug')
      .order('created_at', { ascending: false })
      .limit(14)
      .then(({ data }) => {
        if (data) setProducts(data as FooterProduct[])
      })
  }, [])

   const [social, setSocial] = useState<Record<string, string>>({})

 useEffect(() => {
 supabase
 .from('settings')
 .select('key, value')
 .in('key', ['social_instagram', 'social_facebook', 'social_shopee', 'social_tiktok', 'social_telegram'])
 .then(({ data }) => {
 if (data) {
 const map: Record<string, string> = {}
 data.forEach((d: { key: string; value: string }) => { map[d.key] = d.value })
 setSocial(map)
 }
 })
 }, [])

  const [social, setSocial] = useState<Record<string, string>>({})

 useEffect(() => {
 supabase
 .from('settings')
 .select('key, value')
 .in('key', ['social_instagram', 'social_facebook', 'social_shopee', 'social_tiktok', 'social_telegram'])
 .then(({ data }) => {
 if (data) {
 const map: Record<string, string> = {}
 data.forEach((d: { key: string; value: string }) => { map[d.key] = d.value })
 setSocial(map)
 }
 })
 }, [])

 const serviceLinksCol1 = products.slice(0, 7)
  const serviceLinksCol2 = products.slice(7)

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="OOS SHOP - Beranda">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                O
              </span>
              <span className="text-lg font-semibold tracking-tight">OOS SHOP</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Jasa instal plugin WordPress premium original dan pembuatan website profesional untuk
              UMKM, toko online, dan bisnis di Indonesia.
            </p>
          </div>

          <nav aria-label="Layanan instal plugin (bagian 1)">
            <h3 className="text-sm font-semibold">Layanan Instal Plugin</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {serviceLinksCol1.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/produk/${service.slug || service.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Layanan instal plugin (bagian 2)">
            <h3 className="text-sm font-semibold">Layanan Lainnya</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {serviceLinksCol2.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/produk/${service.slug || service.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#website-development"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Jasa Pembuatan Website
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Informasi">
            <h3 className="text-sm font-semibold">Informasi</h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/#cara-kerja" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="/#perbandingan" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Perbandingan Layanan
                </Link>
              </li>
              <li>
                <Link href="/#keamanan" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Keamanan &amp; Garansi
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Artikel &amp; Panduan
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </nav>
        </div>

 {/* Social Media */}
 <div className="mt-8 flex items-center justify-center gap-3">
 {social.social_instagram && (
 <a href={social.social_instagram} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Instagram">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
 </a>
 )}
 {social.social_facebook && (
 <a href={social.social_facebook} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Facebook">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
 </a>
 )}
 {social.social_shopee && (
 <a href={social.social_shopee} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Shopee">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.69 0 6 2.69 6 6v.5H2.6a.6.6 0 00-.6.65l1.1 14.3A3 3 0 006.09 24h11.82a3 3 0 002.99-2.55l1.1-14.3a.6.6 0 00-.6-.65H18V6c0-3.31-2.69-6-6-6zm0 1.8A4.2 4.2 0 0116.2 6v.5H7.8V6A4.2 4.2 0 0112 1.8zm-.2 7.4c2.07 0 3.6 1.04 3.6 2.62 0 .35-.3.62-.65.62-.36 0-.65-.27-.65-.62 0-.78-.92-1.32-2.3-1.32-1.2 0-2.08.5-2.08 1.18 0 .6.5.9 2.3 1.36 2.04.52 3.3 1.08 3.3 2.74 0 1.7-1.55 2.72-3.74 2.72-2.2 0-3.84-1.12-3.84-2.74 0-.35.3-.62.65-.62.36 0 .65.27.65.62 0 .85 1.02 1.46 2.54 1.46 1.4 0 2.43-.55 2.43-1.36 0-.66-.55-.98-2.42-1.46-1.96-.5-3.18-1.04-3.18-2.62 0-1.56 1.5-2.6 3.58-2.6z"/></svg>
 </a>
 )}
 {social.social_tiktok && (
 <a href={social.social_tiktok} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="TikTok">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z"/></svg>
 </a>
 )}
 {social.social_telegram && (
 <a href={social.social_telegram} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Telegram">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
 </a>
 )}
 <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-green-500 hover:text-green-500" aria-label="WhatsApp">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
 </a>
 </div>
 {/* Social Media */}
 <div className="mt-8 flex items-center justify-center gap-3">
 {social.social_instagram && (
 <a href={social.social_instagram} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Instagram">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
 </a>
 )}
 {social.social_facebook && (
 <a href={social.social_facebook} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Facebook">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
 </a>
 )}
 {social.social_shopee && (
 <a href={social.social_shopee} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Shopee">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.69 0 6 2.69 6 6v.5H2.6a.6.6 0 00-.6.65l1.1 14.3A3 3 0 006.09 24h11.82a3 3 0 002.99-2.55l1.1-14.3a.6.6 0 00-.6-.65H18V6c0-3.31-2.69-6-6-6zm0 1.8A4.2 4.2 0 0116.2 6v.5H7.8V6A4.2 4.2 0 0112 1.8zm-.2 7.4c2.07 0 3.6 1.04 3.6 2.62 0 .35-.3.62-.65.62-.36 0-.65-.27-.65-.62 0-.78-.92-1.32-2.3-1.32-1.2 0-2.08.5-2.08 1.18 0 .6.5.9 2.3 1.36 2.04.52 3.3 1.08 3.3 2.74 0 1.7-1.55 2.72-3.74 2.72-2.2 0-3.84-1.12-3.84-2.74 0-.35.3-.62.65-.62.36 0 .65.27.65.62 0 .85 1.02 1.46 2.54 1.46 1.4 0 2.43-.55 2.43-1.36 0-.66-.55-.98-2.42-1.46-1.96-.5-3.18-1.04-3.18-2.62 0-1.56 1.5-2.6 3.58-2.6z"/></svg>
 </a>
 )}
 {social.social_tiktok && (
 <a href={social.social_tiktok} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="TikTok">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z"/></svg>
 </a>
 )}
 {social.social_telegram && (
 <a href={social.social_telegram} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Telegram">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
 </a>
 )}
 <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-green-500 hover:text-green-500" aria-label="WhatsApp">
 <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
 </a>
 </div>
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
            <Link href="/tentang-kami" className="transition-colors hover:text-foreground">
              Tentang Kami
            </Link>
            <span className="hidden text-border sm:inline">·</span>
            <Link href="/kebijakan-privasi" className="transition-colors hover:text-foreground">
              Kebijakan Privasi
            </Link>
            <span className="hidden text-border sm:inline">·</span>
            <Link href="/syarat-ketentuan" className="transition-colors hover:text-foreground">
              Syarat &amp; Ketentuan
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} OOS SHOP. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
