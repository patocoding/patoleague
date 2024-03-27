import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jldnodmtvtpdmsfsxfus.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZG5vZG10dnRwZG1zZnN4ZnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MjMyODcsImV4cCI6MjAxNzM5OTI4N30.V8vx7C6nlXQ0QMISDh85zR5ZDodRI91zaTLyl3hTO84'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);