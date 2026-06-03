import { createServiceClient } from '@/lib/supabase/server'
import AdminTable from '@/components/AdminTable'
import type { Listing } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export const metadata = { title: 'Admin — ElderLawyerDirectory' }

async function approveListing(id: string) {
  'use server'
  const supabase = await createServiceClient()
  await supabase.from('elder_listings').update({ is_approved: true }).eq('id', id)
  revalidatePath('/admin')
}

async function rejectListing(id: string) {
  'use server'
  const supabase = await createServiceClient()
  await supabase.from('elder_listings').update({ is_active: false, is_approved: false }).eq('id', id)
  revalidatePath('/admin')
}

export default async function AdminPage() {
  const supabase = await createServiceClient()

  const [pendingResult, recentResult, statsResult] = await Promise.all([
    supabase
      .from('elder_listings')
      .select('*')
      .eq('is_approved', false)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(50),
    supabase
      .from('elder_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('elder_listings')
      .select('listing_tier, claimed_at')
      .eq('is_active', true),
  ])

  const pending = (pendingResult.data as Listing[]) ?? []
  const recent = (recentResult.data as Listing[]) ?? []
  const all = statsResult.data ?? []

  const stats = {
    total: all.length,
    claimed: all.filter((l) => l.claimed_at).length,
    verified: all.filter((l) => l.listing_tier === 'verified').length,
    featured: all.filter((l) => l.listing_tier === 'featured').length,
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Listings', value: stats.total },
          { label: 'Claimed', value: stats.claimed },
          { label: 'Verified', value: stats.verified },
          { label: 'Featured', value: stats.featured },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-surface-border p-5 text-center">
            <div className="text-3xl font-bold text-brand-slate">{stat.value.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-surface-border shadow-sm">
        <div className="px-6 py-4 border-b border-surface-border">
          <h2 className="font-semibold text-gray-900">Pending Approval ({pending.length})</h2>
        </div>
        <AdminTable listings={pending} onApprove={approveListing} onReject={rejectListing} />
      </div>

      <div className="bg-white rounded-xl border border-surface-border shadow-sm">
        <div className="px-6 py-4 border-b border-surface-border">
          <h2 className="font-semibold text-gray-900">Recent Listings</h2>
        </div>
        <AdminTable listings={recent} onApprove={approveListing} onReject={rejectListing} />
      </div>
    </div>
  )
}
