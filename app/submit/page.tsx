import type { Metadata } from 'next'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'Add Your Elder Law Listing | ElderLawyerDirectory.com',
  description: 'Add your elder law attorney profile to the directory. Free listing — claim and upgrade to Verified ($99/yr) or Featured ($199/yr) anytime.',
}

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Listing</h1>
        <p className="text-gray-600">
          Free to list. Families searching for Medicaid planning and elder law help are looking for you right now.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-surface-border shadow-sm p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { tier: 'Free', price: '$0', desc: 'Name, city, phone, website' },
            { tier: 'Verified', price: '$99/yr', desc: 'Full profile + contact form + badge' },
            { tier: 'Featured', price: '$199/yr', desc: '#1 placement + all Verified features' },
          ].map((t) => (
            <div key={t.tier} className={`p-3 rounded-lg border ${t.tier === 'Featured' ? 'border-brand-amber bg-brand-amber/5' : 'border-surface-border bg-surface'}`}>
              <div className="font-bold text-gray-900 text-sm">{t.tier}</div>
              <div className="text-brand-slate font-semibold text-sm">{t.price}</div>
              <div className="text-xs text-gray-500 mt-1">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <SubmitForm />
    </div>
  )
}
