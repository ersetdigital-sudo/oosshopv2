import {
  Paintbrush,
  ShoppingCart,
  Search,
  Zap,
  Shield,
  FileText,
  CalendarDays,
  Users,
  GraduationCap,
  Bot,
  Globe,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

// Map category slugs to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  'elementor-ecosystem': Paintbrush,
  'woocommerce': ShoppingCart,
  'seo': Search,
  'performance': Zap,
  'security': Shield,
  'forms': FileText,
  'booking': CalendarDays,
  'membership': Users,
  'learning-management': GraduationCap,
  'ai-automation': Bot,
  'website-development': Globe,
  'wordpress': Wrench,
}

export function getCategoryIcon(slug: string): LucideIcon {
  return iconMap[slug] || Wrench
}

export function CategoryIcon({ slug, className = 'size-4' }: { slug: string; className?: string }) {
  const Icon = getCategoryIcon(slug)
  return <Icon className={className} aria-hidden />
}
