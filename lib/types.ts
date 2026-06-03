export type ListingTier = 'free' | 'verified' | 'featured'

export interface Listing {
  id: string
  slug: string
  full_name: string
  firm_name: string | null
  bio: string | null
  photo_url: string | null
  phone: string | null
  email: string | null
  website: string | null
  address_line1: string | null
  city: string
  state: string
  zip: string | null
  latitude: number | null
  longitude: number | null
  practice_areas: string[]
  states_licensed: string[]
  is_naela_member: boolean
  is_cela_certified: boolean
  accepts_remote: boolean
  free_consultation: boolean
  listing_tier: ListingTier
  is_active: boolean
  is_approved: boolean
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_expires_at: string | null
  claimed_at: string | null
  claimed_by: string | null
  source: string | null
  do_not_email: boolean
  email_source: string | null
  search_vector?: unknown
  created_at: string
  updated_at: string
}

export interface Claim {
  id: string
  listing_id: string
  email: string
  token: string
  verified: boolean
  verified_at: string | null
  expires_at: string
  status: string
  nudge_sent_at: string | null
  created_at: string
}

export interface SearchFilters {
  q?: string
  state?: string
  practice_area?: string
  tier?: string
  page?: number
}
