import type { ServiceData } from './types'

export const inventory: ServiceData = {
  slug: 'jasa-pembuatan-sistem-inventory',
  menuLabel: 'Sistem Inventory',
  menuDescription: 'Manajemen stok, gudang, & keluar-masuk barang',
  updatedAt: '2025-07-01',

  seo: {
    title: 'Jasa Pembuatan Sistem Inventory & Manajemen Stok | OOS SHOP',
    description:
      'Jasa pembuatan sistem inventory dan manajemen stok barang. Pantau stok real time, keluar-masuk barang, multi gudang, dan laporan. Custom sesuai bisnis, aman & skalabel. Konsultasi gratis via WhatsApp.',
    keywords: [
      'jasa pembuatan sistem inventory',
      'aplikasi manajemen stok',
      'sistem stok barang',
      'aplikasi gudang custom',
      'jasa bikin sistem inventaris',
      'software inventory custom',
      'aplikasi stok barang online',
    ],
  },

  hero: {
    badge: 'Sistem Inventory & Stok',
    heading: 'Jasa Pembuatan Sistem Inventory & Manajemen Stok',
    subheading:
      'Kelola stok barang secara akurat dan real-time. Pantau keluar-masuk barang, multi gudang, dan laporan stok dalam satu sistem yang dirancang sesuai kebutuhan operasional bisnis Anda.',
    icon: 'Package',
  },

  whatIs: {
    title: 'Apa Itu Jasa Pembuatan Sistem Inventory?',
    answer:
      'Sistem inventory adalah aplikasi web untuk memantau dan mengelola stok barang, mencatat transaksi keluar-masuk, dan menghasilkan laporan stok secara real-time. Jika bisnis Anda masih mengandalkan pencatatan manual di Excel atau buku — saatnya upgrade ke sistem digital yang lebih akurat dan efisien.\n\nOOS SHOP membuat sistem inventory custom dengan pencatatan stok akurat, dukungan multi gudang/cabang, alert stok minimum, dan laporan pergerakan barang. Sistem dirancang sesuai alur operasional gudang Anda sehingga adopsi tim lebih mudah dan data lebih terpercaya.\n\nDengan sistem inventory digital, Anda terhindar dari kehabisan stok yang kehilangan penjualan atau kelebihan stok yang mengikat modal. Setiap transaksi tercatat otomatis dan bisa ditelusuri, memudahkan audit dan pengambilan keputusan pengadaan barang.',
    priceNote: 'Harga disesuaikan kompleksitas fitur dan skala gudang',
    timelineNote: '14–30 hari kerja, menyesuaikan kebutuhan',
  },

  whyChooseUs: [
    {
      title: 'Stok Akurat & Real-Time',
      description:
        'Setiap transaksi keluar-masuk langsung memperbarui jumlah stok. Tidak ada lagi selisih antara data dan fisik barang.',
    },
    {
      title: 'Multi Gudang / Cabang',
      description:
        'Kelola stok di beberapa gudang atau cabang sekaligus dalam satu dashboard terpusat. Transfer antar gudang pun tercatat.',
    },
    {
      title: 'Custom Sesuai Alur Gudang',
      description:
        'Sistem disesuaikan dengan alur operasional gudang Anda — bukan template kaku. Dari penerimaan barang, penyimpanan, hingga pengiriman.',
    },
    {
      title: 'Integrasi dengan Penjualan',
      description:
        'Sistem bisa dihubungkan dengan toko online atau POS Anda sehingga stok otomatis berkurang saat terjadi transaksi penjualan.',
    },
  ],

  features: [
    'Stok real-time & akurat',
    'Keluar-masuk barang tercatat',
    'Multi gudang / cabang',
    'Transfer antar gudang',
    'Alert stok minimum',
    'Barcode / QR code support',
    'Kategori & SKU management',
    'Laporan stok & pergerakan barang',
    'History transaksi (audit trail)',
    'Multi-user & hak akses',
    'Export data (Excel, PDF)',
    'Dashboard ringkasan visual',
    'Pencarian & filter barang',
    'Mobile accessible',
    'API integration (POS, toko online)',
    'Support & maintenance',
  ],

  benefits: [
    {
      title: 'Stok Real-Time & Akurat',
      description:
        'Pantau jumlah stok secara akurat dan real-time. Setiap transaksi langsung memperbarui data untuk menghindari kehabisan atau kelebihan barang.',
    },
    {
      title: 'Pencatatan Keluar-Masuk Barang',
      description:
        'Catat setiap transaksi masuk (pembelian, return) dan keluar (penjualan, rusak) secara rapi, terstruktur, dan bisa ditelusuri.',
    },
    {
      title: 'Multi Gudang Terpusat',
      description:
        'Kelola stok di beberapa gudang atau cabang dalam satu dashboard. Transfer antar gudang tercatat dan stok masing-masing terlihat jelas.',
    },
    {
      title: 'Laporan & Analisis Stok',
      description:
        'Laporan stok, pergerakan barang, dan barang fast/slow-moving untuk membantu keputusan pengadaan dan manajemen modal.',
    },
    {
      title: 'Alert Stok Minimum',
      description:
        'Notifikasi otomatis ketika stok barang mencapai batas minimum. Anda bisa segera restock sebelum kehabisan.',
    },
    {
      title: 'Terintegrasi dengan Penjualan',
      description:
        'Stok otomatis berkurang saat terjadi penjualan dari toko online atau POS. Tidak perlu lagi update manual.',
    },
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
    {
      step: '1',
      title: 'Analisis Alur Gudang',
      description:
        'Kami pelajari alur stok, kategori barang, jumlah gudang, dan laporan yang Anda butuhkan dari sistem inventory.',
    },
    {
      step: '2',
      title: 'Rancang Struktur Data',
      description:
        'Kami desain struktur data barang, gudang, transaksi, dan relasi antar modul. Anda review sebelum development.',
    },
    {
      step: '3',
      title: 'Pengembangan & Uji Coba',
      description:
        'Kami bangun fitur bertahap lalu uji coba bersama tim gudang untuk memastikan data akurat dan alur sesuai.',
    },
    {
      step: '4',
      title: 'Deployment & Pelatihan',
      description:
        'Sistem dionlinekan, data awal dimigrasi, dan pelatihan diberikan untuk tim gudang/warehouse agar langsung bisa dipakai.',
    },
  ],

  faq: [
    {
      question: 'Apakah sistem bisa memantau stok secara real-time?',
      answer:
        'Ya. Setiap transaksi keluar-masuk barang langsung memperbarui jumlah stok secara otomatis. Anda selalu melihat data stok terkini dan akurat tanpa harus stock opname manual setiap saat.',
    },
    {
      question: 'Apakah mendukung banyak gudang atau cabang?',
      answer:
        'Bisa. Sistem dirancang untuk mengelola stok di beberapa gudang atau cabang sekaligus dalam satu dashboard terpusat. Transfer barang antar gudang pun tercatat dengan history yang bisa ditelusuri.',
    },
    {
      question: 'Apakah bisa terhubung dengan sistem penjualan?',
      answer:
        'Bisa. Sistem inventory dapat diintegrasikan dengan toko online atau POS (Point of Sale) agar stok otomatis berkurang saat terjadi transaksi penjualan. Tidak perlu input manual lagi.',
    },
    {
      question: 'Apakah ada notifikasi saat stok menipis?',
      answer:
        'Ya. Anda bisa mengatur batas stok minimum per barang. Ketika stok mencapai batas tersebut, sistem mengirim notifikasi/alert agar Anda bisa segera melakukan restock.',
    },
    {
      question: 'Apakah bisa scan barcode/QR code?',
      answer:
        'Bisa. Sistem mendukung input barang via barcode scanner atau QR code untuk mempercepat proses penerimaan dan pengeluaran barang di gudang.',
    },
    {
      question: 'Berapa biaya pembuatan sistem inventory?',
      answer:
        'Harga bergantung pada skala gudang, jumlah fitur, dan integrasi yang dibutuhkan. Kami perlu memahami kebutuhan Anda terlebih dulu untuk memberikan estimasi akurat. Konsultasi awal gratis.',
    },
  ],

  relatedServices: [
    'jasa-pembuatan-dashboard-admin',
    'jasa-pembuatan-crm-erp',
    'jasa-pembuatan-toko-online',
  ],

  rating: {
    ratingValue: '4.8',
    ratingCount: '63',
    reviewCount: '54',
  },
}
