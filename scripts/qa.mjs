// Screenshots at the three target widths, plus the interaction checks that are
// easy to get wrong: the header dropdown on touch and keyboard, the mobile
// sticky bar sitting clear of the footer, and the quote builder, which is the
// one piece of arithmetic on the site a visitor acts on.
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { chromium } from 'playwright'

const BASE = process.env.QA_BASE || 'http://127.0.0.1:4321'
const OUT = 'qa'
mkdirSync(OUT, { recursive: true })

const prices = JSON.parse(readFileSync('src/data/prices.json', 'utf8'))
const RATE = prices.groups.postreno.items[0].price
const FORMALDEHYDE = prices.groups.treatment.items.find((i) => i.name === 'Formaldehyde Filter').price
const STERILISE = prices.groups.treatment.items.find((i) => i.name === 'Air & Surface Sterilisation').price
const SOFA_3 = prices.groups.sofa.items.find((i) => i.name === '3 Seater').price

const PACKAGES = [
  { key: 'dustFree', name: 'Dust-Free', addOns: 0 },
  { key: 'moveInReady', name: 'Move-In Ready', addOns: FORMALDEHYDE },
  { key: 'familySafe', name: 'Family Safe', addOns: FORMALDEHYDE + STERILISE },
]
const SIZES = [600, 1000, 2200]
const money = (value) => `RM${Math.round(value).toLocaleString('en-MY')}`

const PAGES = [{ slug: 'index', path: '/' }]
if (existsSync('dist/zh.html')) PAGES.push({ slug: 'zh', path: '/zh' })

const WIDTHS = [390, 768, 1440]
const results = []
const record = (name, pass, detail = '') => {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`)
}

/** Stops a link navigating while still letting the click reach the delegated
    handler under test. Scoped to anchors: a blanket preventDefault would also
    stop a radio from checking itself. */
const blockNavigation = () => {
  document.addEventListener(
    'click',
    (event) => {
      if ((event.target instanceof Element) && event.target.closest('a')) event.preventDefault()
    },
    true
  )
}

/** Drops the scroll reveal so nothing is mid transition when Playwright clicks,
    and turns off smooth scrolling so scroll-into-view lands immediately. */
const settle = async (page) => {
  await page.evaluate(() => {
    document.documentElement.classList.remove('reveal-ready')
    document.documentElement.style.scrollBehavior = 'auto'
  })
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})

// 1. Screenshots.
for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: width < 500 ? 844 : 900 },
    deviceScaleFactor: 1,
    hasTouch: width < 500,
    isMobile: width < 500,
  })
  const page = await context.newPage()

  for (const target of PAGES) {
    await page.goto(`${BASE}${target.path}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    // Let the reveal animation settle so screenshots show the finished page.
    await page.evaluate(() => {
      document.documentElement.classList.remove('reveal-ready')
    })
    // Walk down the page so the lazy loaded images below the fold decode
    // before the full page capture.
    await page.evaluate(async () => {
      const step = window.innerHeight
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: 'instant' })
        await new Promise((resolve) => setTimeout(resolve, 60))
      }
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
    await page.waitForFunction(() =>
      [...document.querySelectorAll('img')].every((img) => img.complete && img.naturalWidth > 0)
    )
    await page.waitForTimeout(250)
    await page.screenshot({
      path: `${OUT}/${target.slug}-${width}.jpg`,
      fullPage: true,
      type: 'jpeg',
      quality: 82,
    })
  }

  await context.close()
  console.log(`screenshots done at ${width}px`)
}

// 2. Cumulative layout shift on load, mobile. The hero badges reserve their
// height for exactly this reason.
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    hasTouch: true,
    isMobile: true,
  })
  const page = await context.newPage()
  for (const target of PAGES) {
    await page.goto(`${BASE}${target.path}`, { waitUntil: 'load' })
    const cls = await page.evaluate(
      () =>
        new Promise((resolve) => {
          let total = 0
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) total += entry.value
            }
          }).observe({ type: 'layout-shift', buffered: true })
          setTimeout(() => resolve(total), 2500)
        })
    )
    record(`CLS on ${target.path}`, cls < 0.1, `cls=${cls.toFixed(4)}`)
  }
  await context.close()
}

