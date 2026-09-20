# Source notes

What this page is allowed to say, and where each statement came from. Written
before the copy, checked against the copy afterwards.

Pulled on 20 September 2026.

---

## 1. The live kleaner.my page could not be read

**This is the biggest open item on the project. Please read it first.**

The brief asked for `https://kleaner.my/post-renovation-cleaning` and the
booking flow at `https://kleaner.my/booknow/` to be read, so the new page could
follow the live site on inclusions and so the post-renovation booking URL could
be found.

Neither could be opened. The machine this site was built on routes all outbound
traffic through an egress proxy, and that proxy refuses `kleaner.my` and
`www.kleaner.my` by organisation policy:

```
EGRESS_BLOCKED: Access to kleaner.my is blocked by the network egress proxy.
EGRESS_BLOCKED: Access to www.kleaner.my is blocked by the network egress proxy.
```

Both hostnames were tried once. The policy is not something to route around, so
no further attempt was made and no third party mirror or cache was used as a
stand in for the live page.

### What follows from that

The brief's rule was: anything that neither the live site nor the brief states
gets an `[OWNER TO CONFIRM]` note. With the live site unreadable, **the brief is
the only source of fact about the service itself**, and everything the brief
does not cover carries a note. That is why there are 12 notes per language
rather than the handful there would otherwise be.

Three consequences worth calling out:

1. **The booking URL is a fallback.** `SITE.bookingUrl` is
   `https://kleaner.my/booknow/`, the top of the flow, with a visible note in
   the price section asking for the direct post-renovation URL. The brief
   allowed exactly this fallback.
2. **Inclusions could not be reconciled.** The brief said the live page wins
   over the brief on inclusions. It could not be consulted, so the Protocol
   checklist is built from the brief alone, and the items the brief did not name
   (ceilings, window exteriors, aircond fins, cabinet interiors) carry a note
   rather than being asserted.
3. **Nothing was inferred from search results.** A web search returned a
   snippet describing Kleaner as removing "formaldehyde and VOCs". That is a
   search engine's summary, not the live page, so it was not treated as a fact
   and nothing on the new page rests on it.

### Please check these against the live page before go live

- [ ] The direct booking URL for post-renovation cleaning in BookingKoala.
- [ ] Whether the live page's inclusion list differs from the three stage
      Protocol on the new page. If it does, the live page wins and we will edit.
- [ ] Whether the live page states any price, minimum charge or minimum area
      that contradicts the owner supplied rates below.
- [ ] Whether the live page already states a re-entry time or a treatment
      description, which would clear two of the twelve notes immediately.

---

## 2. Prices

From the owner, via the brief. Held in `src/data/prices.json` and asserted
against `BRIEF_PRICES` in `scripts/verify.mjs`, so neither can drift alone.

| Item | Price | Unit |
| --- | --- | --- |
| Post-renovation cleaning | RM1.20 | per sqft of built-up area, one-off |
| Formaldehyde Filter treatment | RM280 | per job |
| Air & Surface Sterilisation | RM300 | per job |
| Sofa 1 / 2 / 3 Seater / L-Shaped | RM88 / RM138 / RM168 / RM198 | per sofa |
| Mattress Single / Queen / King / Super King | RM108 / RM148 / RM168 / RM188 | per mattress |
| Carpet, four sizes | RM80 / RM110 / RM130 / RM160 | per carpet |
| Curtain / Sheer | RM68 / RM30 | per piece |

The carpet and curtain groups are kept in the data file although this page does
not price them, because the cross-sell points at the upholstery site and the
two files are meant to stay identical.

### The one price conflict, logged as the brief asked

An earlier post-renovation spec quoted **lower** sofa and mattress prices than
the booking form:

| | Earlier post-reno spec | Booking form, used on this page |
| --- | --- | --- |
| Sofa | RM80 / 120 / 160 / 190 | RM88 / 138 / 168 / 198 |
| Mattress | RM120 / 160 / 180 | RM108 / 148 / 168 / 188 |

The page uses the booking form prices, as instructed. Note that the earlier
mattress spec has three tiers against the booking form's four, and that for the
single mattress the earlier spec is **higher**, not lower. This is carried into
`content/OWNER-CONFIRM.md` as a question for the owner: which set applies when
sofa or mattress cleaning is added to a post-renovation booking.

### RM1.20 and the no-decimals rule

House style is RM with no decimals. A per sqft rate is meaningless without them,
so `rm()` in `src/data/site.ts` prints two decimals only when the value is not a
whole ringgit. `verify.mjs` enforces that the rate is the **only** RM figure on
either page carrying decimals.

---

## 3. Facts stated as fact

All from the brief, all already published by Kleaner.

- Kleaner cleans Kuala Lumpur and Selangor.
- 100,000+ cleaning hours delivered.
- Providers are background checked.
- Satisfaction guarantee: not happy, we reclean or refund.
- Anti-theft policy at `kleaner.my/kleaners-anti-theft-policy`.
- WhatsApp +60 17-477 0978. Call line +60 17-477 0010.
- Hours Monday to Sunday, 7:30 AM to 6:00 PM.
- The four reviews already in `site.ts`.
- Tagline: The Benchmark of Cleaning Service.

---

