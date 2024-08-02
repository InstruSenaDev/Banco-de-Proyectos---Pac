import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lerzcumnybjpexgmttty.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcnpjdW1ueWJqcGV4Z210dHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3NDI0ODQsImV4cCI6MjAzNjMxODQ4NH0.u4P8X9niVGeviE2qfHUiRrkVc7eLxcWsV3ye4B6JsxI'; // Reemplaza con tu clave pública de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };