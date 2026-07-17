'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Package,
  Star,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { services } from '@/lib/services'
import { siteConfig } from '@/lib/data'

const service = {
  slug: 'jasa-pembuatan-sistem-inventory',
  menuLabel: 'Sistem Inventory',
  updatedAt: '2025-07-01',
  hero: {
    badge: 'Sistem Inventory & Stok',
    heading: 'Jasa Pembuatan Sistem Inventory & Manajemen Stok',
    subheading: 'Kelola stok barang secara akurat dan real-time. Pantau keluar-masuk barang, multi gudang, dan laporan stok dalam satu sistem yang dirancang sesuai kebutuhan operasional bisnis Anda.',
  },
  whatIs: {
    title: 'Apa Itu Jasa Pembuatan Sistem Inventory?',
    answer: 'Sistem inventory adalah aplikasi web untuk memantau dan mengelola stok barang, mencatat transaksi keluar-masuk, dan menghasilkan laporan stok secara real-time. Jika bisnis Anda masih mengandalkan pencatatan manual di Excel atau buku — saatnya upgrade ke sistem digital yang lebih akurat dan efisien.\n\nOOS SHOP membuat sistem inventory custom dengan pencatatan stok akurat, dukungan multi gudang/cabang, alert stok minimum, dan laporan pergerakan barang. Sistem dirancang sesuai alur operasional gudang Anda sehingga adopsi tim lebih mudah dan data lebih terpercaya.\n\nDengan sistem inventory digital, Anda terhindar dari kehabisan stok yang kehilangan penjualan atau kelebihan stok yang mengikat modal. Setiap transaksi tercatat otomatis dan bisa ditelusuri, memudahkan audit dan pengambilan keputusan pengadaan barang.',
    priceNote: 'Harga disesuaikan kompleksitas fitur dan skala gudang',
    timelineNote: '14–30 hari kerja, menyesuaikan kebutuhan',
  },
  whyChooseUs: [
    { title: 'Stok Akurat & Real-Time', description: 'Setiap transaksi keluar-masuk langsung memperbarui jumlah stok. Tidak ada lagi selisih antara data dan fisik barang.' },
    { title: 'Multi Gudang / Cabang', description: 'Kelola stok di beberapa gudang atau cabang sekaligus dalam satu dashboard terpusat. Transfer antar gudang pun tercatat.' },
    { title: 'Custom Sesuai Alur Gudang', description: 'Sistem disesuaikan dengan alur operasional gudang Anda — bukan template kaku. Dari penerimaan barang, penyimpanan, hingga pengiriman.' },
    { title: 'Integrasi dengan Penjualan', description: 'Sistem bisa dihubungkan dengan toko online atau POS Anda sehingga stok otomatis berkurang saat terjadi transaksi penjualan.' },
  ],
  features: [
    'Stok real-time & akurat', 'Keluar-masuk barang tercatat', 'Multi gudang / cabang', 'Transfer antar gudang',
    'Alert stok minimum', 'Barcode / QR code support', 'Kategori & SKU management', 'Laporan stok & pergerakan barang',
    'History transaksi (audit trail)', 'Multi-user & hak akses', 'Export data (Excel, PDF)', 'Dashboard ringkasan visual',
    'Pencarian & filter barang', 'Mobile accessible', 'API integration (POS, toko online)', 'Support & maintenance',
  ],
  benefits: [
    { title: 'Stok Real-Time & Akurat', description: 'Pantau jumlah stok secara akurat dan real-time. Setiap transaksi langsung memperbarui data untuk menghindari kehabisan atau kelebihan barang.' },
    { title: 'Pencatatan Keluar-Masuk Barang', description: 'Catat setiap transaksi masuk (pembelian, return) dan keluar (penjualan, rusak) secara rapi, terstruktur, dan bisa ditelusuri.' },
    { title: 'Multi Gudang Terpusat', description: 'Kelola stok di beberapa gudang atau cabang dalam satu dashboard. Transfer antar gudang tercatat dan stok masing-masing terlihat jelas.' },
    { title: 'Laporan & Analisis Stok', description: 'Laporan stok, pergerakan barang, dan barang fast/slow-moving untuk membantu keputusan pengadaan dan manajemen modal.' },
    { title: 'Alert Stok Minimum', description: 'Notifikasi otomatis ketika stok barang mencapai batas minimum. Anda bisa segera restock sebelum kehabisan.' },
    { title: 'Terintegrasi dengan Penjualan', description: 'Stok otomatis berkurang saat terjadi penjualan dari toko online atau POS. Tidak perlu lagi update manual.' },
  ],
  useCases: [
    'Toko retail dan distributor yang ingin stok tercatat akurat secara digital',
    'Bisnis dengan beberapa gudang atau cabang yang perlu monitoring stok terpusat',
    'Produsen dan manufaktur yang perlu memantau bahan baku, WIP, dan barang jadi',
    'Bisnis yang ingin menggantikan pencatatan stok manual di Excel ke sistem online',
    'E-commerce yang butuh sinkronisasi stok antara gudang dan toko online',
    'F&B dan restoran yang perlu tracking bahan baku dan inventory dapur',
  ],
  process: [
    { step: '1', title: 'Analisis Alur Gudang', description: 'Kami pelajari alur stok, kategori barang, jumlah gudang, dan laporan yang Anda butuhkan dari sistem inventory.' },
    { step: '2', title: 'Rancang Struktur Data', description: 'Kami desain struktur data barang, gudang, transaksi, dan relasi antar modul. Anda review sebelum development.' },
    { step: '3', title: 'Pengembangan & Uji Coba', description: 'Kami bangun fitur bertahap lalu uji coba bersama tim gudang untuk memastikan data akurat dan alur sesuai.' },
    { step: '4', title: 'Deployment & Pelatihan', description: 'Sistem dionlinekan, data awal dimigrasi, dan pelatihan diberikan untuk tim gudang/warehouse agar langsung bisa dipakai.' },
  ],
  faq: [
    { question: 'Apakah sistem bisa memantau stok secara real-time?', answer: 'Ya. Setiap transaksi keluar-masuk barang langsung memperbarui jumlah stok secara otomatis. Anda selalu melihat data stok terkini dan akurat tanpa harus stock opname manual setiap saat.' },
    { question: 'Apakah mendukung banyak gudang atau cabang?', answer: 'Bisa. Sistem dirancang untuk mengelola stok di beberapa gudang atau cabang sekaligus dalam satu dashboard terpusat. Transfer barang antar gudang pun tercatat dengan history yang bisa ditelusuri.' },
    { question: 'Apakah bisa terhubung dengan sistem penjualan?', answer: 'Bisa. Sistem inventory dapat diintegrasikan dengan toko online atau POS (Point of Sale) agar stok otomatis berkurang saat terjadi transaksi penjualan. Tidak perlu input manual lagi.' },
    { question: 'Apakah ada notifikasi saat stok menipis?', answer: 'Ya. Anda bisa mengatur batas stok minimum per barang. Ketika stok mencapai batas tersebut, sistem mengirim notifikasi/alert agar Anda bisa segera melakukan restock.' },
    { question: 'Apakah bisa scan barcode/QR code?', answer: 'Bisa. Sistem mendukung input barang via barcode scanner atau QR code untuk mempercepat proses penerimaan dan pengeluaran barang di gudang.' },
    { question: 'Berapa biaya pembuatan sistem inventory?', answer: 'Harga bergantung pada skala gudang, jumlah fitur, dan integrasi yang dibutuhkan. Kami perlu memahami kebutuhan Anda terlebih dulu untuk memberikan estimasi akurat. Konsultasi awal gratis.' },
  ],
  relatedServices: ['jasa-pembuatan-dashboard-admin', 'jasa-pembuatan-crm-erp', 'jasa-pembuatan-toko-online'],
}

