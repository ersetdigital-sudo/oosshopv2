export type PricingPackage = {
  name: string
  price: string
  renewal: string
  features: string[]
  description: string
  popular: boolean
}

// Pricing packages per service slug
export const servicePricing: Record<string, PricingPackage[]> = {
  'jasa-pembuatan-company-profile': [
    {
      name: 'Paket UMKM',
      price: 'Rp 1.250.000',
      renewal: 'Perpanjangan Rp 500.000/thn',
      features: [
        '3 Halaman (Beranda, Tentang, Kontak)',
        '1x Revisi Minor',
        '1 Email Bisnis (nama@domain.id)',
        '1 GB SSD Hosting',
        'Gratis Maintenance 1 Tahun',
        'Gratis Domain .my.id / .biz.id',
        'SSL Certificate Selamanya',
        'Mobile Responsive',
        'SEO On-Page Basic',
        'Integrasi WhatsApp',
      ],
      description:
        'Cocok untuk UMKM dan bisnis kecil yang baru mulai membangun kehadiran online dengan budget terbatas.',
      popular: false,
    },
    {
      name: 'Paket Bisnis',
      price: 'Rp 2.350.000',
      renewal: 'Perpanjangan Rp 750.000/thn',
      features: [
        '8 Halaman (Profil, Layanan, Portfolio, Blog, dll)',
        '3x Revisi',
        '5 Email Bisnis',
        '5 GB SSD Hosting',
        'Gratis Maintenance 1 Tahun',
        'Gratis Domain .com',
        'SSL Certificate Selamanya',
        'Mobile Responsive',
        'SEO On-Page + Schema Markup',
        'Google Maps & WhatsApp',
        'Form Kontak',
        'Copywriting Halaman Utama',
      ],
      description:
        'Pilihan terbaik untuk perusahaan menengah yang ingin tampil profesional dan mudah ditemukan di Google.',
      popular: true,
    },
    {
      name: 'Paket Corporate',
      price: 'Rp 3.250.000',
      renewal: 'Perpanjangan Rp 1.000.000/thn',
      features: [
        '15+ Halaman Custom',
        '5x Revisi + Konsultasi Desain',
        'Unlimited Email Bisnis',
        'Unlimited SSD Hosting',
        'Gratis Maintenance 1 Tahun',
        'Gratis Domain .com / .co.id',
        'SSL Certificate Selamanya',
        'Mobile Responsive + AMP',
        'SEO Advanced + Sitemap + Schema',
        'Google Maps & WhatsApp Floating',
        'Blog / Artikel System',
        'Copywriting Seluruh Halaman',
        'Multi-Language Ready',
        'Analytics Dashboard',
      ],
      description:
        'Untuk perusahaan besar dan korporasi yang membutuhkan website company profile lengkap dengan semua fitur premium.',
      popular: false,
    },
  ],
}
