import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  let body: { listing_id?: string; email?: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { listing_id, email } = body

  if (!listing_id || !email) {
    return NextResponse.json({ error: 'listing_id and email are required' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: listing, error: listingError } = await supabase
    .from('elder_listings')
    .select('id, full_name, city, state, slug')
    .eq('id', listing_id)
    .single()

  if (listingError || !listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  const token = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '')
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()

  const { error: claimError } = await supabase.from('elder_claims').insert({
    listing_id,
    email,
    token,
    verified: false,
    expires_at: expiresAt,
    status: 'pending',
  })

  if (claimError) {
    return NextResponse.json({ error: 'Failed to create claim' }, { status: 500 })
  }

  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/claim/${listing_id}?token=${token}`

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `Verify your claim — ${listing.full_name} on ElderLawyerDirectory.com`,
    trackClicks: false,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAF8F5;">
        <div style="background: #2B4C7E; padding: 20px 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">ElderLawyerDirectory.com</h2>
        </div>
        <div style="background: #fff; padding: 32px; border: 1px solid #E8E2D9; border-top: none; border-radius: 0 0 8px 8px;">
          <h1 style="color: #1a1a1a; font-size: 22px; margin-top: 0;">Claim your listing</h1>
          <p style="color: #555; font-size: 15px; line-height: 1.6;">
            You requested to claim the listing for <strong>${listing.full_name}</strong> in ${listing.city}, ${listing.state}.
          </p>
          <p style="color: #555; font-size: 15px; line-height: 1.6;">
            Click the button below to verify your email and claim your free listing. This link expires in 72 hours.
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${verifyUrl}" style="background: #2B4C7E; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;">
              Verify &amp; Claim My Listing
            </a>
          </div>
          <p style="color: #888; font-size: 13px;">
            Once claimed, upgrade to Verified ($99/yr) to add your photo, bio, and contact form. That&apos;s $8.25/month vs. ElderLawAnswers&apos; $175/month.
          </p>
          <p style="color: #aaa; font-size: 12px; margin-top: 24px;">
            If you didn&apos;t request this, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  })

  return NextResponse.json({ success: true })
}
