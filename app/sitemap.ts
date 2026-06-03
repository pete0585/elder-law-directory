import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/data'
import { TOP_STATES } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://elderlawyerdirectory.com'

  const slugs = await getAllSlugs()

  const listings: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/listings/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const states: MetadataRoute.Sitemap = TOP_STATES.map((abbr) => ({
    url: `${base}/listings?state=${abbr}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  const practiceAreas = [
    'medicaid_planning', 'guardianship', 'special_needs_trust',
    'estate_planning', 'long_term_care', 'powers_of_attorney',
    'elder_abuse', 'veterans_benefits',
  ]

  const categories: MetadataRoute.Sitemap = practiceAreas.map((pa) => ({
    url: `${base}/categories/${pa}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...states,
    ...categories,
    ...listings,
  ]
}
