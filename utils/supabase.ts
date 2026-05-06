import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()
  
  if (!config.public.supabaseUrl || !config.public.supabaseKey) {
    console.warn('Supabase credentials missing in runtimeConfig')
  }

  return createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseKey as string
  )
}
