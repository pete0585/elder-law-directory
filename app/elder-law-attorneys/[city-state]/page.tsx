import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Scale, MapPin, Phone, Globe, ArrowRight, ChevronRight, Shield, Users, BookOpen } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCityAndState } from '@/lib/data'
import { STATE_NAMES } from '@/lib/utils'

interface CityInfo {
  city: string
  state: string
  intro: string
  medicaidNote: string
  urgencyNote: string
}

const CITY_DATA: Record<string, CityInfo> = {
  'miami-fl': {
    city: 'Miami',
    state: 'FL',
    intro: 'Miami-Dade County is home to more than 400,000 residents over 65 — one of the densest concentrations of seniors in the country. When a parent needs nursing home care and Medicaid planning becomes urgent, families need an attorney who knows Florida\'s rules inside out.',
    medicaidNote: 'Florida Medicaid limits nursing home income to $2,742/month and allows a Community Spouse Resource Allowance of up to $148,620. Miami elder law attorneys navigate these thresholds and the 5-year lookback every day.',
    urgencyNote: 'A Medicaid crisis — parent hospitalized, placement needed immediately — is where the right attorney earns their fee. Miami has no shortage of elder law attorneys, but finding one who specializes in Medicaid crisis planning, not just estate planning, matters.',
  },
  'tampa-fl': {
    city: 'Tampa',
    state: 'FL',
    intro: 'Hillsborough County\'s elder law market serves a large retiree population from across Central Florida. Tampa is a hub for elder law attorneys covering not just Hillsborough but neighboring Pinellas, Pasco, and Hernando counties.',
    medicaidNote: 'Florida\'s Medicaid rules apply statewide: $2,742/month income limit, 5-year lookback, and spousal impoverishment protections. Tampa elder law attorneys are experienced with the Hillsborough County circuit court for guardianship proceedings.',
    urgencyNote: 'Tampa Bay\'s large assisted living and nursing home community means elder law attorneys here handle a high volume of Medicaid crisis cases. If you\'re past the 5-year lookback window, the options are narrower — find an attorney now.',
  },
  'orlando-fl': {
    city: 'Orlando',
    state: 'FL',
    intro: 'Orange County has grown rapidly, and its senior population has grown with it. Many Orlando-area retirees are former hospitality and tourism workers with modest savings — exactly the population for whom Medicaid planning is most critical.',
    medicaidNote: 'Florida\'s $2,742/month Medicaid income cap means most seniors qualify financially. The challenge in Orlando is asset planning: protecting a home, a spouse\'s resources, and any retirement savings before the 5-year lookback window closes.',
    urgencyNote: 'Elder law attorneys in Orlando handle the full spectrum — estate planning before a crisis, guardianship when incapacity arrives, and Medicaid restructuring when a parent needs immediate placement.',
  },
  'jacksonville-fl': {
    city: 'Jacksonville',
    state: 'FL',
    intro: 'Jacksonville is Florida\'s largest city by area, and Duval County\'s elder law market reflects its military and civilian retiree mix. Many Jacksonville families navigating elder care also have VA benefits questions on top of Medicaid planning.',
    medicaidNote: 'Florida Medicaid rules apply, and Jacksonville elder law attorneys are particularly experienced with VA Aid and Attendance — a benefit that can pay up to $2,727/month for a married veteran in long-term care, often used alongside Medicaid.',
    urgencyNote: 'The combination of VA benefits and Medicaid planning is a specialty in Jacksonville. If your parent is a wartime veteran, find an elder law attorney who handles both — the interaction between VA Aid and Attendance and Medicaid eligibility is complex.',
  },
  'fort-lauderdale-fl': {
    city: 'Fort Lauderdale',
    state: 'FL',
    intro: 'Broward County sits between Miami and Palm Beach, and its elder law market serves a dense retirement community from Coral Springs to Hallandale Beach. Fort Lauderdale elder law attorneys handle everything from routine estate planning to emergency Medicaid applications.',
    medicaidNote: 'Broward County\'s probate court handles all guardianship proceedings for the county. Fort Lauderdale elder law attorneys know Broward\'s probate judges, court timelines, and local procedures — which matters when time is critical.',
    urgencyNote: 'In a Medicaid crisis, every week you delay costs assets. Fort Lauderdale has a deep bench of elder law attorneys — the goal is finding one who specializes in crisis planning, not just annual reviews.',
  },
  'west-palm-beach-fl': {
    city: 'West Palm Beach',
    state: 'FL',
    intro: 'Palm Beach County has one of the wealthiest senior populations in Florida. Elder law attorneys here work with significantly higher asset levels — complex trusts, business interests, real estate portfolios — alongside the same Medicaid planning fundamentals.',
    medicaidNote: 'High-asset families in Palm Beach County face a different set of Medicaid planning challenges. Attorneys here structure Medicaid Asset Protection Trusts (MAPTs), annuities, and spousal refusal strategies to protect larger estates.',
    urgencyNote: 'If assets significantly exceed Medicaid thresholds, the planning is more complex and the stakes are higher. West Palm Beach elder law attorneys experienced with high-net-worth Medicaid planning are worth finding early.',
  },
  'phoenix-az': {
    city: 'Phoenix',
    state: 'AZ',
    intro: 'Maricopa County is Arizona\'s largest elder law market, serving both longtime residents and the retirees who move to Phoenix for the climate. Arizona\'s Medicaid program (AHCCCS) has some of the strictest rules in the country — expert guidance matters.',
    medicaidNote: 'Arizona AHCCCS (the state Medicaid program) does not provide a Community Spouse Resource Allowance in some long-term care programs, making spousal impoverishment planning critical. Phoenix elder law attorneys know AHCCCS rules, appeals processes, and income-only trusts.',
    urgencyNote: 'Arizona\'s Medicaid rules can catch families off guard. The state\'s refusal to provide a spousal CSRA in some programs means a healthy spouse can be left with very little. Planning before a crisis prevents this — find an attorney before placement is needed.',
  },
  'scottsdale-az': {
    city: 'Scottsdale',
    state: 'AZ',
    intro: 'Scottsdale\'s elder law market serves an affluent retirement community with significant real estate and investment assets. Elder law attorneys here frequently work with snowbirds who divide time between Arizona and another state, creating multi-state planning complexity.',
    medicaidNote: 'Multi-state Medicaid planning — for seniors who own property in multiple states or split residency — is a specialty need in Scottsdale. Arizona and the home state may have different lookback rules, exemption lists, and estate recovery programs.',
    urgencyNote: 'Scottsdale\'s elder care facilities are among the most expensive in Arizona. The gap between what a family can pay and what Medicaid covers often has a legal solution — but the window to plan can be short.',
  },
  'tucson-az': {
    city: 'Tucson',
    state: 'AZ',
    intro: 'Pima County\'s elder law market is smaller than Phoenix but experienced. Tucson has a significant VA population and a large retired University of Arizona community. Elder law attorneys here handle AHCCCS, VA benefits, and guardianship for Pima County Superior Court.',
    medicaidNote: 'Tucson elder law attorneys handle AHCCCS long-term care applications, income-only trusts for Arizona\'s strict eligibility rules, and VA Aid and Attendance applications — often in combination for veteran clients.',
    urgencyNote: 'Pima County\'s assisted living and nursing home market is growing. Finding a Tucson elder law attorney who handles both AHCCCS and VA benefits simultaneously reduces the planning burden on families.',
  },
  'los-angeles-ca': {
    city: 'Los Angeles',
    state: 'CA',
    intro: 'Los Angeles County has more than 1.2 million residents over 65. California\'s Medi-Cal program (the state Medicaid) expanded significantly in 2023 — including for seniors with higher incomes — making elder law planning both more accessible and more complex.',
    medicaidNote: 'California eliminated Medi-Cal estate recovery for most beneficiaries in 2017, and further expanded access in 2023. LA elder law attorneys help families navigate Medi-Cal\'s income and asset rules, spousal protections, and the interaction between Medi-Cal and Medicare Supplement plans.',
    urgencyNote: 'Los Angeles nursing home costs average $8,000–$12,000/month. Medi-Cal planning can protect assets and fund care simultaneously — but the rules changed significantly in 2023. Find an elder law attorney current on California\'s updated Medi-Cal rules.',
  },
  'san-diego-ca': {
    city: 'San Diego',
    state: 'CA',
    intro: 'San Diego has the largest concentration of military retirees of any US city — making VA Aid and Attendance a central part of elder law planning here. San Diego elder law attorneys regularly combine VA benefits and Medi-Cal planning for veteran families.',
    medicaidNote: 'California Medi-Cal and VA Aid and Attendance serve different needs and can often be used together. San Diego elder law attorneys experienced in both can find combinations that cover nursing home or in-home care costs that neither program covers alone.',
    urgencyNote: 'For San Diego veteran families, an elder law attorney who knows both VA and Medi-Cal rules can find coverage and asset protection strategies unavailable to families using just one system.',
  },
  'san-francisco-ca': {
    city: 'San Francisco',
    state: 'CA',
    intro: 'San Francisco\'s elder care costs are among the highest in the country. Bay Area nursing home rates routinely exceed $15,000/month, making Medi-Cal planning not just useful but essential for most families — regardless of asset level.',
    medicaidNote: 'California\'s 2023 Medi-Cal expansion removed the asset limit for most applicants. San Francisco elder law attorneys now focus more on income planning and spousal protections than on asset transfers — a significant change from prior years.',
    urgencyNote: 'At $15,000+/month, a one-year nursing home stay costs more than $180,000. Medi-Cal planning in the Bay Area often involves real estate with substantial equity — the interaction between home ownership and Medi-Cal eligibility requires specialist guidance.',
  },
  'houston-tx': {
    city: 'Houston',
    state: 'TX',
    intro: 'Harris County is Texas\'s largest elder law market. Houston\'s diverse senior population includes significant Vietnamese, Indian, and Hispanic communities — many elder law attorneys here work with bilingual needs and multi-generational family dynamics.',
    medicaidNote: 'Texas Medicaid limits long-term care income to $2,742/month and uses a strict 5-year lookback. Texas does not have a state income tax, which simplifies some planning. Houston elder law attorneys are well-versed in Texas\'s homestead exemption — one of the strongest in the country.',
    urgencyNote: 'Texas\'s homestead exemption protects your primary residence from Medicaid estate recovery as long as a spouse or dependent lives there. Houston elder law attorneys use this protection actively in planning.',
  },
  'dallas-tx': {
    city: 'Dallas',
    state: 'TX',
    intro: 'The DFW metroplex is one of the fastest-growing regions in the country, and its elder care infrastructure has expanded to match. Dallas elder law attorneys serve clients across Collin, Tarrant, and Denton counties in addition to Dallas County itself.',
    medicaidNote: 'Texas Medicaid\'s 5-year lookback and $2,742/month income limit apply across the state. Dallas elder law attorneys frequently handle cases involving former business owners with complex asset structures — LLCs, investment properties, retirement accounts.',
    urgencyNote: 'Dallas has a robust network of elder care facilities at varying price points. Elder law attorneys here help families navigate the connection between facility selection and Medicaid eligibility — not all facilities accept Medicaid from day one.',
  },
  'san-antonio-tx': {
    city: 'San Antonio',
    state: 'TX',
    intro: 'San Antonio\'s large military retiree population makes VA benefits and elder law planning unusually intertwined here. Retired servicemembers and surviving spouses are common elder law clients, and the VA Aid and Attendance benefit is often the first planning tool to explore.',
    medicaidNote: 'Texas Medicaid applies statewide. For San Antonio\'s veteran population, VA Aid and Attendance (up to $2,727/month for a married veteran) can delay Medicaid spend-down by years. San Antonio elder law attorneys are experienced with the combined planning approach.',
    urgencyNote: 'A surviving military spouse who needs long-term care may qualify for VA Aid and Attendance, Medicaid, or both — in different amounts at different times. Getting the sequencing right requires an attorney who knows both systems.',
  },
  'austin-tx': {
    city: 'Austin',
    state: 'TX',
    intro: 'Travis County\'s elder law market is growing rapidly as Austin\'s aging tech workforce and longtime residents reach retirement age. Austin elder law attorneys handle the full spectrum from estate planning for younger seniors to Medicaid crisis planning for families caught off guard.',
    medicaidNote: 'Texas Medicaid rules apply, and Austin elder law attorneys often work with clients who have significant retirement account assets — 401(k)s, IRAs — which have special treatment under Medicaid rules. Required Minimum Distributions can affect Medicaid eligibility in ways that require careful planning.',
    urgencyNote: 'Austin\'s cost of elder care has risen with the city\'s overall cost of living. A memory care facility in Central Austin easily runs $6,000–$9,000/month. Texas Medicaid planning can cover this — but only if the planning happens in time.',
  },
  'new-york-ny': {
    city: 'New York',
    state: 'NY',
    intro: 'New York City has one of the most complex — and most generous — Medicaid programs in the country. New York Medicaid covers nursing home care, home care (including CDPAP consumer-directed programs), and Managed Long Term Care (MLTC). Elder law attorneys here navigate a system unlike any other state.',
    medicaidNote: 'New York uses a 5-year lookback for nursing home Medicaid but a 30-month (2.5 year) lookback for community Medicaid (MLTC/home care). This distinction — and the home care option — makes NYC elder law planning uniquely valuable for families who want to keep parents at home.',
    urgencyNote: 'New York\'s CDPAP program allows family members to be paid as home care workers for Medicaid recipients. NYC elder law attorneys who know MLTC and CDPAP can help families keep parents at home AND get paid for the care they\'re already providing.',
  },
  'chicago-il': {
    city: 'Chicago',
    state: 'IL',
    intro: 'Cook County\'s elder law market is among the largest in the Midwest. Chicago elder law attorneys handle Illinois Medicaid (called "Medicaid" or "IDHS"), guardianship proceedings in Cook County Probate Court, and estate planning under Illinois law.',
    medicaidNote: 'Illinois Medicaid for nursing home care allows a Community Spouse Monthly Maintenance Needs Allowance (MMNA) in addition to the standard CSRA. Chicago elder law attorneys maximize spousal protections available under Illinois rules, which are generally more generous than the federal minimum.',
    urgencyNote: 'Cook County Probate Court processes guardianship cases, and Chicago elder law attorneys know the local court procedures, judges, and timelines. When a parent becomes incapacitated without a POA in place, guardianship moves faster with an experienced local attorney.',
  },
  'philadelphia-pa': {
    city: 'Philadelphia',
    state: 'PA',
    intro: 'Philadelphia County\'s elder law market serves one of the oldest urban populations in the Northeast. Pennsylvania has strict Medicaid estate recovery rules — one of the reasons elder law planning is more critical in PA than in states that don\'t pursue estate recovery.',
    medicaidNote: 'Pennsylvania Medicaid pursues estate recovery against the deceased recipient\'s estate for benefits paid at age 55 and older. Philadelphia elder law attorneys structure plans to minimize recoverable assets — often using life estates, Lady Bird deeds, or irrevocable trusts created outside the lookback window.',
    urgencyNote: 'PA estate recovery means that Medicaid is not truly "free" in Pennsylvania — the state will seek reimbursement from your estate. Planning ahead to minimize recoverable assets is a core strategy for Philadelphia families.',
  },
  'atlanta-ga': {
    city: 'Atlanta',
    state: 'GA',
    intro: 'Fulton and DeKalb counties\' elder law market is the center of Georgia\'s elder law practice. Atlanta elder law attorneys handle Georgia Medicaid (through DCH), guardianship in Probate Court, and estate planning under Georgia law.',
    medicaidNote: 'Georgia Medicaid for long-term care has an income limit of $2,742/month and uses the 5-year lookback. Georgia\'s Probate Court system handles both guardianship and conservatorship — Atlanta elder law attorneys practice regularly in Fulton County Probate.',
    urgencyNote: 'Atlanta\'s elder care market has expanded rapidly with the metro area\'s growth. Memory care facilities in Buckhead and Sandy Springs run $5,000–$8,000/month. Georgia Medicaid planning can bridge the gap between what families can pay and what care actually costs.',
  },
  'denver-co': {
    city: 'Denver',
    state: 'CO',
    intro: 'Denver\'s elder law market serves Colorado\'s growing retirement population. Colorado is one of a handful of states that pursues Medicaid estate recovery on all assets — not just the home — making advance planning especially important for Colorado families.',
    medicaidNote: 'Colorado Medicaid (Health First Colorado) has broad estate recovery that extends beyond real property to all probate assets. Denver elder law attorneys use trusts and beneficiary designations to keep assets out of probate and therefore outside the reach of estate recovery.',
    urgencyNote: 'Colorado\'s estate recovery policy means that even properly planned Medicaid cases can result in the state claiming assets after death if the planning didn\'t account for Colorado\'s broad definition of "estate." Find an attorney who knows Colorado\'s specific recovery rules.',
  },
  'seattle-wa': {
    city: 'Seattle',
    state: 'WA',
    intro: 'Washington State passed the WA Cares Fund — a mandatory long-term care insurance program funded by a payroll tax — in 2019. Seattle elder law attorneys now advise clients on WA Cares benefits ($36,500 lifetime maximum), opt-out eligibility, and how WA Cares interacts with private LTC insurance and Medicaid.',
    medicaidNote: 'Washington State Medicaid (Apple Health) for long-term care uses the 5-year lookback and allows a CSRA for married couples. Seattle elder law attorneys advise clients on how WA Cares benefits factor into overall long-term care planning before Medicaid becomes necessary.',
    urgencyNote: 'The WA Cares Fund benefit ($36,500 lifetime) is not large enough to cover more than a few months of nursing home care in Seattle, where memory care runs $7,000–$10,000/month. Elder law planning still matters even with WA Cares in place.',
  },
  'charlotte-nc': {
    city: 'Charlotte',
    state: 'NC',
    intro: 'Mecklenburg County\'s growing senior population has expanded Charlotte\'s elder law market significantly. North Carolina Medicaid for long-term care uses the standard 5-year lookback, and elder law attorneys here practice in Mecklenburg County Superior Court for guardianship proceedings.',
    medicaidNote: 'North Carolina Medicaid (NC Medicaid) has a strict 5-year lookback and income limit of $2,742/month. Charlotte elder law attorneys navigate NC\'s estate recovery provisions — NC recovers against the full probate estate — and use trusts and non-probate transfers to minimize exposure.',
    urgencyNote: 'Mecklenburg County\'s assisted living and memory care facilities are among the most expensive in the Southeast. Charlotte elder law attorneys are experienced in NC\'s Special Assistance program (an NC Medicaid alternative for assisted living) which has different rules than nursing home Medicaid.',
  },
}

