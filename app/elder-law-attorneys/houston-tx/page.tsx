import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { SITE_URL } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Best Elder Law Attorney in Houston, TX | Elder Law Attorney Directory",
  description: "Find elder law attorney in Houston, Texas. 29+ listed. Filter by city and compare providers.",
  alternates: { canonical: `${SITE_URL}/elder-law-attorneys/houston-tx` },
}

async function getListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("elder_listings")
    .select("*")
    .eq("city", "Houston")
    .eq("state", "TX")
    .eq("is_active", true)
    .limit(24)
  return data ?? []
}

function listingName(row: Record<string, unknown>) {
  return (
    (row["full_name"] as string) ||
    (row.name as string) ||
    (row.full_name as string) ||
    (row.clinic_name as string) ||
    "Listing"
  )
}

function listingHref(row: Record<string, unknown>) {
  const slug = String(row.slug || "")
  return "/listings/SLUG".replace("SLUG", slug)
}

export default async function CityPage() {
  const listings = await getListings()
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many elder law attorney are in Houston, TX?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Elder Law Attorney Directory lists 29+ elder law attorney in Houston, Texas. Counts change as new listings are seeded.",
        },
      },
      {
        "@type": "Question",
        name: "How do I find elder law attorney in Houston?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Search elderlawyerdirectory.com and filter by Houston. Compare listed providers, then contact the one that fits.",
        },
      },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-neutral-500">Houston, TX</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Elder Law Attorney in Houston, TX
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-600">
          29+ listed elder law attorney in the Houston area. Pages are generated from live directory listings — not outreach.
        </p>
        <p className="mt-2 text-sm text-neutral-500">{listings.length} shown on this page.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {listings.map((row: Record<string, unknown>, i: number) => (
            <li key={String(row.id || row.slug || i)} className="rounded-xl border border-neutral-200 p-4">
              <Link href={listingHref(row)} className="font-semibold hover:underline">
                {listingName(row)}
              </Link>
              <p className="mt-1 text-sm text-neutral-500">
                {String(row.city || "Houston")}, {String(row.state || "TX")}
              </p>
            </li>
          ))}
        </ul>
        {listings.length === 0 && (
          <p className="mt-8 text-neutral-500">Listings for this city are still being seeded.</p>
        )}
      </main>
    </>
  )
}