// 3. Header dropdown, mouse and keyboard, at desktop width.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })

  const trigger = page.locator('[data-dropdown-trigger]')
  const panel = page.locator('[data-dropdown-panel]')

  await trigger.click()
  record('dropdown opens on click', await panel.isVisible())
  record('dropdown sets aria-expanded', (await trigger.getAttribute('aria-expanded')) === 'true')

  await page.keyboard.press('Escape')
  record('dropdown closes on Escape', !(await panel.isVisible()))

  await trigger.focus()
  await page.keyboard.press('Enter')
  record('dropdown opens from the keyboard', await panel.isVisible())

  const menuLinks = await panel.locator('a').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href'))
  )
  record(
    'dropdown routes post renovation here and upholstery to its own site',
    menuLinks.includes('https://postreno.kleaner.my/') &&
      menuLinks.includes('https://upholstery.kleaner.my/sofa-mattress-cleaning') &&
      menuLinks.includes('https://upholstery.kleaner.my/carpet-curtain-cleaning'),
    `${menuLinks.length} links`
  )
  await context.close()
}

// 4. Touch: hamburger and the inline services group.
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  })
  const page = await context.newPage()
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })

  await page.locator('[data-menu-trigger]').tap()
  record('mobile menu opens on tap', await page.locator('[data-menu-panel]').isVisible())

  await page.locator('[data-sub-trigger]').tap()
  record('services expand inline on tap', await page.locator('[data-sub-panel]').isVisible())

  await page.locator('[data-menu-trigger]').tap()
  record('mobile menu closes on tap', !(await page.locator('[data-menu-panel]').isVisible()))
  await context.close()
}

// 5. Sticky bar must not cover the last line of the footer, iOS Safari style.
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  })
  const page = await context.newPage()
  for (const target of PAGES) {
    await page.goto(`${BASE}${target.path}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => {
      // scroll-behavior is smooth site wide, so ask for an instant jump.
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })
    })
    await page.waitForFunction(
      () => window.scrollY + window.innerHeight >= document.body.scrollHeight - 2
    )
    await page.waitForTimeout(200)

    const box = await page.evaluate(() => {
      const bar = document.querySelector('.fixed.inset-x-0.bottom-0')
      const copyright = [...document.querySelectorAll('footer p')].find((p) =>
        (p.textContent || '').includes('Copyright')
      )
      const target = copyright || document.querySelector('footer p')
      if (!bar || !target) return null
      return { bar: bar.getBoundingClientRect().top, text: target.getBoundingClientRect().bottom }
    })

    record(
      `sticky bar clears the footer copyright on ${target.path}`,
      Boolean(box) && box.text <= box.bar,
      box ? `copyright bottom ${box.text.toFixed(0)}px, bar top ${box.bar.toFixed(0)}px` : 'not found'
    )
  }
  await context.close()
}

// 6. The sticky bar goes to the quote builder, and every WhatsApp control on
// the page shares one target.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  for (const target of PAGES) {
    await page.goto(`${BASE}${target.path}`, { waitUntil: 'networkidle' })

    const hrefs = await page.evaluate(() =>
      [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'))
    )
    const wa = [...new Set(hrefs.filter((h) => h && h.startsWith('https://wa.me/')))]

    record(`${target.path} booking link present`, hrefs.includes('https://kleaner.my/booknow/'))
    record(`${target.path} sticky bar anchors to the quote builder`, hrefs.includes('#quote'))
    record(`${target.path} single WhatsApp target`, wa.length === 1, wa[0] || 'none')
    record(
      `${target.path} WhatsApp number is the chat line`,
      wa.length === 1 && wa[0].startsWith('https://wa.me/60174770978?text=')
    )
  }
  await context.close()
}

// 7. dataLayer events fire on the booking and WhatsApp controls.
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  })
  const page = await context.newPage()

  for (const target of PAGES) {
    await page.goto(`${BASE}${target.path}`, { waitUntil: 'networkidle' })
    await settle(page)
    await page.evaluate(blockNavigation)

    await page.locator('[data-cta="book"]').first().click()
    await page.locator('[data-cta="whatsapp"]').first().click()

    const events = await page.evaluate(() => window.dataLayer || [])
    const book = events.find((entry) => entry.event === 'cta_book')
    const whatsapp = events.find((entry) => entry.event === 'cta_whatsapp')

    record(
      `${target.path} pushes cta_book with page and service`,
      Boolean(book) && book.page === target.path && book.service === 'post-renovation',
      JSON.stringify(book)
    )
    record(
      `${target.path} pushes cta_whatsapp with page and service`,
      Boolean(whatsapp) && whatsapp.page === target.path && whatsapp.service === 'post-renovation',
      JSON.stringify(whatsapp)
    )
  }
  await context.close()
}

// 8. Reduced motion must still show the page. The reveal hides elements until
// the observer marks them visible, so a mistake here blanks the whole site for
// anyone who has the preference on.
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()

  for (const target of PAGES) {
    await page.goto(`${BASE}${target.path}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(700)

    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll('[data-reveal]')].filter((element) => {
        const style = getComputedStyle(element)
        return Number(style.opacity) < 0.9
      }).length
    )
    record(`reduced motion leaves nothing hidden on ${target.path}`, hidden === 0, `${hidden} hidden`)

    // And it should not be travelling: transforms are the part that goes.
    const moved = await page.evaluate(() =>
      [...document.querySelectorAll('[data-reveal]')].filter((element) => {
        const transform = getComputedStyle(element).transform
        return transform !== 'none' && transform !== 'matrix(1, 0, 0, 1, 0, 0)'
      }).length
    )
    record(`reduced motion drops the travel on ${target.path}`, moved === 0, `${moved} transformed`)

    // The calculator still has to work with the preference on.
    record(
      `quote builder is usable under reduced motion on ${target.path}`,
      await page.locator('[data-qb-interactive]').isVisible()
    )
  }
  await context.close()
}

