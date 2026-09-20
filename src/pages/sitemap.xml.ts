import type { APIRoute } from 'astro'
import { SITE, PAGES } from '../data/site'

const ROUTES = [PAGES.postRenoEn, PAGES.postRenoZh]

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10)
  const urls = ROUTES.map(
    (route) => `  <url>
    <loc>${SITE.url}${route === '/' ? '/' : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="en-MY" href="${SITE.url}/" />
    <xhtml:link rel="alternate" hreflang="zh-Hans-MY" href="${SITE.url}${PAGES.postRenoZh}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE.url}/" />
  </url>`
  ).join('\n')

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  )
}
