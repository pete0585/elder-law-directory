import Link from 'next/link'
import { MapPin, Phone, Globe, Scale, CheckCircle, Star, Wifi, Award } from 'lucide-react'
import type { Listing } from '@/lib/types'
import { PRACTICE_AREAS, STATE_NAMES, formatPhone } from '@/lib/utils'

interface ListingCardProps {
  listing: Listing
}

export default function ListingCard({ listing }: ListingCardProps) {
  const isFeatured = listing.listing_tier === 'featured'
  const isVerified = listing.listing_tier === 'verified' || isFeatured

  return (
    <div className={`bg-white rounded-xl border ${isFeatured ? 'border-brand-amber shadow-md' : 'border-surface-border shadow-sm'} hover:shadow-md transition-shadow relative`}>
      {isFeatured && (
        <div className="absolute top-0 right-0 bg-brand-amber text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
          Featured
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {listing.photo_url ? (
              <img
                src={listing.photo_url}
                alt={listing.full_name}
                className="w-14 h-14 rounded-full object-cover border-2 border-brand-slate/20"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-brand-slate/10 flex items-center justify-center">
                <Scale className="w-7 h-7 text-brand-slate/40" aria-label="Attorney" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h3 className="font-semibold text-gray-900 text-base leading-tight">{listing.full_name}</h3>
                {listing.firm_name && (
                  <p className="text-sm text-gray-600 mt-0.5">{listing.firm_name}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {isVerified && (
                  <span className="flex items-center gap-1 text-xs bg-brand-slate/10 text-brand-slate font-medium px-2 py-1 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" aria-label="Verified" />
                    Verified
                  </span>
                )}
                {listing.is_cela_certified && (
                  <span className="flex items-center gap-1 text-xs bg-brand-amber/10 text-brand-amber-dark font-medium px-2 py-1 rounded-full">
                    <Award className="w-3.5 h-3.5" aria-label="CELA certified" />
                    CELA
                  </span>
                )}
                {listing.is_naela_member && (
                  <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 font-medium px-2 py-1 rounded-full">
                    NAELA
                  </span>
                )}
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-label="Location" />
                {listing.city}, {STATE_NAMES[listing.state] ?? listing.state}
              </span>
              {listing.accepts_remote && (
                <span className="flex items-center gap-1 text-brand-slate">
                  <Wifi className="w-3.5 h-3.5" aria-label="Remote" />
                  Remote
                </span>
              )}
              {listing.free_consultation && (
                <span className="flex items-center gap-1 text-green-700">
                  <Star className="w-3.5 h-3.5" aria-label="Free consultation" />
                  Free Consult
                </span>
              )}
            </div>

            {listing.practice_areas.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {listing.practice_areas.slice(0, 4).map((area) => (
                  <span
                    key={area}
                    className="text-xs bg-surface px-2.5 py-1 rounded-full text-gray-700 border border-surface-border"
                  >
                    {PRACTICE_AREAS[area] ?? area}
                  </span>
                ))}
                {listing.practice_areas.length > 4 && (
                  <span className="text-xs text-gray-500 px-1 py-1">
                    +{listing.practice_areas.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-surface-border flex items-center justify-between gap-3 flex-wrap">
          <div className="flex gap-3">
            {listing.phone && (
              <a
                href={`tel:${listing.phone}`}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-brand-slate transition-colors"
              >
                <Phone className="w-4 h-4" aria-label="Phone" />
                {formatPhone(listing.phone)}
              </a>
            )}
            {listing.website && isVerified && (
              <a
                href={listing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-brand-slate transition-colors"
              >
                <Globe className="w-4 h-4" aria-label="Website" />
                Website
              </a>
            )}
          </div>
          <Link
            href={`/listings/${listing.slug}`}
            className="bg-brand-slate hover:bg-brand-slate-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
