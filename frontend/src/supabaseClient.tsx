import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://hsysypmwztiyyonpcgjq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeXN5cG13enRpeXlvbnBjZ2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NDQ1NzYsImV4cCI6MjA3NzEyMDU3Nn0.hpWtaa1FVHti6iqUeLyc-esxvgEG7mIvjZ-42Hp_DvU";

export const supabase = createClient( SUPABASE_URL , SUPABASE_ANON_KEY, {
    auth: {
        
    }
});