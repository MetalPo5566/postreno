import { SITE, prices } from '../data/site'

const AREA_SERVED = [
  { '@type': 'City', name: 'Kuala Lumpur' },
  { '@type': 'State', name: 'Selangor' },
]

const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '07:30',
    closes: '18:00',
  },
]

export function localBusinessSchema(image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE.mainSite}/#business`,
    name: SITE.name,
    slogan: SITE.tagline,
    url: SITE.mainSite,
    telephone: SITE.phone,
    image,
    areaServed: AREA_SERVED,
    openingHoursSpecification: OPENING_HOURS,
    sameAs: [SITE.reviewsUrl],
  }
}

/** Builds Service offers straight from prices.json so the two cannot drift. */
export function serviceSchema(options: {
  name: string
  description: string
  url: string
  groups: string[]
  serviceType: string
}) {
  const offers = options.groups.flatMap((key) => {
    const group = prices.groups[key]
    if (!group) throw new Error(`Unknown price group: ${key}`)
    return group.items.map((item) => ({
      '@type': 'Offer',
      name: `${group.label} cleaning, ${item.name}`,
      price: String(item.price),
      priceCurrency: prices.currency,
      url: SITE.bookingUrl,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(item.price),
        priceCurrency: prices.currency,
        unitText: group.unit,
      },
    }))
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    serviceType: options.serviceType,
    url: options.url,
    provider: { '@id': `${SITE.mainSite}/#business` },
    areaServed: AREA_SERVED,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: prices.currency,
      lowPrice: String(Math.min(...offers.map((offer) => Number(offer.price)))),
      highPrice: String(Math.max(...offers.map((offer) => Number(offer.price)))),
      offerCount: offers.length,
      offers,
    },
  }
}
