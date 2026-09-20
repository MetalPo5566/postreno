import type { PostRenoCopy } from './types'
import { SITE, ABSOLUTE_PAGES, PAGES } from '../site'

/**
 * Every word on the English page. Nothing is written into the markup, so the
 * ZH file is a drop in replacement and the two can never drift structurally.
 *
 * House rules, enforced by npm run verify: Malaysian English, short sentences,
 * second person, no exclamation marks, no em dashes, RM with no decimals. The
 * only figures here are words; every number comes from prices.json.
 */
export const EN: PostRenoCopy = {
  htmlLang: 'en-MY',
  ogLocale: 'en_MY',
  path: PAGES.postRenoEn,
  langSwitch: { label: '中文', href: PAGES.postRenoZh, hrefLang: 'zh-Hans-MY' },

  meta: {
    title: 'Post Renovation Cleaning KL & Selangor | Formaldehyde Removal | Kleaner',
    description:
      'Post renovation cleaning in KL and Selangor from RM1.20 per sqft, with formaldehyde treatment and an air reading before and after. Book the slot around your handover date.',
    ogImage: '/og/index.jpg',
  },

  hero: {
    eyebrow: 'Post-Renovation Cleaning & Formaldehyde Removal',
    h1: 'Your renovation is done. The formaldehyde is not.',
    h1Alternates: [
      'Renovation dust you can see. Formaldehyde you cannot. We remove both.',
      'Move in to a home that is clean to the last reading.',
    ],
    sub: 'Post-renovation cleaning with formaldehyde treatment, an air reading before and after, across Kuala Lumpur and Selangor.',
    anchorFrom: 'From',
    anchorRate: 'per sqft of built-up area',
    anchorExample: '1,000 sqft condo from',
    ctaPrimary: 'Get My Quote',
    ctaWhatsApp: 'Send My Handover Date',
    waHandover:
      "Hi Kleaner, my renovation handover is on ___ and I'd like post-renovation cleaning with formaldehyde treatment.",
    trust: ['100,000+ cleaning hours', 'Background checked providers', 'Not happy? We reclean or refund'],
    imageAlt:
      'A freshly renovated condominium living room in morning light, empty, with new built-in cabinets and a Kleaner cleaner holding a handheld air quality meter.',
  },

  twoJobs: {
    eyebrow: 'Two jobs, not one',
    title: 'A renovation leaves two things behind',
    lead: 'One of them settles on the floor, so everybody cleans it. The other one does not settle at all.',
    visible: {
      title: 'The one you can see',
      lead: 'Fine debris works its way into every surface and every gap the contractor opened up.',
      items: [
        'Cement and gypsum dust through the whole unit',
        'Grout haze across new tiles and marble',
        'Paint spots, silicone smears and adhesive marks',
        'Drill dust settled inside new cabinets and wardrobes',
        'Dust packed into aircond fins and grilles',
      ],
    },
    invisible: {
      title: 'The one you cannot',
      lead: 'Formaldehyde is a gas. It has no dust to sweep and it does not show up on a white cloth.',
      items: [
        'Released by the plywood, MDF and particleboard your built-ins are made of',
        'Released by the adhesives that hold them together, and used as a preservative in some paints and coatings',
        'MDF is the highest emitting of the pressed wood products, and it is what most drawer fronts and cabinet tops are cut from',
        'At the levels found indoors it irritates the eyes, nose and throat',
        'It keeps releasing long after handover, and the rate falls only slowly over years',
      ],
    },
    close: 'Most post-renovation cleaners stop at the first column.',
  },

  window: {
    eyebrow: 'Timing',
    title: 'The window between handover and move-in',
    lead: 'There is one right moment to do this, and it is narrower than most people expect. Book it now and we plan the slot around your handover date.',
    steps: [
      { title: 'Contractor handover', text: 'The keys come back to you with the work finished and the dust still everywhere.' },
      { title: 'Defect check', text: 'You walk the unit and list what has to be put right before anything else happens.' },
      {
        title: 'Kleaner post-renovation clean and formaldehyde treatment',
        text: 'Book this after the built-ins are in and before the furniture and curtains arrive. The unit is empty, so every surface that releases formaldehyde is reachable.',
        ours: true,
      },
      { title: 'Furniture in', text: 'Deliveries land on clean floors instead of grinding cement dust into them.' },
      { title: 'Move in', text: 'The first night your family sleeps in the unit is the first night that matters.' },
    ],
    bookHere: 'Book here',
    ctaTitle: 'Not ready to book a date yet?',
    ctaText:
      'Tell us your handover date and we plan the slot around it. No deposit, no form to fill in, just a message.',
    ctaButton: 'Send My Handover Date',
  },

  protocol: {
    eyebrow: 'Our method',
    title: 'The Kleaner Post-Renovation Protocol',
    lead: 'Three stages, in this order, every time. Naming the work is the only honest way to compare one quote against another.',
    stages: [
      {
        number: '01',
        title: 'Dust Extraction',
        text: 'Nothing else can be done properly until the debris is out of the unit rather than moved around it.',
        image: '/images/protocol-1.jpg',
        imageAlt: 'A cleaner running a HEPA vacuum across dusty new floor tiles in an empty unit.',
        items: [
          { text: 'HEPA vacuum across floors, walls and ceilings' },
          { text: 'High wipe-down of ledges, frames, skirting and trunking' },
          { text: 'Floor-type treatment for tiles, marble, timber, vinyl and cement' },
          { text: 'Grout haze and cement residue lifted off new tiling' },
          {
            text: 'Ceilings, window exteriors, aircond fins and cabinet interiors',
            confirm:
              'Are ceilings, window exteriors, aircond fins and cabinet interiors inside the standard post-renovation scope, or are any of them charged separately?',
          },
        ],
      },
      {
        number: '02',
        title: 'Deep Clean',
        text: 'Every surface a person will touch in the first week, done once the dust load is gone.',
        image: '/images/protocol-2.jpg',
        imageAlt: 'A cleaner wiping the inside of a newly installed kitchen cabinet.',
        items: [
          { text: 'Cabinet and wardrobe interiors, shelves and drawer runners' },
          { text: 'Glass, mirrors, window tracks and sliding door channels' },
          { text: 'Sanitary ware, taps, showers and floor traps' },
          { text: 'Switches, sockets, door handles, hinges and light fittings' },
          { text: 'Paint spots, silicone smears and adhesive residue removed by hand' },
        ],
      },
      {
        number: '03',
        title: 'Formaldehyde Treatment and Air & Surface Sterilisation',
        text: 'The stage that separates a clean unit from one that is ready to be lived in.',
        image: '/images/protocol-3.jpg',
        imageAlt: 'A technician taking an air reading with a handheld meter beside a new plywood wardrobe.',
        items: [
          { text: 'Formaldehyde Filter treatment applied across the unit' },
          { text: 'Air & Surface Sterilisation as the final pass' },
          { text: 'Treatment concentrated on the built-ins, wardrobes and cabinetry, which is where the pressed wood is' },
          {
            text: 'A handheld meter reading taken before and after the treatment',
            confirm:
              'Is a before and after meter reading taken on every job, or only when the customer asks for it? We would rather promise the smaller thing and always keep it.',
          },
          {
            text: 'What the Formaldehyde Filter treatment physically is',
            confirm:
              'What is the Formaldehyde Filter treatment, in words we may publish? We have deliberately named no chemistry, method or product until you tell us.',
          },
        ],
      },
    ],
  },

  proof: {
    eyebrow: 'Proof',
    title: 'Before and after, on a meter',
    lead: 'A cleaning company can tell you the air is better. A reading is the only thing that shows it. Readings from our own jobs are published here as we take them.',
    empty: {
      title: 'Readings from our first measured jobs go here',
      text: 'This table stays empty until we have our own readings to put in it. We will not print a sample number, a stock figure or a percentage we did not measure.',
    },
    columns: { property: 'Property', sqft: 'Built-up', before: 'Before', after: 'After', date: 'Date' },
    unit: 'ppm',
    sqftUnit: 'sqft',
    confirm:
      'Once the first jobs are measured, send us the readings (property type, built-up sqft, before, after, date) and they go straight into src/data/readings.json.',
    slider: {
      label: 'Drag to compare before and after',
      caption: 'Drag to compare before and after. Photos are placeholders until we add real job photos.',
      beforeLabel: 'Before',
      afterLabel: 'After',
      beforeAlt: 'A newly renovated room before the post-renovation clean, with construction dust across the floor.',
      afterAlt: 'The same room after the post-renovation clean.',
    },
  },

  pricing: {
    eyebrow: 'Price',
    title: 'Work out your price now',
    lead: 'Post-renovation cleaning is charged on built-up area. The two air treatments are a flat price per job, whatever the size of the unit.',
    rateLine: 'per sqft of built-up area, one-off service',
    recommended: 'Recommended',
    perSqft: '{rate} per sqft',
    perSqftPlusJob: '{rate} per sqft, plus {price} per job',
    packages: [
      {
        key: 'dustFree',
        name: 'Dust-Free',
        tagline: 'The post-renovation clean on its own.',
        waLabel: 'Dust-Free (post-renovation clean)',
        includes: ['Stage 1 Dust Extraction', 'Stage 2 Deep Clean'],
      },
      {
        key: 'moveInReady',
        name: 'Move-In Ready',
        tagline: 'The clean, plus the treatment for what the clean cannot reach.',
        waLabel: 'Move-In Ready (clean + formaldehyde treatment)',
        includes: ['Stage 1 Dust Extraction', 'Stage 2 Deep Clean', 'Formaldehyde Filter treatment'],
      },
      {
        key: 'familySafe',
        name: 'Family Safe',
        tagline: 'Everything, including the final sterilisation pass.',
        waLabel: 'Family Safe (clean + formaldehyde treatment + sterilisation)',
        includes: [
          'Stage 1 Dust Extraction',
          'Stage 2 Deep Clean',
          'Formaldehyde Filter treatment',
          'Air & Surface Sterilisation',
        ],
      },
    ],
    builder: {
      heading: 'Your quote',
      propertyType: 'Property type',
      propertyTypes: ['Condo', 'Landed', 'Shoplot', 'Office', 'Restaurant'],
      area: 'Area or project name',
      areaPlaceholder: 'Mont Kiara',
      sqft: 'Built-up area in sqft',
      sqftHint: 'Between 300 and 10,000 sqft. It is on your S&P or your floor plan.',
      sqftTooBig: 'Above 10,000 sqft we quote after a site visit. WhatsApp us for a site visit.',
      sqftTooSmall: 'Enter a built-up area of 300 sqft or more.',
      packageLabel: 'Package',
      addOns: 'Add sofa or mattress cleaning',
      addOnsHint: 'Optional. Same visit, booking form prices.',
      handover: 'Handover date',
      moveIn: 'Move-in date',
      totalLabel: 'Estimated total',
      totalHint: 'An estimate from the rates on this page, not a deposit or a contract.',
      totalPending: 'On request',
      dateLocale: 'en-GB',
      book: 'Book Now',
      sendQuote: 'Send Quote on WhatsApp',
      noJs: 'The three packages are priced in the table below for 600, 1,000 and 2,200 sqft. For your own size, multiply your built-up area by the rate above and add the package price.',
      wa: {
        intro: "Hi Kleaner, I'd like to book post-renovation cleaning.",
        property: 'Property',
        packageLine: 'Package',
        addOnsLine: 'Add-ons',
        total: 'Estimated total',
        handover: 'Handover',
        moveIn: 'Move-in',
      },
    },
    examples: {
      title: 'Worked out for three common sizes',
      lead: 'Every figure below is your built-up area times the rate, plus the flat price of the treatments in that package.',
      sizeColumn: 'Built-up area',
      note: 'The clean is charged per sqft. The two treatments are per job, so the bigger the unit, the smaller their share of the bill.',
    },
    confirmMinimum:
      'Is there a minimum charge or a minimum built-up area for a post-renovation booking? The calculator currently applies neither.',
    confirmCommercial:
      'Do shoplots, offices and restaurants use the same RM1.20 per sqft rate as homes? The calculator currently applies it to all five property types.',
    confirmBooking:
      'What is the direct booking URL for post-renovation cleaning in the BookingKoala flow? Book Now currently points at the top of kleaner.my/booknow/, which means one extra click for the customer.',
  },

  guarantee: {
    eyebrow: 'Guarantee',
    title: 'What you are covered by',
    cards: [
      {
        icon: 'guarantee',
        title: 'Satisfaction guarantee',
        text: 'Not happy with the clean? We reclean or refund. This is the guarantee already published across Kleaner, and it applies to this service in the same way.',
      },
      {
        icon: 'shield',
        title: 'Anti-theft policy',
        text: 'Every provider is background checked, and our anti-theft policy is published in full on the main site. An empty unit before move-in is exactly when that matters.',
      },
      {
        icon: 'wind',
        title: 'Reading guarantee',
        text: 'Draft. A guarantee written against a meter reading would be the strongest thing on this page, so we are not publishing one until the number behind it is yours.',
        confirm:
          'Do you want a reading guarantee, and at what threshold? For example: if the after reading is not below an agreed figure, we re-treat at no charge. Give us a number you are comfortable standing behind in every unit and we will write it up.',
      },
    ],
    antiTheft: {
      text: 'Our anti-theft policy is published in full at',
      linkLabel: 'kleaner.my',
    },
  },

  whoBooks: {
    eyebrow: 'Who books this',
    title: 'The people who do not wait and see',
    imageAlt: 'A young Malaysian family standing at the door of their new, empty home.',
    items: [
      {
        icon: 'home',
        title: 'New parents',
        text: 'A baby spends most of the day at floor level in the room with the newest cabinets. Move-in night is not the time to start wondering.',
      },
      {
        icon: 'shield',
        title: 'Families with elderly parents or asthma',
        text: 'Eyes, nose and throat are the first things formaldehyde irritates, and they are already the sensitive ones in the house.',
      },
      {
        icon: 'handshake',
        title: 'Landlords before a new tenancy',
        text: 'A unit that is clean to a reading hands over faster, shows better and gives the incoming tenant nothing to open a dispute about.',
      },
      {
        icon: 'tag',
        title: 'Office and shoplot fit-outs',
        text: 'A fresh fit-out is the same plywood and the same adhesives, with a full team due to sit in it from the first Monday.',
      },
    ],
  },

  faq: {
    eyebrow: 'Questions',
    title: 'Before you book',
    items: [
      {
        q: 'How long does the job take?',
        a: 'It depends on the built-up area and how much debris the contractor left. We confirm the window with you when you book, and the team stays until the checklist is finished rather than until a clock runs out.',
        confirm:
          'What is the typical duration and team size by property size? A line such as "1,000 sqft, three cleaners, about six hours" would replace this answer.',
      },
      {
        q: 'Should I book before or after the furniture arrives?',
        a: 'Before. Book after the built-ins are installed and before furniture and curtains come in. An empty unit means every surface that holds dust or releases formaldehyde can be reached, and your new furniture never lands on cement dust.',
      },
      {
        q: 'Is it safe for a baby, a pregnant mother and pets?',
        a: 'The point of the service is to make the unit safer to move into, and our products are the eco-friendly range used across Kleaner. We will tell you how long to stay out after the treatment when you book.',
        confirm:
          'What is the re-entry time after the formaldehyde treatment and the sterilisation, and is there separate guidance for babies, pregnancy or pets? We will not publish a number we have not been given.',
      },
      {
        q: 'Will there still be a smell afterwards?',
        a: 'Possibly, and smell is not a reliable gauge either way. Fresh paint and new timber carry odours that are not formaldehyde, and formaldehyde can sit below the level you would notice. That is why we work to a meter rather than to a nose.',
      },
      {
        q: 'My contractor already cleaned the unit.',
        a: 'Contractor cleaning is a debris clear-out, which is a different job. It is not a HEPA extraction, it does not reach cabinet interiors or aircond fins, and no part of it addresses the gas coming off the built-ins.',
      },
      {
        q: 'Can I just open the windows for two weeks?',
        a: 'Ventilation helps and costs nothing, so do it anyway. It does not stop the source. The US EPA puts the emission half-life of pressed wood products at roughly 1.5 to 2 years, so the built-ins keep releasing long after the windows have done their part.',
      },
      {
        q: 'Do you cover my area?',
        a: 'We clean across Kuala Lumpur and Selangor, including PJ, Subang Jaya, Shah Alam, Puchong, Cheras, Ampang, Damansara, Klang, Cyberjaya and Putrajaya. Not on the list? WhatsApp your address and we will confirm.',
      },
      {
        q: 'What is actually in the formaldehyde treatment?',
        a: 'We would rather leave this blank than describe it loosely. Ask us on WhatsApp and we will tell you exactly what is used in your unit before the team arrives.',
        confirm:
          'What is the Formaldehyde Filter treatment, described in words we may publish? Until you tell us, this page names no chemistry, no method and no product.',
      },
      {
        q: 'Do you clean inside cabinets and the aircond?',
        a: 'Cabinet and wardrobe interiors are in Stage 2, and they are where drill dust collects. Aircond fins hold renovation dust too, and how far we go into the unit is worth confirming before you book.',
        confirm:
          'How far does the standard scope go into an aircond unit, and is a full aircond service a separate booking? We have kept the answer vague rather than guess.',
      },
      {
        q: 'How do I book?',
        a: 'Work out your price on this page, then send it to us on WhatsApp or book online. If you do not have a firm date yet, send us your handover date and we will hold the right slot around it.',
      },
    ],
  },

  reviews: { eyebrow: 'Reviews', title: 'What our customers say' },
  areas: {
    eyebrow: 'Coverage',
    title: 'Where we clean',
    intro: 'We clean across Kuala Lumpur and Selangor, including:',
    outro: 'Not on the list? WhatsApp us your address and we will confirm whether we cover it.',
  },

  trust: {
    items: [
      { icon: 'shield', title: 'Vetted and trained', text: 'Our providers are background checked.' },
      { icon: 'tag', title: 'No hidden fees', text: 'Affordable pricing, quoted up front.' },
      { icon: 'leaf', title: 'Eco-friendly products', text: 'Safe cleaning products in your home.' },
      { icon: 'guarantee', title: 'Satisfaction guarantee', text: 'Not happy? We reclean or refund.' },
      { icon: 'clock', title: '100,000+ hours', text: 'Cleaning hours delivered so far.' },
      { icon: 'calendar', title: 'Manage online', text: 'Edit and manage your booking online.' },
    ],
    policy: { text: 'Read our', linkLabel: 'anti-theft policy' },
  },

  crossSell: {
    eyebrow: 'Also from Kleaner',
    title: 'Moving in too?',
    items: [
      {
        icon: 'home',
        title: 'Movers by Kleaner',
        text: 'The clean and the move are the same fortnight. One company, one schedule, and nothing arrives before the unit is ready for it.',
        href: SITE.moversSite,
        cta: 'See Movers by Kleaner',
      },
      {
        icon: 'sofa',
        title: 'Sofa & Mattress Cleaning',
        text: 'Bringing the old sofa and mattresses into the new home? Have them cleaned in the same visit rather than moving the last house into this one.',
        href: ABSOLUTE_PAGES.sofaMattress,
        cta: 'See sofa and mattress prices',
      },
      {
        icon: 'wind',
        title: 'Aircond Servicing',
        text: 'Renovation dust packs into the fins and the blower. A service after the works stops the unit blowing it back out at you every night.',
        href: SITE.airconUrl,
        cta: 'See aircond servicing',
      },
    ],
  },

  ctaBand: {
    title: 'Clean to the last reading, before you move in',
    text: 'Send us your handover date and we will plan the slot around it. Post-renovation cleaning and formaldehyde treatment across KL and Selangor.',
  },

  sources: {
    eyebrow: 'Sources',
    title: 'Where the formaldehyde facts on this page come from',
    label: 'Source',
    lead: 'Every claim about formaldehyde on this page traces to one of these four documents. None of them is ours. If a document does not say it, this page does not say it.',
    items: [
      {
        claim:
          'The short-term indoor air guideline for formaldehyde is 0.1 mg/m3, which is about 0.08 ppm, as a 30-minute average, set to prevent sensory irritation.',
        source: 'World Health Organization, WHO Guidelines for Indoor Air Quality: Selected Pollutants (2010), formaldehyde chapter',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK138711/',
      },
      {
        claim:
          'In Malaysia, the acceptable limit for formaldehyde in indoor air at non-industrial workplaces is 0.1 ppm, as an eight-hour time-weighted average.',
        source: 'Department of Occupational Safety and Health Malaysia, Industry Code of Practice on Indoor Air Quality 2010',
        url: 'https://medicine.um.edu.my/pdf/OSHE/resources/4.%20Industrial%20Code%20of%20Practice%20(ICOP)/ICOP%20INDOOR%20AIR%20QUALITY%20(IAQ)%202010.pdf',
      },
      {
        claim:
          'In homes, the largest sources of formaldehyde are pressed wood products bonded with urea-formaldehyde resin: particleboard, hardwood plywood panelling and MDF. Formaldehyde is also a component of glues and adhesives and a preservative in some paints and coatings. MDF is generally the highest emitting of the pressed wood products.',
        source: 'United States Environmental Protection Agency, What should I know about formaldehyde and indoor air quality?',
        url: 'https://www.epa.gov/indoor-air-quality-iaq/what-should-i-know-about-formaldehyde-and-indoor-air-quality',
      },
      {
        claim:
          'Emissions from pressed wood products fall over time rather than stopping, with an estimated emission half-life of roughly 1.5 to 2 years.',
        source: 'United States Environmental Protection Agency, Indoor Air Exposure Assessment for Formaldehyde',
        url: 'https://www.epa.gov/formaldehyde/formaldehyde-emission-standards-composite-wood-products',
      },
    ],
    carcinogen:
      'For completeness: the International Agency for Research on Cancer classifies formaldehyde in Group 1, carcinogenic to humans, on the basis of sufficient evidence in humans and in experimental animals. We state that here once, as context, and nowhere else on this page. We make no claim about anybody’s health, and no cleaning service can.',
    note:
      'What we do not claim: we do not promise to remove every last trace, we do not describe the treatment as permanent, accredited or clinical, we make no claim about viruses, and we make no promise about anybody\u2019s health. The guideline figures above are published standards, not a result we guarantee in your unit.',
  },

  stickyBook: 'Get Quote',
}
