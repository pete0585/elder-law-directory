import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Scale, MapPin, ArrowRight, ChevronRight, Shield, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByState, getTopCitiesInState } from '@/lib/data'
import { STATE_NAMES } from '@/lib/utils'

interface StateInfo {
  stateCode: string
  medicaidProgram: string
  overview: string
  medicaidRules: string
  estatRecovery: string
  topCities: string[]
  faqs: { q: string; a: string }[]
}

const STATE_DATA: Record<string, StateInfo> = {
  florida: {
    stateCode: 'FL',
    medicaidProgram: 'Florida Medicaid (Staywell, Simply Healthcare, or other managed care)',
    overview: 'Florida has the highest concentration of residents 65 and older of any state — nearly 5 million seniors, making up over 21% of the population. With major retirement hubs in Miami-Dade, Broward, Palm Beach, Hillsborough, and Pinellas counties, Florida\'s elder law market is one of the largest and most specialized in the country.',
    medicaidRules: 'Florida Medicaid for nursing home care limits monthly income to $2,742/month and uses a strict 5-year lookback on asset transfers. The Community Spouse Resource Allowance (CSRA) protects up to $148,620 of assets for a healthy spouse. Florida also has an extensive HCBS waiver program for home and community-based care. Florida does not have a state income tax, simplifying some planning calculations.',
    estatRecovery: 'Florida Medicaid pursues estate recovery after the beneficiary\'s death against probate assets. The homestead — Florida\'s primary residence protection — is among the strongest in the country. As long as a surviving spouse or dependent child lives in the home, it is generally protected from Medicaid estate recovery.',
    topCities: ['Miami', 'Tampa', 'Orlando', 'Jacksonville', 'Fort Lauderdale', 'West Palm Beach', 'Naples', 'Sarasota', 'Boca Raton'],
    faqs: [
      {
        q: 'How does the 5-year Medicaid lookback work in Florida?',
        a: 'Florida Medicaid reviews all asset transfers made in the 60 months (5 years) before your application. Transfers made for less than fair market value during this window create a penalty period — a period of Medicaid ineligibility calculated by dividing the transferred amount by Florida\'s average nursing home daily rate. Proper planning outside this window avoids the penalty.',
      },
      {
        q: 'Can my spouse keep the house if I go into a nursing home in Florida?',
        a: 'Yes. Florida\'s homestead exemption and Medicaid spousal impoverishment rules protect the primary residence for a community spouse (the spouse who remains at home). The home is not counted as an asset for Medicaid eligibility while the community spouse lives there, and Florida Medicaid does not pursue recovery against it while the spouse survives.',
      },
      {
        q: 'What is the CSRA in Florida and how much can my spouse keep?',
        a: 'The Community Spouse Resource Allowance (CSRA) is the amount of assets a healthy spouse can keep while their partner qualifies for nursing home Medicaid. In Florida, the CSRA is up to $148,620 (2024 figure, adjusted annually). Your Florida elder law attorney can help identify all countable assets and plan to maximize what your spouse can keep.',
      },
      {
        q: 'Does Florida Medicaid cover assisted living?',
        a: 'Florida Medicaid does not cover standard assisted living directly, but Florida\'s Statewide Medicaid Managed Care Long-Term Care (SMMC-LTC) program covers home and community-based services — including some assisted living settings that participate as waiver providers. Florida elder law attorneys can determine whether your parent\'s assisted living facility accepts SMMC-LTC.',
      },
    ],
  },
  arizona: {
    stateCode: 'AZ',
    medicaidProgram: 'AHCCCS (Arizona Health Care Cost Containment System)',
    overview: 'Arizona is one of America\'s top retirement destinations. Maricopa County (Phoenix, Scottsdale, Mesa, Tempe) and Pima County (Tucson) are the two major elder law markets. Arizona\'s Medicaid program, AHCCCS, operates differently from most states and has rules that can catch families off guard — particularly around spousal protections.',
    medicaidRules: 'Arizona AHCCCS for long-term care uses a 5-year lookback and has an income limit of $2,742/month for nursing home level care. Notably, Arizona does not provide a Community Spouse Resource Allowance (CSRA) in all AHCCCS programs — in the ALTCS (Arizona Long Term Care Services) program, the community spouse may be limited to very few countable assets. This makes spousal planning especially critical in Arizona.',
    estatRecovery: 'Arizona Medicaid (AHCCCS/ALTCS) pursues estate recovery against the deceased recipient\'s probate estate for benefits paid. Arizona uses a broad definition of recovery that includes some non-probate assets. Arizona elder law attorneys commonly use trusts and beneficiary designations to keep assets out of the probate estate.',
    topCities: ['Phoenix', 'Scottsdale', 'Tucson', 'Mesa', 'Chandler', 'Tempe', 'Peoria', 'Gilbert'],
    faqs: [
      {
        q: 'What is ALTCS and how does it differ from regular Medicaid?',
        a: 'ALTCS (Arizona Long Term Care System) is Arizona\'s Medicaid program for long-term care services. It covers nursing home care, assisted living in ALTCS-contracted facilities, and home and community-based services. ALTCS is administered by managed care organizations contracted with AHCCCS. The ALTCS application process is more intensive than standard Medicaid — a functional assessment determines if the applicant meets the nursing facility level of care requirement.',
      },
      {
        q: 'Does Arizona protect the community spouse\'s assets under Medicaid?',
        a: 'Arizona\'s spousal protections in the ALTCS program are more limited than in most states. While federal law requires a minimum CSRA, Arizona has historically pushed toward lower spousal protections. Arizona elder law attorneys use income-only trusts (also called Miller trusts or Qualifying Income Trusts) and other strategies to maximize what a healthy spouse can keep.',
      },
      {
        q: 'Does Arizona have a state estate or inheritance tax?',
        a: 'No. Arizona has no state estate tax and no inheritance tax, which simplifies the estate planning side of elder law. The primary planning concerns in Arizona are federal estate taxes (for estates over $13.6M in 2024), ALTCS Medicaid eligibility, and estate recovery.',
      },
    ],
  },
  california: {
    stateCode: 'CA',
    medicaidProgram: 'Medi-Cal (California Medicaid)',
    overview: 'California\'s Medi-Cal program has undergone the most significant changes of any state Medicaid in recent years. The 2023 expansion eliminated asset limits for most Medi-Cal applicants and expanded access for higher-income individuals. California\'s elder law landscape is changing rapidly — families need attorneys current on post-2023 rules.',
    medicaidRules: 'As of January 1, 2024, Medi-Cal eliminated asset limits for most programs, including long-term care. Income rules still apply: nursing home Medi-Cal has a share-of-cost (patient pay) requirement based on monthly income minus a personal needs allowance. California\'s 5-year lookback applies for institutional Medi-Cal (nursing home). Spousal protections include a CSRA of up to $148,620.',
    estatRecovery: 'California significantly limited Medi-Cal estate recovery in 2017 — it no longer recovers against the estates of beneficiaries under 55 or for most home and community-based services. For nursing home Medi-Cal beneficiaries over 55, California recovers from the probate estate, but the primary residence is protected while a surviving spouse or registered domestic partner lives there.',
    topCities: ['Los Angeles', 'San Diego', 'San Francisco', 'Sacramento', 'San Jose', 'Fresno', 'Long Beach', 'Oakland', 'Santa Ana'],
    faqs: [
      {
        q: 'Did California really eliminate Medi-Cal asset limits?',
        a: 'Yes. As of January 1, 2024, California eliminated the asset (resource) test for all Medi-Cal programs, including long-term care. This is the most significant expansion in the program\'s history. However, income rules still apply for nursing home Medi-Cal — beneficiaries pay their income toward the cost of care minus a small personal needs allowance. A California elder law attorney can calculate your parent\'s expected share-of-cost.',
      },
      {
        q: 'Does California still have Medi-Cal estate recovery?',
        a: 'California significantly narrowed estate recovery in 2017. Recovery is now limited to benefits received for nursing facility and intermediate care facility services for individuals who were age 55 or older when they received services. California does not recover for home and community-based (waiver) services. The primary residence is protected from recovery while a spouse or registered domestic partner lives there.',
      },
      {
        q: 'What is IHSS and how does it relate to elder law planning in California?',
        a: 'IHSS (In-Home Supportive Services) is a California Medi-Cal program that pays for in-home care — including care provided by family members. For qualifying Medi-Cal beneficiaries, IHSS can fund dozens of hours per week of personal care, domestic services, and paramedical services. California elder law attorneys help families access IHSS as a complement to or alternative to nursing home placement.',
      },
    ],
  },
  texas: {
    stateCode: 'TX',
    medicaidProgram: 'Texas Medicaid (administered by HHSC)',
    overview: 'Texas is the second-largest state by population and has one of the most rapidly growing senior populations in the country. Major elder law markets include Dallas-Fort Worth, Houston, San Antonio, and Austin. Texas has some of the strongest homestead and personal property protections in the country — important tools for elder law planning.',
    medicaidRules: 'Texas Medicaid for nursing home care (Primary Home Community Care — PHCC) limits monthly income to $2,742/month and uses the standard 5-year lookback. Texas allows a Community Spouse Resource Allowance of up to $148,620. Texas notably has no income tax, and its homestead exemption — which can protect unlimited home equity for Texas residents — is one of the strongest in the country.',
    estatRecovery: 'Texas Medicaid pursues estate recovery against the beneficiary\'s probate estate. Texas does NOT recover against the estate if a surviving spouse, dependent, or disabled child resides in the home. Texas\'s unlimited homestead exemption makes keeping the home out of estate recovery relatively straightforward — the home passes to heirs free from Medicaid estate recovery claims if the spousal exception applies.',
    topCities: ['Houston', 'Dallas', 'San Antonio', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano'],
    faqs: [
      {
        q: 'Does Texas Medicaid protect my home?',
        a: 'Yes. Texas\'s homestead exemption is among the strongest in the country — it protects unlimited equity in your primary residence. For Medicaid purposes, the home is an exempt asset while you intend to return or while a community spouse lives there. Texas Medicaid estate recovery does not apply to the home while a surviving spouse lives there, and there are no dollar limits on the homestead exemption in Texas.',
      },
      {
        q: 'Can I give money to my children in Texas without affecting Medicaid eligibility?',
        a: 'Any transfers made within the 5-year lookback window can create a Medicaid penalty period. This applies to gifts to children, transfers to trusts that benefit the applicant, and sales for less than fair market value. Texas elder law attorneys can review past transfers and advise on whether they create a lookback issue — and what options exist if they do.',
      },
      {
        q: 'How does the Community Spouse Resource Allowance work in Texas?',
        a: 'When one spouse enters a nursing home, the community spouse (the one who remains at home) can keep up to $148,620 in countable assets. This is in addition to the home, one vehicle, and personal property. Texas elder law attorneys help identify all countable assets, maximize the CSRA allocation, and use income-only trusts if the nursing home spouse\'s income exceeds the limit.',
      },
    ],
  },
  'new-york': {
    stateCode: 'NY',
    medicaidProgram: 'New York Medicaid (administered by NYSDOH)',
    overview: 'New York has one of the most generous and complex Medicaid programs in the country. New York City is the largest single elder law market in the US, but the program extends across all 62 counties. New York is unique in offering both nursing home Medicaid (5-year lookback) and community Medicaid through the MLTC (Managed Long Term Care) program — which has a shorter 30-month lookback.',
    medicaidRules: 'New York nursing home Medicaid uses a 60-month (5-year) lookback. New York community Medicaid (MLTC/CDPAP/home care) uses a 30-month (2.5-year) lookback — a critical distinction that allows more recent planning to preserve home care eligibility. Income limits and spousal protections follow federal guidelines. New York\'s Consumer Directed Personal Assistance Program (CDPAP) allows family members to be paid as home care workers.',
    estatRecovery: 'New York Medicaid pursues estate recovery, but enforcement has historically been limited. New York uses probate-only recovery — assets that pass outside of probate (through joint tenancy, POD accounts, trusts) are not subject to recovery. New York elder law attorneys routinely use joint ownership and non-probate transfers to protect assets from recovery.',
    topCities: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'White Plains', 'Hempstead', 'Utica'],
    faqs: [
      {
        q: 'What is the difference between nursing home Medicaid and community Medicaid in New York?',
        a: 'New York nursing home Medicaid covers 24-hour institutional care and uses a 5-year lookback on asset transfers. New York community Medicaid (through MLTC programs) covers home health aides, adult day care, personal care, and similar services — and uses a shorter 30-month lookback. Planning for community Medicaid can happen much closer to the time of need, which is a significant advantage for families who want to keep a parent at home.',
      },
      {
        q: 'Can a family member get paid to care for a parent in New York?',
        a: 'Yes. New York\'s Consumer Directed Personal Assistance Program (CDPAP) allows Medicaid beneficiaries to hire their own home care workers — including adult children, siblings, or other relatives. The family member is paid at the CDPAP rate by the Medicaid program. This is one of the most valuable — and least-known — benefits in New York Medicaid.',
      },
      {
        q: 'How does New York Medicaid estate recovery work?',
        a: 'New York Medicaid estate recovery applies only to the probate estate. Assets that pass outside probate — through jointly held accounts, beneficiary designations (IRA, life insurance), or trusts — are not subject to recovery. New York elder law attorneys commonly use these non-probate transfer techniques as part of comprehensive Medicaid planning.',
      },
    ],
  },
}

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return Object.keys(STATE_DATA).map((state) => ({ state }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const data = STATE_DATA[state]
  if (!data) return { title: 'State Not Found' }

  const stateName = STATE_NAMES[data.stateCode] ?? data.stateCode

  return {
    title: `Elder Law Attorneys in ${stateName} | ${stateName} Elder Law Directory`,
    description: `Find elder law attorneys across ${stateName}. Specialists in Medicaid planning, guardianship, estate planning, and long-term care. Search by city or browse the full ${stateName} directory.`,
    alternates: { canonical: `https://elderlawyerdirectory.com/states/${state}` },
    openGraph: {
      title: `Elder Law Attorneys in ${stateName}`,
      description: `Search elder law attorneys across ${stateName} — Medicaid planning, guardianship, and long-term care specialists.`,
      type: 'website',
    },
  }
}

export const revalidate = 3600

export default async function StatePage({ params }: PageProps) {
  const { state } = await params
  const data = STATE_DATA[state]
  if (!data) notFound()

  const stateName = STATE_NAMES[data.stateCode] ?? data.stateCode
  const [listings, topCities] = await Promise.all([
    getListingsByState(data.stateCode),
    getTopCitiesInState(data.stateCode),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const citySlugMap: Record<string, string> = {
    'Miami': 'miami-fl',
    'Tampa': 'tampa-fl',
    'Orlando': 'orlando-fl',
    'Jacksonville': 'jacksonville-fl',
    'Fort Lauderdale': 'fort-lauderdale-fl',
    'West Palm Beach': 'west-palm-beach-fl',
    'Phoenix': 'phoenix-az',
    'Scottsdale': 'scottsdale-az',
    'Tucson': 'tucson-az',
    'Los Angeles': 'los-angeles-ca',
    'San Diego': 'san-diego-ca',
    'San Francisco': 'san-francisco-ca',
    'Houston': 'houston-tx',
    'Dallas': 'dallas-tx',
    'San Antonio': 'san-antonio-tx',
    'Austin': 'austin-tx',
    'New York': 'new-york-ny',
    'New York City': 'new-york-ny',
    'Chicago': 'chicago-il',
    'Philadelphia': 'philadelphia-pa',
    'Atlanta': 'atlanta-ga',
    'Denver': 'denver-co',
    'Seattle': 'seattle-wa',
    'Charlotte': 'charlotte-nc',
  }

  function getCityPageSlug(city: string, stateCode: string): string {
    if (citySlugMap[city]) return citySlugMap[city]
    return `${city.toLowerCase().replace(/\s+/g, '-')}-${stateCode.toLowerCase()}`
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
              <span className="text-gray-900 font-medium">{stateName}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-brand-slate text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-brand-amber" aria-hidden="true" />
              <span className="text-brand-amber font-semibold">{stateName} Elder Law Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Elder Law Attorneys in {stateName}
            </h1>
            <p className="text-lg text-blue-100 max-w-3xl mb-6">
              {data.overview}
            </p>
            <div className="flex flex-wrap gap-4">
              {listings.length > 0 && (
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                  <Users className="w-4 h-4" aria-hidden="true" />
                  <span>{listings.length}+ attorneys listed in {stateName}</span>
                </div>
              )}
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                <Scale className="w-4 h-4" aria-hidden="true" />
                <span>{data.medicaidProgram}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Cities */}
              {topCities.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Find Elder Law Attorneys by City in {stateName}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {topCities.map(({ city, count }) => (
                      <Link
                        key={city}
                        href={`/elder-law-attorneys/${getCityPageSlug(city, data.stateCode)}`}
                        className="bg-white rounded-lg border border-surface-border p-4 hover:border-brand-slate hover:shadow-sm transition-all group"
                      >
                        <div className="font-semibold text-gray-900 group-hover:text-brand-slate text-sm">{city}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{count} attorney{count !== 1 ? 's' : ''}</div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Medicaid Rules */}
              <section className="bg-white rounded-xl border border-surface-border p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-amber" aria-hidden="true" />
                  {stateName} Medicaid Rules for Long-Term Care
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">{data.medicaidRules}</p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-amber-800 mb-1">Estate Recovery in {stateName}</p>
                  <p className="text-sm text-amber-700 leading-relaxed">{data.estatRecovery}</p>
                </div>
              </section>

              {/* Listings */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">
                  Elder Law Attorneys in {stateName}
                </h2>
                {listings.length > 0 ? (
                  <div className="space-y-4">
                    {listings.slice(0, 12).map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                    {listings.length > 12 && (
                      <div className="text-center pt-2">
                        <Link
                          href={`/listings?state=${data.stateCode}`}
                          className="inline-flex items-center gap-2 text-brand-slate font-semibold hover:text-brand-slate-dark"
                        >
                          View all {stateName} attorneys <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-surface-border p-8 text-center">
                    <Scale className="w-10 h-10 text-brand-slate/30 mx-auto mb-3" aria-hidden="true" />
                    <p className="text-gray-600 mb-4">
                      Listings for {stateName} are being added. Browse all attorneys in the meantime.
                    </p>
                    <Link
                      href="/listings"
                      className="inline-flex items-center gap-2 bg-brand-slate text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-brand-slate-dark transition-colors"
                    >
                      Browse All Attorneys <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </section>

              {/* FAQ */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">
                  {stateName} Elder Law Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {data.faqs.map((faq, i) => (
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
                <h3 className="font-bold text-lg mb-2">Elder Law Attorney in {stateName}?</h3>
                <p className="text-sm text-amber-50 mb-4">
                  Families across {stateName} are searching for you right now. List your practice free and claim your profile.
                </p>
                <Link
                  href="/submit"
                  className="block w-full text-center bg-white text-brand-amber font-semibold py-2.5 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  Submit Your Listing
                </Link>
              </div>

              {/* Quick Cities */}
              <div className="bg-white rounded-xl border border-surface-border p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Major Cities in {stateName}</h3>
                <ul className="space-y-1.5">
                  {data.topCities.slice(0, 6).map((city) => (
                    <li key={city}>
                      <Link
                        href={`/elder-law-attorneys/${getCityPageSlug(city, data.stateCode)}`}
                        className="flex items-center justify-between text-sm text-gray-700 hover:text-brand-slate group"
                      >
                        <span>{city}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-slate" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guides */}
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
                      Estate planning vs. elder law
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides/how-much-does-an-elder-law-attorney-cost" className="text-sm text-brand-slate hover:underline block">
                      How much does an elder law attorney cost?
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Practice Areas */}
              <div className="bg-white rounded-xl border border-surface-border p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Browse by Practice Area</h3>
                <ul className="space-y-1.5">
                  {[
                    { slug: 'medicaid_planning', label: 'Medicaid Planning' },
                    { slug: 'guardianship', label: 'Guardianship' },
                    { slug: 'special_needs_trust', label: 'Special Needs Trusts' },
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
