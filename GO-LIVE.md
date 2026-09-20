# Go live checklist: postreno.kleaner.my

One page, in two languages, built as a standalone static site because
kleaner.my runs on BookingKoala and cannot host custom coded pages. Same
pattern as `movers.kleaner.my` and `upholstery.kleaner.my`.

| Page | URL once live |
| --- | --- |
| Post-Renovation Cleaning & Formaldehyde Removal | `https://postreno.kleaner.my/` |
| Chinese version | `https://postreno.kleaner.my/zh` |

This site's `/` **is** the post-renovation page. There is no hub.

---

## 0. Read this first: three things are assumed or blocked

### The domain is an assumption

`postreno.kleaner.my` was not given, it was assumed. It is set once, as
`SITE.url` in `src/data/site.ts`, and everything else reads from it: every
canonical, both hreflang tags, the sitemap, the Open Graph URL, the menu entry
and the checks in `scripts/verify.mjs`.

**If you want a different hostname, say so before deploying.** Change
`SITE.url` and `site` in `astro.config.mjs`, update the `postreno.kleaner.my`
strings in `scripts/verify.mjs`, run `npm run check`, and everything follows.
It is a two line change, but it has to happen before the URL is indexed.

### The live kleaner.my page could not be read

The machine this was built on routes outbound traffic through an egress proxy
that refuses `kleaner.my` by organisation policy. The live post-renovation page
and the booking flow could not be opened, so they could not be used as a source.
`content/SOURCE-NOTES.md` has the full account and the four things to check
against the live page before go live. **The most important one is the booking
URL**, see step 5.

### The generated photos could not be downloaded

Five photoreal images were generated in the Kleaner Higgsfield workspace and all
five completed. The same egress policy refuses the Higgsfield CDN, so they could
not be pulled into the repository. `assets/higgsfield-brief.md` lists the job
IDs and the direct links. The site currently ships gradient placeholders. See
step 7.

---

## 1. Deploy

Nothing has been pushed to a host: this session had no Vercel or Cloudflare
credentials. Both configs are committed and ready. Pick one.

### Option A: Vercel (`vercel.json` is already in the repo)

```bash
npm install -g vercel
vercel login
vercel link                 # create or select the project
vercel --prod               # builds and deploys
vercel domains add postreno.kleaner.my
vercel domains add www.postreno.kleaner.my   # then set it to redirect to the apex
```

Set the analytics variable once, before the first production build:

```bash
vercel env add PUBLIC_GTM_ID production
```

### Option B: Cloudflare Pages (`public/_redirects` and `public/_headers` are ready)

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages project create kleaner-postreno --production-branch main
wrangler pages deploy dist --project-name kleaner-postreno
```

Then in the Cloudflare dashboard: **Workers & Pages > kleaner-postreno >
Custom domains > Set up a custom domain** and enter `postreno.kleaner.my`.
Add `PUBLIC_GTM_ID` under **Settings > Environment variables** and redeploy.

## 2. The custom domain

**kleaner.my already uses Cloudflare for DNS.** Its nameservers are
`alfred.ns.cloudflare.com` and `etta.ns.cloudflare.com`, as recorded when the
upholstery site was set up. That makes this much simpler than adding a record by
hand.

`postreno.kleaner.my` does not resolve yet, so there is no existing record in
the way. This could not be re-checked from this machine, because the egress
policy also blocks DNS lookups against those hosts. Confirm it resolves to
nothing before you point it anywhere.

### If the kleaner.my zone is in the same Cloudflare account as the Pages project

This is the easy path, and the likely one.

1. Cloudflare dashboard, then **Workers & Pages**
2. Select the Pages project
3. **Custom domains**, then **Set up a custom domain**
4. Enter `postreno.kleaner.my` and confirm

Cloudflare creates the DNS record and issues the certificate itself. It is live
in a few minutes.

To check which case you are in: look at **Websites** (or **Domains**) in the
Cloudflare sidebar. If `kleaner.my` is listed, you are in this case.

### If the zone sits in a different Cloudflare account

Cloudflare will not create a record in a zone the account does not own, so
whoever holds that account has to add it. Send them this:

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| CNAME | `postreno` | the target shown in the Pages project's Custom domains tab | Proxied (orange cloud) |

Use the value the Pages project shows once you attempt to add the domain, rather
than guessing, since it is project specific.

### After the domain is live

Nothing in this repository needs changing. Every canonical URL, both hreflang
tags, the sitemap and the structured data already point at
`https://postreno.kleaner.my`, which is why the `pages.dev` address never
competes with it in search results.

---

## 3. Edit the kleaner.my menu

