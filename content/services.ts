export type ServiceItem = {
  slug: string
  href: string
  title: string
  excerpt: string
  details: string[]
}

export const services: ServiceItem[] = [
  {
    slug: 'core-services',
    href: '/services',
    title: 'Receptive Services Portfolio',
    excerpt:
      'Alexander and Troy Tours provides tailor-made receptive services covering events, logistics and travel across the United States and the Americas.',
    details: [
      'Incentive, travel, meetings and conferences event management.',
      'Group reservations for student, leisure, incentive and MICE travellers.',
      'Individual reservations (FIT) with accommodation in well-positioned hotels.',
      'Venue arrangements, airport transfers, domestic flights and ground transportation.',
      'Local guiding, city tours, meet and greet assistance and show tickets.',
      'Dining and restaurant reservations, special care for incentive and conference groups.',
      'Escorted groups, celebrations, luxury travel and product launches.',
      'Team building activities and 24-hour consultancy before, during and after events.',
    ],
  },
  {
    slug: 'mice',
    href: '/mice',
    title: 'MICE Expertise',
    excerpt:
      'Meetings, incentives, conferences and exhibitions delivered with detailed local knowledge and logistical precision.',
    details: [
      'Meetings: tailored support for gatherings of all sizes, from ad-hoc sessions to long-term agreements.',
      'Incentives: entertainment-led programmes that celebrate achievement with creative planning and expert guidance.',
      'Conferences: comprehensive coordination for forums, summits, conventions and congresses, including venue and sponsor management.',
      'Exhibitions: turnkey solutions for trade fairs and expos, supporting booth design, staffing and lead capture.',
      'Event management: full project oversight, from concept and budgeting to vendor coordination and contingency planning.',
      'Programme and content design: aligning venues, activities and branding opportunities with meeting goals.',
      'Logistics management: proactive routing, safety, staffing and change management for group and FIT travel.',
      'Marketing and representation assistance: connecting partners to suppliers, trade shows and distribution support in the US market.',
    ],
  },
]
