import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { CartProvider } from '@/lib/cart-context'
import { CartDrawer } from '@/components/cart-drawer'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'Jasa Instal Plugin WordPress Premium Original & Bergaransi | OOS SHOP',
  description:
    'Jasa instal plugin WordPress premium original: Elementor Pro, WP Rocket, Rank Math Pro, Crocoblock, dan lainnya. Aktivasi lisensi resmi, konfigurasi profesional, garansi uang kembali, selesai 1x24 jam.',
  keywords: [
    'jasa instal plugin wordpress',
    'jasa instal elementor pro',
    'jasa instal wp rocket',
    'jasa instal rank math pro',
    'plugin wordpress premium original',
  ],
  generator: 'v0.app',
 metadataBase: new URL('https://www.oos-shop.com'),
 authors: [{ name: 'OOS SHOP', url: 'https://www.oos-shop.com' }],
 alternates: { canonical: '/' },
 openGraph: {
 title: 'Jasa Instal Plugin WordPress Premium Original & Bergaransi | OOS SHOP',
 description:
 'Instalasi plugin WordPress premium original dengan aktivasi lisensi resmi. Tanpa nulled, bergaransi, selesai 1x24 jam.',
 type: 'website',
 locale: 'id_ID',
 siteName: 'OOS SHOP',
 url: '/',
 images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Jasa Instal Plugin WordPress Premium Original & Bergaransi | OOS SHOP',
 description: 'Instalasi plugin WordPress premium original dengan aktivasi lisensi resmi. Tanpa nulled, bergaransi, selesai 1x24 jam.',
 images: ['/opengraph-image'],
 },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#5B5CEB',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`bg-background ${geistSans.variable}`}>
      <head>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@graph': [
 {
 '@type': 'Organization',
 '@id': 'https://www.oos-shop.com/#organization',
 name: 'OOS SHOP',
 url: 'https://www.oos-shop.com',
 logo: {
 '@type': 'ImageObject',
 url: 'https://res.cloudinary.com/ddbq1mlsc/image/upload/v1782933784/Logo_OOS_SHOP_fied1z.png',
 },
 contactPoint: {
 '@type': 'ContactPoint',
 telephone: '+6285212150100',
 contactType: 'customer service',
 availableLanguage: ['Indonesian', 'English'],
 areaServed: 'ID',
 },
 sameAs: [
 'https://www.instagram.com/oos.shop/',
 'https://www.tiktok.com/@oos.shop',
 'https://shopee.co.id/oos.shop',
 'https://www.facebook.com/share/18ZRZ3XiBH/',
 'https://t.me/Oos_shop',
 ],
 },
 {
 '@type': 'WebSite',
 '@id': 'https://www.oos-shop.com/#website',
 name: 'OOS SHOP',
 url: 'https://www.oos-shop.com',
 publisher: { '@id': 'https://www.oos-shop.com/#organization' },
 inLanguage: 'id-ID',
 },
 ],
 }),
 }}
 />
      </head>
      <head>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@graph': [
 {
 '@type': 'Organization',
 '@id': 'https://www.oos-shop.com/#organization',
 name: 'OOS SHOP',
 url: 'https://www.oos-shop.com',
 logo: {
 '@type': 'ImageObject',
 url: 'https://res.cloudinary.com/ddbq1mlsc/image/upload/v1782933784/Logo_OOS_SHOP_fied1z.png',
 },
 contactPoint: {
 '@type': 'ContactPoint',
 telephone: '+6285212150100',
 contactType: 'customer service',
 availableLanguage: ['Indonesian', 'English'],
 areaServed: 'ID',
 },
 sameAs: [
 'https://www.instagram.com/oos.shop/',
 'https://www.tiktok.com/@oos.shop',
 'https://shopee.co.id/oos.shop',
 'https://www.facebook.com/share/18ZRZ3XiBH/',
 'https://t.me/Oos_shop',
 ],
 },
 {
 '@type': 'WebSite',
 '@id': 'https://www.oos-shop.com/#website',
 name: 'OOS SHOP',
 url: 'https://www.oos-shop.com',
 publisher: { '@id': 'https://www.oos-shop.com/#organization' },
 inLanguage: 'id-ID',
 },
 ],
 }),
 }}
 />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
