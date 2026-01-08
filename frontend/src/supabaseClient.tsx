import { createClient, processLock } from '@supabase/supabase-js'

const supabaseUrl = "https://hsysypmwztiyyonpcgjq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeXN5cG13enRpeXlvbnBjZ2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NDQ1NzYsImV4cCI6MjA3NzEyMDU3Nn0.hpWtaa1FVHti6iqUeLyc-esxvgEG7mIvjZ-42Hp_DvU";


export const supabase = createClient(supabaseUrl, supabaseAnonKey)