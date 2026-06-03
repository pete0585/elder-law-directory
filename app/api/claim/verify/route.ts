import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const id = searchParams.get('id')

  if (!token || !id) {
    return NextResponse.json({ error: 'Missing token or id' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: claim, error } = await supabase
    .from('elder_claims')
    .select('*')
    .eq('token', token)
    .eq('listing_id', id)
    .eq('verified', false)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error || !claim) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
  }

  const now = new Date().toISOString()

  await supabase
    .from('elder_claims')
    .update({ verified: true, verified_at: now, status: 'verified' })
    .eq('id', claim.id)

  await supabase
    .from('elder_listings')
    .update({ claimed_at: now, claimed_by: claim.email, listing_tier: 'free', updated_at: now })
    .eq('id', id)

  return NextResponse.json({ success: true })
}
