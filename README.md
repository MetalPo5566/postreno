# Kleaner post-renovation cleaning

One conversion page for [Kleaner](https://kleaner.my), in English and
Simplified Chinese, selling post-renovation cleaning **and** formaldehyde
treatment as one visit.

| Route | Page |
| --- | --- |
| `/` | Post-Renovation Cleaning & Formaldehyde Removal |
| `/zh` | 装修后清洁 与 除甲醛 |

Deployed as a standalone static site on `postreno.kleaner.my`. kleaner.my runs
on BookingKoala, which cannot host custom coded pages, so this follows the same
pattern already used for `movers.kleaner.my` and `upholstery.kleaner.my`. The
header and footer replicate the main site and link back to it with absolute
URLs.

**Read [GO-LIVE.md](./GO-LIVE.md) before deploying.** It covers the host setup,
the DNS record, the BookingKoala menu entry to repoint, the GTM container ID,
the photos to drop in, and three things that are assumed or were blocked.

Forked from [Claude-Upholstery](https://github.com/MetalPo5566/Claude-Upholstery).
Same shell, same tokens, same check suite. New site.

## The argument the page makes

Every competitor sells post-renovation cleaning as dust removal, so the buyer
shops on price and the cheapest quote wins. This page sells two jobs in one
visit: the dust you can see, and the formaldehyde you cannot.

Formaldehyde is released by the plywood, MDF and particleboard that every Klang
Valley renovation is full of, and the family sleeps in it from move-in night.
That reframes the purchase from "cleaning" to "making the new home safe to move
into", which is what justifies the premium and makes the formaldehyde package
the default rather than the upsell.

Every section ladders the same way: **invisible risk, measured proof, clear
price, guarantee, book.**

## Stack

Astro 7, static output, Tailwind CSS 4. No client framework and no third party
runtime dependency: the only external script is Google Tag Manager, and only
when a container ID is configured. Lato is self hosted from `public/fonts`. The
Chinese page loads no webfont at all and falls back to the device's own CJK
face.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # static build into dist/, regenerates content/OWNER-CONFIRM.md
npm run preview    # serve the build
npm run check      # build, then the content checks
npm run verify     # prices, menu, claims, sources, structured data, no em dashes
npm run links      # resolve every link in the build, writes qa/link-audit.md
npm run qa         # screenshots and interaction tests, needs preview running
npm run lighthouse # mobile Lighthouse over both pages
npm run assets     # regenerate fonts, logo, placeholder images and the OG card
```

`npm run qa` and `npm run lighthouse` expect `npm run preview` to be running on
port 4321 and drive a real Chromium. Set `CHROME_PATH` if the browser is not at
the default location.

## Layout

```
src/
  components/        Header, Footer, QuoteBuilder, MeterProof, Protocol, and so on
  data/
    prices.json      Single source of truth for every price on the site
    readings.json    Real meter readings. Ships empty, on purpose.
    site.ts          Brand, contact, menu, reviews, and the package arithmetic
    copy/
      types.ts       The page, typed. Both languages satisfy this shape.
      postreno.en.ts Every English word on the page
      postreno.zh.ts Every Chinese word on the page
  layouts/
    BaseLayout.astro SEO, JSON-LD, hreflang, GTM, the reveal script, CTA tracking
    PostRenoPage.astro The page itself, once, for both languages
  lib/schema.ts      LocalBusiness and Service structured data
  pages/             index.astro, zh.astro, sitemap.xml
assets/
  kleaner-logo.png      The owner's logo, source for the web versions
  higgsfield-brief.md   One image prompt per slot, plus what is already generated
public/
  fonts/             Self hosted Lato 400, 700, 900
  images/            Placeholder artwork, named as drop in slots for real photos
  og/                The 1200x630 share card
scripts/             Asset generation and the check suite
content/
  OWNER-CONFIRM.md   Generated: every open question, with where it sits on the page
  SOURCE-NOTES.md    What the page may state, and the document behind each claim
qa/                  Screenshots, Lighthouse reports, link audit
```

## Two pages, one page

`PostRenoPage.astro` is the whole page. `index.astro` and `zh.astro` each pass
it a copy object and change nothing else, so the two languages cannot drift
structurally: a section added to one is a section added to both, and a field
missing from the Chinese file is a type error, not a silently English heading.

Shared components that used to hardcode their own wording (the trust strip, the
service area card, the before and after slider) now take it as a prop.

## Prices

Every price is rendered from `src/data/prices.json`, including the `Service`
structured data offers and every figure in the quote builder. Nothing is hard
coded into the copy, so the pages and the booking form cannot drift apart.

| Group | What it holds |
| --- | --- |
| `postreno` | RM1.20 per sqft of built-up area |
| `treatment` | Formaldehyde Filter RM280, Air & Surface Sterilisation RM300, both per job |
| `sofa`, `mattress` | The cross-sell add-ons, at booking form prices |
| `carpet`, `curtain` | Not priced on this page. Kept so the two sites' data files match. |

House style is RM with no decimals. A per sqft rate is meaningless without them,
so `rm()` prints two decimals only when the value is not a whole ringgit, and
`npm run verify` asserts the rate is the **only** RM figure on either page
carrying a decimal point.

**To change a price:** edit `src/data/prices.json`, update the matching entry in
`BRIEF_PRICES` in `scripts/verify.mjs` so the check still means something, then
run `npm run check`.

## The quote builder

`QuoteBuilder.astro` is the conversion engine. Untouched it is three package
cards and a worked example table, which is exactly what it is with JavaScript
off. The calculator itself is `hidden` until the script confirms it can run, so
nothing inert is ever on screen.

```
total = round(sqft x 1.20) + package add-ons + cross-sell items
```

Two outputs. **Book Now** goes to the booking form. **Send Quote on WhatsApp**
rewrites every WhatsApp control on the page, so an enquiry arrives as

> Hi Kleaner, I'd like to book post-renovation cleaning.
> Property: Condo, 1,000 sqft, Mont Kiara
> Package: Move-In Ready (clean + formaldehyde treatment)
> Add-ons: 1x 3 Seater sofa
> Estimated total: RM1,648
> Handover: 3 Oct. Move-in: 10 Oct.

rather than "how much for post reno cleaning?". If the visitor arrived from an
ad, a final `Ref: {utm_source}/{utm_campaign}` line is appended so the lead is
attributable. `npm run qa` checks the arithmetic at 600, 1,000 and 2,200 sqft
across all three packages, the message text, the campaign line and the events.

## Claims, and what stops them drifting

Only facts verified against the brief or against a named public document are
stated as facts. Anything else carries a visible `[OWNER TO CONFIRM]` note and
is listed in `content/OWNER-CONFIRM.md`, which regenerates on every build.

Those notes are deliberately kept out of the FAQ structured data, and **any FAQ
question carrying one is left out of it entirely**: an answer waiting on a note
is not a complete answer, so Google should not be shown it as one.

`npm run verify` also holds a list of phrases that may never appear, in English
and in Chinese: no 100 per cent anything, nothing permanent, accredited or
clinical, no claim about viruses, no promise about anybody's health. Add one and
the build fails.

Every formaldehyde claim traces to one of four documents, cited on the page and
recorded in `content/SOURCE-NOTES.md` with the differences from the brief that
each one forced. The IARC classification appears exactly once, in the sources
block, and `verify.mjs` asserts both the count and that it never reaches a
headline.

`src/data/readings.json` ships as an empty array and the proof section renders a
visible waiting state rather than a sample figure. On a page whose whole
argument is measurement, an illustrative number would be the one lie that undoes
it.

House style: Malaysian English (colour, odour), short sentences, second person,
no exclamation marks, no em dashes anywhere in copy or code comments.

## Analytics

Set `PUBLIC_GTM_ID` to render the GTM snippet. Leave it unset and no analytics
markup is emitted at all. Five events are pushed to the dataLayer: `cta_book`,
`cta_whatsapp`, `quote_started`, `quote_package` and `quote_completed`. See
GO-LIVE.md for the parameters on each.

## Motion

One vocabulary, defined as tokens in `src/styles/global.css`:

| Token | Value | Used for |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Anything entering or leaving |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Movement across the screen |

Rules the code sticks to: `transform` and `opacity` only, never a layout
property; UI feedback under 300ms; `ease-in` never appears; hover motion is
gated behind `(hover: hover) and (pointer: fine)` so a tap does not leave a
card stuck in its hover state.

**Under `prefers-reduced-motion` nothing is hidden at all.** The reveal is
skipped entirely rather than reduced, because hiding content behind an observer
is the one failure that can leave the page blank. `npm run qa` asserts this on
both pages, and asserts the calculator still works with the preference on.

## Performance

Lighthouse mobile, on the production build: **100 across Performance,
Accessibility, Best Practices and SEO on both pages, with CLS 0.**

Three numbers in the code were measured rather than guessed, so leave them alone
unless you re-measure:

- **The hero price badges reserve 80px** (`min-h-20` in `PostRenoHero.astro`).
  The longer label wraps to two lines once Lato loads and the grid matches both
  badges to it. Reserving anything less makes the row reflow when the font
  arrives, which shows up as layout shift.
- **Exactly one image is preloaded**, the hero, which is the LCP element.
  `verify.mjs` fails the build if a second one appears.
- **The logo ships as a 16 colour palette PNG**, not WebP. WebP measured larger
  for this flat artwork at every quality setting tried. See `scripts/gen-logo.mjs`.

## Accessibility

Both pages score 100 for Accessibility in Lighthouse mobile. The calculator is
keyboard operable throughout, and the running total is announced through a
debounced `aria-live` region as a sentence rather than as a bare number, so a
held arrow key on the area field does not queue a dozen announcements.

Two colour choices are deliberate and are explained at the bottom of GO-LIVE.md:
filled blue buttons use `#0071D1` rather than `#0088F8`, and WhatsApp buttons
keep the exact brand green with navy text instead of white.
