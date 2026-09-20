import pricesData from './prices.json'

export type PriceItem = { name: string; price: number }
export type PriceGroup = { label: string; unit: string; icon: string; items: PriceItem[] }
export type Prices = {
  currency: string
  prefix: string
  pulledOn: string
  source: string
  note: string
  groups: Record<string, PriceGroup>
}

export const prices = pricesData as Prices

/**
 * Formats a price exactly as the booking form shows it: RM prefix, no decimals.
 * The one exception is a rate that is not a whole ringgit, such as the RM1.20
 * per sqft post-renovation rate, which needs its two decimals to mean anything.
 */
export function rm(value: number): string {
  const body = Number.isInteger(value) ? String(value) : value.toFixed(2)
  return `${prices.prefix}${body}`
}

/** Same, with thousands separators. Used for job totals, which run into the thousands. */
export function rmTotal(value: number): string {
  return `${prices.prefix}${Math.round(value).toLocaleString('en-MY')}`
}

/** Lowest price in a group, used for the "From RMxx" summaries. */
export function fromPrice(groupKey: keyof Prices['groups'] | string): number {
  const group = prices.groups[groupKey]
  if (!group) throw new Error(`Unknown price group: ${groupKey}`)
  return Math.min(...group.items.map((item) => item.price))
}

/** Looks up one item's price so nothing has to be repeated in the copy. */
export function priceOf(groupKey: string, itemName: string): number {
  const item = prices.groups[groupKey]?.items.find((entry) => entry.name === itemName)
  if (!item) throw new Error(`Unknown price: ${groupKey} / ${itemName}`)
  return item.price
}

/** The three numbers the whole page is built on, all read from prices.json. */
export const RATE_PER_SQFT = priceOf('postreno', 'Built-up area')
export const FORMALDEHYDE_PRICE = priceOf('treatment', 'Formaldehyde Filter')
export const STERILISATION_PRICE = priceOf('treatment', 'Air & Surface Sterilisation')

/** The base clean for a given built-up area. Rounded to the ringgit. */
export function cleanCost(sqft: number): number {
  return Math.round(sqft * RATE_PER_SQFT)
}

export const SQFT_MIN = 300
export const SQFT_MAX = 10000

export type PackageKey = 'dustFree' | 'moveInReady' | 'familySafe'

/** The three packages, priced from prices.json. Add-ons are per job, not per sqft. */
export const PACKAGES: { key: PackageKey; addOns: number }[] = [
  { key: 'dustFree', addOns: 0 },
  { key: 'moveInReady', addOns: FORMALDEHYDE_PRICE },
  { key: 'familySafe', addOns: FORMALDEHYDE_PRICE + STERILISATION_PRICE },
]

export function packageTotal(sqft: number, key: PackageKey): number {
  const entry = PACKAGES.find((item) => item.key === key)
  if (!entry) throw new Error(`Unknown package: ${key}`)
  return cleanCost(sqft) + entry.addOns
}

/** The sizes worked through in the price table, so nobody has to do the sum. */
export const WORKED_EXAMPLES = [600, 1000, 2200] as const

export const SITE = {
  name: 'Kleaner',
  tagline: 'The Benchmark of Cleaning Service',
  url: 'https://postreno.kleaner.my',
  mainSite: 'https://kleaner.my',
  upholsterySite: 'https://upholstery.kleaner.my',
  moversSite: 'https://movers.kleaner.my',
  /** Call line shown in the main site header and footer. */
  phone: '+60174770010',
  phoneDisplay: '+60174770010',
  /** WhatsApp line. Intentionally a different number from the call line. */
  whatsapp: '60174770978',
  hours: 'Monday to Sunday, 7:30 AM to 6:00 PM',
  hoursShort: 'Mon to Sun, 7:30 AM to 6:00 PM',
  areaServed: 'Kuala Lumpur and Selangor',
  areaShort: 'KL & Selangor',
  /**
   * The post-renovation entry in the BookingKoala flow could not be read in
   * this session, so this is the top of the booking flow. See
   * content/SOURCE-NOTES.md and the confirm note on the quote builder.
   */
  bookingUrl: 'https://kleaner.my/booknow/',
  reviewsUrl: 'https://kleaner.my/reviews',
  antiTheftUrl: 'https://kleaner.my/kleaners-anti-theft-policy',
  airconUrl: 'https://kleaner.my/aircond-servicing',
} as const

/** Builds a wa.me link with the prefilled message URL encoded. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export const PAGES = {
  postRenoEn: '/',
  postRenoZh: '/zh',
} as const

export const ABSOLUTE_PAGES = {
  postRenoEn: `${SITE.url}/`,
  postRenoZh: `${SITE.url}${PAGES.postRenoZh}`,
  sofaMattress: `${SITE.upholsterySite}/sofa-mattress-cleaning`,
  carpetCurtain: `${SITE.upholsterySite}/carpet-curtain-cleaning`,
} as const

export type NavItem = { label: string; href: string; children?: NavItem[] }

/** Mirrors the live kleaner.my header menu. All links are absolute. */
export const HEADER_NAV: NavItem[] = [
  { label: 'Book Now', href: 'https://kleaner.my/booknow/home_cleaning' },
  {
    label: 'Cleaning Services',
    href: 'https://kleaner.my/standard-cleaning',
    children: [
      { label: 'Standard Cleaning', href: 'https://kleaner.my/standard-cleaning' },
      { label: 'Deep Cleaning', href: 'https://kleaner.my/deep-cleaning' },
      { label: 'Move In/Out Cleaning', href: 'https://kleaner.my/move-in-out' },
      { label: 'Post Renovation Cleaning', href: ABSOLUTE_PAGES.postRenoEn },
      { label: 'Office Cleaning', href: 'https://kleaner.my/office-cleaning' },
      { label: 'Part-Time Maid', href: 'https://kleaner.my/part-time-maid' },
      { label: 'Sofa & Mattress Cleaning', href: ABSOLUTE_PAGES.sofaMattress },
      { label: 'Carpet & Curtain Cleaning', href: ABSOLUTE_PAGES.carpetCurtain },
      { label: 'Movers & Packers', href: SITE.moversSite },
      { label: 'OneClean™', href: 'https://kleaner.my/premium-clean' },
      { label: 'Aircond Service', href: SITE.airconUrl },
    ],
  },
  { label: 'Reviews', href: 'https://kleaner.my/reviews' },
  { label: 'Gift Card', href: 'https://kleaner.my/gift-card' },
  { label: 'FAQs', href: 'https://kleaner.my/faqs' },
  { label: 'Contact Us', href: 'https://kleaner.my/contact-us' },
  { label: 'Client Login', href: 'https://kleaner.my/login' },
]

/** Mirrors the live kleaner.my footer, with the standalone sites in place. */
export const FOOTER_NAV: { title: string; links: NavItem[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: 'https://kleaner.my/home' },
      { label: 'Get A Quote', href: 'https://kleaner.my/contact-us' },
      { label: 'Gift Cards', href: 'https://kleaner.my/gift-card' },
      { label: 'Blog', href: 'https://kleaner.my/blog' },
      { label: 'Book Now', href: 'https://kleaner.my/booknow/' },
      { label: 'Login/Sign Up', href: 'https://kleaner.my/login' },
    ],
  },
  {
    title: 'Cleaning Services',
    links: [
      { label: 'Standard Cleaning', href: 'https://kleaner.my/standard-cleaning' },
      { label: 'Deep Cleaning', href: 'https://kleaner.my/deep-cleaning' },
      { label: 'Move In/Out Cleaning', href: 'https://kleaner.my/move-in-out' },
      { label: 'Post Renovation Cleaning', href: ABSOLUTE_PAGES.postRenoEn },
      { label: 'Office Cleaning', href: 'https://kleaner.my/office-cleaning' },
      { label: 'Part-Time Maid', href: 'https://kleaner.my/part-time-maid' },
      { label: 'Aircond Servicing', href: SITE.airconUrl },
      { label: 'Sofa & Mattress Cleaning', href: ABSOLUTE_PAGES.sofaMattress },
      { label: 'Carpet & Curtain Cleaning', href: ABSOLUTE_PAGES.carpetCurtain },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: 'https://kleaner.my/faqs' },
      { label: 'Privacy Policy', href: 'https://kleaner.my/privacy-policy' },
      { label: 'Anti-Theft Policy', href: SITE.antiTheftUrl },
      { label: 'Reviews', href: 'https://kleaner.my/reviews' },
      { label: 'Contact Us', href: 'https://kleaner.my/contact-us' },
    ],
  },
]

/** Published on kleaner.my, reused here. */
export const REVIEWS = [
  { quote: 'Excellent service.', author: 'Surendran S.' },
  { quote: 'Always reliable and dependable', author: 'Samuel YH Chia' },
  { quote: 'Great Job. Highly recommended', author: 'Joshua Cunard' },
  { quote: 'Thorough and meticulous in cleaning', author: 'Zulfikri Aman' },
] as const

/** Trust claims already published on kleaner.my. */
export const TRUST = [
  { icon: 'shield', title: 'Vetted and trained', text: 'Our providers are background checked.' },
  { icon: 'tag', title: 'No hidden fees', text: 'Affordable pricing, quoted up front.' },
  { icon: 'leaf', title: 'Eco-friendly products', text: 'Safe cleaning products in your home.' },
  { icon: 'guarantee', title: 'Satisfaction guarantee', text: 'Not happy? We reclean or refund.' },
  { icon: 'clock', title: '100,000+ hours', text: 'Cleaning hours delivered so far.' },
  { icon: 'calendar', title: 'Manage online', text: 'Edit and manage your booking online.' },
] as const

export const SERVICE_AREAS = [
  'Kuala Lumpur',
  'Petaling Jaya',
  'Subang Jaya',
  'Shah Alam',
  'Puchong',
  'Cheras',
  'Ampang',
  'Damansara',
  'Klang',
  'Cyberjaya',
  'Putrajaya',
] as const
