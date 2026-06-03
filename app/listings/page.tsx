import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import FilterSidebar from '@/components/FilterSidebar'
import SearchBar from '@/components/SearchBar'
import { getListings } from '@/lib/data'
import { STATE_NAMES, PRACTICE_AREAS } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PageProps {
  searchParams: Promise<{
    q?: string
    state?: string
    practice_area?: string
    tier?: string
    page?: string
  }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  let title = 'Elder Law Attorney Directory'
  const parts: string[] = []

  if (params.state && STATE_NAMES[params.state]) parts.push(`in ${STATE_NAMES[params.state]}`)
  if (params.practice_area && PRACTICE_AREAS[params.practice_area]) parts.push(PRACTICE_AREAS[params.practice_area])
  if (params.q) parts.push(`"${params.q}"`)
  if (parts.length > 0) title = `Elder Law Attorneys ${parts.join(', ')}`

  return {
    title,
    description: `Find elder law attorneys${parts.length > 0 ? ` ${parts.join(', ')}` : ''}. Search the ElderLawyerDirectory.com — free to search, updated daily.`,
    alternates: { canonical: 'https://elderlawyerdirectory.com/listings' },
  }
}

export const revalidate = 300

async function ListingsContent({ searchParams }: PageProps) {
  const params = await searchParams
  const page = parseInt(params.page ?? '1', 10)
  const { listings, total } = await getListings({
    q: params.q,
    state: params.state,
    practice_area: params.practice_area,
    tier: params.tier,
    page,
  })

  const pageSize = 20
  const totalPages = Math.ceil(total / pageSize)

  function buildPageUrl(p: number) {
    const ps = new URLSearchParams()
    if (params.q) ps.set('q', params.q)
    if (params.state) ps.set('state', params.state)
    if (params.practice_area) ps.set('practice_area', params.practice_area)
    if (params.tier) ps.set('tier', params.tier)
    if (p > 1) ps.set('page', String(p))
    const str = ps.toString()
    return `/listings${str ? `?${str}` : ''}`
  }

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        <strong className="text-gray-900">{total.toLocaleString()}</strong> attorney{total !== 1 ? 's' : ''} found
        {params.state && STATE_NAMES[params.state] ? ` in ${STATE_NAMES[params.state]}` : ''}
        {params.practice_area && PRACTICE_AREAS[params.practice_area] ? ` — ${PRACTICE_AREAS[params.practice_area]}` : ''}
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">No attorneys found with those filters.</p>
          <Link href="/listings" className="text-brand-slate hover:underline font-medium">Clear all filters</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={buildPageUrl(page - 1)}
              className="flex items-center gap-1 text-sm px-3 py-2 border border-surface-border rounded-lg hover:border-brand-slate/40 text-gray-700"
            >
              <ChevronLeft className="w-4 h-4" aria-label="Previous" /> Prev
            </Link>
          )}
          <span className="text-sm text-gray-600 px-3">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link
              href={buildPageUrl(page + 1)}
              className="flex items-center gap-1 text-sm px-3 py-2 border border-surface-border rounded-lg hover:border-brand-slate/40 text-gray-700"
            >
              Next <ChevronRight className="w-4 h-4" aria-label="Next" />
            </Link>
          )}
        </div>
      )}
    </>
  )
}

export default async function ListingsPage({ searchParams }: PageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Find Elder Law Attorneys</h1>
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Suspense fallback={null}>
            <FilterSidebar />
          </Suspense>
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<div className="py-12 text-center text-gray-500">Loading attorneys...</div>}>
            <ListingsContent searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
