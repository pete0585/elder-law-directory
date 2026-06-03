'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'
import { slugify } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const schema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  firm_name: z.string().optional(),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().optional(),
  bio: z.string().optional(),
  practice_areas: z.array(z.string()).optional(),
  accepts_remote: z.boolean().optional(),
  free_consultation: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

const PRACTICE_AREA_OPTIONS = [
  { value: 'medicaid_planning', label: 'Medicaid Planning' },
  { value: 'guardianship', label: 'Guardianship' },
  { value: 'special_needs_trust', label: 'Special Needs Trusts' },
  { value: 'estate_planning', label: 'Estate Planning' },
  { value: 'long_term_care', label: 'Long-Term Care Planning' },
  { value: 'powers_of_attorney', label: 'Powers of Attorney' },
  { value: 'elder_abuse', label: 'Elder Abuse' },
  { value: 'veterans_benefits', label: 'Veterans Benefits' },
]

const STATE_OPTIONS = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
]

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { accepts_remote: false, free_consultation: false },
  })

  function toggleArea(value: string) {
    setSelectedAreas((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    )
  }

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    const supabase = createClient()

    const baseSlug = slugify(`${data.full_name}-${data.city}-${data.state}`)
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`

    await supabase.from('elder_listings').insert({
      slug,
      full_name: data.full_name,
      firm_name: data.firm_name || null,
      email: data.email || null,
      phone: data.phone || null,
      website: data.website || null,
      city: data.city,
      state: data.state,
      zip: data.zip || null,
      bio: data.bio || null,
      practice_areas: selectedAreas,
      accepts_remote: data.accepts_remote ?? false,
      free_consultation: data.free_consultation ?? false,
      listing_tier: 'free',
      is_active: true,
      is_approved: true,
      source: 'self_submit',
    })

    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-surface-border shadow-sm p-8 text-center">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" aria-label="Success" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Listing Submitted!</h2>
        <p className="text-gray-600">Your free listing is now live. Check your email to claim and upgrade it.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-surface-border shadow-sm p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input {...register('full_name')} placeholder="Jane Smith, Esq." className="w-full border border-surface-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-slate" />
          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Law Firm Name</label>
          <input {...register('firm_name')} placeholder="Smith Elder Law, LLC" className="w-full border border-surface-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-slate" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input {...register('email')} type="email" placeholder="you@yourfirm.com" className="w-full border border-surface-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-slate" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input {...register('phone')} type="tel" placeholder="(555) 555-5555" className="w-full border border-surface-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-slate" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
        <input {...register('website')} type="url" placeholder="https://yourfirm.com" className="w-full border border-surface-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-slate" />
        {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
          <input {...register('city')} placeholder="Miami" className="w-full border border-surface-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-slate" />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
          <select {...register('state')} className="w-full border border-surface-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-slate">
            <option value="">--</option>
            {STATE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
          <input {...register('zip')} placeholder="33101" className="w-full border border-surface-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-slate" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea {...register('bio')} rows={4} placeholder="Tell families about your elder law practice, your approach to Medicaid planning, and how long you've been practicing..." className="w-full border border-surface-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-slate resize-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Practice Areas</label>
        <div className="flex flex-wrap gap-2">
          {PRACTICE_AREA_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleArea(option.value)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                selectedAreas.includes(option.value)
                  ? 'bg-brand-slate text-white border-brand-slate'
                  : 'bg-white text-gray-700 border-surface-border hover:border-brand-slate/40'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input {...register('accepts_remote')} type="checkbox" className="w-4 h-4 rounded border-surface-border accent-brand-slate" />
          <span className="text-sm text-gray-700">Remote consultations available</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input {...register('free_consultation')} type="checkbox" className="w-4 h-4 rounded border-surface-border accent-brand-slate" />
          <span className="text-sm text-gray-700">Free initial consultation</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-brand-slate hover:bg-brand-slate-dark text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
      >
        {submitting ? 'Submitting...' : 'Submit Free Listing'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Free to list. Upgrade to Verified ($99/yr) or Featured ($199/yr) after claiming.
      </p>
    </form>
  )
}
