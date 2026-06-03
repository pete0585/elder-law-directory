import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://elderlawyerdirectory.com'),
  title: {
    default: 'Elder Law Attorney Directory | ElderLawyerDirectory.com',
    template: '%s | ElderLawyerDirectory.com',
  },
  description: 'Find elder law attorneys near you for Medicaid planning, guardianship, estate planning, and long-term care. Search 10,000+ elder law attorneys — free, fast, and built for families.',
  keywords: ['elder law attorney', 'elder law attorney near me', 'Medicaid planning attorney', 'guardianship attorney', 'elder law lawyer', 'nursing home attorney', 'special needs trust attorney'],
  openGraph: {
    type: 'website',
    siteName: 'ElderLawyerDirectory.com',
    title: 'Elder Law Attorney Directory | ElderLawyerDirectory.com',
    description: 'Find elder law attorneys for Medicaid planning, guardianship, and long-term care. Search 10,000+ attorneys — free.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://elderlawyerdirectory.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
