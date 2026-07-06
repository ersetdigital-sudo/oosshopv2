import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  MessageCircle,
  RefreshCw,
  Shield,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/products'

export const dynamic = 'force-dynamic'

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

  const title = `${product.name} — ${product.category} WordPress Premium | OOS SHOP`
  const description =
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

  const relatedProducts = await getRelatedProducts(product)

  const activePrice = getActivePrice(product)
  const onSale = isFlashSale(product)
  const waMessage = encodeURIComponent(
    `Halo OOS SHOP, saya ingin order:\n\nProduk: ${product.name}${onSale ? '\n⚡ FLASH SALE' : ''}\nHarga: ${formatIDR(activePrice)}\n\nMohon info lebih lanjut. Terima kasih!`,
  )
  const waLink = `${siteConfig.whatsapp}?text=${waMessage}`

  const features = [
    { icon: BadgeCheck, text: 'Lisensi 100% original dari developer' },
    { icon: RefreshCw, text: 'Update otomatis selama masa aktif' },
    { icon: Clock, text: 'Proses instalasi 5–15 menit' },
    { icon: MessageCircle, text: 'Support teknis via WhatsApp' },
    { icon: ShieldCheck, text: 'Kompatibel WordPress versi terbaru' },
    { icon: Shield, text: 'Bebas malware & backdoor' },
  ]

  return (
    <>
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
                  {product.total_sold > 0 && (
                    <span className="flex items-center gap-1">
                      <Download className="size-4" aria-hidden />
                      {product.total_sold} terjual
                    </span>
                  )}
                  {product.views > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="size-4 text-amber-500" aria-hidden />
                      {product.views} dilihat
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold">Deskripsi</h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Features */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold">Yang Anda Dapatkan</h2>
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