const packages = [
  {
    name: 'Starter',
    description: 'Untuk bisnis kecil dengan 1 gudang & maks 500 SKU',
    price: 'Rp 8 Juta',
    renewal: 'Maintenance Rp 500rb/bulan',
    popular: false,
    features: ['1 gudang', 'Maks 500 SKU', 'Dashboard stok real-time', 'Keluar-masuk barang', 'Alert stok minimum', 'Export Excel', 'Support 30 hari'],
  },
  {
    name: 'Professional',
    description: 'Untuk bisnis menengah dengan multi gudang & integrasi',
    price: 'Rp 18 Juta',
    renewal: 'Maintenance Rp 1 Juta/bulan',
    popular: true,
    features: ['Multi gudang (maks 5)', 'Unlimited SKU', 'Barcode/QR scanner', 'Transfer antar gudang', 'Integrasi POS/toko online', 'Laporan & analisis', 'Multi-user & hak akses', 'Export Excel & PDF', 'Support 60 hari'],
  },
  {
    name: 'Enterprise',
    description: 'Untuk korporat dengan kebutuhan custom & API',
    price: 'Custom',
    renewal: 'Sesuai kebutuhan',
    popular: false,
    features: ['Unlimited gudang & SKU', 'Custom workflow', 'API integration', 'Advanced analytics', 'Dedicated support', 'Pelatihan tim', 'SLA uptime', 'White-label option'],
  },
]

