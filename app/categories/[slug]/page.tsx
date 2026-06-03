import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByPracticeArea } from '@/lib/data'
import { PRACTICE_AREAS } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const label = PRACTICE_AREAS[slug]
  if (!label) return { title: 'Category Not Found' }

  return {
    title: `${label} Attorneys | ElderLawyerDirectory.com`,
    description: `Find ${label.toLowerCase()} attorneys near you. Search verified elder law attorneys who specialize in ${label.toLowerCase()}.`,
    alternates: { canonical: `https://elderlawyerdirectory.com/categories/${slug}` },
  }
}

export const revalidate = 3600

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const label = PRACTICE_AREAS[slug]
  if (!label) notFound()

  const listings = await getListingsByPracticeArea(slug)

  const categoryDescriptions: Record<string, string> = {
    medicaid_planning: 'Medicaid planning attorneys help families protect assets before long-term care costs deplete them. They navigate Medicaid\'s 5-year lookback rule, establish Medicaid Asset Protection Trusts (MAPTs), and manage spend-down strategies. Essential for families facing nursing home costs.',
    guardianship: 'Guardianship attorneys help families obtain legal authority to make decisions for a parent or family member who can no longer care for themselves. They handle both limited and full guardianship proceedings in probate court.',
    special_needs_trust: 'Special needs trust attorneys establish supplemental needs trusts that preserve government benefits (SSI, Medicaid) for disabled family members while allowing additional assets to improve quality of life.',
    estate_planning: 'Estate planning attorneys in elder law focus on incapacity planning — not just death planning. They draft wills, trusts, and advance directives tailored to the needs of older adults and their families.',
    long_term_care: 'Long-term care planning attorneys help families evaluate nursing home, assisted living, and home care options while protecting assets and maximizing available benefits. They work proactively before a crisis hits.',
    powers_of_attorney: 'Powers of attorney attorneys draft durable financial POAs and healthcare proxies that remain effective when someone becomes incapacitated. Essential planning for every adult over 65.',
    elder_abuse: 'Elder abuse attorneys represent seniors who have been financially exploited, physically abused, or neglected — whether by family members, caregivers, or nursing facilities.',
    veterans_benefits: 'Veterans benefits elder law attorneys help wartime veterans and their spouses qualify for VA Aid and Attendance — a benefit that can cover $1,200–$2,700/month in long-term care costs.',
  }

  const faqItems: Record<string, { q: string; a: string }[]> = {
    medicaid_planning: [
      { q: 'What is the Medicaid 5-year lookback?', a: 'Medicaid reviews all asset transfers made in the 5 years before your application. Transfers for less than fair market value can result in a period of Medicaid ineligibility. Proper planning before this window is critical.' },
      { q: 'How much can a Medicaid planning attorney save my family?', a: 'Depending on your state and asset level, proper Medicaid planning can protect $50,000–$500,000+ in assets from spend-down. The attorney fee is typically a fraction of what is protected.' },
    ],
    guardianship: [
      { q: 'What is the difference between guardianship and power of attorney?', a: 'A power of attorney is established voluntarily before incapacity. Guardianship is a court-ordered process that becomes necessary when someone is already incapacitated and has no valid POA in place.' },
    ],
    special_needs_trust: [
      { q: 'Does a special needs trust disqualify someone from SSI or Medicaid?', a: 'No — a properly drafted supplemental needs trust (SNT) preserves SSI and Medicaid eligibility while allowing additional assets to supplement government benefits.' },
    ],
    estate_planning: [
      { q: 'How is elder law estate planning different from regular estate planning?', a: 'Elder law estate planning specifically addresses incapacity, long-term care, and Medicaid eligibility — not just what happens after death. It includes advance directives, trusts that qualify for Medicaid, and strategies for protecting a spouse\'s assets.' },
    ],
    long_term_care: [
      { q: 'When should I start long-term care planning?', a: 'Ideally at 60–65, before any health crisis occurs. The Medicaid 5-year lookback means planning must happen years in advance. Starting early provides the most options and the most protection.' },
    ],
    powers_of_attorney: [
      { q: 'What happens if I become incapacitated without a power of attorney?', a: 'Your family will likely need to pursue a court-ordered guardianship or conservatorship — a lengthy, expensive, and public process that a simple POA would have avoided entirely.' },
    ],
    elder_abuse: [
      { q: 'What qualifies as elder financial abuse?', a: 'Elder financial abuse includes unauthorized use of funds, forging signatures, pressuring someone to change their will or trust, taking property without compensation, and misusing a power of attorney.' },
    ],
    veterans_benefits: [
      { q: 'What is VA Aid and Attendance?', a: 'Aid and Attendance is a VA pension benefit available to wartime veterans (and surviving spouses) who need help with daily activities. It can pay up to $2,727/month tax-free for a married veteran — enough to cover significant long-term care costs.' },
    ],
  }

  const faqs = faqItems[slug] ?? []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-slate">Home</Link>
        <span>/</span>
        <Link href="/listings" className="hover:text-brand-slate">Attorneys</Link>
        <span>/</span>
        <span className="text-gray-900">{label}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{label} Attorneys</h1>

      {categoryDescriptions[slug] && (
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mb-8">
          {categoryDescriptions[slug]}
        </p>
      )}

      {faqs.length > 0 && (
        <div className="bg-surface border border-surface-border rounded-xl p-6 mb-10">
          <h2 className="font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{faq.q}</h3>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {listings.length > 0 ? (
        <>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {listings.length} {label} Attorneys
          </h2>
          <div className="space-y-4">
            {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/listings?practice_area=${slug}`}
              className="bg-brand-slate hover:bg-brand-slate-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              View All {label} Attorneys
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No attorneys found in this category yet.</p>
          <Link href="/listings" className="text-brand-slate hover:underline font-medium">Browse all attorneys</Link>
        </div>
      )}
    </div>
  )
}
