import Link from 'next/link'
import { Scale } from 'lucide-react'

export default function Footer() {
  const topStates = [
    { abbr: 'FL', name: 'Florida' },
    { abbr: 'CA', name: 'California' },
    { abbr: 'TX', name: 'Texas' },
    { abbr: 'NY', name: 'New York' },
    { abbr: 'PA', name: 'Pennsylvania' },
    { abbr: 'OH', name: 'Ohio' },
    { abbr: 'AZ', name: 'Arizona' },
    { abbr: 'IL', name: 'Illinois' },
    { abbr: 'MI', name: 'Michigan' },
    { abbr: 'NC', name: 'North Carolina' },
  ]

  const practiceAreas = [
    { key: 'medicaid_planning', label: 'Medicaid Planning' },
    { key: 'guardianship', label: 'Guardianship' },
    { key: 'special_needs_trust', label: 'Special Needs Trusts' },
    { key: 'estate_planning', label: 'Estate Planning' },
    { key: 'long_term_care', label: 'Long-Term Care' },
    { key: 'powers_of_attorney', label: 'Powers of Attorney' },
    { key: 'elder_abuse', label: 'Elder Abuse' },
    { key: 'veterans_benefits', label: 'Veterans Benefits' },
  ]

  return (
    <footer className="bg-brand-slate-dark text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-7 h-7 bg-brand-amber rounded-sm">
                <Scale className="w-4 h-4 text-white" aria-label="Elder law" />
              </div>
              <span className="text-white font-bold text-sm">
                Elder<span className="text-brand-amber">Lawyer</span>Directory
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Find elder law attorneys for Medicaid planning, guardianship, and long-term care. Built for families in crisis and attorneys who serve them.
            </p>
            <div className="mt-4">
              <Link
                href="/submit"
                className="text-xs text-brand-amber hover:text-brand-amber-light font-medium"
              >
                Are you an elder law attorney? Add your listing →
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">By State</h3>
            <ul className="space-y-2">
              {topStates.slice(0, 5).map((s) => (
                <li key={s.abbr}>
                  <Link href={`/listings?state=${s.abbr}`} className="text-sm text-gray-400 hover:text-brand-amber transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Practice Areas</h3>
            <ul className="space-y-2">
              {practiceAreas.slice(0, 5).map((pa) => (
                <li key={pa.key}>
                  <Link href={`/categories/${pa.key}`} className="text-sm text-gray-400 hover:text-brand-amber transition-colors">
                    {pa.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">For Attorneys</h3>
            <ul className="space-y-2">
              <li><Link href="/submit" className="text-sm text-gray-400 hover:text-brand-amber transition-colors">Add Your Listing</Link></li>
              <li><Link href="/listings" className="text-sm text-gray-400 hover:text-brand-amber transition-colors">Browse All Attorneys</Link></li>
              <li>
                <a
                  href="https://www.naela.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-brand-amber transition-colors"
                >
                  NAELA (National Association)
                </a>
              </li>
              <li>
                <a
                  href="https://www.nelf.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-brand-amber transition-colors"
                >
                  NELF (CELA Certification)
                </a>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-brand-amber/10 border border-brand-amber/20 rounded-lg">
              <p className="text-xs text-brand-amber font-semibold">Pricing vs. ElderLawAnswers</p>
              <p className="text-xs text-gray-400 mt-1">Us: $99/yr ($8.25/mo)</p>
              <p className="text-xs text-gray-400">Them: $2,100/yr ($175/mo)</p>
              <p className="text-xs text-brand-amber mt-1 font-medium">21x cheaper.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-slate flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} ElderLawyerDirectory.com — All rights reserved.</p>
          <p>Not a law firm. Not legal advice. A free attorney finder.</p>
        </div>
      </div>
    </footer>
  )
}
