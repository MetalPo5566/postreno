import type { IconName } from '../../components/Icon.astro'
import type { PackageKey } from '../site'

/**
 * The whole page, typed. Both language files satisfy this shape, so the ZH
 * page is the EN page with a different object passed in and nothing else
 * changed. Anything that is not a verified fact carries a `confirm` string,
 * which renders as a visible [OWNER TO CONFIRM] note and is collected into
 * content/OWNER-CONFIRM.md on every build.
 */
export type ConfirmText = string

export type ChecklistItem = { text: string; confirm?: ConfirmText }

export type FaqEntry = { q: string; a: string; confirm?: ConfirmText }

export type SourceEntry = {
  /** What the page is allowed to say because of this document. */
  claim: string
  /** The document, named the way it should be cited. */
  source: string
  url: string
}

export type PostRenoCopy = {
  /** Used for <html lang> and og:locale. */
  htmlLang: string
  ogLocale: string
  /** Route this copy renders at, for canonical and hreflang. */
  path: string
  langSwitch: { label: string; href: string; hrefLang: string }

  meta: { title: string; description: string; ogImage: string }

  hero: {
    eyebrow: string
    h1: string
    /** Stored for A/B, not rendered. Swap one into `h1` to run the test. */
    h1Alternates: readonly string[]
    sub: string
    anchorFrom: string
    anchorRate: string
    anchorExample: string
    ctaPrimary: string
    ctaWhatsApp: string
    waHandover: string
    trust: readonly string[]
    imageAlt: string
  }

  twoJobs: {
    eyebrow: string
    title: string
    lead: string
    visible: { title: string; lead: string; items: readonly string[] }
    invisible: { title: string; lead: string; items: readonly string[] }
    close: string
  }

  window: {
    eyebrow: string
    title: string
    lead: string
    steps: readonly { title: string; text: string; ours?: boolean }[]
    bookHere: string
    ctaTitle: string
    ctaText: string
    ctaButton: string
  }

  protocol: {
    eyebrow: string
    title: string
    lead: string
    stages: readonly {
      number: string
      title: string
      text: string
      image: string
      imageAlt: string
      items: readonly ChecklistItem[]
    }[]
  }

  proof: {
    eyebrow: string
    title: string
    lead: string
    empty: { title: string; text: string }
    columns: { property: string; sqft: string; before: string; after: string; date: string }
    unit: string
    sqftUnit: string
    confirm: ConfirmText
    slider: {
      label: string
      caption: string
      beforeLabel: string
      afterLabel: string
      beforeAlt: string
      afterAlt: string
    }
  }

  pricing: {
    eyebrow: string
    title: string
    lead: string
    rateLine: string
    recommended: string
    /** "{rate} per sqft" and "{rate} per sqft, plus {price} per job". */
    perSqft: string
    perSqftPlusJob: string
    packages: readonly {
      key: PackageKey
      name: string
      tagline: string
      waLabel: string
      includes: readonly string[]
    }[]
    builder: {
      heading: string
      propertyType: string
      propertyTypes: readonly string[]
      area: string
      areaPlaceholder: string
      sqft: string
      sqftHint: string
      sqftTooBig: string
      sqftTooSmall: string
      packageLabel: string
      addOns: string
      addOnsHint: string
      handover: string
      moveIn: string
      totalLabel: string
      totalHint: string
      totalPending: string
      /** Locale for the handover and move-in dates in the WhatsApp message. */
      dateLocale: string
      book: string
      sendQuote: string
      noJs: string
      wa: {
        intro: string
        property: string
        packageLine: string
        addOnsLine: string
        total: string
        handover: string
        moveIn: string
      }
    }
    examples: { title: string; lead: string; sizeColumn: string; note: string }
    confirmMinimum: ConfirmText
    confirmCommercial: ConfirmText
    confirmBooking: ConfirmText
  }

  guarantee: {
    eyebrow: string
    title: string
    cards: readonly { icon: IconName; title: string; text: string; confirm?: ConfirmText }[]
    antiTheft: { text: string; linkLabel: string }
  }

  whoBooks: {
    eyebrow: string
    title: string
    imageAlt: string
    items: readonly { icon: IconName; title: string; text: string }[]
  }

  faq: { eyebrow: string; title: string; items: readonly FaqEntry[] }

  reviews: { eyebrow: string; title: string }
  areas: { eyebrow: string; title: string; intro: string; outro: string }

  /** The shared trust strip, translated. Icons stay as they are. */
  trust: {
    items: readonly { icon: IconName; title: string; text: string }[]
    policy: { text: string; linkLabel: string }
  }

  crossSell: {
    eyebrow: string
    title: string
    items: readonly { icon: IconName; title: string; text: string; href: string; cta: string }[]
  }

  ctaBand: { title: string; text: string }

  sources: {
    eyebrow: string
    title: string
    lead: string
    /** Numbered label on each citation card, for example "Source". */
    label: string
    items: readonly SourceEntry[]
    carcinogen: string
    note: string
  }

  stickyBook: string
}
