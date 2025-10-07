export type Value = {
  title: string
  description: string
}

export type LeadershipProfile = {
  name: string
  role: string
  bio: string
  image?: string
}

export const companyStory = {
  heading: 'Alexander and Troy Tours',
  introduction:
    'Alexander and Troy Tours is the trusted partner in the USA, serving as a Destination Management Company and the premiere choice as the receptive service company headquartered in New Jersey since 1999.',
  paragraphs: [
    'We assist clients around the globe with tailor-made service options covering accommodation, tour guiding and transfers, unique experiences, city tours, excursions, attraction tickets, restaurant arrangements and new travel initiatives.',
    'Our strength comes from experience, speed, reliability, established standards, privileged relationships and destination expertise. We support excellence and ethical business practices while promoting the value of our clients.',
  ],
}

export const companyValues: Value[] = [
  { title: 'Excellence in service', description: 'Pre-eminent in profession, relentlessly focused, sincere and caring with a team available 24 hours a day.' },
  { title: 'Be innovative and proactive', description: 'Think independently and differently, seek new ideas and act quickly.' },
  { title: 'Intelligence and best practices', description: 'Apply insight and proven approaches to overcome complex tasks.' },
  { title: 'Responsibility with balance', description: 'Take responsibility while being serious, fun and humble at the same time.' },
  { title: 'Crisis and operations expertise', description: 'Be the expert on crisis management as well as smooth operations.' },
  { title: 'Honor and respect', description: 'Honor and respect clients and guests at every level of engagement.' },
  { title: 'Transparent communication', description: 'Maintain open and honest communication across all levels.' },
  { title: 'Family and partnership approach', description: 'Show seamless care, promote partners and nurture long-term relationships.' },
  { title: 'Ethical business practices', description: 'Abide by ethical standards and respect cultural norms.' },
  { title: 'Create competitive advantage', description: 'Deliver solutions that lead to partner satisfaction and new referrals while valuing customer loyalty and growth.' },
]

export const globalPresence = {
  regions: [
    {
      title: 'Global presence',
      description: 'Alexander and Troy Tours supports teams across the United States, the Americas and beyond, coordinating receptive services wherever clients require assistance.',
    },
  ],
}
