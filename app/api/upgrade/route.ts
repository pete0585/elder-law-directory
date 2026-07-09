import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { stripe, VERIFIED_PRICE_ID, FEATURED_PRICE_ID } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  let body: { listingId?: string; listing_id?: string; tier?: string }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const listingId = body?.listingId ?? body?.listing_id
  const tier = body?.tier

  if (!listingId || !tier || !['verified', 'featured'].includes(tier)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const supabase = await createServiceClient()

    const { data: listing, error } = await supabase
      .from('elder_listings')
      .select('id, full_name, email')
      .eq('id', listingId)
      .single()

    if (error || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const priceId = tier === 'featured' ? FEATURED_PRICE_ID : VERIFIED_PRICE_ID
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elderlawyerdirectory.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { listing_id: listingId, tier },
      success_url: `${siteUrl}/claim/${listingId}?verified=true&tier=${tier}`,
      cancel_url: `${siteUrl}/claim/${listingId}`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Upgrade error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
