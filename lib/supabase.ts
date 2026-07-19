import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Build-safe dummy: returns empty results without hitting the network.
// Every query builder method returns `this` so chains like
//   .from('x').select('*').eq('a',1).order('b').single()
// resolve to `{ data: null, error: null }` (or `{ data: [], error: null }`
// for list queries) instead of throwing.
function dummyClient(): SupabaseClient {
  const empty = { data: null, error: null }
  const emptyList = { data: [], error: null }

  // A thenable that resolves to the given value — lets await chains work.
  const resolveWith = (val: unknown) => {
    const p = Promise.resolve(val)
    // Attach chainable methods so the last call in a builder chain
    // (e.g. .single()) can still be invoked without crashing.
    const obj: Record<string, unknown> = {
      then: p.then.bind(p),
      catch: p.catch.bind(p),
      finally: p.finally.bind(p),
      [Symbol.toStringTag]: 'Promise',
    }
    // Every unknown property returns a function that returns `this`,
    // which covers .eq(), .neq(), .order(), .limit(), .single(),
    // .maybeSingle(), .in(), .filter(), etc.
    return new Proxy(obj, {
      get(target, prop) {
        if (prop in target) return target[prop as string]
        // .single() / .maybeSingle() should resolve to a single row
        if (prop === 'single' || prop === 'maybeSingle') {
          return () => resolveWith(empty)
        }
        // Everything else is a chainable filter — return self.
        return () => resolveWith({ ...emptyList, then: p.then.bind(p), catch: p.catch.bind(p), finally: p.finally.bind(p), [Symbol.toStringTag]: 'Promise' })
      },
    })
  }

  const tableProxy = new Proxy(
    {},
    {
      get(_target, prop) {
        if (prop === 'insert' || prop === 'upsert') {
          return () => resolveWith(empty)
        }
        if (prop === 'update') {
          return () => resolveWith(empty)
        }
        if (prop === 'delete') {
          return () => resolveWith(empty)
        }
        // .select(), .from() etc — start a chainable query.
        return () => resolveWith(emptyList)
      },
    },
  )

  return {
    from: () => tableProxy,
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    channel: () => ({ on: () => ({ subscribe: () => {} }), subscribe: () => {}, unsubscribe: () => {} }),
    removeChannel: () => {},
    rpc: () => Promise.resolve({ data: null, error: null }),
  } as unknown as SupabaseClient
}

function getSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    return dummyClient()
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
