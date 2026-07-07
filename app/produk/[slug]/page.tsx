import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Eye,
  MessageCircle,
  RefreshCw,
  Shield,
  ShieldCheck,
  Star,
  Timer,
  Wallet,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { ProductJsonLd } from '@/components/product-json-ld'
import { siteConfig } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/products'

export type Review = {
  id: string
  product_id: string
  customer_name: string
  rating: number
  comment: string | null
  created_at: string
}

// ISR: on-demand revalidation via revalidatePath() in /api/revalidate handles
// instant cache refresh whenever admin edits this product. This interval is
// just a safety-net fallback (e.g. if that call fails/times out) — kept long
// since it's rarely the thing actually doing the invalidation.
export const revalidate = 3600

function isUUID(str: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)
}

async function getProduct(slug: string): Promise<Product | null> {
  if (isUUID(slug)) {
    const { data } = await supabase.from('products').select('*').eq('id', slug).single()
    return data as Product | null
  }
  const { data } = await supabase.from('products').select('*').eq('slug', slug).single()
  return data as Product | null
}

async function getRelatedProducts(product: Product): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', product.id)
    .limit(4)
  return (data as Product[]) || []
}

async function getReviews(productId: string): Promise<Review[]> {
  const { data } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
  return (data as Review[]) || []
}

function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

function getActivePrice(product: Product): number {
  if (
    product.flash_sale_price &&
    product.flash_sale_end &&
    new Date(product.flash_sale_end) >= new Date()
  ) {
    return product.flash_sale_price
  }
  return product.price
}

function isFlashSale(product: Product): boolean {
  return !!(
    product.flash_sale_price &&
    product.flash_sale_end &&
    new Date(product.flash_sale_end) >= new Date()
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Produk Tidak Ditemukan | OOS SHOP' }

  const title = product.meta_title || `${product.name} — ${product.category} WordPress Premium | OOS SHOP`
  const description =
    product.meta_description ||
    product.description ||
    `Beli ${product.name} original berlisensi di OOS SHOP. Harga ${formatIDR(product.price)}. Instal cepat, update otomatis.`

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/produk/${product.slug || slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'id_ID',
      siteName: 'OOS SHOP',
      url: `${siteConfig.url}/produk/${product.slug || slug}`,
      images: product.image_url ? [{ url: product.image_url, width: 800, height: 600 }] : [],
    },
  }
}

