// Content checks that run against the built site. Keep this passing: it is what
// stops a price, a menu link, an unsourced claim or an em dash drifting out of
// line.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const results = []
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`)
}

// The prices as written in the brief. Independent of prices.json on purpose,
// so a typo in the data file cannot quietly become the new truth.
const BRIEF_PRICES = {
  postreno: { 'Built-up area': 1.2 },
  treatment: { 'Formaldehyde Filter': 280, 'Air & Surface Sterilisation': 300 },
  sofa: { '1 Seater': 88, '2 Seater': 138, '3 Seater': 168, 'L-Shaped': 198 },
  mattress: { Single: 108, Queen: 148, King: 168, 'Super King': 188 },
  curtain: { Curtain: 68, Sheer: 30 },
  carpet: { '120 x 180 cm': 80, '160 x 210 cm': 110, '180 x 260 cm': 130, '200 x 300 cm': 160 },
}

// The site's own money formatting, restated here rather than imported, so the
// check does not pass just because the helper and the page share a bug.
const money = (value) => `RM${Number.isInteger(value) ? value : value.toFixed(2)}`
const total = (value) => `RM${Math.round(value).toLocaleString('en-MY')}`

const prices = JSON.parse(readFileSync('src/data/prices.json', 'utf8'))
const RATE = prices.groups.postreno.items[0].price
const FORMALDEHYDE = prices.groups.treatment.items.find((i) => i.name === 'Formaldehyde Filter').price
const STERILISE = prices.groups.treatment.items.find(
  (i) => i.name === 'Air & Surface Sterilisation'
).price
const PACKAGE_ADDONS = { 'Dust-Free': 0, 'Move-In Ready': FORMALDEHYDE, 'Family Safe': FORMALDEHYDE + STERILISE }
const WORKED_EXAMPLES = [600, 1000, 2200]

const ROUTES = [
  { key: 'index', file: 'index.html' },
  { key: 'zh', file: 'zh.html' },
]
const pages = {}
for (const route of ROUTES) {
  const path = join(DIST, route.file)
  if (existsSync(path)) pages[route.key] = readFileSync(path, 'utf8')
}
check('the English page was built', Boolean(pages.index))

/** Rendered HTML, entity decoded, for assertions about words rather than markup. */
const asText = (html) =>
  html
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
const texts = Object.fromEntries(Object.entries(pages).map(([key, html]) => [key, asText(html)]))

// 1. prices.json matches the brief.
for (const [group, items] of Object.entries(BRIEF_PRICES)) {
  for (const [name, price] of Object.entries(items)) {
    const found = prices.groups[group]?.items.find((item) => item.name === name)
    check(`prices.json ${group} ${name} = ${money(price)}`, found?.price === price, `got ${found?.price}`)
  }
}

// 2. Every price the page is responsible for reaches the page.
const PAGE_GROUPS = ['postreno', 'treatment', 'sofa', 'mattress']
for (const [key, text] of Object.entries(texts)) {
  for (const group of PAGE_GROUPS) {
    for (const item of prices.groups[group].items) {
      check(`${key} renders ${group} ${item.name} ${money(item.price)}`, text.includes(money(item.price)))
    }
  }
}

// 2b. The three packages, worked out at the three sizes, must still add up and
// must still be on the page. This is the arithmetic the whole section rests on.
for (const [key, text] of Object.entries(texts)) {
  for (const sqft of WORKED_EXAMPLES) {
    for (const [name, addOns] of Object.entries(PACKAGE_ADDONS)) {
      const sum = Math.round(sqft * RATE) + addOns
      check(`${key} worked example ${sqft} sqft ${name} = ${total(sum)}`, text.includes(total(sum)), `computed ${total(sum)}`)
    }
  }
}

// 2c. The above the fold anchor is the same arithmetic, not a typed in number.
for (const [key, text] of Object.entries(texts)) {
  check(`${key} hero quotes the rate from prices.json`, text.includes(money(RATE)))
  check(
    `${key} hero quotes the 1,000 sqft example from prices.json`,
    text.includes(total(Math.round(1000 * RATE))),
    total(Math.round(1000 * RATE))
  )
}

// 2d. RM carries no decimals anywhere, with one deliberate exception: the per
// sqft rate, which is meaningless without them.
for (const [key, text] of Object.entries(texts)) {
  const decimals = [...new Set((text.match(/RM\d[\d,]*\.\d+/g) || []))].filter(
    (found) => found !== money(RATE)
  )
  check(`${key} writes RM without decimals, except the rate`, decimals.length === 0, decimals.join(', '))
}

// 3. No em dash anywhere in the repo we author. The character is built from its
// code point so that this file does not fail its own check.
const EM_DASH = String.fromCharCode(0x2014)
const SKIP = new Set(['node_modules', 'dist', '.git', '.astro', 'qa', '.vercel', 'preview'])
const offenders = []
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      walk(full)
      continue
    }
    if (!/\.(astro|ts|js|mjs|css|json|md|txt|html)$/.test(entry)) continue
    if (readFileSync(full, 'utf8').includes(EM_DASH)) offenders.push(full)
  }
}
walk('src')
walk('scripts')
walk('content')
walk('assets')
for (const file of ['GO-LIVE.md', 'README.md', 'vercel.json']) if (existsSync(file)) {
  if (readFileSync(file, 'utf8').includes(EM_DASH)) offenders.push(file)
}
check('no em dash in authored source', offenders.length === 0, offenders.join(', '))

const renderedOffenders = Object.entries(pages)
  .filter(([, html]) => html.includes(EM_DASH))
  .map(([name]) => name)
check('no em dash in rendered HTML', renderedOffenders.length === 0, renderedOffenders.join(', '))

// 3b. House style lives in the copy files, so it is checked there rather than
// in rendered HTML, where an inline script would produce false positives.
const copyDir = 'src/data/copy'
for (const file of readdirSync(copyDir).filter((name) => name.endsWith('.ts'))) {
  const source = readFileSync(join(copyDir, file), 'utf8')
  const strings = [...source.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((match) => match[1])
  // Full width included: a Chinese exclamation mark is still an exclamation mark.
  const shouty = strings.filter((value) => value.includes('!') || value.includes('\uff01'))
  check(`${file} has no exclamation marks`, shouty.length === 0, shouty.slice(0, 2).join(' | '))
}

// 4. The header menu replicates kleaner.my, with this site and the upholstery
// site in their places.
const REQUIRED_MENU = [
  'https://kleaner.my/booknow/home_cleaning',
  'https://kleaner.my/standard-cleaning',
  'https://kleaner.my/deep-cleaning',
  'https://kleaner.my/move-in-out',
  'https://postreno.kleaner.my/',
  'https://kleaner.my/office-cleaning',
  'https://kleaner.my/part-time-maid',
  'https://upholstery.kleaner.my/sofa-mattress-cleaning',
  'https://upholstery.kleaner.my/carpet-curtain-cleaning',
  'https://movers.kleaner.my',
  'https://kleaner.my/premium-clean',
  'https://kleaner.my/aircond-servicing',
  'https://kleaner.my/reviews',
  'https://kleaner.my/gift-card',
  'https://kleaner.my/faqs',
  'https://kleaner.my/contact-us',
  'https://kleaner.my/login',
  'tel:+60174770010',
]
for (const [key, html] of Object.entries(pages)) {
  const missing = REQUIRED_MENU.filter((url) => !html.includes(`"${url}"`))
  check(`${key} carries the full kleaner.my menu`, missing.length === 0, missing.join(', '))
}

// 4b. Post Renovation Cleaning must point at this site, never back at the old
// BookingKoala page this one replaces.
for (const [key, html] of Object.entries(pages)) {
  check(
    `${key} does not link to the old post-renovation page`,
    !html.includes('"https://kleaner.my/post-renovation-cleaning"')
  )
}

// 5. Footer additions.
const REQUIRED_FOOTER = [
  'https://kleaner.my/home',
  'https://kleaner.my/booknow/',
  'https://kleaner.my/privacy-policy',
  'https://kleaner.my/kleaners-anti-theft-policy',
  'https://kleaner.my/blog',
]
for (const [key, html] of Object.entries(pages)) {
  const missing = REQUIRED_FOOTER.filter((url) => !html.includes(`"${url}"`))
  check(`${key} carries the footer links`, missing.length === 0, missing.join(', '))
}

// 6. Booking and WhatsApp targets.
for (const [key, html] of Object.entries(pages)) {
  check(`${key} booking CTA points at the booking flow`, html.includes('https://kleaner.my/booknow/'))
  const wa = [...new Set((html.match(/https:\/\/wa\.me\/[^"']+/g) || []))]
  check(`${key} every WhatsApp link uses the chat line`, wa.length > 0 && wa.every((href) => href.startsWith('https://wa.me/60174770978?text=')), wa.length + ' links')
  // Decode only the links, never the whole document: a stray percent sign in
  // the CSS is enough to throw.
  const waText = wa
    .map((href) => {
      try {
        return decodeURIComponent(href.split('?text=')[1] || '')
      } catch {
        return ''
      }
    })
    .join(' | ')
  const handoverPhrase = key === 'zh' ? '\u4ea4\u697c\u65e5\u671f\u662f' : 'renovation handover is on'
  check(`${key} hero WhatsApp asks for the handover date`, waText.includes(handoverPhrase), waText.slice(0, 80))
}

// 7. The tagline.
for (const [key, html] of Object.entries(pages)) {
  check(`${key} shows the current tagline`, html.includes('The Benchmark of Cleaning Service'))
}

// 8. Structured data parses and carries offers built from prices.json.
for (const [key, html] of Object.entries(pages)) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
  let parsed = []
  try {
    parsed = blocks.map((block) => JSON.parse(block[1]))
  } catch (error) {
    parsed = []
    check(`${key} JSON-LD parses`, false, String(error))
  }
  const types = parsed.map((entry) => entry['@type'])
  const expected = ['LocalBusiness', 'Service', 'FAQPage']
  check(
    `${key} JSON-LD covers ${expected.join(', ')}`,
    expected.every((type) => types.includes(type)),
    types.join(', ')
  )

  const service = parsed.find((entry) => entry['@type'] === 'Service')
  if (service) {
    const want = ['postreno', 'treatment'].reduce((sum, group) => sum + prices.groups[group].items.length, 0)
    check(`${key} Service offers match prices.json`, service.offers.offers.length === want, `${service.offers.offers.length} of ${want}`)
    const offerPrices = service.offers.offers.map((offer) => Number(offer.price)).sort((a, b) => a - b)
    check(`${key} Service offers carry the real figures`, offerPrices.join(',') === [RATE, FORMALDEHYDE, STERILISE].sort((a, b) => a - b).join(','), offerPrices.join(','))
  }

  // Nothing the owner still has to confirm may reach structured data, in any
  // block, in any form.
  const leaked = blocks.filter((block) => block[1].includes('OWNER TO CONFIRM'))
  check(`${key} structured data is free of owner placeholders`, leaked.length === 0, `${leaked.length} blocks`)

  // And a question waiting on a note is left out of the FAQ entirely, because
  // an answer that is not finished is not an answer Google should be shown.
  const faq = parsed.find((entry) => entry['@type'] === 'FAQPage')
  if (faq) {
    const details = [...html.matchAll(/<details[\s\S]*?<\/details>/g)].map((match) => match[0])
    const unconfirmed = details.filter((entry) => !entry.includes('OWNER TO CONFIRM'))
    check(
      `${key} FAQ structured data covers only the settled questions`,
      faq.mainEntity.length === unconfirmed.length,
      `${faq.mainEntity.length} in schema, ${unconfirmed.length} settled of ${details.length} on page`
    )
    check(`${key} page asks at least 10 questions`, details.length >= 10, `${details.length}`)
  }
}

// 9. Every confirm note on the page is a real ConfirmNote, so the generator
// cannot miss one.
for (const [key, html] of Object.entries(pages)) {
  const marks = (html.match(/\[OWNER TO CONFIRM\]/g) || []).length
  const notes = (html.match(/<p[^>]*\bdata-confirm\b/g) || []).length
  check(`${key} every owner note is a ConfirmNote`, marks === notes, `${marks} marks, ${notes} notes`)
}

// 10. Claims guardrails. These phrases are never allowed on the page, whatever
// else changes around them.
const FORBIDDEN = [
  '100% removal',
  '100% remove',
  'completely removes',
  'permanently removes',
  'permanent removal',
  'medical grade',
  'medical-grade',
  'kills viruses',
  'kill viruses',
  'virus free',
  'certified formaldehyde',
  'guaranteed safe',
  'cures',
  'prevents illness',
  // The same promises in Chinese.
  '100%\u53bb\u9664',
  '100% \u53bb\u9664',
  '\u5f7b\u5e95\u6e05\u9664',
  '\u5b8c\u5168\u6e05\u9664',
  '\u6c38\u4e45\u53bb\u9664',
  '\u533b\u7597\u7ea7',
  '\u6740\u6b7b\u75c5\u6bd2',
  '\u6740\u706d\u75c5\u6bd2',
  '\u65e0\u6bd2\u65e0\u5bb3',
]
for (const [key, text] of Object.entries(texts)) {
  const lower = text.toLowerCase()
  const found = FORBIDDEN.filter((phrase) => lower.includes(phrase))
  check(`${key} makes none of the forbidden claims`, found.length === 0, found.join(', '))
}

// 11. The four sources every formaldehyde fact hangs on must be cited, and the
// IARC classification must appear once, in the sources block, never in a
// heading.
const SOURCE_URLS = [
  'ncbi.nlm.nih.gov/books/NBK138711',
  'ICOP%20INDOOR%20AIR%20QUALITY',
  'epa.gov/indoor-air-quality-iaq/what-should-i-know-about-formaldehyde-and-indoor-air-quality',
  'epa.gov/formaldehyde/formaldehyde-emission-standards-composite-wood-products',
]
for (const [key, html] of Object.entries(pages)) {
  const missing = SOURCE_URLS.filter((url) => !html.includes(url))
  check(`${key} cites all four formaldehyde sources`, missing.length === 0, missing.join(', '))
}
for (const [key, text] of Object.entries(texts)) {
  const needle = key === 'zh' ? /\u7b2c1\u7c7b/g : /Group 1/g
  const mentions = (text.match(needle) || []).length
  check(`${key} states the IARC classification exactly once`, mentions === 1, `${mentions} mentions`)
}
for (const [key, html] of Object.entries(pages)) {
  const headings = (html.match(/<h[12][^>]*>[\s\S]*?<\/h[12]>/g) || []).join(' ')
  check(`${key} keeps the carcinogen wording out of the headlines`, !/carcinogen/i.test(headings))
}

// 12. Language and the EN to ZH pair.
for (const [key, html] of Object.entries(pages)) {
  const lang = (html.match(/<html lang="([^"]+)"/) || [])[1] || ''
  check(`${key} declares its language`, lang === (key === 'zh' ? 'zh-Hans' : 'en-MY'), lang)
  for (const hreflang of ['en-MY', 'zh-Hans-MY', 'x-default']) {
    check(`${key} carries the ${hreflang} alternate`, html.includes(`hreflang="${hreflang}"`))
  }
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || ''
  check(
    `${key} canonical points at postreno.kleaner.my`,
    canonical === (key === 'zh' ? 'https://postreno.kleaner.my/zh' : 'https://postreno.kleaner.my/'),
    canonical
  )
}

// 13. The quote builder contract: the hero and the sticky bar both reach it,
// and the price table survives with the script removed.
for (const [key, html] of Object.entries(pages)) {
  check(`${key} has the quote builder anchor`, html.includes('id="quote"'))
  check(`${key} sticky bar points at the quote builder`, html.includes('href="#quote"'))
  check(`${key} calculator is hidden until the script runs`, html.includes('data-qb-interactive'))
  check(
    `${key} price table survives with JavaScript off`,
    html.includes('data-qb-nojs') && html.includes('<table')
  )
}

// 14. Local assets referenced by the pages exist in the build.
const assets = new Set()
for (const html of Object.values(pages)) {
  for (const match of html.matchAll(/(?:src|href)="(\/[^"]+\.(?:jpg|png|svg|woff2|xml|txt|css|js))"/g)) {
    assets.add(match[1])
  }
}
const missingAssets = [...assets].filter((asset) => !existsSync(join(DIST, asset)))
check('every local asset exists in dist', missingAssets.length === 0, missingAssets.join(', '))

// 14b. Exactly one image is preloaded, and it is the hero.
for (const [key, html] of Object.entries(pages)) {
  const preloads = [...html.matchAll(/<link rel="preload"[^>]*as="image"[^>]*>/g)]
  check(`${key} preloads exactly one image`, preloads.length === 1, `${preloads.length}`)
  check(`${key} preloads the hero image`, preloads[0]?.[0].includes('/images/postreno-hero.jpg'))
}

// 15. Every anchor must have a usable href. A component prop that silently
// fails to reach a child renders href="" or no href at all, which is invisible
// on the page but breaks the link and fails the crawlable-anchors audit.
for (const [key, html] of Object.entries(pages)) {
  const anchors = html.match(/<a\b[^>]*>/g) || []
  const broken = anchors.filter((tag) => {
    const href = tag.match(/\shref="([^"]*)"/)
    if (!href) return true
    const value = href[1].trim()
    return value === '' || value === '#' || value.startsWith('javascript:')
  })
  check(`${key} has no anchor missing an href`, broken.length === 0, broken.slice(0, 2).join(' '))
}

// 16. The mobile platform layer. env(safe-area-inset-*) silently resolves to
// zero unless the viewport meta opts in, so the sticky bar's home indicator
// padding disappears with nothing on screen to show it went.
for (const [key, html] of Object.entries(pages)) {
  const viewport = (html.match(/<meta name="viewport" content="([^"]*)"/) || [])[1] || ''
  const usesSafeArea = html.includes('safe-area-inset')
  check(
    `${key} viewport opts into the safe area it relies on`,
    !usesSafeArea || viewport.includes('viewport-fit=cover'),
    viewport
  )
  check(`${key} viewport never blocks zoom`, !/user-scalable=no|maximum-scale=1\b/.test(viewport))
}

// 17. Clean URLs: no .html should be linked from the pages.
const htmlLinks = new Set()
for (const html of Object.values(pages)) {
  for (const match of html.matchAll(/href="([^"]*\.html)"/g)) htmlLinks.add(match[1])
}
check('no .html links in the markup', htmlLinks.size === 0, [...htmlLinks].join(', '))

// 18. No readings may be published that were not measured.
const readings = JSON.parse(readFileSync('src/data/readings.json', 'utf8'))
check('readings.json is an array', Array.isArray(readings))
if (readings.length === 0) {
  for (const [key, html] of Object.entries(pages)) {
    check(`${key} shows the empty readings state rather than a sample number`, html.includes('data-meter-empty'))
  }
}

const failed = results.filter((result) => !result.pass)
console.log(`\n${results.length - failed.length}/${results.length} content checks passed`)
if (failed.length) {
  console.log('failed:', failed.map((f) => f.name).join('; '))
  process.exitCode = 1
}