interface PageProps {
  params: Promise<{ 'city-state': string }>
}

function parseCityState(slug: string): { city: string; state: string } | null {
  const parts = slug.split('-')
  if (parts.length < 2) return null
  const state = parts[parts.length - 1].toUpperCase()
  const cityParts = parts.slice(0, -1)
  const city = cityParts.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  return { city, state }
}

export async function generateStaticParams() {
  return Object.keys(CITY_DATA).map((slug) => ({ 'city-state': slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'city-state': cityStateSlug } = await params
  const data = CITY_DATA[cityStateSlug]
  if (!data) {
    const parsed = parseCityState(cityStateSlug)
    if (!parsed) return { title: 'Elder Law Attorneys' }
    const stateName = STATE_NAMES[parsed.state] ?? parsed.state
    return {
      title: `Elder Law Attorneys in ${parsed.city}, ${stateName} | ElderLawyerDirectory.com`,
      description: `Find elder law attorneys in ${parsed.city}, ${stateName} specializing in Medicaid planning, guardianship, and estate planning. Search verified profiles and contact attorneys directly.`,
    }
  }

  const stateName = STATE_NAMES[data.state] ?? data.state
  return {
    title: `Elder Law Attorneys in ${data.city}, ${stateName} | Find Medicaid Planning Lawyers`,
    description: `Find elder law attorneys in ${data.city}, ${stateName}. Specialists in Medicaid planning, guardianship, special needs trusts, and estate planning. Search profiles and connect directly.`,
    alternates: { canonical: `https://elderlawyerdirectory.com/elder-law-attorneys/${cityStateSlug}` },
    openGraph: {
      title: `Elder Law Attorneys in ${data.city}, ${stateName}`,
      description: `Find Medicaid planning and elder law specialists in ${data.city}, ${stateName}.`,
      type: 'website',
    },
  }
}

export const revalidate = 3600

const cityFaqs = (city: string, state: string, stateName: string) => [
  {
    q: `How many elder law attorneys are in ${city}, ${stateName}?`,
    a: `ElderLawyerDirectory.com lists elder law attorneys actively practicing in ${city} and the surrounding ${stateName} area. The count varies as attorneys join and update their profiles — use the directory to see current listings.`,
  },
  {
    q: `What does an elder law attorney in ${city} actually do?`,
    a: `Elder law attorneys in ${city} help families with Medicaid planning (protecting assets before nursing home costs deplete them), guardianship (obtaining legal authority to care for an incapacitated parent), estate planning for older adults (wills, trusts, powers of attorney), and special needs planning. They specialize in the legal and financial challenges that come with aging — not just what happens after death.`,
  },
  {
    q: `How much does an elder law attorney in ${city} cost?`,
    a: `${city} elder law attorneys typically charge flat fees for defined projects: a Medicaid Asset Protection Trust runs $2,500–$5,000; a full elder law estate plan (POA, healthcare proxy, will, trust) runs $3,000–$7,000; Medicaid crisis planning can range from $5,000 to $15,000 depending on complexity. Hourly rates range from $250–$400/hour. One Medicaid planning client returning $7,500+ in attorney fees is typical — the ROI math is clear.`,
  },
  {
    q: `When should I hire an elder law attorney in ${city}?`,
    a: `Ideally before a crisis — at age 65–70, when estate planning needs are clear and the 5-year Medicaid lookback hasn't started. In practice, many families call when a parent has just been hospitalized or diagnosed with dementia. Even in a crisis, an experienced ${city} elder law attorney can often implement strategies to protect assets and establish Medicaid eligibility faster than families expect.`,
  },
  {
    q: `What's the difference between an elder law attorney and a regular estate planning attorney?`,
    a: `Estate planning attorneys focus primarily on what happens after death — wills, trusts, asset transfer. Elder law attorneys focus on incapacity and aging: Medicaid planning, guardianship, powers of attorney designed to work during incapacity, and long-term care cost management. Many elder law attorneys also do estate planning, but not all estate planning attorneys have the specialized Medicaid and elder care knowledge that an elder law specialist brings.`,
  },
]

export default async function CityPage({ params }: PageProps) {
  const { 'city-state': cityStateSlug } = await params
  const data = CITY_DATA[cityStateSlug]

  let city: string
  let state: string

  if (data) {
    city = data.city
    state = data.state
  } else {
    const parsed = parseCityState(cityStateSlug)
    if (!parsed) notFound()
    city = parsed!.city
    state = parsed!.state
  }

  const stateName = STATE_NAMES[state] ?? state
  const listings = await getListingsByCityAndState(city, state)
  const faqs = cityFaqs(city, state, stateName)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-surface">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-surface-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-sm text-gray-500">
              <Link href="/" className="hover:text-brand-slate">Home</Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <Link href="/listings" className="hover:text-brand-slate">Browse All</Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <Link href={`/states/${state.toLowerCase() === 'ny' ? 'new-york' : stateName.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-brand-slate">{stateName}</Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <span className="text-gray-900 font-medium">{city}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-brand-slate text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-brand-amber" aria-hidden="true" />
              <span className="text-brand-amber font-semibold">{city}, {stateName}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Elder Law Attorneys in {city}, {stateName}
            </h1>
            <p className="text-lg text-blue-100 max-w-3xl mb-6">
              {data?.intro ?? `Find elder law attorneys in ${city}, ${stateName} who specialize in Medicaid planning, guardianship, and long-term care. Compare profiles and connect directly.`}
            </p>
            {listings.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>{listings.length}+ elder law attorneys listed in {city}</span>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Listings */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">
                  Elder Law Attorneys in {city}, {stateName}
                </h2>
                {listings.length > 0 ? (
                  <div className="space-y-4">
                    {listings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-surface-border p-8 text-center">
                    <Scale className="w-10 h-10 text-brand-slate/30 mx-auto mb-3" aria-hidden="true" />
                    <p className="text-gray-600 mb-4">
                      We don&apos;t have listings for {city} yet, but attorneys are added daily. Browse {stateName} statewide in the meantime.
                    </p>
                    <Link
                      href={`/listings?state=${state}`}
                      className="inline-flex items-center gap-2 bg-brand-slate text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-brand-slate-dark transition-colors"
                    >
                      Browse {stateName} Attorneys <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </section>

              {/* Local context */}
              {data && (
                <section className="bg-white rounded-xl border border-surface-border p-6 space-y-4">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-brand-amber" aria-hidden="true" />
                    Medicaid Planning in {city}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{data.medicaidNote}</p>
                  <p className="text-gray-700 leading-relaxed">{data.urgencyNote}</p>
                </section>
              )}

              {/* FAQ */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">
                  Frequently Asked Questions — Elder Law Attorneys in {city}
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-xl border border-surface-border p-5">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* CTA */}
              <div className="bg-brand-amber rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Are You an Elder Law Attorney in {city}?</h3>
                <p className="text-sm text-amber-50 mb-4">
                  Families searching for help in {city} are on this page right now. Claim your free listing and let them find you.
                </p>
                <Link
                  href="/submit"
                  className="block w-full text-center bg-white text-brand-amber font-semibold py-2.5 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  Submit Your Listing
                </Link>
              </div>

              {/* Practice Areas */}
              <div className="bg-white rounded-xl border border-surface-border p-5">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-slate" aria-hidden="true" />
                  Elder Law Practice Areas
                </h3>
                <ul className="space-y-2">
                  {[
                    { slug: 'medicaid_planning', label: 'Medicaid Planning' },
                    { slug: 'guardianship', label: 'Guardianship' },
                    { slug: 'special_needs_trust', label: 'Special Needs Trusts' },
                    { slug: 'estate_planning', label: 'Estate Planning' },
                    { slug: 'long_term_care', label: 'Long-Term Care Planning' },
                    { slug: 'powers_of_attorney', label: 'Powers of Attorney' },
                    { slug: 'veterans_benefits', label: 'Veterans Benefits' },
                  ].map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={`/categories/${area.slug}`}
                        className="flex items-center justify-between text-sm text-gray-700 hover:text-brand-slate group"
                      >
                        <span>{area.label}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-slate" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Resources */}
              <div className="bg-white rounded-xl border border-surface-border p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Elder Law Guides</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/guides/what-does-an-elder-law-attorney-do" className="text-sm text-brand-slate hover:underline block">
                      What does an elder law attorney do?
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides/medicaid-5-year-lookback-explained" className="text-sm text-brand-slate hover:underline block">
                      The Medicaid 5-year lookback, explained
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides/how-to-choose-an-elder-law-attorney" className="text-sm text-brand-slate hover:underline block">
                      How to choose an elder law attorney
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides/estate-planning-vs-elder-law" className="text-sm text-brand-slate hover:underline block">
                      Estate planning vs. elder law: the difference
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Browse state */}
              <div className="bg-white rounded-xl border border-surface-border p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Browse {stateName}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Find elder law attorneys across {stateName}, including other cities and towns.
                </p>
                <Link
                  href={`/listings?state=${state}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-slate hover:text-brand-slate-dark"
                >
                  All {stateName} attorneys <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