The main site menu lives in the BookingKoala admin website builder, not in this
repo, so it has to be edited there by hand. No browser automation was available
in this session and nobody was signed in to the admin.

**This is a change to an existing entry, not a new one.** The header and footer
already carry a "Post Renovation Cleaning" link pointing at
`https://kleaner.my/post-renovation-cleaning`. It has to be repointed.

### Header, under "Cleaning Services"

Log in to the BookingKoala admin, open **Website > Menus** (or **Website
Builder > Header**), find the **Cleaning Services** dropdown, and change the
target of the existing **Post Renovation Cleaning** item:

| Label | Old URL | New URL |
| --- | --- | --- |
| `Post Renovation Cleaning` | `https://kleaner.my/post-renovation-cleaning` | `https://postreno.kleaner.my/` |

Leave the position alone. It stays fourth, between Move In/Out Cleaning and
Office Cleaning.

### Footer

Same change, on the **Post Renovation Cleaning** entry in the footer's Cleaning
Services list.

### And decide what happens to the old page

`kleaner.my/post-renovation-cleaning` will still exist and will still be
indexed. Two pages competing for "post renovation cleaning KL" is the one thing
that will hold this page back. Pick one:

- **Best:** 301 redirect the old BookingKoala page to
  `https://postreno.kleaner.my/`. All its existing ranking passes over.
- **Acceptable:** add `<link rel="canonical" href="https://postreno.kleaner.my/">`
  to the old page, if BookingKoala lets you edit the head.
- **Worst:** leave both live and let them compete.

The new page's header and footer **already** point at this site, so the moment
you make the menu change the two match.

---

## 4. Google Tag Manager

The pages render no analytics markup at all until you set the container ID.

1. Copy the GTM container ID from the main kleaner.my site. It looks like
   `GTM-XXXXXXX`.
2. Add it as `PUBLIC_GTM_ID` in the host's environment variables (see step 1).
3. Redeploy.

Five dataLayer events fire once GTM is live:

| Event | Parameters | Fires when |
| --- | --- | --- |
| `cta_book` | `page`, `service`, `cta_text` | any Book Now control |
| `cta_whatsapp` | `page`, `service`, `cta_text` | any WhatsApp control |
| `quote_started` | `page`, `service` | first touch of any calculator control, once per page view |
| `quote_package` | `page`, `service`, `package` | package changed |
| `quote_completed` | `page`, `service`, `sqft_bucket`, `package`, `total` | Book Now or Send Quote inside the calculator |

`service` is always `post-renovation`. `sqft_bucket` is one of `300-799`,
`800-1199`, `1200-1999`, `2000-3499`, `3500+` or `over`.

Build your GTM triggers on the event names, then send them to GA4 as
conversions. `quote_completed` is the one to optimise Google Ads against: it
carries the estimated job value in `total`.

### Google Ads

This page is built as the landing page for post-renovation keywords. The hero
message-matches "post renovation cleaning KL" and "formaldehyde removal", and
the price is above the fold.

Any ad click that lands here with `utm_source` or `utm_campaign` in the URL gets
that pair appended to the WhatsApp quote as a final `Ref:` line, so a WhatsApp
lead can be traced back to the campaign that paid for it. Tag your ad
destination URLs and the attribution works with nothing else to set up.

---

## 5. The booking URL, which is still open

`Book Now` currently points at `https://kleaner.my/booknow/`, the top of the
BookingKoala flow. That is one extra click for every customer who gets that far,
which is the most expensive click on the page.

The direct post-renovation URL could not be found because the booking flow could
not be opened from this machine. **Find it and send it over.** It is one line in
`src/data/site.ts` (`SITE.bookingUrl`) and the visible note in the price section
disappears with it.

If BookingKoala has no post-renovation service configured at all, that is worth
knowing too, because then WhatsApp is the only path and the Book Now button
should be dropped rather than sent somewhere vague.

---

## 6. Answer the open copy questions

`content/OWNER-CONFIRM.md` lists **24 items**, 12 per language, each printed on
the page itself in an amber `[OWNER TO CONFIRM]` note. The twelve are the same
questions in English and Chinese.

They cover: what is in the formaldehyde treatment (asked twice, in the protocol
and in the FAQ), whether a meter reading is taken on every job, what the reading
guarantee threshold should be, minimum charge or minimum area, whether
commercial premises use the same rate, the booking URL, job duration and team
size, re-entry time after treatment, how far the scope goes into ceilings,
window exteriors, aircond and cabinet interiors, and where to send the first
real meter readings.

Those notes are **visible to visitors**, so clear them before you point the main
menu here. They are kept out of the FAQ structured data, and any FAQ question
carrying one is left out of it entirely, so Google never sees a half answer.
`npm run verify` enforces both.

