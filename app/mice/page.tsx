import type { Metadata } from 'next'

import { siteConfig } from '@/lib/config/site'
import { buildBreadcrumbSchema, buildMetadata } from '@/lib/seo'

const sections = [
  {
    heading: 'Meetings',
    body: 'A meeting can take countless forms, differing in content, size and setting. Alexander and Troy Tours supports every requirement—whether an ad-hoc gathering or an ongoing agreement—providing the on-site knowledge and resources needed for productive sessions.',
  },
  {
    heading: 'Incentives',
    body: 'Incentive tourism celebrates achievement and motivates teams. Our specialists design entertainment-led journeys, creative activities and decision-making support tailored to each group, balancing enjoyment with seamless planning.',
  },
  {
    heading: 'Conferences',
    body: 'Conferences and conventions demand intensive coordination. We manage venue contracting, exhibition layouts, sponsor activations and contingency planning for forums, summits, symposiums, seminars, workshops, events, congresses and annual meetings.',
  },
  {
    heading: 'Exhibitions',
    body: 'Trade fairs and expos require meticulous attention. We handle participation for groups or individuals—covering booth preparation, logistics, staffing and lead capture—so clients can focus on showcasing their brand.',
  },
  {
    heading: 'Event management',
    body: 'From concept and budgeting to permits, transportation, decor, entertainment, vendor coordination and contingency planning, our event management covers every detail across festivals, ceremonies, concerts and conventions.',
  },
  {
    heading: 'Programme and content design',
    body: 'We align venues, activities and branding opportunities with meeting goals while safeguarding ROI. Our team curates entertainment, manages timelines and supports decision making down to menu and portion planning.',
  },
  {
    heading: 'Logistics management',
    body: 'We plan and manage logistics for group and FIT travel, addressing safety, timing, service levels and financial considerations. From routing and staffing to change management, every itinerary runs smoothly.',
  },
  {
    heading: 'Marketing and representation assistance',
    body: 'Alexander and Troy Tours represents partners within the US market, building new business opportunities, arranging trade-show participation, coordinating meetings and supporting warehousing or distribution needs.',
  },
]

export const metadata: Metadata = buildMetadata({
  title: 'MICE',
  description:
    'Alexander and Troy Tours delivers Meetings, Incentives, Conferences and Exhibitions (MICE) programmes with end-to-end planning, creative content and logistical excellence.',
  path: '/mice',
})

export default function MicePage() {
  const breadcrumb = buildBreadcrumbSchema([
    { label: 'Home', url: siteConfig.url },
    { label: 'MICE', url: `${siteConfig.url}/mice` },
  ])

  return (
    <div className="space-y-12 pb-20">
      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent/80">MICE</p>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">Meetings, Incentives, Conferences and Exhibitions</h1>
          <p className="mt-6 text-base text-muted">
            “Meetings, Incentives, Conferences and Exhibitions” describes large-scale programmes planned with purpose. Alexander and Troy Tours combines local expertise with logistical precision to deliver these experiences throughout the Americas.
          </p>
        </div>
      </section>

      <section className="container mx-auto space-y-6 px-4">
        {sections.map((section) => (
          <article key={section.heading} className="rounded-3xl border bg-surface px-8 py-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground">{section.heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{section.body}</p>
          </article>
        ))}
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </div>
  )
}
