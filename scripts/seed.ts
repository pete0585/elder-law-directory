/**
 * Elder Law Attorney Directory — Seed Script
 *
 * Sources:
 * 1. DataForSEO Google Maps: "elder law attorney", "Medicaid planning attorney" across 100 metros
 * 2. NELF CELA Directory (nelf.org/attorney-directory-search) — ~500 certified attorneys
 * 3. State bar directories (FL, TX, CA, NY, PA, OH) — search "elder law" practice area tag
 *
 * Run: npx ts-node scripts/seed.ts
 *
 * Requires: SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL in environment
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

async function seedFromDataForSEO() {
  console.log('Seeding from DataForSEO...')
  // The data-seeder agent handles DataForSEO queries via the SERP API.
  // Queries: "elder law attorney" + "Medicaid planning attorney" + "elder law lawyer"
  // in top 100 US metros by 65+ population density.
  // Expected yield: 8,000-15,000 listings after deduplication.
  //
  // To run manually:
  // node agents/data-seeder/jobs/seed-elder-law.js
  console.log('DataForSEO seeding handled by data-seeder agent.')
}

const SAMPLE_LISTINGS = [
  {
    full_name: 'Margaret Thompson',
    firm_name: 'Thompson Elder Law Group',
    phone: '(305) 555-0101',
    city: 'Miami',
    state: 'FL',
    zip: '33131',
    practice_areas: ['medicaid_planning', 'estate_planning', 'guardianship'],
    is_naela_member: true,
    source: 'sample',
  },
  {
    full_name: 'Robert Chen',
    firm_name: 'Chen & Associates Elder Law',
    phone: '(602) 555-0202',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85012',
    practice_areas: ['medicaid_planning', 'long_term_care', 'powers_of_attorney'],
    is_cela_certified: true,
    is_naela_member: true,
    source: 'sample',
  },
  {
    full_name: 'Susan Martinez',
    firm_name: 'Martinez Elder Law',
    phone: '(713) 555-0303',
    city: 'Houston',
    state: 'TX',
    zip: '77001',
    practice_areas: ['guardianship', 'special_needs_trust', 'estate_planning'],
    source: 'sample',
  },
  {
    full_name: 'David Kim',
    firm_name: 'Kim Elder Law & Estate Planning',
    phone: '(212) 555-0404',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    practice_areas: ['medicaid_planning', 'guardianship', 'elder_abuse'],
    is_naela_member: true,
    source: 'sample',
  },
  {
    full_name: 'Patricia Johnson',
    firm_name: 'Johnson Law — Elder & Disability',
    phone: '(215) 555-0505',
    city: 'Philadelphia',
    state: 'PA',
    zip: '19103',
    practice_areas: ['special_needs_trust', 'powers_of_attorney', 'long_term_care'],
    source: 'sample',
  },
]

async function insertSampleListings() {
  console.log('Inserting sample listings...')

  for (const listing of SAMPLE_LISTINGS) {
    const baseSlug = slugify(`${listing.full_name}-${listing.city}-${listing.state}`)
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`

    const { error } = await supabase.from('elder_listings').insert({
      slug,
      ...listing,
      is_active: true,
      is_approved: true,
      listing_tier: 'free',
      is_naela_member: listing.is_naela_member ?? false,
      is_cela_certified: listing.is_cela_certified ?? false,
      accepts_remote: false,
      free_consultation: false,
    })

    if (error) {
      console.error(`Error inserting ${listing.full_name}:`, error.message)
    } else {
      console.log(`✓ Inserted ${listing.full_name} — ${listing.city}, ${listing.state}`)
    }
  }
}

async function main() {
  console.log('Elder Law Directory — Seed Script')
  console.log('==================================')
  await insertSampleListings()
  await seedFromDataForSEO()
  console.log('\nDone! Run the data-seeder agent for full 10,000+ listing seed.')
}

main().catch(console.error)