## 4. Formaldehyde: the four sources, verified

Every formaldehyde statement on the page traces to one of these. Each was
checked by web search on 20 September 2026 before the copy was written. Where a
source turned out to say something different from the brief, **the page follows
the source**, and the difference is recorded here.

### 4.1 WHO indoor air guideline

> The short-term indoor air guideline for formaldehyde is 0.1 mg/m3, about
> 0.08 ppm, as a 30-minute average, set to prevent sensory irritation.

WHO Guidelines for Indoor Air Quality: Selected Pollutants (2010), formaldehyde
chapter. <https://www.ncbi.nlm.nih.gov/books/NBK138711/>

Matches the brief. The source adds that the 30-minute value is also considered
to prevent long-term effects, and that it derives from a NOAEL of 0.6 mg/m3 for
the eye blink response with an assessment factor of 5. The page states the
guideline only and does not reason from it.

### 4.2 Malaysia DOSH

> In Malaysia the acceptable limit for formaldehyde in indoor air at
> non-industrial workplaces is 0.1 ppm, as an eight-hour time-weighted average.

Department of Occupational Safety and Health Malaysia, Industry Code of Practice
on Indoor Air Quality 2010.
<https://medicine.um.edu.my/pdf/OSHE/resources/4.%20Industrial%20Code%20of%20Practice%20(ICOP)/ICOP%20INDOOR%20AIR%20QUALITY%20(IAQ)%202010.pdf>

**Difference from the brief, and the page follows the source.** The brief gave
the figure as "formaldehyde limit (0.1 ppm)" without qualification. The figure
is right, but two qualifications matter and the page carries both: it is an
**eight-hour time-weighted average**, not a ceiling, and the Code applies to
**non-industrial workplaces**, not to homes. Writing it as a residential limit
would have been wrong, and a competitor or a regulator would be right to say so.

The link is a university-hosted copy of the Code. DOSH's own copy sits behind a
path that could not be resolved from this machine. Swap the link for the DOSH
URL before go live if you have it.

### 4.3 IARC classification

> IARC classifies formaldehyde in Group 1, carcinogenic to humans, on sufficient
> evidence in humans and in experimental animals.

IARC Monographs Volume 88 (working group June 2004, published 2006), which
raised formaldehyde from Group 2A to Group 1.
<https://inchem.org/documents/iarc/vol88/volume88.pdf>

As the brief required, this appears **once**, in the sources block, and nowhere
else. `verify.mjs` asserts exactly one occurrence per page and asserts that the
word does not appear in any `h1` or `h2`. The sentence is immediately followed
by a statement that we make no claim about anybody's health.

### 4.4 US EPA, pressed wood

> In homes the largest sources of formaldehyde are pressed wood products bonded
> with urea-formaldehyde resin: particleboard, hardwood plywood panelling and
> MDF. Formaldehyde is also a component of glues and adhesives and a preservative
> in some paints and coatings. MDF is generally the highest emitting of the
> pressed wood products.

US EPA, What should I know about formaldehyde and indoor air quality?
<https://www.epa.gov/indoor-air-quality-iaq/what-should-i-know-about-formaldehyde-and-indoor-air-quality>

> Emissions from pressed wood products fall over time rather than stopping, with
> an estimated emission half-life of roughly 1.5 to 2 years.

US EPA, Indoor Air Exposure Assessment for Formaldehyde.
<https://www.epa.gov/formaldehyde/formaldehyde-emission-standards-composite-wood-products>

**Two differences from the brief, both in the page's favour.**

1. The brief listed "plywood and MDF built-ins, laminate, adhesives and fresh
   paint". EPA supports particleboard, hardwood plywood and MDF, plus glues and
   adhesives, plus formaldehyde as a preservative in **some** paints and
   coatings. The page says "some paints and coatings", not "fresh paint", which
   is what the source supports. Laminate is not claimed as a source in its own
   right. EPA's separate laminate flooring guidance is about the core board,
   which is already covered by the pressed wood claim.
2. The brief said formaldehyde "keeps releasing for months after handover". The
   source is stronger: emissions may last multiple years, with a half-life of
   1.5 to 2 years. The page says it keeps releasing long after handover and that
   the rate falls only slowly over years, and the FAQ answer on ventilation
   quotes the half-life directly.

### What is deliberately not claimed

No reading, percentage, quote, award or certification is invented anywhere. The
page never says 100 per cent anything, never says permanent, accredited or
clinical, makes no claim about viruses and no promise about anybody's health.
`verify.mjs` holds a list of forbidden phrases in both English and Chinese and
fails the build if any of them appears.

`src/data/readings.json` ships as an empty array and the proof section renders a
visible waiting state. No sample number is shown, and `verify.mjs` checks that
the waiting state is present whenever the file is empty.

---

## 5. Assumptions flagged elsewhere

- `https://postreno.kleaner.my` is an assumption. It is set as `SITE.url`, it
  drives every canonical, hreflang and sitemap entry, and it is flagged at the
  top of GO-LIVE.md.
- The "Post Renovation Cleaning" entry in the header and footer now points at
  this site's root rather than at `kleaner.my/post-renovation-cleaning`. The
  BookingKoala menu has to be edited to match, which is step 3 of GO-LIVE.md.
