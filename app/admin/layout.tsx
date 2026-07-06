'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  LogOut,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ThemeToggle } from '@/components/theme-toggle'
import type { Session } from '@supabase/supabase-js'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Produk', href: '/admin/produk', icon: Package },
  { label: 'Pesanan', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Setting', href: '/admin/settings', icon: Settings },
]

// Bottom nav shows only the 4 most important items on mobile
const mobileNavItems = navItems

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError(error.message)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center justify-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
                O
              </span>
              <span className="text-xl font-bold tracking-tight">
                OOS <span className="text-primary">SHOP</span>
              </span>
            </div>
            <h2 className="text-center text-xl font-bold">Selamat Datang</h2>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              Masuk ke Admin Panel
            </p>
            {loginError && (
              <div className="mb-4 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3">
                <p className="text-center text-sm text-destructive">{loginError}</p>
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Masuk
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                &larr; Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-border bg-card transition-transform duration-300 ease-in-out lg:z-40 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="border-b border-border p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground">
                  O
                </span>
                <div>
                  <span className="block text-sm font-bold leading-tight">OOS SHOP</span>
                  <span className="text-xs text-muted-foreground">Admin Panel</span>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="size-5" aria-hidden />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-border p-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="size-5" aria-hidden />
              Lihat Toko
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-5" aria-hidden />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex min-h-screen w-full flex-1 flex-col lg:ml-[260px]">
          <header className="sticky top-0 z-30 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl lg:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="-ml-2 rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
                >
                  <Menu className="size-5" aria-hidden />
                </button>
                <h1 className="text-sm font-semibold lg:text-base">
                  {navItems.find((item) => item.href === pathname)?.label || 'Admin'}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5">
                  <div className="size-1.5 animate-pulse rounded-full bg-green-500" />
                  <span className="hidden text-[11px] font-medium text-muted-foreground sm:inline">
                    Online
                  </span>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="flex-1 p-3 pb-20 sm:p-4 lg:p-6 lg:pb-6">{children}</main>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-around px-1 py-2">
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-w-[64px] flex-col items-center gap-0.5 rounded-xl px-4 py-2 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="size-5" aria-hidden />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
