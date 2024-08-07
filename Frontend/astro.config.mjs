import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  env: {
    VITE_SUPABASE_URL: 'https://fnljcvivviqgbjilpwbo.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZubGpjdml2dmlxZ2JqaWxwd2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0OTk4NzIsImV4cCI6MjAzNjA3NTg3Mn0.lXNAH4uDH0Y3eYzULccLTi0I-IHFgLLaS1wQVkU6yjI'
  },
  vite: {
    resolve: {
      alias: {
        'js': '/src/pages/js'
      }
    }
  }
});