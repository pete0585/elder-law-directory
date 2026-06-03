'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  large?: boolean
  className?: string
}

export default function SearchBar({ large = false, className }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [state, setState] = useState(searchParams.get('state') ?? '')

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
    setState(searchParams.get('state') ?? '')
  }, [searchParams])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (state) params.set('state', state)
    const existing = searchParams.get('practice_area')
    if (existing) params.set('practice_area', existing)
    router.push(`/listings${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <form onSubmit={handleSearch} className={cn('flex flex-col sm:flex-row gap-2', className)}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-label="Search" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={large ? 'Search by attorney name, firm, or city...' : 'Search attorneys...'}
          className={cn(
            'w-full pl-10 pr-4 border border-surface-border rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-slate',
            large ? 'py-3.5 text-base' : 'py-2.5 text-sm'
          )}
        />
      </div>

      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className={cn(
          'border border-surface-border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-slate sm:w-40',
          large ? 'px-3 py-3.5 text-base' : 'px-3 py-2.5 text-sm'
        )}
      >
        <option value="">All States</option>
        {[
          ['AL','Alabama'],['AK','Alaska'],['AZ','Arizona'],['AR','Arkansas'],['CA','California'],
          ['CO','Colorado'],['CT','Connecticut'],['DE','Delaware'],['FL','Florida'],['GA','Georgia'],
          ['HI','Hawaii'],['ID','Idaho'],['IL','Illinois'],['IN','Indiana'],['IA','Iowa'],
          ['KS','Kansas'],['KY','Kentucky'],['LA','Louisiana'],['ME','Maine'],['MD','Maryland'],
          ['MA','Massachusetts'],['MI','Michigan'],['MN','Minnesota'],['MS','Mississippi'],['MO','Missouri'],
          ['MT','Montana'],['NE','Nebraska'],['NV','Nevada'],['NH','New Hampshire'],['NJ','New Jersey'],
          ['NM','New Mexico'],['NY','New York'],['NC','North Carolina'],['ND','North Dakota'],['OH','Ohio'],
          ['OK','Oklahoma'],['OR','Oregon'],['PA','Pennsylvania'],['RI','Rhode Island'],['SC','South Carolina'],
          ['SD','South Dakota'],['TN','Tennessee'],['TX','Texas'],['UT','Utah'],['VT','Vermont'],
          ['VA','Virginia'],['WA','Washington'],['WV','West Virginia'],['WI','Wisconsin'],['WY','Wyoming'],
          ['DC','Washington D.C.'],
        ].map(([abbr, name]) => (
          <option key={abbr} value={abbr}>{name}</option>
        ))}
      </select>

      <button
        type="submit"
        className={cn(
          'bg-brand-slate hover:bg-brand-slate-dark text-white font-semibold rounded-lg transition-colors whitespace-nowrap',
          large ? 'px-6 py-3.5 text-base' : 'px-4 py-2.5 text-sm'
        )}
      >
        Search
      </button>
    </form>
  )
}