### The sofa and mattress price conflict

An earlier post-renovation spec quoted lower sofa and mattress prices than the
booking form (RM80/120/160/190 and RM120/160/180 against RM88/138/168/198 and
RM108/148/168/188). **The page uses the booking form prices.** Tell us which set
applies when sofa or mattress cleaning is added to a post-renovation booking.
Note the earlier spec had three mattress tiers where the form has four, and that
for the single mattress the earlier figure is higher, not lower.

---

## 7. Photos

Everything under `public/images/` is placeholder artwork: soft brand gradients
carrying the icon set. No stock photos and nothing hotlinked.

Five photoreal replacements were generated in the Kleaner Higgsfield workspace
and are waiting there. `assets/higgsfield-brief.md` has the job IDs, the direct
links and the exact steps to drop them in. **Nobody has looked at them yet.**
Check them before they go live, in particular that no meter reading is legible
in the hero or in the Stage 3 shot.

| File | Used for | Status |
| --- | --- | --- |
| `postreno-hero.jpg` | Hero, and the only preloaded image | generated, waiting |
| `protocol-1.jpg` | Stage 1, Dust Extraction | generated, waiting |
| `protocol-2.jpg` | Stage 2, Deep Clean | generated, waiting |
| `protocol-3.jpg` | Stage 3, Formaldehyde Treatment | generated, waiting |
| `who-family.jpg` | Who books this | generated, waiting |
| `postreno-before.jpg` / `postreno-after.jpg` | The drag slider | **needs a real pair** |

Keep the **same file names** and a **4:3 crop at 1040 x 780 or larger**, drop
them in, rebuild, and the pages pick them up with no code change.

**The before and after pair must be real, and must be one room.** That section
is the proof device on a page that argues for measurement, so a generated pair,
or two different rooms, would undo the argument. Shoot it from the same tripod
mark, the same height and the same focal length, once before the team starts and
once after. Until it exists the placeholders stay and the caption says so.

---

## 8. The readings table

`src/data/readings.json` ships as an empty array, and the proof section renders
a visible "readings from our first measured jobs go here" state. **No sample
number is shown anywhere**, and `npm run verify` fails the build if the file is
empty and that state is missing.

Send the first measured jobs in this shape and they appear as cards with no code
change:

```json
[
  { "property": "Condo", "sqft": 1050, "before": 0.21, "after": 0.04, "date": "2026-10-14" }
]
```

This is the single highest value thing you can do for this page. Every
competitor claims. Nobody publishes numbers.

---

## 9. Checks after go live

```bash
npm run check       # build, then 138 content checks
npm run links       # resolve every link, writes qa/link-audit.md
npm run preview     # then, in another shell:
npm run qa          # 65 interaction checks and the screenshots
npm run lighthouse  # mobile Lighthouse over both pages
```

As built here:

| | `/` | `/zh` |
| --- | --- | --- |
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| CLS | 0 | 0 |

**Re-run `npm run links` from a machine with normal internet access.** Every
external link comes back BLOCKED here because of the egress policy, so the audit
in `qa/` proves only that the internal links resolve.

Then, by hand:

- [ ] Open both pages on a real phone. Tap Get Quote, run the calculator, send
      the WhatsApp quote to yourself and read the message that arrives.
- [ ] Check the estimated total in the message matches what the page showed.
- [ ] Click an ad style URL with `?utm_source=test&utm_campaign=test` and check
      the `Ref:` line arrives.
- [ ] Confirm the booking form shows the same prices as the page.
- [ ] Paste both URLs into WhatsApp to check the share card renders.
- [ ] Submit `https://postreno.kleaner.my/sitemap.xml` in Google Search Console.
- [ ] Run both URLs through the Google Rich Results Test.
- [ ] Check the Chinese page on a phone that has no Chinese font installed as
      system default, to confirm the fallback stack reads well.

---

## Notes on three deliberate decisions

**WhatsApp buttons use navy text, not white.** The published brand green
`#00CD56` with white text is 2.1:1, which fails accessibility. With navy text it
is 7.2:1. The brand colour is unchanged, only the text colour, which keeps both
the brand and a perfect accessibility score.

**Filled blue buttons use `#0071D1`, not `#0088F8`.** The official brand blue is
3.6:1 behind white text. `#0071D1` is 4.9:1 and passes. The official blue is
still used throughout for icons, accents and the tagline.

**The Chinese page loads no Chinese webfont.** A Simplified Chinese face is
megabytes, which would cost more than the whole rest of the page. The
`:lang(zh-Hans)` stack in `global.css` names the common system faces so Android
and Windows do not fall back to a serif, and Lato still handles Latin because
its `unicode-range` stops it at the Latin block.
