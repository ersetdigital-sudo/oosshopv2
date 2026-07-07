import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Called from the admin product tambah/edit pages right after a successful
// insert/update, so /katalog and the affected /produk/[slug] page don't have
// to wait out their ISR revalidate window (60s / 300s) to reflect the change.
export async function POST(request: Request) {
  try {
    const { slug } = (await request.json()) as { slug?: string }

    revalidatePath('/katalog')

    if (slug) {
      revalidatePath(`/produk/${slug}`)
    }

    return NextResponse.json({ revalidated: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ revalidated: false, error: message }, { status: 500 })
  }
}
