import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { buildListingRow, submissionSchema } from '@/lib/submission'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 20_000
const PER_IP_LIMIT = 5
const WINDOW_MS = 60 * 60 * 1000
const GLOBAL_HOURLY_LIMIT = 60
const hits = new Map<string, number[]>()

const json = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.forEach((v, k) => { if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k) })
  return recent.length > PER_IP_LIMIT
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin')
    if (origin && origin !== req.nextUrl.origin) return json({ error: 'Request not allowed.' }, 403)

    const ip = (req.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim()
    if (limited(ip)) return json({ error: 'Too many submissions. Please try again later.' }, 429)

    const raw = await req.text()
    if (raw.length > MAX_BODY_BYTES) return json({ error: 'Submission is too large.' }, 413)
    let body: unknown
    try { body = JSON.parse(raw) } catch { return json({ error: 'Invalid request body.' }, 400) }

    const parsed = submissionSchema.safeParse(body)
    if (!parsed.success) {
      const fields: Record<string, string> = {}
      for (const issue of parsed.error.issues) fields[String(issue.path[0] ?? 'form')] ??= issue.message
      return json({ error: 'Please correct the highlighted fields.', fields }, 400)
    }
    // Honeypot tripped: pretend success so bots learn nothing, store nothing.
    if (parsed.data.contact_fax) return json({ success: true, status: 'pending_review' })

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return json({ error: 'Submissions are temporarily unavailable. Please try again later.' }, 503)
    }
    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const since = new Date(Date.now() - WINDOW_MS).toISOString()
    const recent = await db.from('elder_listings').select('id', { count: 'exact', head: true }).eq('source', 'self_submit').gte('created_at', since)
    if (recent.error) return json({ error: 'Submissions are temporarily unavailable. Please try again later.' }, 503)
    if ((recent.count ?? 0) >= GLOBAL_HOURLY_LIMIT) return json({ error: 'We are receiving many submissions. Please try again later.' }, 429)

    const row = buildListingRow(parsed.data)
    const insert = await db.from('elder_listings').insert(row)
    // 23505 = unique violation on slug: the identical submission already exists, so a retry is a no-op.
    if (insert.error && insert.error.code !== '23505') {
      console.error('submit insert failed', insert.error.code, insert.error.message)
      return json({ error: 'Your listing could not be saved. Nothing was submitted; please try again.' }, 503)
    }

    // Success is reported only once the stored row is read back as an unapproved free listing.
    const saved = await db.from('elder_listings').select('id,is_approved,listing_tier').eq('slug', row.slug).maybeSingle()
    const duplicate = Boolean(insert.error)
    if (saved.error || !saved.data || (!duplicate && (saved.data.is_approved !== false || saved.data.listing_tier !== 'free'))) {
      console.error('submit readback failed')
      return json({ error: 'Your listing could not be confirmed. Please try again.' }, 503)
    }
    return json({ success: true, status: 'pending_review', duplicate: duplicate || undefined })
  } catch {
    return json({ error: 'Submissions are temporarily unavailable. Please try again later.' }, 503)
  }
}
