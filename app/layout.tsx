import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
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
  openGraph: {
    title: 'Jasa Instal Plugin WordPress Premium Original & Bergaransi | OOS SHOP',
    description:
      'Instalasi plugin WordPress premium original dengan aktivasi lisensi resmi. Tanpa nulled, bergaransi, selesai 1x24 jam.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'OOS SHOP',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
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
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
