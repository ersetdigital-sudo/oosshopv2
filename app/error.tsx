'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-destructive">!</h1>
      <h2 className="mt-4 text-2xl font-semibold">Terjadi Kesalahan</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        Maaf, terjadi kesalahan saat memuat halaman ini. Silakan coba lagi.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Coba Lagi
      </button>
    </div>
  )
}
