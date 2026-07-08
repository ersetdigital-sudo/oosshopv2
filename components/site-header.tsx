'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  HeartPulse,
  Home,
  Hotel,
  House,
  LayoutDashboard,
  LayoutGrid,
  Menu,
  MessageCircle,
  MousePointerClick,
  Package,
  Plane,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useCart } from '@/lib/cart-context'
import { websiteServices, siteConfig } from '@/lib/data'

// Icon map for dynamic rendering
const iconMap: Record<string, typeof Building2> = {
  Building2,
  MousePointerClick,
  ShoppingCart,
  GraduationCap,
  Plane,
  HeartPulse,
  CalendarDays,
  Hotel,
  House,
  LayoutDashboard,
  Package,
  Users,
}

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/#keamanan', label: 'Keunggulan' },
  { href: '/#layanan', label: 'Layanan', dropdown: true },
  { href: '/katalog', label: 'Katalog' },
  { href: '/#faq', label: 'FAQ' },
  {
    href: '/dashboard',
    label: 'Pesanan Saya',
  },
]

const serviceMenu = websiteServices.map((s) => ({
  href: `/layanan/${s.slug}`,
  label: s.menuLabel,
  description: s.menuDescription,
  icon: iconMap[s.icon] ?? Building2,
}))

// Group services into columns for mega menu
const serviceGroups = [
  {
    title: 'Website',
    items: serviceMenu.filter((_, i) => i < 4),
  },
  {
    title: 'Instansi & Organisasi',
    items: serviceMenu.filter((_, i) => i >= 4 && i < 7),
  },
  {
    title: 'Sistem & Aplikasi',
    items: serviceMenu.filter((_, i) => i >= 7),
  },
]

