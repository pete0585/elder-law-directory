'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Scale } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-brand-slate border-b border-brand-slate-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 bg-brand-amber rounded-sm">
              <Scale className="w-5 h-5 text-white" aria-label="Elder law" />
            </div>
            <span className="text-white font-bold text-lg leading-tight">
              Elder<span className="text-brand-amber">Lawyer</span>Directory
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/listings" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Find an Attorney
            </Link>
            <Link href="/categories/medicaid_planning" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Medicaid Planning
            </Link>
            <Link href="/categories/guardianship" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Guardianship
            </Link>
            <Link href="/categories/special_needs_trust" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Special Needs
            </Link>
            <Link
              href="/submit"
              className="bg-brand-amber hover:bg-brand-amber-light text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Add Your Listing
            </Link>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-brand-slate-dark border-t border-brand-slate px-4 py-4 space-y-3">
          <Link href="/listings" className="block text-gray-300 hover:text-white text-sm font-medium py-2" onClick={() => setOpen(false)}>
            Find an Attorney
          </Link>
          <Link href="/categories/medicaid_planning" className="block text-gray-300 hover:text-white text-sm font-medium py-2" onClick={() => setOpen(false)}>
            Medicaid Planning
          </Link>
          <Link href="/categories/guardianship" className="block text-gray-300 hover:text-white text-sm font-medium py-2" onClick={() => setOpen(false)}>
            Guardianship
          </Link>
          <Link href="/categories/special_needs_trust" className="block text-gray-300 hover:text-white text-sm font-medium py-2" onClick={() => setOpen(false)}>
            Special Needs
          </Link>
          <Link
            href="/submit"
            className="block bg-brand-amber text-white text-sm font-semibold px-4 py-2 rounded-md text-center"
            onClick={() => setOpen(false)}
          >
            Add Your Listing
          </Link>
        </div>
      )}
    </nav>
  )
}
