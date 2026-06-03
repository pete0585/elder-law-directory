'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { PRACTICE_AREAS } from '@/lib/utils'

export default function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/listings?${params.toString()}`)
  }

  const activePracticeArea = searchParams.get('practice_area') ?? ''
  const activeTier = searchParams.get('tier') ?? ''

  return (
    <div className="space-y-6">
      {/* Practice Area */}
      <div className="bg-white rounded-xl border border-surface-border shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Practice Area</h3>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter('practice_area', '')}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
              !activePracticeArea ? 'bg-brand-slate text-white' : 'text-gray-700 hover:bg-surface'
            }`}
          >
            All Areas
          </button>
          {Object.entries(PRACTICE_AREAS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => updateFilter('practice_area', key)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                activePracticeArea === key ? 'bg-brand-slate text-white' : 'text-gray-700 hover:bg-surface'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tier */}
      <div className="bg-white rounded-xl border border-surface-border shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Listing Type</h3>
        <div className="space-y-1">
          {[
            { value: '', label: 'All Attorneys' },
            { value: 'featured', label: 'Featured' },
            { value: 'verified', label: 'Verified' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter('tier', option.value)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                activeTier === option.value ? 'bg-brand-slate text-white' : 'text-gray-700 hover:bg-surface'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {(activePracticeArea || activeTier) && (
        <button
          onClick={() => router.push('/listings')}
          className="w-full text-center text-sm text-brand-slate hover:underline font-medium py-2"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
