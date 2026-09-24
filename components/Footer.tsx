import Link from 'next/link';
import { Scale } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';
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
    ];
    const practiceAreas = [
        { key: 'medicaid_planning', label: 'Medicaid Planning' },
        { key: 'guardianship', label: 'Guardianship' },
        { key: 'special_needs_trust', label: 'Special Needs Trusts' },
        { key: 'estate_planning', label: 'Estate Planning' },
        { key: 'long_term_care', label: 'Long-Term Care' },
        { key: 'powers_of_attorney', label: 'Powers of Attorney' },
        { key: 'elder_abuse', label: 'Elder Abuse' },
        { key: 'veterans_benefits', label: 'Veterans Benefits' },
    ];
    return (<footer className="bg-brand-slate-dark text-gray-300 mt-16">
      <></>
    
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500">
              <a href="https://studiozerohq.com" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors">Powered by AIdam</a>
              {' · '}
              <a href="https://studiozerohq.com" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors">Studio Zero — AI Marketing Operators for Healthcare</a>
            </p>
          </div>
        
      {/* Newsletter signup compact */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <NewsletterSignup compact/>
      </div>
  </footer>);
}
