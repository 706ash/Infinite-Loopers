import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eulxtegmibcgbrqeckvj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1bHh0ZWdtaWJjZ2JycWVja3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMDA2OTgsImV4cCI6MjA2ODU3NjY5OH0.Mb9xJqsjEiYDcrlg-lPvQUUV9tI3za18uYWqIOzbdgk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);