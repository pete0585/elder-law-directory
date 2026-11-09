import { z } from 'zod'
import { createHash } from 'node:crypto'
import { slugify } from '@/lib/utils'

export const SUBMISSION_PRACTICE_AREAS = [
  'medicaid_planning',
  'guardianship',
  'special_needs_trust',
  'estate_planning',
  'long_term_care',
  'powers_of_attorney',
  'elder_abuse',
  'veterans_benefits',
] as const

export const SUBMISSION_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
  'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
  'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
] as const

const noControl = (v: string) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(v)
const text = (max: number) => z.string().trim().max(max).refine(noControl, 'Contains invalid characters')
const optionalText = (max: number) =>
  z.union([text(max), z.null(), z.undefined()]).transform((v) => (v ? v : null))

// .strict() rejects any unknown key, so privileged columns can never ride in on the request body.
export const submissionSchema = z
  .object({
    full_name: text(120).pipe(z.string().min(2, 'Full name is required')),
    firm_name: optionalText(160),
    email: text(254).pipe(z.string().email('A valid email is required')).transform((v) => v.toLowerCase()),
    phone: z
      .union([text(40), z.null(), z.undefined()])
      .transform((v) => (v ? v : null))
      .refine((v) => v === null || (/^[+\d().\s\-xX#]{7,40}$/.test(v) && v.replace(/\D/g, '').length >= 7), 'Enter a valid phone number'),
    website: z
      .union([text(300), z.null(), z.undefined()])
      .transform((v) => (v ? v : null))
      .refine((v) => {
        if (v === null) return true
        try { const u = new URL(v); return u.protocol === 'https:' || u.protocol === 'http:' } catch { return false }
      }, 'Website must be a valid http(s) URL'),
    address_line1: optionalText(200),
    city: text(100).pipe(z.string().min(2, 'City is required')),
    state: z.enum(SUBMISSION_STATES, { errorMap: () => ({ message: 'Choose a valid state' }) }),
    zip: z
      .union([text(10), z.null(), z.undefined()])
      .transform((v) => (v ? v : null))
      .refine((v) => v === null || /^\d{5}(-\d{4})?$/.test(v), 'Enter a valid ZIP code'),
    bio: optionalText(5000),
    practice_areas: z.array(z.enum(SUBMISSION_PRACTICE_AREAS)).max(SUBMISSION_PRACTICE_AREAS.length).default([]),
    accepts_remote: z.boolean().default(false),
    free_consultation: z.boolean().default(false),
    // Honeypot: real users never see or fill this.
    contact_fax: z.string().max(200).optional(),
  })
  .strict()

export type SubmissionInput = z.infer<typeof submissionSchema>

export function dedupeKey(i: Pick<SubmissionInput, 'email' | 'full_name' | 'state'>) {
  return createHash('sha256')
    .update([i.email, i.full_name.toLowerCase().replace(/\s+/g, ' '), i.state].join('|'))
    .digest('hex')
}

// Deterministic slug: an identical resubmission collides on the UNIQUE(slug) constraint
// instead of creating a second row, making retries atomic and idempotent.
export function submissionSlug(i: SubmissionInput) {
  const base = slugify(`${i.full_name}-${i.city}-${i.state}`).slice(0, 80)
  return `${base}-${dedupeKey(i).slice(0, 8)}`
}

/** Every column set on insert. Privileged values are fixed here, never read from the request. */
export function buildListingRow(i: SubmissionInput) {
  return {
    slug: submissionSlug(i),
    full_name: i.full_name,
    firm_name: i.firm_name,
    email: i.email,
    phone: i.phone,
    website: i.website,
    address_line1: i.address_line1,
    city: i.city,
    state: i.state,
    zip: i.zip,
    bio: i.bio,
    practice_areas: Array.from(new Set(i.practice_areas)),
    accepts_remote: i.accepts_remote,
    free_consultation: i.free_consultation,
    listing_tier: 'free',
    is_active: true,
    is_approved: false,
    do_not_email: true,
    source: 'self_submit',
  } as const
}