// 9. The quote builder arithmetic: three sizes across three packages, every
// figure derived from prices.json rather than typed into this file.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await settle(page)

  const sqftInput = page.locator('[data-qb-sqft]')
  const totalEl = page.locator('[data-qb-total]')

  record('calculator is revealed when the script runs', await page.locator('[data-qb-interactive]').isVisible())
  record('the no-script note is removed when the script runs', (await page.locator('[data-qb-nojs]').count()) === 0)

  for (const sqft of SIZES) {
    await sqftInput.fill(String(sqft))
    for (const pkg of PACKAGES) {
      await page.locator(`[data-qb-package][value="${pkg.key}"]`).check()
      const expected = money(Math.round(sqft * RATE) + pkg.addOns)
      const got = (await totalEl.textContent())?.trim()
      record(`quote totals ${sqft} sqft ${pkg.name} as ${expected}`, got === expected, `got ${got}`)
    }
  }

  // Out of range asks for a site visit rather than inventing a number.
  await sqftInput.fill('12000')
  record(
    'above 10,000 sqft the calculator asks for a site visit',
    (await page.locator('[data-qb-sqft-error]').textContent())?.includes('site visit'),
    await page.locator('[data-qb-sqft-error]').textContent()
  )
  await context.close()
}

// 10. The WhatsApp message. This is the deliverable: the enquiry has to arrive
// already qualified, with the same total the visitor saw.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await settle(page)

  await page.locator('[data-qb-type]').selectOption('Condo')
  await page.locator('[data-qb-sqft]').fill('1000')
  await page.locator('[data-qb-area]').fill('Mont Kiara')
  await page.locator('[data-qb-package][value="moveInReady"]').check()

  // One 3 Seater sofa, from the existing upholstery prices.
  const sofa = page.locator('[data-qb-stepper]', { hasText: '3 Seater sofa' }).first()
  await sofa.locator('[data-step="1"]').click()

  await page.locator('[data-qb-handover]').fill('2026-10-03')
  await page.locator('[data-qb-movein]').fill('2026-10-10')

  const expectedTotal = Math.round(1000 * RATE) + FORMALDEHYDE + SOFA_3
  const href = await page.locator('[data-qb-wa]').getAttribute('href')
  const message = decodeURIComponent((href || '').split('?text=')[1] || '')

  const expectedLines = [
    "Hi Kleaner, I'd like to book post-renovation cleaning.",
    'Property: Condo, 1,000 sqft, Mont Kiara',
    'Package: Move-In Ready (clean + formaldehyde treatment)',
    `Add-ons: 1x 3 Seater sofa`,
    `Estimated total: ${money(expectedTotal)}`,
    'Handover: 3 Oct. Move-in: 10 Oct.',
  ]
  for (const line of expectedLines) {
    record(`WhatsApp message carries "${line}"`, message.includes(line), message.replace(/\n/g, ' / '))
  }
  record('WhatsApp total matches the displayed total', message.includes(money(expectedTotal)))
  record(
    'the sticky bar carries the same quote',
    (await page.locator('.fixed [data-cta="whatsapp"]').first().getAttribute('href')) === href
  )
  record('no reference line without a campaign', !message.includes('Ref:'))

  // The announced total is a sentence, not a bare number.
  await page.waitForTimeout(600)
  const announced = (await page.locator('[data-qb-announce]').textContent()) || ''
  record('the total is announced as a sentence', announced.includes(money(expectedTotal)) && announced.includes('Move-In Ready'), announced)

  await context.close()
}

