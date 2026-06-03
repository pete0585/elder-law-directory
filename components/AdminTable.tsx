import Link from 'next/link'
import { Check, X, MapPin } from 'lucide-react'
import type { Listing } from '@/lib/types'
import { STATE_NAMES } from '@/lib/utils'

interface AdminTableProps {
  listings: Listing[]
  onApprove: (id: string) => Promise<void>
  onReject: (id: string) => Promise<void>
}

export default function AdminTable({ listings, onApprove, onReject }: AdminTableProps) {
  if (listings.length === 0) {
    return (
      <div className="px-6 py-8 text-center text-gray-500 text-sm">No listings in this section.</div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-surface border-b border-surface-border">
          <tr>
            <th className="text-left px-6 py-3 font-medium text-gray-600">Attorney</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Location</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Tier</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Source</th>
            <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border">
          {listings.map((l) => (
            <tr key={l.id} className="hover:bg-surface/50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{l.full_name}</div>
                {l.firm_name && <div className="text-xs text-gray-500">{l.firm_name}</div>}
                <Link href={`/listings/${l.slug}`} className="text-xs text-brand-slate hover:underline" target="_blank">
                  View profile →
                </Link>
              </td>
              <td className="px-4 py-4">
                <span className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-label="Location" />
                  {l.city}, {STATE_NAMES[l.state] ?? l.state}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  l.listing_tier === 'featured'
                    ? 'bg-brand-amber/15 text-brand-amber-dark'
                    : l.listing_tier === 'verified'
                    ? 'bg-brand-slate/10 text-brand-slate'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {l.listing_tier}
                </span>
              </td>
              <td className="px-4 py-4 text-gray-500 text-xs">{l.source ?? '—'}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <form action={onApprove.bind(null, l.id)}>
                    <button
                      type="submit"
                      className="flex items-center gap-1 text-xs bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" aria-label="Approve" />
                      Approve
                    </button>
                  </form>
                  <form action={onReject.bind(null, l.id)}>
                    <button
                      type="submit"
                      className="flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <X className="w-3.5 h-3.5" aria-label="Reject" />
                      Reject
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
