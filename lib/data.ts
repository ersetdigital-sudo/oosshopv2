export type PluginService = {
  slug: string
  name: string
  plugin: string
  description: string
  benefits: string[]
}

export type ServiceCluster = {
  id: string
  title: string
  intro: string
  services: PluginService[]
}

export const serviceClusters: ServiceCluster[] = [
  {
    id: 'page-builder',
    title: 'Page Builder WordPress',
    intro:
      'Bangun tampilan website profesional tanpa coding. Kami instal dan aktivasi page builder premium dengan lisensi original, siap pakai lengkap dengan template.',
    services: [
      {
        slug: 'jasa-instal-elementor-pro',
        name: 'Jasa Instal Elementor Pro',
        plugin: 'Elementor Pro',
        description:
          'Elementor Pro adalah page builder WordPress paling populer di dunia. Kami instal versi original lengkap dengan aktivasi lisensi resmi, Theme Builder, Popup Builder, dan akses penuh ke semua widget Pro.',
        benefits: [
          'Lisensi original teraktivasi resmi',
          'Update otomatis langsung dari Elementor',
          'Theme Builder & Popup Builder aktif penuh',
        ],
      },
      {
        slug: 'jasa-instal-astra-pro',
        name: 'Jasa Instal Astra Pro',
        plugin: 'Astra Pro',
        description:
          'Astra Pro adalah tema WordPress ringan dan cepat yang cocok dipadukan dengan page builder apa pun. Kami instal beserta Astra Pro Addon dan starter template pilihan Anda.',
        benefits: [
          'Tema ringan, skor kecepatan tinggi',
          'Ratusan starter template premium',
          'Kompatibel dengan Elementor & WooCommerce',
        ],
      },
      {
        slug: 'essential-addons-for-elementor-pro',
        name: 'Jasa Instal Essential Addons',
        plugin: 'Essential Addons Pro',
        description:
          'Essential Addons for Elementor menambahkan 100+ widget premium untuk memperkaya desain Elementor Anda — mulai dari post grid, pricing table, sampai form styler.',
        benefits: [
          '100+ widget tambahan untuk Elementor',
          'Aktivasi lisensi Pro resmi',
          'Ringan dan modular, tidak memberatkan situs',
        ],
      },
      {
        slug: 'jasa-instal-oxygen-builder',
        name: 'Jasa Instal Oxygen Builder',
        plugin: 'Oxygen Builder',
        description:
          'Oxygen Builder adalah visual builder WordPress paling powerful untuk membuat website custom tanpa coding. Kami instal dengan kontrol penuh atas struktur HTML, CSS, dan desain responsif dengan performa loading super cepat.',
        benefits: [
          'Kontrol penuh struktur HTML & CSS',
          'Performa loading super cepat',
          'Bebas desain responsif tanpa batasan tema',
        ],
      },
    ],
  },
  {
    id: 'dynamic-website',
    title: 'Plugin Dynamic Website & Custom',
    intro:
      'Untuk kebutuhan website listing, direktori, real estate, atau katalog custom — toolkit dynamic content premium yang kami instal dan konfigurasi sampai berjalan.',
    services: [
      {
        slug: 'jasa-instal-crocoblock-all-inclusive-plugin',
        name: 'Jasa Instal Crocoblock',
        plugin: 'Crocoblock (JetPlugins)',
        description:
          'Crocoblock adalah paket lengkap JetPlugins untuk membangun website dinamis dengan Elementor — termasuk JetEngine, JetSmartFilters, JetElements, dan lainnya sesuai kebutuhan proyek Anda.',
        benefits: [
          'Semua JetPlugins dengan lisensi resmi',
          'Konfigurasi awal sesuai jenis website',
          'Cocok untuk listing, direktori, dan marketplace',
        ],
      },
      {
        slug: 'jasa-instal-jetengine',
        name: 'Jasa Instal JetEngine',
        plugin: 'JetEngine',
        description:
          'JetEngine memungkinkan Anda membuat custom post type, custom field, dan listing dinamis tanpa coding. Kami instal dan siapkan struktur data awal untuk proyek Anda.',
        benefits: [
          'Custom post type & field tanpa coding',
          'Listing grid dinamis siap pakai',
          'Setup struktur data awal termasuk',
        ],
      },
    ],
  },
  {
    id: 'performa',
    title: 'Plugin Cache & Performa WordPress',
    intro:
      'Website lambat menurunkan konversi dan ranking Google. Plugin optimasi premium ini kami instal sekaligus konfigurasi sesuai server Anda — bukan sekadar aktivasi.',
    services: [
      {
        slug: 'jasa-instal-wp-rocket',
        name: 'Jasa Instal WP Rocket',
        plugin: 'WP Rocket',
        description:
          'WP Rocket adalah plugin caching premium terbaik untuk WordPress. Kami instal dan konfigurasi lengkap: page caching, lazy load, minify CSS/JS, dan database optimization sesuai hosting Anda.',
        benefits: [
          'Konfigurasi disesuaikan dengan hosting Anda',
          'Peningkatan skor PageSpeed yang terukur',
          'Termasuk pengecekan sebelum & sesudah',
        ],
      },
      {
        slug: 'jasa-instal-perfmatters',
        name: 'Jasa Instal Perfmatters',
        plugin: 'Perfmatters',
        description:
          'Perfmatters membersihkan script yang tidak perlu di setiap halaman. Kami instal dan lakukan script management manual per halaman untuk hasil Core Web Vitals terbaik.',
        benefits: [
          'Script manager dikonfigurasi per halaman',
          'Mengurangi ukuran halaman secara signifikan',
          'Pasangan ideal untuk WP Rocket / LSCache',
        ],
      },
    ],
  },
  {
    id: 'seo',
    title: 'Plugin SEO WordPress',
    intro:
      'Plugin SEO premium dengan fitur schema, redirect manager, dan analisis konten — kami instal beserta konfigurasi dasar SEO yang benar untuk website Anda.',
    services: [
      {
        slug: 'jasa-instal-rankmath-pro',
        name: 'Jasa Instal Rank Math Pro',
        plugin: 'Rank Math Pro',
        description:
          'Rank Math Pro adalah plugin SEO WordPress terlengkap saat ini. Kami instal, aktivasi lisensi, dan setup awal: schema markup, sitemap, Google Search Console, dan konfigurasi title/meta.',
        benefits: [
          'Setup Search Console & Analytics termasuk',
          'Schema markup otomatis teraktivasi',
          'Migrasi aman dari Yoast / plugin lain',
        ],
      },
      {
        slug: 'jasa-instal-seopress-pro',
        name: 'Jasa Instal SEOPress Pro',
        plugin: 'SEOPress Pro',
        description:
          'SEOPress Pro adalah alternatif SEO ringan tanpa iklan dengan fitur lengkap: schema, redirect, broken link checker, dan WooCommerce SEO. Kami instal dan konfigurasi menyeluruh.',
        benefits: [
          'Ringan, tanpa iklan di dashboard',
          'Fitur WooCommerce SEO lengkap',
          'Konfigurasi awal oleh teknisi berpengalaman',
        ],
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Plugin Form Builder & Email Marketing WordPress',
    intro:
      'Kumpulkan leads dan kelola email marketing langsung dari WordPress tanpa biaya langganan bulanan pihak ketiga.',
    services: [
      {
        slug: 'jasa-instal-fluentform-pro',
        name: 'Jasa Instal Fluent Forms Pro',
        plugin: 'Fluent Forms Pro',
        description:
          'Fluent Forms Pro adalah form builder tercepat untuk WordPress dengan fitur conversational form, payment form, dan integrasi luas. Kami instal beserta form pertama sesuai kebutuhan Anda.',
        benefits: [
          'Form builder tercepat, tidak memberatkan situs',
          'Payment form & conditional logic',
          'Pembuatan form pertama termasuk',
        ],
      },
      {
        slug: 'jasa-instal-fluentcrm',
        name: 'Jasa Instal FluentCRM',
        plugin: 'FluentCRM Pro',
        description:
          'FluentCRM adalah email marketing & CRM self-hosted di dalam WordPress. Kelola kontak, automasi email, dan campaign tanpa biaya bulanan per subscriber. Kami instal dan setup SMTP dengan benar.',
        benefits: [
          'Email automation tanpa biaya per subscriber',
          'Setup SMTP agar email masuk inbox',
          'Integrasi dengan Fluent Forms & WooCommerce',
        ],
      },
    ],
  },
]

export const allServices = serviceClusters.flatMap((c) => c.services)

// --- Katalog (WooCommerce-style) ---
const servicePrices: Record<string, number> = {
  'jasa-instal-elementor-pro': 35000,
  'jasa-instal-astra-pro': 30000,
  'essential-addons-for-elementor-pro': 25000,
  'jasa-instal-oxygen-builder': 50000,
  'jasa-instal-crocoblock-all-inclusive-plugin': 50000,
  'jasa-instal-jetengine': 35000,
  'jasa-instal-wp-rocket': 40000,
  'jasa-instal-perfmatters': 30000,
  'jasa-instal-rankmath-pro': 35000,
  'jasa-instal-seopress-pro': 30000,
  'jasa-instal-fluentform-pro': 30000,
  'jasa-instal-fluentcrm': 45000,
}

const categoryShortLabels: Record<string, string> = {
  'page-builder': 'Page Builder',
  'dynamic-website': 'Dynamic Content',
  performa: 'Cache & Performa',
  seo: 'SEO',
  marketing: 'Form & Email',
}

const bestSellerSlugs = new Set([
  'jasa-instal-elementor-pro',
  'jasa-instal-wp-rocket',
  'jasa-instal-rankmath-pro',
  'jasa-instal-crocoblock-all-inclusive-plugin',
])

export type CatalogItem = PluginService & {
  price: number
  categoryId: string
  category: string
  categoryLabel: string
  bestSeller: boolean
}

export const catalogItems: CatalogItem[] = serviceClusters.flatMap((c) =>
  c.services.map((s) => ({
    ...s,
    price: servicePrices[s.slug] ?? 25000,
    categoryId: c.id,
    category: c.title,
    categoryLabel: categoryShortLabels[c.id] ?? c.title,
    bestSeller: bestSellerSlugs.has(s.slug),
  })),
)

export const catalogCategories = serviceClusters.map((c) => ({
  id: c.id,
  label: categoryShortLabels[c.id] ?? c.title,
  fullLabel: c.title,
  count: c.services.length,
}))

export function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

// --- Landing page jasa pembuatan website (SEO / AEO / GEO) ---
export type WebsiteService = {
  slug: string
  icon: string
  menuLabel: string
  menuDescription: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
  heroBadge: string
  heroHeading: string
  heroSubheading: string
  // AEO: jawaban ringkas & langsung untuk answer engine
  shortAnswer: string
  priceNote: string
  timelineNote: string
  benefits: { title: string; description: string }[]
  // GEO: use case lokal yang mudah dikutip AI
  useCases: string[]
  process: { step: string; title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

export const websiteServices: WebsiteService[] = [
  {
    slug: 'jasa-pembuatan-company-profile',
    icon: 'Building2',
    menuLabel: 'Website Company Profile',
    menuDescription: 'Jasa pembuatan website company profile profesional untuk bisnis & instansi',
    seoTitle: 'Jasa Pembuatan Website Company Profile Profesional 2025 | OOS SHOP',
    seoDescription:
      'Jasa pembuatan website company profile profesional untuk perusahaan, UMKM, dan instansi di Indonesia. Desain modern, mobile responsive, SEO friendly, loading cepat, dan mudah dikelola sendiri. Harga mulai terjangkau, gratis konsultasi via WhatsApp.',
    keywords: [
      'jasa pembuatan website company profile',
      'jasa bikin website company profile',
      'jasa pembuatan company profile',
      'jasa buat website company profile profesional',
      'website company profile murah',
      'jasa website profil perusahaan',
      'buat website company profile',
      'jasa pembuatan website perusahaan',
      'website company profile indonesia',
      'jasa desain website company profile',
      'harga pembuatan website company profile',
      'jasa web company profile terbaik',
    ],
    heroBadge: 'Jasa Pembuatan Website Company Profile',
    heroHeading: 'Jasa Pembuatan Website Company Profile Profesional untuk Bisnis Anda',
    heroSubheading:
      'Bangun kredibilitas bisnis Anda dengan jasa pembuatan website company profile yang modern, cepat, SEO friendly, dan mudah ditemukan di Google. Cocok untuk perusahaan, UMKM, startup, hingga instansi pemerintah di seluruh Indonesia. Hasil profesional, harga terjangkau.',
    shortAnswer:
      'Jasa pembuatan website company profile adalah layanan profesional untuk membuat website resmi perusahaan yang menampilkan profil bisnis, layanan, portofolio, testimoni, dan kontak secara lengkap. OOS SHOP menyediakan jasa pembuatan website company profile dengan desain modern, mobile responsive, SEO friendly, loading cepat di bawah 3 detik, dan dilengkapi dashboard CMS agar Anda mudah mengelola konten sendiri tanpa keahlian teknis. Website company profile dari kami dibangun dengan teknologi terkini, dioptimasi untuk mesin pencari Google, dan dirancang untuk meningkatkan kepercayaan calon klien terhadap bisnis Anda.',
    priceNote: 'Mulai dari Rp 1.500.000 — disesuaikan kebutuhan',
    timelineNote: '5–14 hari kerja, revisi hingga puas',
    benefits: [
      {
        title: 'Desain Modern & Kredibel',
        description:
          'Website company profile dengan desain premium yang membangun kepercayaan calon klien sejak kunjungan pertama. Tampilan elegan sesuai identitas brand Anda.',
      },
      {
        title: '100% Mobile Responsive',
        description:
          'Tampil sempurna di semua perangkat — smartphone, tablet, dan desktop. Penting karena 70%+ pengunjung website di Indonesia mengakses lewat HP.',
      },
      {
        title: 'SEO Friendly & Cepat',
        description:
          'Struktur HTML semantik, meta tag teroptimasi, schema markup, sitemap, dan loading di bawah 3 detik agar website company profile Anda mudah ranking di halaman 1 Google.',
      },
      {
        title: 'Dashboard Mudah Dikelola',
        description:
          'Dilengkapi CMS (Content Management System) intuitif untuk update konten, berita, portofolio, dan galeri kapan saja tanpa perlu developer.',
      },
      {
        title: 'SSL & Keamanan Terjamin',
        description:
          'Sertifikat SSL gratis, backup rutin, dan proteksi keamanan dasar agar website company profile Anda aman dari serangan.',
      },
      {
        title: 'Integrasi WhatsApp & Google Maps',
        description:
          'Tombol WhatsApp floating dan embed Google Maps untuk memudahkan calon klien menghubungi dan menemukan lokasi bisnis Anda.',
      },
    ],
    useCases: [
      'Perusahaan (PT/CV) yang ingin website company profile profesional agar dipercaya calon klien dan mitra bisnis',
      'UMKM dan startup yang butuh kehadiran online resmi untuk memperluas jangkauan pasar',
      'Instansi pemerintah, sekolah, universitas, dan yayasan yang memerlukan situs resmi informatif',
      'Kantor hukum, konsultan, akuntan, dan profesional yang ingin menampilkan keahlian dan portofolio',
      'Developer properti dan kontraktor yang butuh company profile digital untuk tender dan presentasi',
      'Klinik, rumah sakit, dan fasilitas kesehatan yang ingin tampil kredibel dan mudah ditemukan pasien',
      'Perusahaan manufaktur dan ekspor yang butuh website company profile bilingual (Indonesia & Inggris)',
    ],
    process: [
      {
        step: '1',
        title: 'Konsultasi & Analisis Kebutuhan',
        description: 'Kami diskusikan tujuan website company profile Anda, konten yang dibutuhkan, referensi desain, dan target audiens melalui WhatsApp atau video call. Gratis tanpa biaya.',
      },
      {
        step: '2',
        title: 'Perencanaan Struktur & Wireframe',
        description: 'Tim kami merancang sitemap dan wireframe halaman: beranda, tentang kami, layanan, portofolio, blog, dan kontak. Anda review sebelum masuk tahap desain.',
      },
      {
        step: '3',
        title: 'Desain Visual & Pengembangan',
        description: 'Desain UI/UX modern sesuai brand identity Anda, lalu dikembangkan menjadi website company profile yang responsif, cepat, dan SEO friendly.',
      },
      {
        step: '4',
        title: 'Revisi & Quality Assurance',
        description: 'Anda review hasilnya, kami revisi hingga sesuai harapan. QA mencakup pengecekan responsive, kecepatan, SEO on-page, dan fungsionalitas di semua browser.',
      },
      {
        step: '5',
        title: 'Online, Serah Terima & Pelatihan',
        description: 'Website company profile dionlinekan di domain Anda. Kami berikan panduan penggunaan dashboard, pelatihan singkat, dan dukungan teknis 30 hari.',
      },
    ],
    faqs: [
      {
        question: 'Berapa biaya jasa pembuatan website company profile di OOS SHOP?',
        answer:
          'Biaya jasa pembuatan website company profile di OOS SHOP mulai dari Rp 1.500.000, menyesuaikan jumlah halaman, fitur, dan kompleksitas desain. Kami menawarkan beberapa paket dengan harga transparan. Hubungi kami via WhatsApp untuk mendapatkan penawaran detail sesuai kebutuhan bisnis Anda.',
      },
      {
        question: 'Berapa lama waktu pengerjaan website company profile?',
        answer:
          'Waktu pengerjaan website company profile umumnya 5 hingga 14 hari kerja tergantung jumlah halaman dan kelengkapan materi dari klien. Untuk proyek yang lebih kompleks dengan fitur custom, bisa memakan waktu 2–4 minggu. Kami selalu mengkomunikasikan timeline secara transparan di awal proyek.',
      },
      {
        question: 'Apakah website company profile bisa dikelola sendiri setelah selesai?',
        answer:
          'Bisa. Semua website company profile yang kami buat dilengkapi dashboard CMS (Content Management System) yang intuitif. Anda dapat menambah berita, mengubah teks, mengupload foto portofolio, dan mengelola konten lainnya secara mandiri. Kami juga memberikan panduan dan pelatihan singkat saat serah terima.',
      },
      {
        question: 'Apakah sudah termasuk domain dan hosting?',
        answer:
          'Kami membantu pengadaan dan konfigurasi domain (.com, .co.id, .id) serta hosting yang sesuai kebutuhan website company profile Anda. Biaya domain dan hosting terpisah dari biaya pembuatan, namun kami rekomendasikan solusi paling hemat dan stabil. Semua dikonfigurasi hingga website online.',
      },
      {
        question: 'Apakah website company profile sudah mobile friendly dan SEO friendly?',
        answer:
          'Ya. Semua website company profile buatan OOS SHOP 100% mobile responsive dan dibangun dengan struktur SEO friendly: HTML semantik, meta tag teroptimasi, schema markup, loading cepat, dan sitemap XML. Website Anda siap terindeks dan bersaing di halaman pencarian Google.',
      },
      {
        question: 'Apa saja halaman yang ada di website company profile?',
        answer:
          'Website company profile umumnya terdiri dari halaman Beranda, Tentang Kami (profil perusahaan, visi misi, tim), Layanan/Produk, Portofolio/Proyek, Blog/Berita, dan Kontak (formulir, WhatsApp, Google Maps). Struktur halaman dapat disesuaikan dengan kebutuhan bisnis Anda.',
      },
      {
        question: 'Apakah bisa request desain custom sesuai brand perusahaan?',
        answer:
          'Tentu. Kami membuat desain website company profile custom sesuai brand identity perusahaan Anda — mulai dari warna, tipografi, gaya visual, hingga tone komunikasi. Tidak menggunakan template pasaran, sehingga website Anda unik dan mencerminkan profesionalisme bisnis.',
      },
      {
        question: 'Apakah ada garansi dan support setelah website jadi?',
        answer:
          'Ya. Kami memberikan garansi bug fix selama 30 hari setelah serah terima dan dukungan teknis via WhatsApp. Jika ada kendala teknis atau perubahan minor, tim kami siap membantu. Untuk maintenance jangka panjang, tersedia paket bulanan opsional.',
      },
      {
        question: 'Teknologi apa yang digunakan untuk membuat website company profile?',
        answer:
          'Kami menggunakan teknologi modern seperti Next.js, React, dan Tailwind CSS untuk performa optimal, atau WordPress dengan tema premium untuk kemudahan pengelolaan — disesuaikan dengan kebutuhan dan preferensi klien. Semua teknologi yang kami gunakan mendukung SEO, kecepatan, dan keamanan.',
      },
      {
        question: 'Apakah website company profile bisa diakses dari luar negeri?',
        answer:
          'Bisa. Website company profile yang kami buat di-hosting pada server dengan CDN global sehingga dapat diakses dengan cepat dari mana saja di dunia. Cocok untuk perusahaan yang memiliki klien atau mitra internasional.',
      },
    ],
  },
  {
    slug: 'jasa-pembuatan-landing-page',
    icon: 'MousePointerClick',
    menuLabel: 'Landing Page',
    menuDescription: 'Halaman promosi fokus konversi untuk iklan & campaign',
    seoTitle: 'Jasa Pembuatan Landing Page Konversi Tinggi | OOS SHOP',
    seoDescription:
      'Jasa pembuatan landing page yang fokus konversi untuk iklan, campaign, dan penjualan produk. Desain persuasif, fast loading, mobile responsive, dan siap integrasi dengan iklan Meta & Google. Konsultasi gratis.',
    keywords: [
      'jasa pembuatan landing page',
      'jasa bikin landing page',
      'landing page konversi tinggi',
      'jasa landing page untuk iklan',
      'buat landing page produk murah',
    ],
    heroBadge: 'Landing Page Konversi',
    heroHeading: 'Jasa Pembuatan Landing Page Konversi Tinggi',
    heroSubheading:
      'Halaman promosi yang dirancang untuk satu tujuan: mengubah pengunjung menjadi leads dan pembeli. Cepat, persuasif, dan siap dipakai untuk iklan Meta maupun Google.',
    shortAnswer:
      'Landing page adalah satu halaman fokus yang dirancang untuk mendorong satu aksi spesifik, seperti membeli produk, mengisi form, atau menghubungi via WhatsApp. OOS SHOP membuat landing page yang persuasif, fast loading, dan mobile responsive, dengan struktur yang dioptimalkan untuk konversi iklan sehingga biaya iklan Anda lebih efisien.',
    priceNote: 'Harga terjangkau, cocok untuk campaign',
    timelineNote: 'Pengerjaan cepat, siap tayang',
    benefits: [
      {
        title: 'Fokus Konversi',
        description:
          'Struktur copywriting dan CTA yang menuntun pengunjung melakukan aksi yang Anda inginkan.',
      },
      {
        title: 'Fast Loading',
        description:
          'Halaman ringan agar tidak kehilangan calon pembeli dan mendukung skor kualitas iklan.',
      },
      {
        title: 'Siap Untuk Iklan',
        description:
          'Dapat diintegrasikan dengan Meta Pixel dan Google Ads untuk tracking dan retargeting.',
      },
      {
        title: 'Mobile First',
        description:
          'Dioptimalkan untuk pengunjung mobile yang mendominasi trafik iklan sosial media.',
      },
    ],
    useCases: [
      'Campaign iklan Meta Ads atau Google Ads yang butuh halaman tujuan efektif',
      'Peluncuran produk baru dengan penawaran spesial',
      'Pengumpulan leads lewat form atau tombol WhatsApp',
      'Promo event, webinar, atau pendaftaran dengan waktu terbatas',
    ],
    process: [
      {
        step: '1',
        title: 'Konsultasi Tujuan',
        description: 'Kami tentukan target audiens, penawaran, dan aksi utama landing page Anda.',
      },
      {
        step: '2',
        title: 'Struktur & Copywriting',
        description: 'Kami susun alur persuasif dan desain yang mengarahkan ke konversi.',
      },
      {
        step: '3',
        title: 'Bangun & Integrasi',
        description: 'Landing page dibangun cepat lalu dihubungkan ke pixel iklan dan WhatsApp.',
      },
      {
        step: '4',
        title: 'Tayang & Optimasi',
        description: 'Halaman online dan siap Anda pakai untuk beriklan.',
      },
    ],
    faqs: [
      {
        question: 'Apa bedanya landing page dan website company profile?',
        answer:
          'Company profile menampilkan banyak informasi tentang bisnis dalam beberapa halaman, sedangkan landing page adalah satu halaman fokus dengan satu tujuan konversi, seperti penjualan atau pengumpulan leads. Landing page ideal untuk campaign iklan.',
      },
      {
        question: 'Apakah landing page bisa diintegrasikan dengan iklan Facebook/Google?',
        answer:
          'Bisa. Kami dapat memasang Meta Pixel dan Google Ads tag agar Anda dapat melakukan tracking konversi dan retargeting audiens yang sudah mengunjungi halaman Anda.',
      },
      {
        question: 'Apakah copywriting termasuk dalam layanan?',
        answer:
          'Kami membantu menyusun struktur dan alur copy yang persuasif berdasarkan penawaran Anda. Anda cukup memberikan informasi produk dan tujuan, sisanya kami rapikan agar mendorong konversi.',
      },
      {
        question: 'Berapa lama pembuatan landing page?',
        answer:
          'Landing page satu halaman umumnya dapat dikerjakan dengan cepat. Waktu pastinya tergantung kelengkapan materi dan revisi, dan akan kami sampaikan saat konsultasi.',
      },
    ],
  },
  {
    slug: 'jasa-pembuatan-toko-online',
    icon: 'ShoppingCart',
    menuLabel: 'Website Toko Online',
    menuDescription: 'Toko online lengkap dengan checkout & manajemen pesanan',
    seoTitle: 'Jasa Pembuatan Website Toko Online (Toko Online WooCommerce) | OOS SHOP',
    seoDescription:
      'Jasa pembuatan website toko online lengkap dengan katalog produk, keranjang belanja, checkout online, dan manajemen pesanan. Mobile responsive, SEO friendly, dan mudah dikelola. Konsultasi gratis via WhatsApp.',
    keywords: [
      'jasa pembuatan website toko online',
      'jasa bikin toko online',
      'jasa pembuatan toko online woocommerce',
      'website toko online murah',
      'buat online shop profesional',
    ],
    heroBadge: 'Website Toko Online',
    heroHeading: 'Jasa Pembuatan Website Toko Online',
    heroSubheading:
      'Jual produk Anda kapan saja dengan toko online sendiri. Katalog rapi, checkout otomatis, dan manajemen pesanan terpusat yang memudahkan Anda melayani pelanggan.',
    shortAnswer:
      'Website toko online adalah situs jualan lengkap dengan katalog produk, keranjang belanja, checkout, dan pembayaran online. OOS SHOP membuatkan toko online profesional (umumnya berbasis WooCommerce) yang mobile responsive, SEO friendly, dan dilengkapi dashboard untuk mengelola produk, stok, serta pesanan secara terpusat.',
    priceNote: 'Harga terjangkau, skalabel',
    timelineNote: 'Pengerjaan menyesuaikan jumlah produk',
    benefits: [
      {
        title: 'Katalog & Keranjang',
        description:
          'Tampilan produk rapi dengan kategori, varian, dan keranjang belanja yang mudah dipakai.',
      },
      {
        title: 'Checkout & Pembayaran',
        description:
          'Checkout online dengan integrasi pembayaran otomatis agar transaksi berjalan lancar.',
      },
      {
        title: 'Manajemen Terpusat',
        description:
          'Kelola produk, stok, dan pesanan dari satu dashboard yang mudah dipahami.',
      },
      {
        title: 'Siap Berkembang',
        description:
          'Toko dapat ditambah fitur seperti kupon, ongkir otomatis, dan integrasi marketplace.',
      },
    ],
    useCases: [
      'Brand atau UMKM yang ingin punya toko sendiri, tidak hanya bergantung marketplace',
      'Bisnis yang ingin menjual produk 24 jam dengan checkout otomatis',
      'Reseller/dropshipper yang butuh katalog profesional',
      'Bisnis yang ingin membangun database pelanggan sendiri',
    ],
    process: [
      {
        step: '1',
        title: 'Konsultasi Produk',
        description: 'Kami pelajari jenis produk, metode pembayaran, dan pengiriman yang Anda pakai.',
      },
      {
        step: '2',
        title: 'Bangun Toko',
        description: 'Kami siapkan katalog, kategori, halaman produk, dan alur checkout.',
      },
      {
        step: '3',
        title: 'Integrasi Pembayaran & Ongkir',
        description: 'Kami hubungkan metode pembayaran dan pengiriman sesuai kebutuhan Anda.',
      },
      {
        step: '4',
        title: 'Online & Panduan',
        description: 'Toko dionlinekan beserta panduan mengelola produk dan pesanan.',
      },
    ],
    faqs: [
      {
        question: 'Berapa biaya pembuatan website toko online?',
        answer:
          'Biaya menyesuaikan jumlah produk dan fitur seperti metode pembayaran, ongkir otomatis, dan kupon. Kami menawarkan harga terjangkau yang skalabel. Hubungi kami via WhatsApp untuk penawaran sesuai kebutuhan.',
      },
      {
        question: 'Metode pembayaran apa saja yang bisa diintegrasikan?',
        answer:
          'Toko online dapat diintegrasikan dengan transfer bank manual, payment gateway (kartu, e-wallet, virtual account), maupun COD tergantung kebutuhan dan ketersediaan layanan di wilayah Anda.',
      },
      {
        question: 'Apakah bisa menghitung ongkir otomatis?',
        answer:
          'Bisa. Kami dapat mengintegrasikan perhitungan ongkir otomatis berdasarkan kurir dan wilayah tujuan agar pelanggan langsung tahu total belanja saat checkout.',
      },
      {
        question: 'Apakah saya bisa menambah dan mengelola produk sendiri?',
        answer:
          'Tentu. Anda mendapat dashboard admin untuk menambah produk, mengatur stok, mengelola pesanan, dan melihat laporan penjualan, lengkap dengan panduan singkat dari kami.',
      },
    ],
  },
  {
    slug: 'jasa-pembuatan-website-sekolah',
    icon: 'GraduationCap',
    menuLabel: 'Website Sekolah',
    menuDescription: 'Situs resmi sekolah, kampus, & lembaga pendidikan',
    seoTitle: 'Jasa Pembuatan Website Sekolah & Lembaga Pendidikan | OOS SHOP',
    seoDescription:
      'Jasa pembuatan website sekolah, kampus, dan lembaga pendidikan. Profil sekolah, berita, agenda, galeri, PPDB online, dan info akademik. Modern, mobile responsive, mudah dikelola. Konsultasi gratis.',
    keywords: [
      'jasa pembuatan website sekolah',
      'jasa bikin website sekolah',
      'website sekolah murah',
      'website ppdb online',
      'jasa website lembaga pendidikan',
    ],
    heroBadge: 'Website Sekolah',
    heroHeading: 'Jasa Pembuatan Website Sekolah & Lembaga Pendidikan',
    heroSubheading:
      'Website resmi untuk sekolah, kampus, dan lembaga kursus. Menampilkan profil, berita, agenda, galeri kegiatan, hingga PPDB online yang memudahkan calon siswa dan orang tua.',
    shortAnswer:
      'Website sekolah adalah situs resmi lembaga pendidikan yang menampilkan profil, berita, agenda akademik, galeri, dan informasi penerimaan siswa baru. OOS SHOP membuat website sekolah yang modern, mobile responsive, dan mudah dikelola guru/admin, serta bisa dilengkapi fitur PPDB online agar pendaftaran lebih praktis.',
    priceNote: 'Harga terjangkau untuk institusi',
    timelineNote: 'Pengerjaan menyesuaikan konten',
    benefits: [
      {
        title: 'Profil & Berita Sekolah',
        description:
          'Halaman profil, visi misi, berita, dan agenda yang mudah diperbarui oleh admin sekolah.',
      },
      {
        title: 'PPDB Online',
        description:
          'Formulir penerimaan siswa baru online agar pendaftaran lebih cepat dan tertata rapi.',
      },
      {
        title: 'Galeri & Prestasi',
        description:
          'Tampilkan dokumentasi kegiatan dan prestasi untuk membangun citra sekolah.',
      },
      {
        title: 'Mudah Dikelola Guru',
        description:
          'Dashboard sederhana sehingga guru atau operator bisa mengelola konten tanpa keahlian teknis.',
      },
    ],
    useCases: [
      'Sekolah negeri maupun swasta yang butuh situs resmi kredibel',
      'Kampus, pesantren, dan lembaga kursus yang ingin tampil profesional',
      'Sekolah yang ingin membuka PPDB online',
      'Institusi yang ingin mempublikasikan berita, agenda, dan prestasi',
    ],
    process: [
      {
        step: '1',
        title: 'Konsultasi Kebutuhan',
        description: 'Kami pelajari struktur informasi dan fitur yang dibutuhkan sekolah Anda.',
      },
      {
        step: '2',
        title: 'Desain & Pengembangan',
        description: 'Kami bangun halaman profil, berita, agenda, galeri, dan PPDB sesuai kebutuhan.',
      },
      {
        step: '3',
        title: 'Revisi & Penyempurnaan',
        description: 'Anda review hasilnya, kami sempurnakan hingga sesuai identitas sekolah.',
      },
      {
        step: '4',
        title: 'Online & Pelatihan Admin',
        description: 'Website dionlinekan beserta panduan singkat pengelolaan untuk operator.',
      },
    ],
    faqs: [
      {
        question: 'Apakah bisa ada fitur PPDB online?',
        answer:
          'Bisa. Kami dapat menambahkan formulir Penerimaan Peserta Didik Baru (PPDB) online lengkap dengan pengelolaan data pendaftar sehingga proses lebih praktis dan tertata.',
      },
      {
        question: 'Apakah guru bisa memperbarui berita sendiri?',
        answer:
          'Ya. Website dibangun dengan dashboard yang mudah dipakai, sehingga guru atau operator dapat menambah berita, agenda, dan galeri tanpa keahlian teknis.',
      },
      {
        question: 'Apakah cocok untuk kampus atau lembaga kursus?',
        answer:
          'Sangat cocok. Struktur website dapat disesuaikan untuk kampus, pesantren, maupun lembaga kursus, termasuk halaman program, pengajar, dan pendaftaran.',
      },
    ],
  },
  {
    slug: 'jasa-pembuatan-website-travel',
    icon: 'Plane',
    menuLabel: 'Website Travel',
    menuDescription: 'Agen travel, tour, tiket, & paket wisata',
    seoTitle: 'Jasa Pembuatan Website Travel & Tour Agen Wisata | OOS SHOP',
    seoDescription:
      'Jasa pembuatan website travel dan tour untuk agen wisata. Tampilkan paket wisata, destinasi, harga, dan booking online. Desain menarik, mobile responsive, SEO friendly. Konsultasi gratis via WhatsApp.',
    keywords: [
      'jasa pembuatan website travel',
      'jasa bikin website tour and travel',
      'website agen travel',
      'website paket wisata',
      'website tour murah',
    ],
    heroBadge: 'Website Travel',
    heroHeading: 'Jasa Pembuatan Website Travel & Tour',
    heroSubheading:
      'Website menarik untuk agen travel dan tour. Tampilkan paket wisata, destinasi, dan harga secara profesional, lengkap dengan pemesanan online lewat form atau WhatsApp.',
    shortAnswer:
      'Website travel adalah situs untuk agen perjalanan dan tour yang menampilkan paket wisata, destinasi, harga, dan opsi pemesanan online. OOS SHOP membuat website travel dengan desain visual menarik, mobile responsive, dan SEO friendly agar paket wisata Anda mudah ditemukan calon pelanggan.',
    priceNote: 'Harga terjangkau, skalabel',
    timelineNote: 'Pengerjaan menyesuaikan jumlah paket',
    benefits: [
      {
        title: 'Katalog Paket Wisata',
        description:
          'Tampilkan paket tour lengkap dengan itinerary, harga, dan foto destinasi yang menggugah.',
      },
      {
        title: 'Booking & WhatsApp',
        description:
          'Pemesanan mudah lewat form atau tombol WhatsApp langsung dari halaman paket.',
      },
      {
        title: 'Desain Visual Menarik',
        description:
          'Tampilan yang mengutamakan foto destinasi untuk mendorong keinginan berwisata.',
      },
      {
        title: 'SEO Friendly',
        description:
          'Dioptimalkan agar paket wisata Anda muncul saat calon pelanggan mencari di Google.',
      },
    ],
    useCases: [
      'Agen travel yang ingin memasarkan paket tour secara online',
      'Open trip dan operator wisata lokal yang butuh katalog profesional',
      'Penyedia tiket dan paket umroh/haji yang ingin tampil kredibel',
      'Bisnis wisata yang ingin menerima pemesanan lewat website',
    ],
    process: [
      {
        step: '1',
        title: 'Konsultasi Paket',
        description: 'Kami pelajari jenis paket wisata dan cara pemesanan yang Anda inginkan.',
      },
      {
        step: '2',
        title: 'Desain & Katalog',
        description: 'Kami bangun halaman paket, destinasi, dan galeri yang menarik.',
      },
      {
        step: '3',
        title: 'Integrasi Booking',
        description: 'Kami hubungkan form pemesanan dan tombol WhatsApp pada tiap paket.',
      },
      {
        step: '4',
        title: 'Online & Serah Terima',
        description: 'Website dionlinekan beserta panduan mengelola paket dan konten.',
      },
    ],
    faqs: [
      {
        question: 'Apakah pelanggan bisa memesan langsung dari website?',
        answer:
          'Bisa. Kami menyediakan form pemesanan dan tombol WhatsApp pada setiap paket sehingga pelanggan dapat langsung menghubungi Anda untuk booking.',
      },
      {
        question: 'Apakah saya bisa menambah paket wisata sendiri?',
        answer:
          'Ya. Anda mendapat dashboard untuk menambah, mengubah, dan menghapus paket wisata beserta harga dan foto kapan saja.',
      },
      {
        question: 'Apakah cocok untuk agen umroh dan haji?',
        answer:
          'Cocok. Struktur website bisa disesuaikan untuk menampilkan paket umroh dan haji lengkap dengan jadwal, fasilitas, dan pendaftaran.',
      },
    ],
  },
  {
    slug: 'jasa-pembuatan-website-klinik',
    icon: 'HeartPulse',
    menuLabel: 'Website Klinik',
    menuDescription: 'Klinik, praktik dokter, & fasilitas kesehatan',
    seoTitle: 'Jasa Pembuatan Website Klinik & Praktik Dokter | OOS SHOP',
    seoDescription:
      'Jasa pembuatan website klinik, praktik dokter, dan fasilitas kesehatan. Info layanan, jadwal dokter, dan reservasi online. Desain bersih, mobile responsive, mudah dikelola. Konsultasi gratis.',
    keywords: [
      'jasa pembuatan website klinik',
      'website praktik dokter',
      'website klinik kecantikan',
      'website reservasi klinik online',
      'jasa bikin website kesehatan',
    ],
    heroBadge: 'Website Klinik',
    heroHeading: 'Jasa Pembuatan Website Klinik & Praktik Dokter',
    heroSubheading:
      'Website profesional untuk klinik, praktik dokter, dan fasilitas kesehatan. Tampilkan layanan, jadwal dokter, dan reservasi online yang memudahkan pasien.',
    shortAnswer:
      'Website klinik adalah situs untuk fasilitas kesehatan yang menampilkan layanan, jadwal dokter, informasi, dan reservasi online. OOS SHOP membuat website klinik dengan desain bersih dan terpercaya, mobile responsive, serta bisa dilengkapi fitur booking janji temu agar pasien lebih mudah melakukan reservasi.',
    priceNote: 'Harga terjangkau, profesional',
    timelineNote: 'Pengerjaan cepat',
    benefits: [
      {
        title: 'Info Layanan & Dokter',
        description:
          'Tampilkan daftar layanan, jadwal praktik, dan profil dokter secara jelas dan terpercaya.',
      },
      {
        title: 'Reservasi Online',
        description:
          'Fitur booking janji temu online agar pasien tidak perlu antre dan klinik lebih tertata.',
      },
      {
        title: 'Desain Bersih & Terpercaya',
        description:
          'Tampilan profesional yang menumbuhkan rasa percaya pasien terhadap layanan Anda.',
      },
      {
        title: 'Mobile Responsive',
        description:
          'Mudah diakses pasien dari HP untuk mencari info dan melakukan reservasi.',
      },
    ],
    useCases: [
      'Klinik umum, gigi, atau kecantikan yang ingin tampil profesional',
      'Praktik dokter mandiri yang butuh situs resmi dan reservasi',
      'Laboratorium dan fasilitas kesehatan yang ingin info layanan online',
      'Klinik yang ingin mengurangi antrean dengan booking online',
    ],
    process: [
      {
        step: '1',
        title: 'Konsultasi Layanan',
        description: 'Kami pelajari layanan, jadwal dokter, dan kebutuhan reservasi Anda.',
      },
      {
        step: '2',
        title: 'Desain & Pengembangan',
        description: 'Kami bangun halaman layanan, dokter, dan sistem booking yang dibutuhkan.',
      },
      {
        step: '3',
        title: 'Revisi & Penyempurnaan',
        description: 'Anda review hasilnya, kami sempurnakan hingga sesuai kebutuhan klinik.',
      },
      {
        step: '4',
        title: 'Online & Serah Terima',
        description: 'Website dionlinekan beserta panduan pengelolaan untuk staf.',
      },
    ],
    faqs: [
      {
        question: 'Apakah bisa ada fitur reservasi/booking online?',
        answer:
          'Bisa. Kami dapat menambahkan fitur reservasi janji temu online lengkap dengan pemilihan layanan dan jadwal dokter agar pasien lebih mudah dan klinik lebih tertata.',
      },
      {
        question: 'Apakah jadwal dokter bisa diperbarui sendiri?',
        answer:
          'Ya. Anda dapat memperbarui jadwal praktik dokter dan informasi layanan melalui dashboard yang mudah digunakan.',
      },
      {
        question: 'Apakah cocok untuk klinik kecantikan?',
        answer:
          'Sangat cocok. Desain dapat disesuaikan untuk klinik kecantikan, lengkap dengan galeri layanan dan before-after jika diperlukan.',
      },
    ],
  },
  {
    slug: 'jasa-pembuatan-website-booking',
    icon: 'CalendarDays',
    menuLabel: 'Website Booking',
    menuDescription: 'Sistem reservasi & booking online otomatis',
    seoTitle: 'Jasa Pembuatan Website Booking & Reservasi Online | OOS SHOP',
    seoDescription:
      'Jasa pembuatan website booking dan reservasi online untuk jasa, sewa, dan janji temu. Kalender ketersediaan, konfirmasi otomatis, dan pembayaran. Mobile responsive, mudah dikelola. Konsultasi gratis.',
    keywords: [
      'jasa pembuatan website booking',
      'website reservasi online',
      'sistem booking online',
      'website booking jadwal',
      'jasa bikin website reservasi',
    ],
    heroBadge: 'Website Booking',
    heroHeading: 'Jasa Pembuatan Website Booking & Reservasi Online',
    heroSubheading:
      'Sistem reservasi online untuk bisnis jasa, sewa, dan janji temu. Pelanggan bisa memilih jadwal dan memesan sendiri, lengkap dengan konfirmasi otomatis.',
    shortAnswer:
      'Website booking adalah sistem reservasi online yang memungkinkan pelanggan memilih jadwal, memesan, dan mendapat konfirmasi otomatis. OOS SHOP membuat website booking dengan kalender ketersediaan, notifikasi otomatis, dan opsi pembayaran, cocok untuk bisnis jasa, sewa, maupun janji temu.',
    priceNote: 'Harga terjangkau, sesuai fitur',
    timelineNote: 'Pengerjaan menyesuaikan kompleksitas',
    benefits: [
      {
        title: 'Kalender Ketersediaan',
        description:
          'Pelanggan melihat slot yang tersedia dan memesan tanpa perlu bolak-balik chat.',
      },
      {
        title: 'Konfirmasi Otomatis',
        description:
          'Notifikasi otomatis via email/WhatsApp untuk mengurangi pekerjaan manual Anda.',
      },
      {
        title: 'Integrasi Pembayaran',
        description:
          'Opsi DP atau pembayaran penuh online agar reservasi lebih pasti.',
      },
      {
        title: 'Kelola Jadwal Terpusat',
        description:
          'Semua reservasi masuk ke satu dashboard yang mudah Anda pantau.',
      },
    ],
    useCases: [
      'Jasa perawatan, salon, barbershop, dan studio yang butuh reservasi',
      'Rental kendaraan, alat, atau tempat dengan jadwal ketersediaan',
      'Konsultan dan praktisi yang menerima janji temu',
      'Lapangan olahraga, coworking, dan venue yang disewakan',
    ],
    process: [
      {
        step: '1',
        title: 'Konsultasi Alur Booking',
        description: 'Kami pelajari layanan, slot waktu, dan aturan reservasi bisnis Anda.',
      },
      {
        step: '2',
        title: 'Bangun Sistem',
        description: 'Kami siapkan kalender, form booking, dan notifikasi otomatis.',
      },
      {
        step: '3',
        title: 'Integrasi Pembayaran',
        description: 'Kami hubungkan opsi DP atau pembayaran penuh sesuai kebutuhan.',
      },
      {
        step: '4',
        title: 'Online & Panduan',
        description: 'Sistem dionlinekan beserta panduan mengelola jadwal dan reservasi.',
      },
    ],
    faqs: [
      {
        question: 'Apakah pelanggan bisa memilih jadwal sendiri?',
        answer:
          'Bisa. Sistem menampilkan slot ketersediaan sehingga pelanggan dapat memilih tanggal dan waktu yang kosong lalu memesan secara mandiri.',
      },
      {
        question: 'Apakah ada konfirmasi otomatis?',
        answer:
          'Ya. Setelah reservasi, sistem dapat mengirim konfirmasi otomatis via email atau WhatsApp, sehingga mengurangi pekerjaan manual Anda.',
      },
      {
        question: 'Apakah bisa menerima pembayaran DP online?',
        answer:
          'Bisa. Kami dapat mengintegrasikan pembayaran DP atau pembayaran penuh online agar reservasi lebih pasti dan mengurangi no-show.',
      },
    ],
  },
  {
    slug: 'jasa-pembuatan-website-hotel',
    icon: 'Hotel',
    menuLabel: 'Website Hotel',
    menuDescription: 'Hotel, villa, guest house, & penginapan',
    seoTitle: 'Jasa Pembuatan Website Hotel, Villa & Penginapan | OOS SHOP',
    seoDescription:
      'Jasa pembuatan website hotel, villa, dan penginapan dengan booking kamar online. Tampilkan tipe kamar, fasilitas, harga, dan ketersediaan. Desain elegan, mobile responsive. Konsultasi gratis.',
    keywords: [
      'jasa pembuatan website hotel',
      'website booking hotel',
      'website villa dan penginapan',
      'website reservasi kamar online',
      'jasa bikin website guest house',
    ],
    heroBadge: 'Website Hotel',
    heroHeading: 'Jasa Pembuatan Website Hotel & Penginapan',
    heroSubheading:
      'Website elegan untuk hotel, villa, dan guest house dengan booking kamar online. Tampilkan tipe kamar, fasilitas, dan harga, plus reservasi langsung tanpa komisi OTA.',
    shortAnswer:
      'Website hotel adalah situs penginapan yang menampilkan tipe kamar, fasilitas, harga, dan ketersediaan dengan booking online langsung. OOS SHOP membuat website hotel yang elegan dan mobile responsive, memungkinkan tamu memesan langsung tanpa komisi OTA sehingga margin Anda lebih besar.',
    priceNote: 'Harga terjangkau, tanpa komisi OTA',
    timelineNote: 'Pengerjaan menyesuaikan jumlah kamar',
    benefits: [
      {
        title: 'Booking Kamar Online',
        description:
          'Tamu memesan langsung dari website Anda, mengurangi ketergantungan pada OTA berkomisi tinggi.',
      },
      {
        title: 'Tipe Kamar & Fasilitas',
        description:
          'Tampilkan setiap tipe kamar dengan foto, fasilitas, dan harga secara menarik.',
      },
      {
        title: 'Cek Ketersediaan',
        description:
          'Kalender ketersediaan agar tamu tahu kamar kosong pada tanggal yang dipilih.',
      },
      {
        title: 'Desain Elegan',
        description:
          'Tampilan mewah yang mencerminkan kualitas penginapan Anda.',
      },
    ],
    useCases: [
      'Hotel dan resort yang ingin menerima booking langsung tanpa komisi OTA',
      'Villa dan guest house yang butuh situs profesional',
      'Homestay dan penginapan lokal yang ingin tampil kredibel',
      'Properti sewa harian yang ingin mengelola reservasi sendiri',
    ],
    process: [
      {
        step: '1',
        title: 'Konsultasi Kamar & Harga',
        description: 'Kami pelajari tipe kamar, fasilitas, dan aturan reservasi Anda.',
      },
      {
        step: '2',
        title: 'Desain & Katalog Kamar',
        description: 'Kami bangun halaman kamar, galeri, dan sistem cek ketersediaan.',
      },
      {
        step: '3',
        title: 'Integrasi Booking',
        description: 'Kami siapkan booking online dan opsi pembayaran DP atau penuh.',
      },
      {
        step: '4',
        title: 'Online & Serah Terima',
        description: 'Website dionlinekan beserta panduan mengelola kamar dan reservasi.',
      },
    ],
    faqs: [
      {
        question: 'Apakah tamu bisa booking kamar langsung dari website?',
        answer:
          'Bisa. Kami menyediakan sistem booking kamar online dengan cek ketersediaan, sehingga tamu dapat memesan langsung tanpa perantara OTA yang mengenakan komisi.',
      },
      {
        question: 'Apakah bisa mengelola beberapa tipe kamar?',
        answer:
          'Ya. Anda dapat menambah beberapa tipe kamar lengkap dengan foto, fasilitas, harga, dan jumlah ketersediaan melalui dashboard.',
      },
      {
        question: 'Apakah bisa menerima pembayaran DP?',
        answer:
          'Bisa. Kami dapat mengintegrasikan pembayaran DP atau penuh secara online agar reservasi lebih pasti.',
      },
    ],
  },
  {
    slug: 'jasa-pembuatan-website-properti',
    icon: 'House',
    menuLabel: 'Website Properti',
    menuDescription: 'Listing properti, agen, & developer real estate',
    seoTitle: 'Jasa Pembuatan Website Properti & Real Estate | OOS SHOP',
    seoDescription:
      'Jasa pembuatan website properti dan real estate dengan listing rumah, tanah, dan apartemen. Filter pencarian, detail properti, dan kontak agen. SEO friendly, mobile responsive. Konsultasi gratis.',
    keywords: [
      'jasa pembuatan website properti',
      'website listing properti',
      'website real estate',
      'website agen properti',
      'jasa bikin website jual rumah',
    ],
    heroBadge: 'Website Properti',
    heroHeading: 'Jasa Pembuatan Website Properti & Real Estate',
    heroSubheading:
      'Website listing untuk agen dan developer properti. Tampilkan rumah, tanah, dan apartemen dengan filter pencarian lengkap dan detail yang membantu calon pembeli memutuskan.',
    shortAnswer:
      'Website properti adalah situs listing real estate yang menampilkan rumah, tanah, atau apartemen lengkap dengan filter pencarian, detail, dan kontak agen. OOS SHOP membuat website properti yang SEO friendly dan mobile responsive, dengan pencarian berdasarkan lokasi, harga, dan tipe agar calon pembeli mudah menemukan properti.',
    priceNote: 'Harga terjangkau, skalabel',
    timelineNote: 'Pengerjaan menyesuaikan fitur',
    benefits: [
      {
        title: 'Listing & Filter Pencarian',
        description:
          'Pencarian properti berdasarkan lokasi, harga, tipe, dan luas agar calon pembeli cepat menemukan.',
      },
      {
        title: 'Detail Properti Lengkap',
        description:
          'Halaman detail dengan galeri foto, spesifikasi, peta lokasi, dan kontak agen.',
      },
      {
        title: 'Kelola Listing Mandiri',
        description:
          'Tambah dan perbarui listing properti sendiri kapan saja lewat dashboard.',
      },
      {
        title: 'SEO Friendly',
        description:
          'Dioptimalkan agar listing Anda muncul saat calon pembeli mencari properti di Google.',
      },
    ],
    useCases: [
      'Agen properti yang ingin memasarkan listing secara profesional',
      'Developer perumahan yang ingin menampilkan proyek dan unit',
      'Marketing properti yang butuh katalog dengan filter pencarian',
      'Bisnis sewa rumah, kost, atau ruko yang ingin listing online',
    ],
    process: [
      {
        step: '1',
        title: 'Konsultasi Listing',
        description: 'Kami pelajari jenis properti dan kriteria pencarian yang dibutuhkan.',
      },
      {
        step: '2',
        title: 'Bangun Sistem Listing',
        description: 'Kami siapkan listing, filter pencarian, dan halaman detail properti.',
      },
      {
        step: '3',
        title: 'Integrasi Kontak & Peta',
        description: 'Kami hubungkan kontak agen, WhatsApp, dan peta lokasi pada tiap properti.',
      },
      {
        step: '4',
        title: 'Online & Panduan',
        description: 'Website dionlinekan beserta panduan mengelola listing.',
      },
    ],
    faqs: [
      {
        question: 'Apakah ada filter pencarian properti?',
        answer:
          'Ya. Kami membangun filter pencarian berdasarkan lokasi, harga, tipe, dan luas sehingga calon pembeli dapat menemukan properti yang sesuai dengan cepat.',
      },
      {
        question: 'Apakah saya bisa menambah listing sendiri?',
        answer:
          'Bisa. Anda mendapat dashboard untuk menambah, mengubah, dan menghapus listing properti lengkap dengan foto dan spesifikasi kapan saja.',
      },
      {
        question: 'Apakah cocok untuk developer perumahan?',
        answer:
          'Sangat cocok. Website dapat menampilkan proyek perumahan beserta tipe unit, harga, denah, dan progres pembangunan.',
      },
    ],
  },
  {
    slug: 'jasa-pembuatan-dashboard-admin',
    icon: 'LayoutDashboard',
    menuLabel: 'Dashboard Admin',
    menuDescription: 'Panel admin & sistem manajemen data internal',
    seoTitle: 'Jasa Pembuatan Dashboard Admin & Aplikasi Web Internal | OOS SHOP',
    seoDescription:
      'Jasa pembuatan dashboard admin dan aplikasi web internal untuk mengelola data bisnis. Manajemen user, laporan, dan alur kerja custom sesuai kebutuhan operasional. Aman & skalabel. Konsultasi gratis.',
    keywords: [
      'jasa pembuatan dashboard admin',
      'jasa bikin aplikasi web internal',
      'dashboard admin custom',
      'sistem manajemen data',
      'jasa pembuatan panel admin',
    ],
    heroBadge: 'Dashboard Admin',
    heroHeading: 'Jasa Pembuatan Dashboard Admin & Aplikasi Web Internal',
    heroSubheading:
      'Panel admin custom untuk mengelola data dan operasional bisnis Anda. Manajemen user, laporan, dan alur kerja yang dirancang sesuai kebutuhan, aman, dan siap berkembang.',
    shortAnswer:
      'Dashboard admin adalah aplikasi web internal untuk mengelola data, pengguna, dan operasional bisnis secara terpusat. OOS SHOP membuat dashboard admin custom dengan manajemen hak akses, laporan, dan fitur sesuai alur kerja Anda, dibangun dengan aman dan mudah dikembangkan seiring pertumbuhan bisnis.',
    priceNote: 'Harga sesuai kompleksitas fitur',
    timelineNote: 'Pengerjaan menyesuaikan kebutuhan',
    benefits: [
      {
        title: 'Manajemen Data Terpusat',
        description:
          'Kelola seluruh data operasional dari satu panel yang rapi dan mudah dipakai.',
      },
      {
        title: 'Hak Akses Pengguna',
        description:
          'Atur peran dan izin tiap staf agar data sensitif tetap aman dan terkontrol.',
      },
      {
        title: 'Laporan & Statistik',
        description:
          'Ringkasan data dan laporan yang membantu Anda mengambil keputusan cepat.',
      },
      {
        title: 'Custom & Skalabel',
        description:
          'Fitur dirancang mengikuti alur kerja Anda dan siap dikembangkan ke depan.',
      },
    ],
    useCases: [
      'Bisnis yang ingin menggantikan pencatatan manual dengan sistem terpusat',
      'Perusahaan yang butuh panel pengelolaan data dengan hak akses staf',
      'Tim operasional yang memerlukan laporan dan monitoring real time',
      'Startup yang butuh backend/admin untuk produk digitalnya',
    ],
    process: [
      {
        step: '1',
        title: 'Analisis Kebutuhan',
        description: 'Kami pelajari alur kerja dan data yang perlu dikelola dalam dashboard.',
      },
      {
        step: '2',
        title: 'Rancang Sistem',
        description: 'Kami desain struktur data, hak akses, dan tampilan panel admin.',
      },
      {
        step: '3',
        title: 'Pengembangan & Uji Coba',
        description: 'Kami bangun fitur lalu uji coba bersama Anda untuk memastikan sesuai.',
      },
      {
        step: '4',
        title: 'Online & Pelatihan',
        description: 'Sistem dionlinekan beserta pelatihan penggunaan untuk tim Anda.',
      },
    ],
    faqs: [
      {
        question: 'Apakah dashboard bisa disesuaikan dengan alur kerja saya?',
        answer:
          'Ya. Dashboard dibangun custom mengikuti alur kerja dan kebutuhan data bisnis Anda, bukan template kaku, sehingga benar-benar sesuai operasional.',
      },
      {
        question: 'Apakah bisa mengatur hak akses tiap staf?',
        answer:
          'Bisa. Kami menyediakan manajemen peran dan izin sehingga tiap staf hanya bisa mengakses data dan fitur sesuai wewenangnya.',
      },
      {
        question: 'Apakah sistem aman dan bisa dikembangkan?',
        answer:
          'Kami membangun dengan praktik keamanan yang baik dan struktur yang skalabel, sehingga sistem aman dan mudah ditambah fitur seiring pertumbuhan bisnis.',
      },
    ],
  },
  {
    slug: 'jasa-pembuatan-sistem-inventory',
    icon: 'Package',
    menuLabel: 'Sistem Inventory',
    menuDescription: 'Manajemen stok, gudang, & keluar-masuk barang',
    seoTitle: 'Jasa Pembuatan Sistem Inventory & Manajemen Stok | OOS SHOP',
    seoDescription:
      'Jasa pembuatan sistem inventory dan manajemen stok barang. Pantau stok real time, keluar-masuk barang, multi gudang, dan laporan. Custom sesuai bisnis, aman & skalabel. Konsultasi gratis via WhatsApp.',
    keywords: [
      'jasa pembuatan sistem inventory',
      'aplikasi manajemen stok',
      'sistem stok barang',
      'aplikasi gudang custom',
      'jasa bikin sistem inventaris',
    ],
    heroBadge: 'Sistem Inventory',
    heroHeading: 'Jasa Pembuatan Sistem Inventory & Manajemen Stok',
    heroSubheading:
      'Kelola stok barang secara akurat dan real time. Pantau keluar-masuk barang, multi gudang, dan laporan stok dalam satu sistem yang dirancang sesuai bisnis Anda.',
    shortAnswer:
      'Sistem inventory adalah aplikasi untuk memantau dan mengelola stok barang, keluar-masuk barang, dan gudang secara real time. OOS SHOP membuat sistem inventory custom dengan pencatatan stok akurat, dukungan multi gudang, dan laporan, sehingga Anda terhindar dari kehabisan atau kelebihan stok.',
    priceNote: 'Harga sesuai kompleksitas fitur',
    timelineNote: 'Pengerjaan menyesuaikan kebutuhan',
    benefits: [
      {
        title: 'Stok Real Time',
        description:
          'Pantau jumlah stok secara akurat dan real time untuk menghindari kehabisan barang.',
      },
      {
        title: 'Keluar-Masuk Barang',
        description:
          'Catat setiap transaksi masuk dan keluar barang secara rapi dan tertelusur.',
      },
      {
        title: 'Multi Gudang',
        description:
          'Kelola stok di beberapa gudang atau cabang dalam satu sistem terpusat.',
      },
      {
        title: 'Laporan Stok',
        description:
          'Laporan stok dan pergerakan barang untuk membantu pengambilan keputusan.',
      },
    ],
    useCases: [
      'Toko dan distributor yang ingin stok tercatat akurat',
      'Bisnis dengan beberapa gudang atau cabang',
      'Produsen yang perlu memantau bahan baku dan barang jadi',
      'Bisnis yang ingin menggantikan pencatatan stok manual di Excel',
    ],
    process: [
      {
        step: '1',
        title: 'Analisis Kebutuhan',
        description: 'Kami pelajari alur stok, gudang, dan laporan yang Anda butuhkan.',
      },
      {
        step: '2',
        title: 'Rancang Sistem',
        description: 'Kami desain struktur data barang, gudang, dan transaksi.',
      },
      {
        step: '3',
        title: 'Pengembangan & Uji Coba',
        description: 'Kami bangun fitur lalu uji coba bersama Anda untuk memastikan akurat.',
      },
      {
        step: '4',
        title: 'Online & Pelatihan',
        description: 'Sistem dionlinekan beserta pelatihan penggunaan untuk tim gudang.',
      },
    ],
    faqs: [
      {
        question: 'Apakah sistem bisa memantau stok secara real time?',
        answer:
          'Ya. Setiap transaksi keluar-masuk barang langsung memperbarui jumlah stok, sehingga Anda selalu melihat data stok terkini dan akurat.',
      },
      {
        question: 'Apakah mendukung banyak gudang atau cabang?',
        answer:
          'Bisa. Sistem dapat dirancang untuk mengelola stok di beberapa gudang atau cabang sekaligus dalam satu dashboard terpusat.',
      },
      {
        question: 'Apakah bisa terhubung dengan sistem penjualan?',
        answer:
          'Bisa. Sistem inventory dapat diintegrasikan dengan sistem penjualan atau kasir agar stok otomatis berkurang saat terjadi transaksi.',
      },
    ],
  },
  {
    slug: 'jasa-pembuatan-crm-erp',
    icon: 'Users',
    menuLabel: 'CRM & ERP',
    menuDescription: 'Sistem manajemen pelanggan & operasional bisnis',
    seoTitle: 'Jasa Pembuatan Sistem CRM & ERP Custom untuk Bisnis | OOS SHOP',
    seoDescription:
      'Jasa pembuatan sistem CRM dan ERP custom untuk mengelola pelanggan, penjualan, dan operasional bisnis dalam satu platform. Dirancang sesuai proses bisnis Anda, aman & skalabel. Konsultasi gratis.',
    keywords: [
      'jasa pembuatan crm',
      'jasa pembuatan erp',
      'sistem crm custom',
      'aplikasi erp bisnis',
      'jasa bikin sistem manajemen bisnis',
    ],
    heroBadge: 'CRM & ERP',
    heroHeading: 'Jasa Pembuatan Sistem CRM & ERP Custom',
    heroSubheading:
      'Satukan pengelolaan pelanggan, penjualan, dan operasional dalam satu sistem. CRM & ERP custom yang dirancang mengikuti proses bisnis Anda agar tim lebih efisien dan data lebih rapi.',
    shortAnswer:
      'CRM & ERP adalah sistem untuk mengelola hubungan pelanggan (CRM) dan sumber daya serta operasional bisnis (ERP) dalam satu platform. OOS SHOP membuat sistem CRM/ERP custom sesuai proses bisnis Anda — mulai dari data pelanggan, penjualan, hingga operasional internal — yang aman, terintegrasi, dan mudah dikembangkan.',
    priceNote: 'Harga sesuai skala & fitur',
    timelineNote: 'Pengerjaan menyesuaikan kebutuhan',
    benefits: [
      {
        title: 'Manajemen Pelanggan',
        description:
          'Simpan dan kelola data pelanggan, riwayat interaksi, dan pipeline penjualan.',
      },
      {
        title: 'Operasional Terintegrasi',
        description:
          'Satukan proses penjualan, stok, dan keuangan agar data tidak tersebar.',
      },
      {
        title: 'Otomasi Alur Kerja',
        description:
          'Otomatiskan tugas berulang untuk menghemat waktu dan mengurangi kesalahan.',
      },
      {
        title: 'Custom & Skalabel',
        description:
          'Dirancang mengikuti proses bisnis Anda dan siap tumbuh bersama perusahaan.',
      },
    ],
    useCases: [
      'Perusahaan yang ingin menyatukan data pelanggan dan penjualan',
      'Tim sales yang butuh pipeline dan follow-up terstruktur',
      'Bisnis yang ingin mengintegrasikan operasional dalam satu sistem',
      'Perusahaan berkembang yang ingin lepas dari banyak file terpisah',
    ],
    process: [
      {
        step: '1',
        title: 'Analisis Proses Bisnis',
        description: 'Kami pelajari alur pelanggan, penjualan, dan operasional Anda secara detail.',
      },
      {
        step: '2',
        title: 'Rancang Modul',
        description: 'Kami desain modul CRM/ERP dan integrasi sesuai kebutuhan.',
      },
      {
        step: '3',
        title: 'Pengembangan & Uji Coba',
        description: 'Kami bangun sistem bertahap lalu uji coba bersama tim Anda.',
      },
      {
        step: '4',
        title: 'Online & Pelatihan',
        description: 'Sistem dionlinekan beserta pelatihan penggunaan menyeluruh untuk tim.',
      },
    ],
    faqs: [
      {
        question: 'Apa bedanya CRM dan ERP?',
        answer:
          'CRM fokus pada pengelolaan hubungan dan data pelanggan serta penjualan, sedangkan ERP mengelola sumber daya dan operasional bisnis seperti stok, pembelian, dan keuangan. Keduanya bisa dibangun terpisah atau terintegrasi sesuai kebutuhan Anda.',
      },
      {
        question: 'Apakah sistem dibuat sesuai proses bisnis saya?',
        answer:
          'Ya. Kami membangun CRM/ERP custom mengikuti proses bisnis Anda, bukan template kaku, sehingga sistem benar-benar mendukung cara kerja tim Anda.',
      },
      {
        question: 'Apakah bisa dikembangkan bertahap?',
        answer:
          'Bisa. Sistem dapat dibangun modul per modul sesuai prioritas dan anggaran, lalu dikembangkan bertahap seiring pertumbuhan bisnis.',
      },
    ],
  },
]

export function getWebsiteService(slug: string) {
  return websiteServices.find((s) => s.slug === slug)
}

export { default as faqs } from '@/public/data/faq.json'

import summaryData from '@/public/data/summary.json'

export const siteConfig = {
  name: summaryData.name,
  url: summaryData.url,
  description: summaryData.description,
  whatsapp: summaryData.contact.whatsappUrl,
}
