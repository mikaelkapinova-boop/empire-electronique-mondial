import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://josruvsgsejljtyghvyl.supabase.co'
const supabaseAnonKey = 'sb_publishable_V60Qd3zHo2CKIgfLymaPkA_WgCJv4CN'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
