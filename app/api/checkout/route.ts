import { NextRequest, NextResponse } from 'next/server'
import { stripe, VERIFIED_PRICE_ID, FEATURED_PRICE_ID } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  let body: { listing_id?: string; tier?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { listing_id, tier } = body

  if (!listing_id || !tier) {
    return NextResponse.json({ error: 'listing_id and tier are required' }, { status: 400 })
  }

  const priceId = tier === 'featured' ? FEATURED_PRICE_ID : VERIFIED_PRICE_ID
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { listing_id, tier },
    success_url: `${siteUrl}/claim/${listing_id}?verified=true`,
    cancel_url: `${siteUrl}/claim/${listing_id}`,
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}
