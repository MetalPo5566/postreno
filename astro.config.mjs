import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// Static output for postreno.kleaner.my.
// build.format 'file' emits /zh.html, which both Vercel
// (cleanUrls) and Cloudflare Pages serve at the extensionless clean URL.
export default defineConfig({
  site: 'https://postreno.kleaner.my',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 0,
    },
  },
})