// 11. Campaign attribution. A lead that arrived from an ad has to say so.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto(`${BASE}/?utm_source=google&utm_campaign=postreno-kl`, { waitUntil: 'networkidle' })
  await settle(page)
  await page.locator('[data-qb-sqft]').fill('1000')

  const href = await page.locator('[data-qb-wa]').getAttribute('href')
  const message = decodeURIComponent((href || '').split('?text=')[1] || '')
  record('campaign reference is appended as the last line', message.trim().endsWith('Ref: google/postreno-kl'), message.replace(/\n/g, ' / '))

  await page.goto(`${BASE}/?utm_source=google`, { waitUntil: 'networkidle' })
  await settle(page)
  await page.locator('[data-qb-sqft]').fill('1000')
  const soloHref = await page.locator('[data-qb-wa]').getAttribute('href')
  const soloMessage = decodeURIComponent((soloHref || '').split('?text=')[1] || '')
  record('a lone utm_source still attributes cleanly', soloMessage.trim().endsWith('Ref: google'), soloMessage.replace(/\n/g, ' / '))
  await context.close()
}

// 12. The calculator's dataLayer events, in the same shape as the CTA ones.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await settle(page)
  await page.evaluate(blockNavigation)

  await page.locator('[data-qb-sqft]').fill('2200')
  await page.locator('[data-qb-package][value="familySafe"]').check()
  await page.locator('[data-qb-wa]').click()

  const events = await page.evaluate(() => window.dataLayer || [])
  const started = events.find((entry) => entry.event === 'quote_started')
  const chosen = events.find((entry) => entry.event === 'quote_package')
  const completed = events.find((entry) => entry.event === 'quote_completed')

  record('quote_started fires once on first interaction', events.filter((e) => e.event === 'quote_started').length === 1, JSON.stringify(started))
  record('quote_package carries the package', chosen?.package === 'familySafe', JSON.stringify(chosen))
  record(
    'quote_completed carries bucket, package and total',
    completed?.sqft_bucket === '2000-3499' &&
      completed?.package === 'familySafe' &&
      completed?.total === Math.round(2200 * RATE) + FORMALDEHYDE + STERILISE,
    JSON.stringify(completed)
  )
  record('quote events carry page and service like the CTA events', completed?.page === '/' && completed?.service === 'post-renovation')
  await context.close()
}

// 13. With JavaScript off the section still has to be a usable price list.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(`${BASE}/`, { waitUntil: 'load' })

  record('the price table is there without JavaScript', await page.locator('#quote table').isVisible())
  record('the calculator stays hidden without JavaScript', !(await page.locator('[data-qb-interactive]').isVisible()))
  record('the no-script note explains how to work it out', await page.locator('[data-qb-nojs]').isVisible())
  record('the packages are readable without JavaScript', (await page.locator('#quote h3').count()) >= 3)

  // And nothing is hidden behind the reveal observer.
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('[data-reveal]')].filter(
      (element) => Number(getComputedStyle(element).opacity) < 0.9
    ).length
  )
  record('nothing is hidden without JavaScript', hidden === 0, `${hidden} hidden`)
  await context.close()
}

// 14. Proof must never show a number we did not measure.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  const readings = JSON.parse(readFileSync('src/data/readings.json', 'utf8'))
  if (readings.length === 0) {
    record('empty readings show the waiting state', await page.locator('[data-meter-empty]').isVisible())
    record('no reading cards are rendered', (await page.locator('[data-meter-card]').count()) === 0)
  } else {
    record('every reading in the data file is rendered', (await page.locator('[data-meter-card]').count()) === readings.length)
  }
  await context.close()
}

await browser.close()

const failed = results.filter((result) => !result.pass)
writeFileSync(`${OUT}/interaction-report.json`, JSON.stringify({ results }, null, 2))
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
if (failed.length) {
  console.log('failed:', failed.map((f) => f.name).join(', '))
  process.exitCode = 1
}