export default async function ProdukPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const [relatedProducts, reviews] = await Promise.all([
    getRelatedProducts(product),
    getReviews(product.id),
  ])

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0'

  const activePrice = getActivePrice(product)
  const onSale = isFlashSale(product)
  const waMessage = encodeURIComponent(
    `Halo OOS SHOP, saya ingin order:\n\nProduk: ${product.name}${onSale ? '\n⚡ FLASH SALE' : ''}\nHarga: ${formatIDR(activePrice)}\n\nMohon info lebih lanjut. Terima kasih!`,
  )
  const waLink = `${siteConfig.whatsapp}?text=${waMessage}`

  const genericIcons = [BadgeCheck, RefreshCw, Clock, MessageCircle, ShieldCheck, Shield]
  const features =
    product.features && product.features.length > 0
      ? product.features.map((f, i) => ({
          icon: genericIcons[i % genericIcons.length],
          text: f.title ? `${f.title} — ${f.desc || ''}` : f.desc || '',
        }))
      : [
          { icon: BadgeCheck, text: 'Lisensi 100% original dari developer' },
          { icon: RefreshCw, text: 'Update otomatis selama masa aktif' },
          { icon: Clock, text: 'Proses instalasi 5–15 menit' },
          { icon: MessageCircle, text: 'Support teknis via WhatsApp' },
          { icon: ShieldCheck, text: 'Kompatibel WordPress versi terbaru' },
          { icon: Shield, text: 'Bebas malware & backdoor' },
        ]

  const faqItems: { question: string; answer: string }[] =
    product.faq && product.faq.length > 0
      ? product.faq.map((item) => ({
          question: item.question || item.q || '',
          answer: item.answer || item.a || '',
        }))
      : [
          { question: `Apa itu ${product.name}?`, answer: product.description || product.name },
          {
            question: `Apakah ${product.name} original dan berlisensi?`,
            answer: `Ya, semua produk di OOS SHOP 100% original dengan lisensi resmi langsung dari developer.`,
          },
          {
            question: `Bagaimana proses instalasi ${product.name}?`,
            answer: `Setelah pembayaran dikonfirmasi, tim kami akan langsung menginstal ${product.name} di website Anda dalam 5-15 menit.`,
          },
          {
            question: `Apakah mendapatkan update otomatis?`,
            answer: `Ya, Anda akan mendapatkan update otomatis selama masa lisensi aktif.`,
          },
          {
            question: `Bagaimana jika ada masalah setelah instalasi?`,
            answer: `Kami menyediakan support via WhatsApp. Tim kami siap membantu menyelesaikan masalah Anda.`,
          },
        ]

  return (
    <>
      <ProductJsonLd
        product={product}
        activePrice={activePrice}
        reviews={reviews}
        avgRating={avgRating}
        faqItems={faqItems}
      />
      <SiteHeader />
      <main className="pb-16">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Beranda
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden />
              <li>
                <Link href="/katalog" className="transition-colors hover:text-foreground">
                  Katalog
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden />
              <li className="font-medium text-foreground" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* Main 2 Column Layout */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Column - Product Info */}
            <div className="min-w-0">
              {/* Product Image */}
              {product.image_url && (
                <div className="overflow-hidden rounded-2xl border border-border bg-accent/30">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={800}
                    height={600}
                    className="h-auto w-full"
                    sizes="(max-width: 768px) 100vw, 700px"
                    priority
                  />
                </div>
              )}

              {/* Product title + meta */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-2">
                  {product.category && (
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {product.category}
                    </span>
                  )}
                  {product.badge && (
                    <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-white">
                      {product.badge}
                    </span>
                  )}
                  {onSale && (
                    <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">
                      FLASH SALE
                    </span>
                  )}
                </div>

                <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  {product.name}
                  {product.version && (
                    <span className="ml-2 text-base font-normal text-muted-foreground">
                      v{product.version}
                    </span>
                  )}
                </h1>

                {/* Stats */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {reviews.length > 0 && (
                    <span className="flex items-center gap-1.5">
                      <span className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`size-3.5 ${
                              star <= Math.round(Number(avgRating))
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-muted-foreground/30'
                            }`}
                            aria-hidden
                          />
                        ))}
                      </span>
                      <span>
                        {Number(avgRating).toFixed(2)}{' '}
                        <span className="text-muted-foreground/70">
                          ({reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'})
                        </span>
                      </span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye className="size-4" aria-hidden />
                    {(product.views || 0).toLocaleString('id-ID')} Views
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="size-4" aria-hidden />
                    {(product.total_sold || 0).toLocaleString('id-ID')} Sold
                  </span>
                </div>
              </div>

              {/* Description */}
              {(product.long_description || product.description) && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold">Deskripsi</h2>
                  <div className="mt-2 space-y-3 leading-relaxed text-muted-foreground">
                    {product.long_description
                      ? product.long_description
                          .split('\n\n')
                          .filter(Boolean)
                          .map((paragraph, i) => <p key={i}>{paragraph}</p>)
                      : <p>{product.description}</p>}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold">Fitur Produk</h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {features.map((f) => (
                    <li
                      key={f.text}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card p-3"
                    >
                      <f.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                      <span className="text-sm text-foreground">{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cara Kerja */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold">Cara Kerja</h2>
                <ol className="mt-4 flex flex-col gap-4">
                  {[
                    { title: 'Order', desc: `Pilih ${product.name} dan lakukan pemesanan via WhatsApp atau keranjang.` },
                    { title: 'Konfirmasi', desc: 'Kami konfirmasi pesanan dan minta data akses WordPress yang diperlukan.' },
                    { title: 'Instalasi', desc: `Tim kami langsung menginstal dan mengaktivasi lisensi ${product.name} di website Anda.` },
                    { title: 'Selesai', desc: 'Instalasi selesai, Anda menerima konfirmasi dan bisa langsung menggunakan plugin.' },
                  ].map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold tracking-tight">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Warning: nulled/bajakan */}
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                    Hati-hati Plugin Nulled &amp; Bajakan
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-amber-700/90 dark:text-amber-300/80">
                    Banyak penjual murah menggunakan plugin nulled/bajakan yang berisiko malware,
                    backdoor, dan pencurian data — plus tidak bisa update resmi dari developer. Semua
                    produk di OOS SHOP 100% original dengan lisensi resmi, bukan hasil crack.
                  </p>
                </div>
              </div>

              {/* Reviews / Ulasan */}
              {reviews.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                      Ulasan Pembeli ({reviews.length})
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`size-4 ${
                              star <= Math.round(Number(avgRating))
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-muted-foreground/30'
                            }`}
                            aria-hidden
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold">{avgRating}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="rounded-xl border border-border bg-card p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {review.customer_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{review.customer_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(review.created_at).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`size-3.5 ${
                                  star <= review.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-muted-foreground/30'
                                }`}
                                aria-hidden
                              />
                            ))}
                          </div>
                        </div>
                        {review.comment && (
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* FAQ */}
              {faqItems.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-lg font-semibold">Pertanyaan Seputar {product.name}</h2>
                  <div className="mt-4 flex flex-col gap-3">
                    {faqItems.map((item) => (
                      <details
                        key={item.question}
                        className="group rounded-xl border border-border bg-card"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-left text-sm font-medium [&::-webkit-details-marker]:hidden">
                          {item.question}
                          <ChevronRight
                            className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                            aria-hidden
                          />
                        </summary>
                        <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sticky Purchase Card */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                {/* Price */}
                <div className="text-center">
                  {onSale && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatIDR(product.price)}
                    </span>
                  )}
                  {!onSale && product.original_price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatIDR(product.original_price)}
                    </span>
                  )}
                  <p className="text-3xl font-bold text-primary">{formatIDR(activePrice)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Sudah termasuk instalasi</p>
                </div>

                {/* Info Harga */}
                <div className="mt-5 grid grid-cols-1 gap-2.5 rounded-xl border border-border bg-accent/40 p-4">
                  <div className="flex items-center gap-2.5">
                    <Wallet className="size-4 shrink-0 text-primary" aria-hidden />
                    <div className="flex flex-1 items-center justify-between text-xs">
                      <span className="text-muted-foreground">Harga</span>
                      <span className="font-semibold text-foreground">{formatIDR(activePrice)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden />
                    <div className="flex flex-1 items-center justify-between text-xs">
                      <span className="text-muted-foreground">Garansi</span>
                      <span className="font-semibold text-foreground">Uang kembali 100%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Timer className="size-4 shrink-0 text-primary" aria-hidden />
                    <div className="flex flex-1 items-center justify-between text-xs">
                      <span className="text-muted-foreground">Estimasi Pengerjaan</span>
                      <span className="font-semibold text-foreground">5–15 menit</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    size="lg"
                    className="w-full"
                    nativeButton={false}
                    render={<a href={waLink} target="_blank" rel="noopener noreferrer" />}
                  >
                    <MessageCircle className="size-5" aria-hidden />
                    Pesan via WhatsApp
                  </Button>
                  <AddToCartButton
                    product={{
                      id: product.id,
                      name: product.name,
                      price: activePrice,
                      image_url: product.image_url,
                      category: product.category,
                    }}
                  />
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    nativeButton={false}
                    render={<Link href="/katalog" />}
                  >
                    <ArrowLeft className="size-4" aria-hidden />
                    Kembali ke Katalog
                  </Button>
                </div>

                {/* Trust badges */}
                <ul className="mt-6 flex flex-col gap-2 border-t border-border pt-4">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-primary" aria-hidden />
                    Lisensi original & resmi
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-primary" aria-hidden />
                    Instalasi cepat 5–15 menit
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-primary" aria-hidden />
                    Garansi uang kembali
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-primary" aria-hidden />
                    Support 30 hari via WhatsApp
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold tracking-tight">Produk Terkait</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((rp) => {
                  const rpPrice = getActivePrice(rp)
                  return (
                    <Link
                      key={rp.id}
                      href={`/produk/${rp.slug || rp.id}`}
                      className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
                    >
                      {rp.image_url && (
                        <div className="aspect-[4/3] overflow-hidden border-b border-border bg-accent/30">
                          <Image
                            src={rp.image_url}
                            alt={rp.name}
                            width={300}
                            height={225}
                            className="h-full w-full object-contain p-3"
                            sizes="(max-width: 640px) 50vw, 25vw"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="line-clamp-2 text-sm font-semibold group-hover:text-primary">
                          {rp.name}
                        </p>
                        <p className="mt-2 text-base font-bold text-primary">
                          {formatIDR(rpPrice)}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
