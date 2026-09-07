import { readdir } from 'node:fs/promises'
import path from 'node:path'
import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/data'
import { SITE_URL, TOP_STATES } from '@/lib/utils'

const CITY_PAGES_DIR = path.join(process.cwd(), 'app', 'elder-law-attorneys')

/** Static city folders with a page.tsx; skip Next.js [dynamic] segments. */
async function getStaticCitySlugs(): Promise<string[]> {
  const entries = await readdir(CITY_PAGES_DIR, { withFileTypes: true })
  const slugs: string[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (entry.name.startsWith('[') && entry.name.endsWith(']')) continue

    const files = await readdir(path.join(CITY_PAGES_DIR, entry.name))
    if (files.includes('page.tsx')) slugs.push(entry.name)
  }

  return slugs.sort()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL

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

  const citySlugs = await getStaticCitySlugs()
  const cities: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${base}/elder-law-attorneys/${slug}`,
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
    ...cities,
    ...listings,
  ]
}
