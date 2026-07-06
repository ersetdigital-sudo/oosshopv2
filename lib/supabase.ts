import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

function getSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a dummy client that won't crash during build
    // Real calls will fail gracefully in getAllProducts/getCategories
    return createClient('https://placeholder.supabase.co', 'placeholder-key', {
      global: {
        fetch: () => Promise.resolve(new Response(JSON.stringify({ data: [], error: null }), { status: 200 })),
      },
    })
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: (url, options = {}) => {
        return fetch(url, { ...options, cache: 'no-store' })
      },
    },
  })
}

export const supabase = getSupabaseClient()