export function SiteHeader() {
  const [layananDrawerOpen, setLayananDrawerOpen] = useState(false)
  const [lainnyaOpen, setLainnyaOpen] = useState(false)
  const [desktopLayananOpen, setDesktopLayananOpen] = useState(false)
  const pathname = usePathname()
  const { totalItems, openCart } = useCart()

  // Lock body scroll when any mobile drawer/sheet is open
  useEffect(() => {
    if (layananDrawerOpen || lainnyaOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [layananDrawerOpen, lainnyaOpen])

  return (
    <>
      {/* ═══════════════════════════════════════════════ */}
      {/* DESKTOP NAVBAR (hidden on mobile) */}
      {/* ═══════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 hidden w-full border-b border-border bg-background/90 backdrop-blur-xl md:block">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" aria-label="OOS SHOP - Beranda">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              O
            </span>
            <span className="text-lg font-semibold tracking-tight">
              OOS <span className="text-primary">SHOP</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setDesktopLayananOpen(true)}
                  onMouseLeave={() => setDesktopLayananOpen(false)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                    <ChevronDown
                      className={`size-3.5 transition-transform ${desktopLayananOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </a>

                  {/* Mega dropdown */}
                  {desktopLayananOpen && (
                    <div className="absolute left-1/2 top-full z-50 w-[680px] -translate-x-1/2 pt-2">
                      <div className="rounded-2xl border border-border bg-popover p-6 shadow-2xl">
                        <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                          {serviceGroups.map((group) => (
                            <div key={group.title}>
                              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                {group.title}
                              </p>
                              <ul className="flex flex-col gap-0.5">
                                {group.items.map((item) => {
                                  const Icon = item.icon
                                  return (
                                    <li key={item.href}>
                                      <Link
                                        href={item.href}
                                        className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted"
                                        onClick={() => setDesktopLayananOpen(false)}
                                      >
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                                          <Icon className="size-4" aria-hidden />
                                        </span>
                                        <span className="flex flex-col">
                                          <span className="text-sm font-medium text-foreground">
                                            {item.label}
                                          </span>
                                          <span className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                                            {item.description}
                                          </span>
                                        </span>
                                      </Link>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <a
                          href={`${siteConfig.whatsapp}?text=${encodeURIComponent('Halo, saya ingin konsultasi pembuatan website')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 flex items-center justify-between rounded-xl border-t border-border px-3 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted"
                        >
                          Konsultasi Gratis
                          <ArrowRight className="size-4" aria-hidden />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <button
              type="button"
              onClick={openCart}
              className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Buka keranjang"
            >
              <ShoppingBag className="size-5" aria-hidden />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </button>
            <div className="mx-1 h-6 w-px bg-border" />
            <Button
              size="sm"
              nativeButton={false}
              render={<a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" />}
            >
              <MessageCircle className="size-4" aria-hidden />
              Hubungi Kami
            </Button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════ */}
      {/* MOBILE TOP BAR (visible on mobile only) */}
      {/* ═══════════════════════════════════════════════ */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2" aria-label="OOS SHOP - Beranda">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
              O
            </span>
            <span className="text-base font-semibold tracking-tight">
              OOS <span className="text-primary">SHOP</span>
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={openCart}
              className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Buka keranjang"
            >
              <ShoppingBag className="size-5" aria-hidden />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for mobile top bar */}
      <div className="h-14 md:hidden" aria-hidden />

      {/* ═══════════════════════════════════════════════ */}
      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {/* ═══════════════════════════════════════════════ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
        aria-label="Navigasi mobile"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex h-16 items-center justify-around px-2">
          {/* Beranda */}
          <Link
            href="/"
            className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 transition-colors ${
              pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Home className="size-5" aria-hidden />
            <span className="text-[10px] font-medium">Beranda</span>
          </Link>

          {/* Katalog */}
          <Link
            href="/katalog"
            className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 transition-colors ${
              pathname === '/katalog' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <LayoutGrid className="size-5" aria-hidden />
            <span className="text-[10px] font-medium">Katalog</span>
          </Link>

          {/* Layanan — opens drawer */}
          <button
            type="button"
            onClick={() => setLayananDrawerOpen(true)}
            className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 transition-colors ${
              pathname.startsWith('/layanan') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Zap className="size-5" aria-hidden />
            <span className="text-[10px] font-medium">Layanan</span>
          </button>

          {/* Pesanan */}
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 transition-colors ${
              pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <ClipboardList className="size-5" aria-hidden />
            <span className="text-[10px] font-medium">Pesanan</span>
          </Link>

          {/* Lainnya — opens bottom sheet */}
          <button
            type="button"
            onClick={() => setLainnyaOpen(true)}
            className="flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-muted-foreground transition-colors"
          >
            <Menu className="size-5" aria-hidden />
            <span className="text-[10px] font-medium">Lainnya</span>
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════ */}
      {/* MOBILE LAYANAN DRAWER (from right) */}
      {/* ═══════════════════════════════════════════════ */}
      {layananDrawerOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setLayananDrawerOpen(false)}
            aria-hidden
          />
          {/* Drawer panel */}
          <div className="absolute bottom-0 right-0 top-0 flex w-[300px] max-w-[85vw] animate-in slide-in-from-right duration-300 flex-col bg-background shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="text-base font-bold">Layanan</span>
              <button
                type="button"
                onClick={() => setLayananDrawerOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Tutup menu layanan"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {/* Services list */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-1">
                {serviceMenu.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                      onClick={() => setLayananDrawerOpen(false)}
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">{item.label}</span>
                        <span className="mt-0.5 text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-4">
              <a
                href={`${siteConfig.whatsapp}?text=${encodeURIComponent('Halo, saya ingin konsultasi pembuatan website')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/10 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                onClick={() => setLayananDrawerOpen(false)}
              >
                Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* MOBILE "LAINNYA" BOTTOM SHEET */}
      {/* ═══════════════════════════════════════════════ */}
      {lainnyaOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setLainnyaOpen(false)}
          aria-hidden
        />
      )}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[110] rounded-t-2xl border-t border-border bg-background shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          lainnyaOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Handle bar */}
        <div className="mx-auto mt-3 mb-4 h-1 w-10 rounded-full bg-muted-foreground/30" />

        <div className="px-5 pb-8">
          <Link
            href="/#keamanan"
            onClick={() => setLainnyaOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-muted"
          >
            <ShieldCheck className="size-5 text-muted-foreground" aria-hidden />
            <span className="text-sm font-medium">Keunggulan</span>
          </Link>
          <Link
            href="/#faq"
            onClick={() => setLainnyaOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-muted"
          >
            <MessageCircle className="size-5 text-muted-foreground" aria-hidden />
            <span className="text-sm font-medium">FAQ</span>
          </Link>
          <a
            href={`${siteConfig.whatsapp}?text=${encodeURIComponent('Halo, saya ingin bertanya')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setLainnyaOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-foreground transition-colors hover:bg-muted"
          >
            <MessageCircle className="size-5 text-muted-foreground" aria-hidden />
            <span className="text-sm font-medium">Hubungi Kami</span>
          </a>
        </div>
      </div>
    </>
  )
}
