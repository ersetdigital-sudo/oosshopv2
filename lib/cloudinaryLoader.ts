/**
 * Cloudinary image loader for Next.js <Image> component.
 * Uses Cloudinary fetch mode — fetches from original URL and optimizes on-the-fly.
 * No need to upload images to Cloudinary manually.
 *
 * Setup: Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local
 */

type ImageLoaderProps = {
  src: string
  width: number
  quality?: number
}

export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  // If no cloud name configured, return original src (fallback)
  if (!cloudName) return src

  // If src is already a full URL (remote image from Supabase, etc.)
  if (src.startsWith('http')) {
    const params = ['f_auto', 'q_auto', `w_${width}`]
    if (quality) params.push(`q_${quality}`)
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${params.join(',')}/${src}`
  }

  // If src is a local path (e.g. /images/logo.png), return as-is
  return src
}
