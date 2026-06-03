import { createClient } from '@supabase/supabase-js'

let _client: ReturnType<typeof createClient> | null = null

export const useSupabase = (): any => {
  // Return existing singleton if already created
  if (_client) return _client

  const config = useRuntimeConfig()

  if (!config.public.supabaseUrl || !config.public.supabaseKey) {
    console.warn('Supabase credentials missing in runtimeConfig')
  }

  _client = createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseKey as string
  )

  return _client
}
