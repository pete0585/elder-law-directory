'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { Scale, CheckCircle, Loader2, AlertCircle, Star } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ token?: string; verified?: string }>
}

export default function ClaimPage({ params, searchParams }: PageProps) {
  const { id } = use(params)
  const { token, verified } = use(searchParams)

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [verifyState, setVerifyState] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle')
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [monthlyViews, setMonthlyViews] = useState(0)

  useEffect(() => {
    if (token) {
      setVerifyState('verifying')
      fetch(`/api/claim/verify?token=${encodeURIComponent(token)}&id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setVerifyState('success')
            setShowUpgrade(true)
          } else {
            setVerifyState('error')
          }
        })
        .catch(() => setVerifyState('error'))
    } else if (verified === 'true') {
      setVerifyState('success')
      setShowUpgrade(true)
    }
  }, [token, id, verified])

  useEffect(() => {
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
    createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
      .from('listing_views').select('*', { count: 'exact', head: true })
      .eq('directory_slug', 'elder-law').eq('listing_id', id)
      .gte('viewed_at', monthStart)
      .then(({ count }) => setMonthlyViews(count ?? 0))
  }, [id])

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const res = await fetch('/api/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listing_id: id, email }),
    })

    const data = await res.json()
    setSubmitting(false)

    if (!res.ok) {
      setError(data.error ?? 'Something went wrong. Please try again.')
      return
    }

    setSubmitted(true)
  }

  async function handleUpgrade(tier: string) {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listing_id: id, tier }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  if (verifyState === 'verifying') {
    return (
      <div className="min-h-64 flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-slate animate-spin mx-auto mb-4" aria-label="Loading" />
          <p className="text-gray-600">Verifying your claim...</p>
        </div>
      </div>
    )
  }

  if (verifyState === 'error') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" aria-label="Error" />
        <h1 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h1>
        <p className="text-gray-600 mb-6">
          This verification link has expired or is invalid. Please request a new claim link below.
        </p>
        <Link href={`/claim/${id}`} className="bg-brand-slate text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-slate-dark transition-colors">
          Request New Link
        </Link>
      </div>
    )
  }

  if (verifyState === 'success' || showUpgrade) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl border border-surface-border shadow-sm p-8 text-center mb-6">
          <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" aria-label="Success" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing Claimed!</h1>
          <p className="text-gray-600">
            Your profile is now claimed. Upgrade to Verified to start receiving inquiries from families who need exactly what you offer.
          </p>
        </div>

        <div className='text-center mb-6'>
          <div className='text-5xl font-bold text-gray-900'>{monthlyViews ?? 0}</div>
          <div className='text-gray-500 mt-1'>people viewed your profile this month</div>
          <div className='mt-3 text-red-600 font-semibold'>0 could contact you — your phone and website are hidden</div>
        </div>
        <div className='space-y-3 mb-6 text-left'>
          {[['Your phone number visible to searchers','They can call you directly'],['Your website linked','Drive traffic to your practice site'],['Your full bio displayed','Build trust before they reach out'],['Verified badge','Stand out from unclaimed profiles']].map(([title, sub]) => (
            <div key={title} className='flex items-start gap-3'>
              <span className='text-green-500 text-lg'>✓</span>
              <div><div className='font-medium'>{title}</div><div className='text-sm text-gray-500'>{sub}</div></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-brand-slate shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-brand-slate" aria-label="Verified" />
              <h2 className="font-bold text-gray-900">Verified</h2>
              <span className="ml-auto text-brand-slate font-bold">$99/yr</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-2 mb-5">
              {['Photo & full bio', 'Practice area tags', 'Contact form from families', 'Verified Elder Law badge', 'Priority above free listings', 'NAELA/CELA credential display'].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" aria-label="Included" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade('verified')}
              className="w-full bg-brand-slate hover:bg-brand-slate-dark text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Upgrade to Verified — $99/yr
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">$8.25/month. ElderLawAnswers charges $175/month.</p>
          </div>

          <div className="bg-white rounded-xl border border-brand-amber shadow-sm p-6 relative">
            <div className="absolute top-0 right-0 bg-brand-amber text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
              Best Value
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-brand-amber" aria-label="Featured" />
              <h2 className="font-bold text-gray-900">Featured</h2>
              <span className="ml-auto text-brand-amber-dark font-bold">$199/yr</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-2 mb-5">
              {['Everything in Verified', '#1 position in your market', 'Featured badge in search results', 'Category sponsorship slot', 'Monthly inquiry report'].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" aria-label="Included" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade('featured')}
              className="w-full bg-brand-amber hover:bg-brand-amber-light text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Upgrade to Featured — $199/yr
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" aria-label="Sent" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
        <p className="text-gray-600">
          We sent a verification link to <strong>{email}</strong>. Click it to claim your listing.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-slate/10 rounded-full mb-4">
          <Scale className="w-7 h-7 text-brand-slate" aria-label="Claim" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Claim Your Listing</h1>
        <p className="text-gray-600">
          Enter your professional email to receive a verification link. It&apos;s free to claim.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-surface-border shadow-sm p-6">
        <form onSubmit={handleClaim} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourfirm.com"
              className="w-full border border-surface-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-slate"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-slate hover:bg-brand-slate-dark text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
          >
            {submitting ? 'Sending...' : 'Send Verification Link'}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          We&apos;ll send a one-time link to verify you are the attorney named in this listing.
        </p>
      </div>
    </div>
  )
}
