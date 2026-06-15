import Link from 'next/link'
import { MapPin, Phone, Globe, Mail, Scale, CheckCircle, Star, Wifi, Award, ChevronRight } from 'lucide-react'
import type { Listing } from '@/lib/types'
import { PRACTICE_AREAS, STATE_NAMES, formatPhone } from '@/lib/utils'

interface ListingDetailProps {
  listing: Listing
  monthlyViews?: number
  isClaimed?: boolean
}

export default function ListingDetail({ listing, monthlyViews = 0, isClaimed: isClaimedProp }: ListingDetailProps) {
  const isFeatured = listing.listing_tier === 'featured'
  const isVerified = listing.listing_tier === 'verified' || isFeatured
  const isClaimed = isClaimedProp ?? (listing.listing_tier !== 'unclaimed' && listing.listing_tier != null)
  const location = `${listing.city}, ${STATE_NAMES[listing.state] ?? listing.state}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Person', 'LegalService'],
    name: listing.full_name,
    description: listing.bio ?? `Elder law attorney in ${location}`,
    url: `https://elderlawyerdirectory.com/listings/${listing.slug}`,
    image: listing.photo_url ?? undefined,
    telephone: listing.phone ?? undefined,
    email: listing.email ?? undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip ?? undefined,
      addressCountry: 'US',
    },
    areaServed: listing.states_licensed.length > 0
      ? listing.states_licensed.map((s) => ({ '@type': 'State', name: STATE_NAMES[s] ?? s }))
      : [{ '@type': 'State', name: STATE_NAMES[listing.state] ?? listing.state }],
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-brand-slate">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" aria-label=">" />
        <Link href="/listings" className="hover:text-brand-slate">Attorneys</Link>
        <ChevronRight className="w-3.5 h-3.5" aria-label=">" />
        <Link href={`/listings?state=${listing.state}`} className="hover:text-brand-slate">
          {STATE_NAMES[listing.state] ?? listing.state}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-label=">" />
        <span className="text-gray-900 truncate max-w-48">{listing.full_name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className={`bg-white rounded-xl border ${isFeatured ? 'border-brand-amber' : 'border-surface-border'} shadow-sm p-6`}>
            <div className="flex items-start gap-5">
              {listing.photo_url ? (
                <img
                  src={listing.photo_url}
                  alt={listing.full_name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-brand-slate/20 shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-brand-slate/10 flex items-center justify-center shrink-0">
                  <Scale className="w-10 h-10 text-brand-slate/30" aria-label="Attorney" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{listing.full_name}</h1>
                  {isFeatured && (
                    <span className="bg-brand-amber text-white text-xs font-bold px-3 py-1 rounded-full shrink-0">
                      Featured
                    </span>
                  )}
                </div>

                {listing.firm_name && (
                  <p className="text-gray-600 font-medium mb-2">{listing.firm_name}</p>
                )}

                <div className="flex items-center gap-1.5 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 shrink-0" aria-label="Location" />
                  <span>{location}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {isVerified && (
                    <span className="flex items-center gap-1 text-xs bg-brand-slate/10 text-brand-slate font-semibold px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" aria-label="Verified" />
                      Verified Elder Law Attorney
                    </span>
                  )}
                  {listing.is_cela_certified && (
                    <span className="flex items-center gap-1 text-xs bg-brand-amber/15 text-brand-amber-dark font-semibold px-2.5 py-1 rounded-full">
                      <Award className="w-3.5 h-3.5" aria-label="CELA" />
                      CELA Certified
                    </span>
                  )}
                  {listing.is_naela_member && (
                    <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 font-semibold px-2.5 py-1 rounded-full">
                      NAELA Member
                    </span>
                  )}
                  {listing.accepts_remote && (
                    <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-full">
                      <Wifi className="w-3.5 h-3.5" aria-label="Remote" />
                      Remote Consultations
                    </span>
                  )}
                  {listing.free_consultation && (
                    <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5" aria-label="Free" />
                      Free Consultation
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          {isClaimed && listing.bio ? (
            <div className="bg-white rounded-xl border border-surface-border shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{listing.bio}</p>
            </div>
          ) : null}

          {/* Practice Areas */}
          {listing.practice_areas.length > 0 && (
            <div className="bg-white rounded-xl border border-surface-border shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4">Practice Areas</h2>
              <div className="flex flex-wrap gap-2">
                {listing.practice_areas.map((area) => (
                  <Link
                    key={area}
                    href={`/categories/${area}`}
                    className="text-sm bg-surface border border-surface-border hover:border-brand-slate/40 hover:bg-brand-slate/5 px-3 py-1.5 rounded-full text-gray-700 hover:text-brand-slate transition-colors"
                  >
                    {PRACTICE_AREAS[area] ?? area}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* States Licensed */}
          {listing.states_licensed.length > 0 && (
            <div className="bg-white rounded-xl border border-surface-border shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4">States Licensed</h2>
              <div className="flex flex-wrap gap-2">
                {listing.states_licensed.map((s) => (
                  <span key={s} className="text-sm bg-surface border border-surface-border px-3 py-1 rounded-full text-gray-700">
                    {STATE_NAMES[s] ?? s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Profile Activity Stats */}
          {isClaimed && (
            <div className='mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4'>
              <p className='text-xs font-semibold uppercase tracking-wide text-blue-600'>Profile Activity</p>
              <p className='mt-1 text-3xl font-bold text-blue-900'>{monthlyViews}</p>
              <p className='text-sm text-blue-700'>people viewed your profile this month</p>
              {listing.listing_tier === 'free' && (
                <p className='mt-2 text-xs text-blue-600'>0 could contact you. <a href={`/claim/${listing.id}?upgrade=true`} className='underline font-medium'>Upgrade to be reachable →</a></p>
              )}
            </div>
          )}

          {/* FAQ — Elder Law Educational Block */}
          <div className="bg-surface border border-surface-border rounded-xl p-6">
            <h2 className="font-bold text-gray-900 mb-4">What Does an Elder Law Attorney Do?</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Elder Law vs. Estate Planning</h3>
                <p>Estate planning attorneys focus on what happens after death. Elder law attorneys specialize in what happens during life — especially when someone can no longer care for themselves. They handle Medicaid planning, guardianship, long-term care, and asset protection.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">The Medicaid 5-Year Lookback</h3>
                <p>Medicaid reviews all asset transfers made in the 5 years before your application. A qualified elder law attorney can create a legal plan that protects assets within Medicaid&apos;s rules — but this requires advance planning.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">NAELA and CELA Credentials</h3>
                <p>NAELA members (National Academy of Elder Law Attorneys) are committed to elder law practice. CELA-certified attorneys (Certified Elder Law Attorney) have passed a rigorous ABA-accredited exam — only ~500 attorneys hold this credential nationally.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Contact Card */}
          <div className="bg-white rounded-xl border border-brand-slate shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-3">
              {isClaimed && listing.phone && (
                <a
                  href={`tel:${listing.phone}`}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-brand-slate transition-colors group"
                >
                  <div className="w-8 h-8 bg-brand-slate/10 group-hover:bg-brand-slate/20 rounded-lg flex items-center justify-center transition-colors">
                    <Phone className="w-4 h-4 text-brand-slate" aria-label="Phone" />
                  </div>
                  {formatPhone(listing.phone)}
                </a>
              )}
              {!isClaimed && (
                <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 text-center'>
                  <p className='text-sm text-gray-500'>Phone, website, and bio are only visible after this provider claims their listing.</p>
                  <a href={`/claim/${listing.id}`} className='mt-2 inline-block text-sm font-medium text-blue-600 hover:underline'>
                    Is this you? Claim your free profile →
                  </a>
                </div>
              )}
              {listing.email && isVerified && (
                <a
                  href={`mailto:${listing.email}`}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-brand-slate transition-colors group"
                >
                  <div className="w-8 h-8 bg-brand-slate/10 group-hover:bg-brand-slate/20 rounded-lg flex items-center justify-center transition-colors">
                    <Mail className="w-4 h-4 text-brand-slate" aria-label="Email" />
                  </div>
                  <span className="truncate">{listing.email}</span>
                </a>
              )}
              {isClaimed && listing.website && isVerified && (
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-brand-slate transition-colors group"
                >
                  <div className="w-8 h-8 bg-brand-slate/10 group-hover:bg-brand-slate/20 rounded-lg flex items-center justify-center transition-colors">
                    <Globe className="w-4 h-4 text-brand-slate" aria-label="Website" />
                  </div>
                  Visit Website
                </a>
              )}
            </div>

            {!isVerified && (
              <div className="mt-4 pt-4 border-t border-surface-border">
                <Link
                  href={`/claim/${listing.id}`}
                  className="block w-full text-center bg-brand-slate hover:bg-brand-slate-dark text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
                >
                  Claim This Profile
                </Link>
                <p className="text-xs text-gray-500 text-center mt-2">Free to claim — upgrade anytime</p>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl border border-surface-border shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Location</h3>
            <div className="text-sm text-gray-600 space-y-1">
              {listing.address_line1 && <p>{listing.address_line1}</p>}
              <p>{listing.city}, {listing.state} {listing.zip ?? ''}</p>
            </div>
          </div>

          {/* Pricing nudge for unclaimed */}
          {!isVerified && (
            <div className="bg-brand-amber/10 border border-brand-amber/30 rounded-xl p-5">
              <p className="text-sm font-semibold text-brand-amber-dark mb-1">Are you this attorney?</p>
              <p className="text-xs text-gray-600 mb-3">
                Claim this listing for free. Upgrade to Verified for $99/yr — that&apos;s $8.25/month, compared to ElderLawAnswers&apos; $175/month.
              </p>
              <Link
                href={`/claim/${listing.id}`}
                className="block text-center bg-brand-amber hover:bg-brand-amber-light text-white text-sm font-semibold py-2 rounded-lg transition-colors"
              >
                Claim Free →
              </Link>
            </div>
          )}

          {/* Back to search */}
          <Link
            href="/listings"
            className="block text-center text-sm text-brand-slate hover:underline font-medium py-2"
          >
            ← Back to all attorneys
          </Link>
        </div>
      </div>
    </div>
  )
}
