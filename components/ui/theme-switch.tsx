'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="h-7 w-14" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex h-7 w-14 cursor-pointer items-center rounded-full bg-muted p-1 shadow-inner transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Icons */}
      <Sun className="absolute left-1.5 size-3.5 text-amber-400" aria-hidden />
      <Moon className="absolute right-1.5 size-3.5 text-primary" aria-hidden />

      {/* Sliding knob */}
      <motion.div
        className="size-5 rounded-full bg-foreground shadow-md"
        animate={{ x: isDark ? 26 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  )
}
