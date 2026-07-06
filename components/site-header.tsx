'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  ChevronDown,
  GraduationCap,
  HeartPulse,
  Menu,
  MessageCircle,
  MousePointerClick,
  Plane,
  ShoppingCart,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeSwitch } from '@/components/ui/theme-switch'
import { websiteServices, siteConfig } from '@/lib/data'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/#keamanan', label: 'Keunggulan' },
  { href: '/#layanan', label: 'Layanan', dropdown: true },
  { href: '/katalog', label: 'Katalog' },
  { href: '/#faq', label: 'FAQ' },
  {
    href: `${siteConfig.whatsapp}?text=${encodeURIComponent('Halo, saya ingin menanyakan status pesanan saya')}`,
    label: 'Pesanan Saya',
    external: true,
  },
]

const menuIcons: Record<string, typeof Building2> = {
  Building2,
  MousePointerClick,
  ShoppingCart,
  GraduationCap,
  Plane,
  HeartPulse,
}

const serviceMenu = websiteServices.map((s) => ({
  href: `/layanan/${s.slug}`,
  label: s.menuLabel,
  description: s.menuDescription,
  icon: menuIcons[s.icon] ?? Building2,
}))

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="OOS SHOP - Beranda">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            O
          </span>
          <span className="text-lg font-semibold tracking-tight">
            OOS <span className="text-primary">SHOP</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigasi utama">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.href} className="group relative">
                <a
                  href={link.href}
                  className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <ChevronDown
                    className="size-4 transition-transform group-hover:rotate-180"
                    aria-hidden
                  />
                </a>
                <div className="invisible absolute left-1/2 top-full z-50 w-[380px] -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="rounded-2xl border border-border bg-popover p-3 shadow-xl">
                    <p className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Jasa Pembuatan Website
                    </p>
                    <ul className="flex flex-col gap-1">
                      {serviceMenu.map((item) => {
                        const Icon = item.icon
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                            >
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                                <Icon className="size-5" aria-hidden />
                              </span>
                              <span className="flex flex-col">
                                <span className="text-sm font-medium text-foreground">
                                  {item.label}
                                </span>
                                <span className="mt-0.5 text-xs leading-snug text-muted-foreground">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                    <a
                      href={`${siteConfig.whatsapp}?text=${encodeURIComponent('Halo, saya ingin konsultasi pembuatan website')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center justify-between rounded-xl border-t border-border px-3 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted"
                    >
                      Konsultasi Gratis via WhatsApp
                      <ArrowRight className="size-4" aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeSwitch />
          <Link
            href="/katalog"
            className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
            aria-label="Lihat katalog plugin"
          >
            <ShoppingCart className="size-5" aria-hidden />
          </Link>
          <div className="hidden sm:block">
            <Button
              size="sm"
              nativeButton={false}
              render={<a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" />}
            >
              <MessageCircle className="size-4" aria-hidden />
              Hubungi Kami
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md text-foreground lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          {/* Drawer panel */}
          <nav
            className="absolute right-0 top-0 flex h-full w-[300px] max-w-[85vw] flex-col bg-background shadow-2xl animate-in slide-in-from-right duration-300"
            aria-label="Navigasi mobile"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <span className="text-sm font-semibold">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Tutup menu"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <li key={link.href}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-muted"
                        onClick={() => setServicesOpen((v) => !v)}
                        aria-expanded={servicesOpen}
                      >
                        {link.label}
                        <ChevronDown
                          className={`size-4 text-muted-foreground transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                          aria-hidden
                        />
                      </button>
                      {servicesOpen && (
                        <ul className="ml-2 mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
                          {serviceMenu.map((item) => {
                            const Icon = item.icon
                            return (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                                  onClick={() => setOpen(false)}
                                >
                                  <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                                  {item.label}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="block rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-muted"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Drawer footer */}
            <div className="border-t border-border px-4 py-4">
              <Button
                className="w-full"
                nativeButton={false}
                render={<a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" />}
              >
                <MessageCircle className="size-4" aria-hidden />
                Hubungi Kami
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
