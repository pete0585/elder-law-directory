'use client'
import { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
export function ViewTracker({ listingId, directorySlug }: { listingId: string; directorySlug: string }) {
  useEffect(() => {
    createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
      .from('listing_views').insert({ directory_slug: directorySlug, listing_id: listingId }).then(() => {})
  }, [listingId, directorySlug])
  return null
}