const waHref = `${siteConfig.whatsapp}?text=${encodeURIComponent('Halo, saya tertarik dengan layanan Sistem Inventory. Bisa konsultasi gratis?')}`

export default function InventoryPage() {
  const [billing, setBilling] = useState<'once' | 'maintenance'>('once')

  return (
    <>
      <SiteHeader />

      <style dangerouslySetInnerHTML={{ __html: `
        .tally-page {
          --tp: oklch(98.4% 0.005 258);
          --tp1: oklch(96.2% 0.010 258);
          --tp2: oklch(93.0% 0.015 258);
          --tp3: oklch(89.0% 0.020 258);
          --ti0: oklch(18.0% 0.030 258);
          --ti1: oklch(35.0% 0.025 258);
          --ti2: oklch(52.0% 0.018 258);
          --ti3: oklch(70.0% 0.012 258);
          --accent: oklch(54.0% 0.220 268);
          --accent-soft: oklch(72.0% 0.140 268);
          --accent-tint: oklch(94.0% 0.040 268);
          --companion: oklch(82% 0.180 130);
          --success: oklch(68% 0.150 145);
          --r-hair: 1px solid oklch(18% 0.030 258 / 0.08);
          --r-soft: 1px solid oklch(18% 0.030 258 / 0.12);
          --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
          font-family: var(--font-sans);
          color: var(--ti0);
          background: var(--tp);
          -webkit-font-smoothing: antialiased;
        }
        /* Buttons */
        .tally-page .t-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 12px 20px; border-radius: 999px;
          font-weight: 500; font-size: 0.875rem; letter-spacing: -0.01em;
          border: 1px solid transparent; cursor: pointer; text-decoration: none;
          transition: all 200ms var(--ease); white-space: nowrap;
        }
        @media (min-width: 640px) { .tally-page .t-btn { padding: 13px 24px; font-size: 0.9375rem; } }
        .tally-page .t-btn:active { transform: scale(0.97) !important; }
        .tally-page .t-btn-p {
          background: var(--ti0); color: var(--tp); border-color: var(--ti0);
          box-shadow: 0 1px 0 oklch(100% 0 0 / 0.15) inset, 0 6px 20px -8px oklch(18% 0.030 258 / 0.35);
        }
        .tally-page .t-btn-p:hover { background: var(--accent); border-color: var(--accent); transform: translateY(-1px); box-shadow: 0 8px 28px -8px oklch(54% 0.220 268 / 0.45); }
        .tally-page .t-btn-g {
          background: transparent; color: var(--ti0); border-color: oklch(18% 0.030 258 / 0.15);
        }
        .tally-page .t-btn-g:hover { background: var(--tp2); border-color: oklch(18% 0.030 258 / 0.22); }
        /* Cards */
        .tally-page .t-card {
          background: var(--tp); border: var(--r-soft); border-radius: 12px;
          padding: 1.25rem; transition: all 250ms var(--ease);
        }
        .tally-page .t-card:hover { border-color: oklch(18% 0.030 258 / 0.2); box-shadow: 0 12px 40px -16px oklch(18% 0.030 258 / 0.2); transform: translateY(-2px); }
        /* Section helpers */
        .tally-page .t-eyebrow {
          font-family: var(--font-mono, monospace); font-size: 0.6875rem;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--ti2);
          display: inline-flex; align-items: center; gap: 0.375rem;
        }
        .tally-page .t-st {
          font-size: clamp(1.125rem, 2.5vw, 1.625rem); font-weight: 700;
          letter-spacing: -0.025em; line-height: 1.2; margin: 0.375rem 0 0;
        }
        .tally-page .t-st em {
          font-family: var(--font-instrument, Georgia, serif);
          font-style: italic; font-weight: 400; color: var(--accent);
        }
        .tally-page .t-sd { font-size: 0.875rem; color: var(--ti1); max-width: 48ch; line-height: 1.6; margin-top: 0.5rem; }
        .tally-page .t-sh {
          display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;
        }
        @media (min-width: 768px) {
          .tally-page .t-sh { display: grid; grid-template-columns: auto 1fr; gap: 2rem; align-items: end; }
        }
        /* Smooth scroll */
        .tally-page { scroll-behavior: smooth; }
        /* Focus ring */
        .tally-page *:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
      `}} />

      <main className="tally-page">
        {/* ═══ Hero ═══ */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: 'oklch(18% 0.030 258 / 0.08)' }}>
          {/* Grid bg */}
          <div className="pointer-events-none absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, oklch(18% 0.030 258 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(18% 0.030 258 / 0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 50% at 50% 30%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 30%, black 20%, transparent 70%)',
          }} />
          {/* Gradient blob */}
          <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full opacity-30 blur-3xl" style={{ background: 'var(--accent-tint)' }} />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-10 sm:pt-24 sm:pb-14 md:pt-28 md:pb-16">
            <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm" style={{ color: 'var(--ti2)' }}>
                <li><Link href="/" className="transition-colors hover:opacity-70">Beranda</Link></li>
                <ChevronRight className="size-3.5" aria-hidden />
                <li><Link href="/#layanan" className="transition-colors hover:opacity-70">Layanan</Link></li>
                <ChevronRight className="size-3.5" aria-hidden />
                <li className="font-medium" style={{ color: 'var(--ti0)' }} aria-current="page">Sistem Inventory</li>
              </ol>
            </nav>

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
              <div className="max-w-xl">
                <span className="t-eyebrow">◇ {service.hero.badge}</span>

                <h1 className="mt-3 sm:mt-4 font-bold tracking-tight" style={{ fontSize: 'clamp(1.625rem, 5vw, 2.75rem)', lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: '20ch' }}>
                  Jasa Pembuatan Sistem Inventory &amp; Manajemen <em style={{ fontFamily: 'var(--font-instrument, Georgia, serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>Stok</em>
                </h1>

                <p className="mt-3 sm:mt-4 max-w-lg text-pretty" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', color: 'var(--ti1)', lineHeight: 1.65 }}>
                  {service.hero.subheading}
                </p>

                <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="t-btn t-btn-p">
                    <MessageCircle className="size-4" aria-hidden />
                    Konsultasi Gratis
                  </a>
                  <Link href="/katalog" className="t-btn t-btn-g">
                    Lihat Katalog
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </div>

                <div className="mt-4 sm:mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.6875rem]" style={{ color: 'var(--ti3)' }}>
                  <span>no commitment</span>
                  <span>·</span>
                  <span>konsultasi gratis</span>
                  <span>·</span>
                  <span>respon &lt; 1 jam</span>
                </div>
              </div>

              {/* Dashboard preview card */}
              <div className="hidden md:block flex-shrink-0" style={{ width: 360, transform: 'rotate(0.5deg)' }}>
                <div style={{
                  background: 'var(--tp)', border: 'var(--r-soft)', borderRadius: 14, padding: '1.25rem',
                  boxShadow: '0 1px 0 oklch(100% 0 0 / 0.7) inset, 0 20px 50px -24px oklch(18% 0.030 258 / 0.22)',
                  fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8125rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.625rem', borderBottom: 'var(--r-hair)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>Dashboard Preview</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--ti2)', marginTop: 1 }}>OOS SHOP · Inventory</div>
                    </div>
                    <span style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--success)', background: 'oklch(68% 0.150 145 / 0.15)', padding: '2px 7px', borderRadius: 999 }}>live</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0.625rem 0' }}>
                    {[
                      { label: 'Total SKU', value: '2,847' },
                      { label: 'Stok Masuk', value: '1,240' },
                      { label: 'Stok Keluar', value: '986' },
                      { label: 'Alert minimum', value: '12 item' },
                    ].map((row) => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--ti1)' }}>
                        <span>{row.label}</span>
                        <strong style={{ color: 'var(--ti0)', fontWeight: 500 }}>{row.value}</strong>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.375rem', borderTop: 'var(--r-hair)', fontSize: '0.8125rem', color: 'var(--success)' }}>
                      <span>Akurasi stok</span>
                      <span style={{ fontWeight: 600 }}>99.8%</span>
                    </div>
                  </div>
                  <div style={{ height: 5, background: 'var(--tp3)', borderRadius: 999, marginTop: '0.75rem', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '72%', background: 'linear-gradient(90deg, var(--accent), var(--companion))', borderRadius: 'inherit' }} />
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ti2)', marginTop: 6 }}>
                    72% kapasitas · 14 SKU perlu restock
                  </div>
                </div>
              </div>
            </div>

            {/* Marquee */}
            <div className="mt-10 sm:mt-14 overflow-hidden border-t border-b" style={{ borderColor: 'oklch(18% 0.030 258 / 0.06)', padding: '0.625rem 0', maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
              <div className="flex gap-8 sm:gap-12" style={{ animation: 'marquee 35s linear infinite', width: 'max-content', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.6875rem', color: 'var(--ti3)', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
                {[...'ABCDEFGHIJ'].map((_, i) => (
                  <span key={i} className="inline-flex items-center gap-2 sm:gap-3 shrink-0">
                    {['STOK REAL-TIME', 'MULTI GUDANG', 'BARCODE SCANNER', 'LAPORAN OTOMATIS', 'INTEGRASI POS'][i % 5]}
                    <span style={{ color: 'var(--accent)' }}>✦</span>
                  </span>
                ))}
              </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `@keyframes marquee { to { transform: translateX(-50%); } }` }} />
          </div>
        </section>

        {/* ═══ Apa Itu ═══ */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14" id="apa-itu">
          <div style={{ background: 'var(--tp)', border: 'var(--r-soft)', borderRadius: 12, padding: 'clamp(1rem, 3vw, 1.5rem)' }}>
            <span className="t-eyebrow">◇ penjelasan</span>
            <h2 className="mt-2" style={{ fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)', fontWeight: 600, letterSpacing: '-0.02em' }}>{service.whatIs.title}</h2>
            <div className="mt-3 space-y-3 text-pretty" style={{ color: 'var(--ti1)', lineHeight: 1.7, fontSize: 'clamp(0.8125rem, 1.3vw, 0.9375rem)' }}>
              {service.whatIs.answer.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Biaya', value: service.whatIs.priceNote },
                { label: 'Waktu Pengerjaan', value: service.whatIs.timelineNote },
              ].map((item) => (
                <div key={item.label} style={{ borderRadius: 10, border: 'var(--r-hair)', padding: '0.875rem' }}>
                  <dt className="font-mono text-[0.625rem] uppercase tracking-wide" style={{ color: 'var(--ti2)' }}>{item.label}</dt>
                  <dd className="mt-1 text-sm font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ═══ Kenapa Memilih Kami ═══ */}
        <section className="border-t border-b" style={{ borderColor: 'oklch(18% 0.030 258 / 0.06)', background: 'var(--tp1)' }} id="kenapa-kami">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            <div className="t-sh">
              <div>
                <span className="t-eyebrow">◇ keunggulan</span>
                <h2 className="t-st">Kenapa Memilih OOS SHOP untuk <em>Sistem Inventory</em>?</h2>
              </div>
              <p className="t-sd">Pendekatan kami yang membedakan dari penyedia jasa lain.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {service.whyChooseUs.map((item) => (
                <div key={item.title} className="t-card">
                  <span style={{ display: 'inline-flex', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: 'var(--tp2)', color: 'var(--ti1)' }}>
                    <Star className="size-4" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed" style={{ color: 'var(--ti1)' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Fitur ═══ */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20" id="fitur">
          <div className="t-sh">
            <div>
              <span className="t-eyebrow">◇ fitur</span>
              <h2 className="t-st">Fitur Sistem Inventory yang Anda <em>Dapatkan</em></h2>
            </div>
            <p className="t-sd">Semua yang Anda butuhkan untuk hasil profesional dan maksimal.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-colors hover:border-[oklch(18%_0.030_258/0.18)]" style={{ borderColor: 'oklch(18% 0.030 258 / 0.08)', background: 'var(--tp)' }}>
                <CheckCircle2 className="size-3.5 shrink-0" style={{ color: 'var(--accent)' }} aria-hidden />
                <span className="text-[0.8125rem] font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Benefits ═══ */}
        <section className="border-t border-b" style={{ borderColor: 'oklch(18% 0.030 258 / 0.06)', background: 'var(--tp1)' }} id="keunggulan">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            <div className="t-sh">
              <div>
                <span className="t-eyebrow">◇ manfaat</span>
                <h2 className="t-st">Keunggulan <em>Sistem Inventory</em> dari OOS SHOP</h2>
              </div>
              <p className="t-sd">Dibangun dengan standar profesional agar hasil tidak hanya tampil bagus, tetapi juga bekerja untuk pertumbuhan bisnis Anda.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {service.benefits.map((benefit) => (
                <div key={benefit.title} className="t-card">
                  <span style={{ display: 'inline-flex', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: 'var(--tp2)', color: 'var(--ti1)' }}>
                    <CheckCircle2 className="size-4" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold tracking-tight">{benefit.title}</h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed" style={{ color: 'var(--ti1)' }}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Use Cases + Process ═══ */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20" id="cocok-untuk">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            <div>
              <span className="t-eyebrow">◇ cocok untuk</span>
              <h2 className="mt-2 font-bold tracking-tight" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.625rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
                Siapa yang Cocok Menggunakan <em style={{ fontFamily: 'var(--font-instrument, Georgia, serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>Layanan</em> Ini?
              </h2>
              <p className="mt-3 text-[0.875rem] leading-relaxed" style={{ color: 'var(--ti1)' }}>Beberapa contoh kebutuhan sistem inventory yang paling sering kami kerjakan.</p>
              <ul className="mt-6 flex flex-col gap-2">
                {service.useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-2.5 rounded-lg border px-3 py-3" style={{ borderColor: 'oklch(18% 0.030 258 / 0.10)', background: 'var(--tp)' }}>
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: 'var(--accent)' }} aria-hidden />
                    <span className="text-[0.8125rem] leading-relaxed" style={{ color: 'oklch(18% 0.030 258 / 0.85)' }}>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="proses">
              <span className="t-eyebrow">◇ proses kerja</span>
              <h2 className="mt-2 font-bold tracking-tight" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.625rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
                Cara Kerja Jasa <em style={{ fontFamily: 'var(--font-instrument, Georgia, serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>Sistem Inventory</em>
              </h2>
              <p className="mt-3 text-[0.875rem] leading-relaxed" style={{ color: 'var(--ti1)' }}>Proses yang jelas dan transparan dari konsultasi hingga selesai.</p>
              <ol className="mt-6 flex flex-col">
                {service.process.map((item, index) => (
                  <li key={item.step} className="relative flex gap-4 pb-6 last:pb-0">
                    {index < service.process.length - 1 && (
                      <div className="absolute left-[15px] top-8 h-full w-px" style={{ background: 'oklch(18% 0.030 258 / 0.08)' }} />
                    )}
                    <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold" style={{ background: 'var(--ti0)', color: 'var(--tp)' }}>
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed" style={{ color: 'var(--ti1)' }}>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ═══ Stats ═══ */}
        <section className="border-t border-b" style={{ borderColor: 'oklch(18% 0.030 258 / 0.06)', background: 'var(--tp1)' }}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            <div className="t-sh">
              <div>
                <span className="t-eyebrow">◇ bukti</span>
                <h2 className="t-st">Dipercaya 1.200+ Pemilik Website di <em>Indonesia</em></h2>
              </div>
              <p className="t-sd">Kami telah membantu ribuan bisnis, UMKM, dan instansi memiliki website profesional.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {[
                { value: '1.200+', label: 'Website dikerjakan', note: 'Sejak 2020, setiap project ditangani tim berpengalaman.' },
                { value: '4.9/5', label: 'Rating kepuasan', note: 'Dari 500+ review verified pelanggan.' },
                { value: '30 hari', label: 'Garansi support', note: 'Gratis revisi & support teknis.' },
                { value: '5–14 hari', label: 'Waktu pengerjaan', note: 'Selalu ada estimasi di awal.' },
              ].map((stat, i) => (
                <div key={stat.label} className="rounded-xl border p-4 sm:p-5" style={{
                  borderColor: 'oklch(18% 0.030 258 / 0.08)',
                  background: i === 0 ? 'linear-gradient(160deg, var(--accent-tint), var(--tp) 50%)' :
                    i === 1 ? 'linear-gradient(160deg, oklch(82% 0.180 130 / 0.15), var(--tp) 50%)' :
                    'var(--tp)',
                }}>
                  <p className="font-bold" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{stat.value}</p>
                  <p className="mt-1.5 text-[0.8125rem] font-medium" style={{ color: 'var(--ti1)' }}>{stat.label}</p>
                  <p className="mt-1 text-[0.6875rem] leading-relaxed hidden sm:block" style={{ color: 'var(--ti2)' }}>{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Pricing ═══ */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20" id="harga">
          <div className="text-center mb-6 sm:mb-8">
            <span className="t-eyebrow">◇ harga</span>
            <h2 className="mt-2 mx-auto" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.625rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2, maxWidth: '22ch' }}>
              Pilih Paket Sesuai <em style={{ fontFamily: 'var(--font-instrument, Georgia, serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>Kebutuhan</em>
            </h2>
            <div className="mt-3 sm:mt-4 inline-flex rounded-full p-0.5" style={{ background: 'var(--tp2)', border: 'var(--r-hair)' }}>
              {(['once', 'maintenance'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setBilling(mode)}
                  className="rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200"
                  style={billing === mode ? { background: 'var(--tp)', color: 'var(--ti0)', boxShadow: '0 1px 4px -1px oklch(18% 0.030 258 / 0.12)' } : { color: 'var(--ti2)' }}
                >
                  {mode === 'once' ? 'Sekali Bayar' : <><span className="hidden sm:inline">+ </span>Maintenance <span className="font-mono text-[0.625rem]" style={{ color: 'var(--success)' }}>-20%</span></>}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {packages.map((pkg) => {
              const f = pkg.popular
              return (
                <div key={pkg.name} className="relative flex flex-col rounded-xl border p-4 sm:p-5 transition-all duration-200" style={{
                  borderColor: f ? 'var(--ti0)' : 'oklch(18% 0.030 258 / 0.12)',
                  background: f ? 'var(--ti0)' : 'var(--tp)',
                  color: f ? 'var(--tp)' : 'inherit',
                  ...(f ? { boxShadow: '0 20px 50px -24px oklch(18% 0.030 258 / 0.45)' } : {}),
                }}>
                  {f && (
                    <span className="absolute -top-2.5 left-5 rounded-full px-2.5 py-0.5 font-mono text-[0.625rem] font-bold uppercase" style={{ background: 'var(--companion)', color: 'var(--ti0)', letterSpacing: '0.1em' }}>
                      Populer
                    </span>
                  )}
                  <div className="font-mono text-[0.625rem] uppercase" style={{ letterSpacing: '0.1em', color: f ? 'oklch(98% 0 0 / 0.6)' : 'var(--ti2)' }}>{pkg.name}</div>
                  <div className="mt-2 font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.03em' }}>
                    {billing === 'maintenance' && pkg.price !== 'Custom' ? pkg.renewal?.split('/')[0] : pkg.price}
                  </div>
                  {billing === 'once' && pkg.renewal && (
                    <div className="text-[0.6875rem]" style={{ color: f ? 'oklch(98% 0 0 / 0.5)' : 'var(--ti2)' }}>{pkg.renewal}</div>
                  )}
                  <p className="mt-1.5 text-[0.8125rem]" style={{ color: f ? 'oklch(98% 0 0 / 0.7)' : 'var(--ti1)' }}>{pkg.description}</p>
                  <ul className="mt-4 flex flex-1 flex-col gap-1.5">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-[0.8125rem]" style={{ color: f ? 'oklch(98% 0 0 / 0.7)' : 'var(--ti1)' }}>
                        <span style={{ color: f ? 'var(--companion)' : 'var(--accent)', fontWeight: 700, fontSize: '0.75rem' }}>✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${siteConfig.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan paket ${pkg.name} untuk Sistem Inventory. Bisa info lebih lanjut?`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="t-btn mt-5 w-full justify-center"
                    style={f ? { background: 'var(--companion)', color: 'var(--ti0)', borderColor: 'var(--companion)' } : { borderColor: 'oklch(18% 0.030 258 / 0.15)' }}
                  >
                    <MessageCircle className="size-3.5" aria-hidden />
                    Pilih {pkg.name}
                  </a>
                </div>
              )
            })}
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="border-t" style={{ borderColor: 'oklch(18% 0.030 258 / 0.06)', background: 'var(--tp1)' }} id="faq">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            <div className="text-center">
              <span className="t-eyebrow">◇ faq</span>
              <h2 className="mt-2 mx-auto" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.625rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
                Pertanyaan Seputar <em style={{ fontFamily: 'var(--font-instrument, Georgia, serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>Sistem Inventory</em>
              </h2>
              <p className="mt-3 mx-auto max-w-md text-[0.875rem] leading-relaxed" style={{ color: 'var(--ti1)' }}>
                Jawaban untuk pertanyaan yang sering diajukan tentang layanan ini.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {service.faq.map((item) => (
                <details key={item.question} className="group rounded-xl border px-4 py-3.5 sm:px-5 sm:py-4" style={{ borderColor: 'oklch(18% 0.030 258 / 0.10)', background: 'var(--tp)' }}>
                  <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <ChevronRight className="size-3.5 shrink-0 transition-transform duration-200 group-open:rotate-90" style={{ color: 'var(--ti2)' }} aria-hidden />
                  </summary>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed" style={{ color: 'var(--ti1)' }}>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Related ═══ */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-14">
          <span className="t-eyebrow">◇ terkait</span>
          <h2 className="mt-2 text-lg font-bold tracking-tight sm:text-xl">Layanan Lainnya</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
            {service.relatedServices.map((relSlug) => {
              const rel = services[relSlug]
              if (!rel) return null
              return (
                <Link key={relSlug} href={`/layanan/${relSlug}`} className="group rounded-xl border p-4 transition-all duration-200 hover:border-[oklch(18%_0.030_258/0.2)]" style={{ borderColor: 'oklch(18% 0.030 258 / 0.10)', background: 'var(--tp)' }}>
                  <h3 className="text-sm font-semibold transition-colors group-hover:text-primary">{rel.menuLabel}</h3>
                  <p className="mt-1 text-[0.75rem] leading-relaxed" style={{ color: 'var(--ti1)' }}>{rel.menuDescription}</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="relative overflow-hidden rounded-xl px-6 py-10 text-center sm:px-10 sm:py-12 md:px-14 md:py-14" style={{ background: 'var(--ti0)', color: 'var(--tp)', isolation: 'isolate' }}>
            <div className="pointer-events-none absolute inset-0" style={{
              background: 'radial-gradient(500px 180px at 20% 110%, oklch(54% 0.220 268 / 0.5), transparent 70%), radial-gradient(400px 200px at 90% -10%, oklch(82% 0.180 130 / 0.4), transparent 70%)',
              zIndex: -1,
            }} />
            <div className="pointer-events-none absolute inset-0" style={{
              backgroundImage: 'linear-gradient(to right, oklch(100% 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, oklch(100% 0 0 / 0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px', zIndex: -1,
            }} />

            <h2 className="mx-auto font-bold" style={{ fontSize: 'clamp(1.375rem, 3.5vw, 2.25rem)', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: '22ch' }}>
              Siap Membangun <em style={{ fontFamily: 'var(--font-instrument, Georgia, serif)', fontWeight: 400, fontStyle: 'italic', color: 'var(--companion)' }}>Sistem Inventory</em>?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-pretty" style={{ color: 'oklch(98% 0 0 / 0.7)', fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
              Konsultasikan kebutuhan Anda secara gratis. Kami bantu rancang solusi terbaik sesuai tujuan dan anggaran bisnis Anda.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="t-btn" style={{ background: 'var(--tp)', color: 'var(--ti0)', borderColor: 'var(--tp)' }}>
                <MessageCircle className="size-4" aria-hidden />
                Konsultasi Gratis
              </a>
              <Link href="/#layanan" className="t-btn" style={{ color: 'var(--tp)', borderColor: 'oklch(100% 0 0 / 0.15)' }}>
                Lihat Layanan Lain
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-6 text-right">
          <time dateTime={service.updatedAt} className="font-mono text-[0.625rem]" style={{ color: 'var(--ti3)' }}>
            Terakhir diperbarui: {new Date(service.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
