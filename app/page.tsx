import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Scale, CheckCircle, Clock, Users, ArrowRight, Shield, BookOpen, HeartHandshake } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import { getFeaturedListings, getTotalCount } from '@/lib/data'
import { PRACTICE_AREAS, TOP_STATES, STATE_NAMES } from '@/lib/utils'

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: 'Find Elder Law Attorneys Near You | ElderLawyerDirectory.com',
  description: 'When your parent needs a nursing home and you need a Medicaid plan — find an elder law attorney who specializes in exactly this. Search 2,500+ attorneys by city, state, and practice area.',
  alternates: { canonical: 'https://elderlawyerdirectory.com' },
}

export const revalidate = 3600

async function HeroStats() {
  const total = await getTotalCount()
  return (
    <span className="text-4xl sm:text-5xl font-bold text-brand-amber">
      {total.toLocaleString()}+
    </span>
  )
}

async function FeaturedSection() {
  const featured = await getFeaturedListings()
  if (featured.length === 0) return null
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Featured Elder Law Attorneys</h2>
        <Link href="/listings?tier=featured" className="text-sm text-brand-slate hover:underline font-medium flex items-center gap-1">
          View all <ArrowRight className="w-4 h-4" aria-label="Arrow" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {featured.map((l) => <ListingCard key={l.id} listing={l} />)}
      </div>
    </section>
  )
}

const practiceHighlights = [
  { key: 'medicaid_planning', icon: Shield, desc: 'Protect assets before Medicaid spend-down' },
  { key: 'guardianship', icon: HeartHandshake, desc: 'Legal authority to care for a loved one' },
  { key: 'special_needs_trust', icon: BookOpen, desc: 'Preserve benefits for disabled family members' },
  { key: 'estate_planning', icon: Scale, desc: 'Wills, trusts, and asset transfer planning' },
  { key: 'long_term_care', icon: Clock, desc: 'Nursing home and assisted living planning' },
  { key: 'powers_of_attorney', icon: CheckCircle, desc: 'Healthcare and financial decision authority' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-slate relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-slate-dark/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-amber/20 border border-brand-amber/30 px-3 py-1.5 rounded-full mb-5">
              <Scale className="w-4 h-4 text-brand-amber" aria-label="Elder law" />
              <span className="text-brand-amber text-sm font-semibold">Elder Law Specialists</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Find a lawyer who actually<br />
              <span className="text-brand-amber">understands elder law.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl">
              When your parent is in the hospital and Medicaid crisis planning is urgent, you need a specialist — not a general estate planning attorney. Find elder law attorneys near you who handle Medicaid planning, guardianship, and long-term care.
            </p>

            <Suspense fallback={null}>
              <SearchBar large className="max-w-2xl" />
            </Suspense>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-brand-amber" aria-label="Check" />
                Free to search, always
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-brand-amber" aria-label="Check" />
                Filter by practice area
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-brand-amber" aria-label="Check" />
                NAELA &amp; CELA certified
              </span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            <div className="text-center">
              <Suspense fallback={<span className="text-4xl font-bold text-brand-amber">10,000+</span>}>
                <HeroStats />
              </Suspense>
              <p className="text-gray-400 text-sm mt-1">Elder Law Attorneys</p>
            </div>
            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-bold text-brand-amber">50</span>
              <p className="text-gray-400 text-sm mt-1">States Covered</p>
            </div>
            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-bold text-brand-amber">21x</span>
              <p className="text-gray-400 text-sm mt-1">Cheaper than ElderLawAnswers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Elder Law */}
      <section className="bg-white border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why You Need an Elder Law Attorney — Not Just an Estate Planning Attorney</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elder law is a specialty. Medicaid has a 5-year lookback rule. A general estate planning attorney can cost you hundreds of thousands in assets if they get the planning wrong.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: 'The 5-Year Lookback',
                desc: 'Medicaid reviews all asset transfers in the 5 years before your application. Every day without a plan can mean a month of ineligibility. Time is the enemy.',
              },
              {
                icon: Shield,
                title: 'Asset Protection at Stake',
                desc: 'A Medicaid crisis plan done right can protect $100,000–$500,000 in assets from spend-down. One good attorney pays for their fee thousands of times over.',
              },
              {
                icon: Scale,
                title: 'Specialty Training Matters',
                desc: 'Look for NAELA members and CELA-certified attorneys. CELA is the ABA-recognized gold standard — only ~500 attorneys hold it nationwide.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-surface border border-surface-border">
                <div className="shrink-0 w-10 h-10 bg-brand-slate/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-brand-slate" aria-label={item.title} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Browse by Practice Area</h2>
          <Link href="/listings" className="text-sm text-brand-slate hover:underline font-medium flex items-center gap-1">
            All attorneys <ArrowRight className="w-4 h-4" aria-label="Arrow" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceHighlights.map((pa) => (
            <Link
              key={pa.key}
              href={`/categories/${pa.key}`}
              className="flex items-start gap-4 p-4 bg-white rounded-xl border border-surface-border hover:border-brand-slate/40 hover:shadow-sm transition-all group"
            >
              <div className="shrink-0 w-10 h-10 bg-brand-slate/5 group-hover:bg-brand-slate/10 rounded-lg flex items-center justify-center transition-colors">
                <pa.icon className="w-5 h-5 text-brand-slate" aria-label={PRACTICE_AREAS[pa.key]} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-slate text-sm transition-colors">
                  {PRACTICE_AREAS[pa.key]}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{pa.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <Suspense fallback={null}>
        <FeaturedSection />
      </Suspense>

      {/* Browse by State */}
      <section className="bg-white border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Find Elder Law Attorneys by State</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {TOP_STATES.map((abbr) => (
              <Link
                key={abbr}
                href={`/listings?state=${abbr}`}
                className="flex items-center justify-between px-4 py-3 bg-surface border border-surface-border rounded-lg hover:border-brand-slate/40 hover:bg-brand-slate/5 transition-all text-sm font-medium text-gray-700 hover:text-brand-slate group"
              >
                <span>{STATE_NAMES[abbr]}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-slate transition-colors" aria-label="Arrow" />
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/listings" className="text-sm text-brand-slate hover:underline font-medium">
              View all 50 states →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA for Attorneys */}
      <section className="bg-brand-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-brand-amber" aria-label="Attorneys" />
              <span className="text-brand-amber text-sm font-semibold uppercase tracking-wider">For Elder Law Attorneys</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your profile is already in our directory.</h2>
            <p className="text-gray-300 max-w-xl">
              Claim it free. Upgrade to Verified for $99/yr — that&apos;s $8.25/month vs. ElderLawAnswers&apos; $175/month. One Medicaid planning client covers your listing for 75 years.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/submit"
              className="bg-brand-amber hover:bg-brand-amber-light text-white font-semibold px-6 py-3 rounded-lg text-center transition-colors whitespace-nowrap"
            >
              Add Your Listing
            </Link>
            <Link
              href="/listings"
              className="border border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg text-center transition-colors whitespace-nowrap"
            >
              Find Your Profile
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
