import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Scale, ArrowRight, ChevronRight, BookOpen } from 'lucide-react'

interface GuideSection {
  heading: string
  body: string
}

interface GuideFaq {
  q: string
  a: string
}

interface Guide {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  sections: GuideSection[]
  faqs: GuideFaq[]
  cta: string
}

const GUIDES: Record<string, Guide> = {
  'what-does-an-elder-law-attorney-do': {
    slug: 'what-does-an-elder-law-attorney-do',
    title: 'What Does an Elder Law Attorney Do?',
    metaTitle: 'What Does an Elder Law Attorney Do? | ElderLawyerDirectory.com',
    metaDescription: 'Elder law attorneys do more than estate planning — they help families navigate Medicaid, guardianship, long-term care costs, and incapacity planning. Learn what they actually do.',
    intro: 'Most people first hear the term "elder law attorney" when a parent lands in the hospital and someone says "you need to call an elder law attorney right now." The phrase sounds vague. The need is anything but. Elder law attorneys specialize in the legal and financial challenges that come with aging — Medicaid eligibility, long-term care planning, guardianship, special needs trusts, and incapacity planning. They\'re not primarily focused on what happens after you die. They\'re focused on what happens while you\'re alive but can no longer manage your own affairs.',
    sections: [
      {
        heading: 'Medicaid Planning — The Core of Elder Law Practice',
        body: 'The most common reason families call an elder law attorney is a Medicaid crisis. Medicaid is the government program that pays for nursing home care for people who can no longer afford it out-of-pocket — but qualifying requires navigating a complex set of income and asset rules. The average nursing home in the United States costs $7,000–$10,000/month. Very few families can sustain that indefinitely without government assistance.\n\nMedicaid planning is the legal process of structuring a person\'s assets and income so they qualify for Medicaid benefits while preserving as much as possible for a spouse or heirs. This includes creating Medicaid Asset Protection Trusts (MAPTs), establishing income-only trusts (called "Miller trusts" or Qualifying Income Trusts in income-cap states), gifting strategies that comply with Medicaid\'s 5-year lookback rule, and spousal asset allocation to maximize what a healthy community spouse can keep.\n\nThis work is time-sensitive. The Medicaid 5-year lookback means that asset transfers made within 60 months of applying for Medicaid can be penalized. Planning must happen before the clock runs out — or, if a crisis has already arrived, an experienced elder law attorney can often find legal strategies to minimize the damage even under time pressure.',
      },
      {
        heading: 'Guardianship and Conservatorship',
        body: 'When a parent or family member becomes incapacitated — through dementia, stroke, or another condition — and has not established a durable power of attorney while they were still competent, the family has no legal authority to act on their behalf. Banks won\'t release funds. Medical facilities won\'t share information. Financial decisions can\'t be made.\n\nThe solution is guardianship (legal authority over personal and medical decisions) or conservatorship (legal authority over finances), obtained through a court proceeding. Elder law attorneys file the petition, navigate the probate court process, obtain the medical assessments required by the court, and represent the family through what can be an emotionally and procedurally complex legal proceeding.\n\nGuardianship is expensive and public — it requires court approval for major decisions and annual accounting. A simple durable power of attorney drafted when someone is still competent costs a fraction of what guardianship proceedings cost. Elder law attorneys push clients to do this planning early precisely because the alternative is so burdensome.',
      },
      {
        heading: 'Incapacity Planning — Powers of Attorney and Healthcare Directives',
        body: 'A durable financial power of attorney designates someone to manage your finances if you become incapacitated. A healthcare proxy (or healthcare power of attorney) designates someone to make medical decisions. A living will (advance directive) documents your wishes about end-of-life treatment.\n\nThese documents are the foundation of elder law planning, and they\'re the ones most often missing when a family arrives at a crisis. An elder law attorney drafts them correctly — ensuring they are durable (effective during incapacity), properly executed under state law, and broad enough to cover the financial and medical decisions that actually arise in an elder care situation. Generic online templates often lack provisions needed for Medicaid applications, real estate transactions, or retirement account management.',
      },
      {
        heading: 'Special Needs Trusts',
        body: 'A special needs trust (also called a supplemental needs trust) is a legal vehicle that holds assets for the benefit of a person with disabilities without disqualifying them from SSI and Medicaid. Without a special needs trust, a direct inheritance of even $2,000 can cause a disabled beneficiary to lose their government benefits immediately.\n\nElder law attorneys establish special needs trusts for families planning inheritances for disabled children or grandchildren, for personal injury settlement proceeds, and in situations where a disabled person comes into assets through any means. The trust is structured to supplement — not replace — government benefits: it can pay for items and services that Medicaid doesn\'t cover (vacations, electronics, education, recreational activities) without counting against benefit eligibility.',
      },
      {
        heading: 'Veterans Benefits Planning',
        body: 'Elder law attorneys who handle VA benefits help wartime veterans (and their surviving spouses) qualify for VA Aid and Attendance — a pension benefit that pays up to $2,727/month for a married veteran, $1,794/month for a single veteran, or $1,154/month for a surviving spouse. This benefit is separate from service-connected disability compensation and is available to veterans who served at least one day during a period of war and who need help with activities of daily living.\n\nThe interaction between VA benefits and Medicaid eligibility is complex. An elder law attorney experienced in both can sequence benefits correctly — using VA Aid and Attendance to fund care in the short term while Medicaid eligibility is established — rather than inadvertently triggering Medicaid lookback issues through VA asset transfers.',
      },
    ],
    faqs: [
      {
        q: 'Is an elder law attorney the same as an estate planning attorney?',
        a: 'Not exactly. Estate planning attorneys focus primarily on planning for asset transfer after death — wills, trusts, beneficiary designations. Elder law attorneys focus on planning for incapacity and aging while alive — Medicaid eligibility, guardianship, long-term care cost management, and powers of attorney designed to function during incapacity. Many elder law attorneys also do estate planning, but not all estate planning attorneys have the specialized Medicaid and elder care knowledge that elder law specialists bring. If your parent needs nursing home care, you need an elder law attorney — not a general estate planning attorney.',
      },
      {
        q: 'What is a CELA and why does it matter?',
        a: 'A Certified Elder Law Attorney (CELA) is an attorney who has passed the ABA-accredited National Elder Law Foundation (NELF) certification examination. There are only about 500 CELAs in the United States. CELA certification requires substantial experience in elder law, peer review, and a rigorous examination covering Medicaid planning, guardianship, estate planning, and the full range of elder law issues. A CELA designation indicates a lawyer who has demonstrated mastery of the field — for complex Medicaid cases or challenging family situations, a CELA may be worth seeking out.',
      },
      {
        q: 'What is a NAELA member and should I look for one?',
        a: 'NAELA is the National Academy of Elder Law Attorneys — the primary professional association for elder law attorneys. NAELA members have committed to the practice of elder law as a specialty. NAELA membership indicates that an attorney has self-identified as an elder law specialist and participates in continuing education in the field. It\'s a meaningful signal but not a certification — NAELA membership does not require passing an examination. Combined with experience and peer references, NAELA membership is a useful filter.',
      },
    ],
    cta: 'Ready to find an elder law attorney near you? Search our directory of 1,500+ elder law attorneys by city, state, and practice area.',
  },

  'medicaid-5-year-lookback-explained': {
    slug: 'medicaid-5-year-lookback-explained',
    title: 'The Medicaid 5-Year Lookback Rule Explained',
    metaTitle: 'The Medicaid 5-Year Lookback Rule Explained | ElderLawyerDirectory.com',
    metaDescription: 'The Medicaid 5-year lookback is the most misunderstood rule in elder law. Here\'s how it works, what triggers a penalty, and what you can do if you\'re already inside the window.',
    intro: 'The Medicaid 5-year lookback rule is the most consequential — and most misunderstood — rule in elder care planning. Families who didn\'t know about it discover it when a parent needs a nursing home and is told they have a 3-year penalty period because they gave the house to the kids five years ago. The rule isn\'t designed to punish families. It\'s designed to ensure people don\'t give away their assets and immediately qualify for a government program that was meant as a last resort. Here\'s how it actually works.',
    sections: [
      {
        heading: 'What Is the Medicaid 5-Year Lookback?',
        body: 'When a person applies for Medicaid to cover nursing home care, the state Medicaid agency reviews all financial transactions made in the 60 months (5 years) before the date of the Medicaid application. Any transfers of assets for less than fair market value during this window are subject to a penalty.\n\nThe "penalty" is a period of Medicaid ineligibility. The length of the penalty is calculated by dividing the amount transferred by the state\'s average monthly cost of nursing home care. If your state\'s average nursing home rate is $8,000/month and you transferred $80,000 to your children 3 years ago, you have a 10-month penalty — Medicaid won\'t pay for 10 months of nursing home care even if you\'re otherwise eligible.\n\nThe penalty period begins when the person is in a nursing home, has spent down to the Medicaid asset limit, AND submits an application. This is important: it\'s not 5 years from the date of transfer. The clock doesn\'t even start until all three conditions are met.',
      },
      {
        heading: 'What Triggers a Lookback Penalty?',
        body: 'Any transfer for less than fair market value can trigger a lookback penalty. This includes:\n\n— Gifts of cash to children or grandchildren\n— Transferring a home to a child for no payment or below market value\n— Adding a child to a bank account as a joint owner for estate planning purposes (sometimes)\n— Transferring assets to a trust where the applicant retains no benefit\n— "Spending down" assets in ways Medicaid considers improper transfers\n\nNot all transfers are penalized. Medicaid allows transfers to a spouse (there\'s no lookback penalty for transfers between spouses), a blind or disabled child, and a sibling who has an equity interest in the home and has lived there for at least a year before the institutionalization. There are also exceptions for transferring the home to a caregiver child who lived in the home for at least 2 years before the institutionalization and provided care that delayed nursing home placement.',
      },
      {
        heading: 'What Is NOT Subject to the Lookback',
        body: 'Certain transfers are completely exempt from the lookback penalty:\n\n— Transfers to a spouse\n— Transfers to a trust established for the sole benefit of a disabled child under 65\n— Transfers to a blind or disabled child\n— Transfers of the home to a sibling with an equity interest who lived there for at least 1 year before institutionalization\n— Transfers of the home to an adult child who lived in the home for 2 years and provided care that delayed the parent\'s nursing home placement ("caregiver child" exception)\n— Transfers for fair market value (selling at market rate is not a penalty-triggering transfer)\n\nMedicaid Asset Protection Trusts (MAPTs) created before the lookback window opened are not subject to penalty. Irrevocable trusts funded more than 5 years before application are outside the lookback — which is why elder law attorneys push clients to plan early.',
      },
      {
        heading: 'What If You\'re Already Inside the 5-Year Window?',
        body: 'This is the situation families face most often — they didn\'t know about the rule, a transfer happened 2 years ago, and now a parent needs care. The options narrow, but they don\'t disappear.\n\nStrategies for inside-the-lookback situations depend on the state and the specifics, but can include:\n\n— **Medicaid Annuities**: Converting a lump sum into an annuity that pays the community spouse an income stream. Properly structured, this converts a countable asset into an income stream that doesn\'t trigger the lookback.\n— **Spousal Refusal (in some states)**: The community spouse "refuses" to contribute their assets to nursing home care, and the institutionalized spouse applies for Medicaid as effectively an individual. New York allows this; most states do not.\n— **Curative transfers**: In some cases, the transferred asset can be returned, "curing" the gift and resetting the lookback analysis.\n— **Half-a-loaf strategies**: Transferring a portion of assets to family and using the other portion to purchase Medicaid-compliant annuity or pay for private care during the penalty period.\n\nNone of these strategies work in every state, and the details matter enormously. An experienced elder law attorney is not optional in an inside-the-lookback situation — this is exactly the work they do every day.',
      },
      {
        heading: 'The 5-Year Lookback vs. the 2.5-Year Lookback',
        body: 'There is one major exception to the 5-year lookback rule: in New York, transfers for community Medicaid (home care through Managed Long Term Care programs) are subject to a 30-month (2.5-year) lookback, not a 5-year lookback. This means that planning for home care Medicaid in New York can happen much closer to the time of need than planning for nursing home Medicaid. If keeping a parent at home is a goal, the New York 30-month lookback creates a planning window that simply doesn\'t exist for nursing home placement.\n\nOther states do not have this distinction — the 5-year lookback applies to all Medicaid long-term care programs. New York is the exception, not the rule. This is one reason why New York elder law practice is so specialized and why families dealing with New York Medicaid need local expertise.',
      },
    ],
    faqs: [
      {
        q: 'Does the 5-year lookback apply to the home?',
        a: 'The home is generally an exempt asset for Medicaid eligibility while the applicant intends to return to it or while a community spouse lives there. However, transferring the home during the 5-year lookback window does trigger a penalty if it was transferred for less than fair market value. The exception is the "caregiver child" rule: if an adult child lived in the home for 2+ years before the institutionalization and provided care that delayed nursing home placement, the home can be transferred to that child without triggering a penalty.',
      },
      {
        q: 'Can I give $18,000 per year to my children without triggering the lookback?',
        a: 'The annual gift tax exclusion ($18,000 per person in 2024) is an IRS rule for federal gift tax purposes. Medicaid does not use the annual gift tax exclusion — any gift during the 5-year lookback period, regardless of amount, is subject to Medicaid review. Giving $18,000/year to each of 3 children over 5 years adds up to $270,000 in potentially penalizable transfers. The gift tax rule and the Medicaid lookback are entirely separate — do not conflate them.',
      },
      {
        q: 'Does the lookback apply to money I spent on home renovations or a new car?',
        a: 'Not if you received fair market value for the expenditure. Medicaid penalizes transfers "for less than fair market value" — spending money on real goods and services at market rates is not a penalized transfer. Buying a car, renovating a home, paying medical bills, or prepaying funeral expenses are generally acceptable Medicaid spend-down strategies if done correctly. An elder law attorney can advise on what constitutes a valid expenditure vs. a penalized transfer.',
      },
    ],
    cta: 'Have a specific Medicaid lookback situation? An elder law attorney in your area can review your family\'s circumstances and identify your options. Search our directory to find a specialist near you.',
  },

  'how-to-choose-an-elder-law-attorney': {
    slug: 'how-to-choose-an-elder-law-attorney',
    title: 'How to Choose an Elder Law Attorney',
    metaTitle: 'How to Choose an Elder Law Attorney | Questions to Ask | ElderLawyerDirectory.com',
    metaDescription: 'Not all attorneys handle Medicaid, guardianship, and elder care planning. Here\'s how to find a real elder law specialist — and the 8 questions to ask before you hire.',
    intro: 'Elder law attorneys are not interchangeable with general estate planning attorneys, and estate planning attorneys are not interchangeable with elder law specialists. The difference matters most when a family is navigating a Medicaid crisis, a guardianship proceeding, or complex long-term care planning. Here\'s a practical guide to finding the right attorney — not just any attorney who puts "elder law" on their website.',
    sections: [
      {
        heading: 'Start With Credentials — CELA First',
        body: 'A Certified Elder Law Attorney (CELA) has passed the only ABA-accredited examination in elder law, administered by the National Elder Law Foundation (NELF). There are roughly 500 CELAs in the country — a small number relative to the 1.3 million licensed attorneys in the US. If there\'s a CELA in your area, they should be near the top of your list, particularly for complex Medicaid cases or guardianship proceedings.\n\nNAELA membership (National Academy of Elder Law Attorneys) is the second-tier signal. NAELA members have self-identified as elder law specialists and commit to continuing education in the field. Membership doesn\'t require an exam, but it\'s a meaningful filter in markets where no CELA is available. State NAELA chapters often publish member directories searchable by state and specialty.\n\nBe skeptical of attorneys who describe themselves as "estate planning and elder law" without further specificity. Many estate planning attorneys have added "elder law" to their marketing without developing real Medicaid planning depth. Ask specifically how many Medicaid applications they have filed in the past year.',
      },
      {
        heading: 'Verify Real Elder Law Experience',
        body: 'Elder law is a practice area that requires doing it regularly to do it well. Medicaid rules change — annually, in some states — and an attorney who does one or two Medicaid applications per year may not be current on rule changes that affect your case. You want an attorney for whom elder law is a primary, not incidental, practice area.\n\nAsk these questions directly:\n\n— How many Medicaid applications have you filed in the past 12 months?\n— Do you practice elder law full-time or as part of a broader practice?\n— Have you handled Medicaid crisis planning where the family was already inside the 5-year lookback window?\n— Do you handle VA Aid and Attendance in addition to Medicaid? (Important for veteran families.)\n— Are you familiar with [your state]\'s specific Medicaid rules, particularly the [relevant state-specific issue]?\n\nA good elder law attorney will answer these questions directly. An attorney who hedges or redirects deserves more scrutiny.',
      },
      {
        heading: 'Understand How Fees Are Structured',
        body: 'Elder law attorneys typically charge in two ways: flat fee (for defined project scopes) or hourly. For well-defined projects — drafting a Medicaid Asset Protection Trust, preparing an elder law estate plan, filing a guardianship petition — flat fees are common and appropriate. For complex crisis planning or ongoing advice, hourly billing is more common.\n\nTypical fee ranges (2024):\n— Elder law estate plan (POA, healthcare proxy, will, trust): $3,000–$7,000\n— Medicaid Asset Protection Trust: $2,500–$5,000\n— Medicaid application and crisis planning: $5,000–$15,000+\n— Guardianship petition and initial proceeding: $3,000–$8,000+\n\nThese are not low numbers, but context matters: one Medicaid planning case that protects $200,000 in assets delivers a 20-40x return on a $5,000–$10,000 fee. Elder law attorneys who charge $10,000 to manage crisis planning and protect $300,000 in assets are not expensive — they\'re among the best-returning legal investments available.\n\nGet a written engagement letter describing the scope of work and fee structure before signing anything.',
      },
      {
        heading: '8 Questions to Ask Before You Hire',
        body: '1. What percentage of your practice is elder law? (You want more than 50%.)\n\n2. How many Medicaid applications have you filed in the past year? (10+ is a meaningful threshold.)\n\n3. Are you CELA certified or a NAELA member? (If neither, probe experience depth more carefully.)\n\n4. Have you handled cases where the family was already inside the 5-year lookback? (If yes, ask for outcomes.)\n\n5. Do you handle guardianship proceedings in [your county]? (Local court experience matters for guardianship.)\n\n6. What are your fees for this type of case, and how are they structured? (Flat fee vs. hourly, and what\'s included.)\n\n7. Who in your firm will actually do the work? (At large firms, partners often hand cases to associates.)\n\n8. How quickly can you begin work? (In a crisis, turnaround time matters — ask specifically about their current caseload.)',
      },
      {
        heading: 'Red Flags to Watch For',
        body: 'Elder law attracts a small number of practitioners who exploit vulnerable seniors and their families. Watch for:\n\n— Attorneys who primarily recommend expensive annuity products or life insurance as part of Medicaid planning. Annuities can be legitimate Medicaid planning tools, but they can also be used to generate high commissions at clients\' expense.\n— Attorneys who guarantee specific Medicaid outcomes. No reputable attorney guarantees Medicaid approval — they manage the process and provide sound strategy, but state Medicaid agencies make final determinations.\n— Attorneys who discourage second opinions on major decisions. A good elder law attorney welcomes informed clients and is not threatened by your talking to another attorney.\n— Vague fee arrangements. If the fee structure isn\'t clear before you engage, get clarity — or find a different attorney.',
      },
    ],
    faqs: [
      {
        q: 'Do I need a local elder law attorney or can I work with anyone in my state?',
        a: 'For Medicaid planning, state law is what matters — an attorney licensed in your state can generally handle the planning regardless of city. For guardianship proceedings, local matters more: probate courts are county-level, and an attorney familiar with your county\'s probate court, its judges, and local procedures will be more efficient. For most elder law work, the combination of state licensure and meaningful elder law experience matters more than physical proximity.',
      },
      {
        q: 'What is the difference between an elder law attorney and a financial elder care advisor?',
        a: 'An elder law attorney is a licensed attorney who provides legal advice and can draft legal documents (trusts, POAs, court petitions). A financial elder care advisor or Medicaid planner is typically not an attorney — they provide guidance on financial planning and sometimes Medicaid documentation, but they cannot provide legal advice or draft legal documents. For Medicaid crisis planning involving complex asset restructuring, a licensed attorney is essential. Non-attorney Medicaid planners can be useful for simpler applications but have legal limits on what they can advise.',
      },
    ],
    cta: 'Use our directory to find a CELA-certified or NAELA-member elder law attorney near you. Filter by city, state, and practice area to find specialists in Medicaid planning, guardianship, or veterans benefits.',
  },

  'estate-planning-vs-elder-law': {
    slug: 'estate-planning-vs-elder-law',
    title: 'Estate Planning vs. Elder Law: What\'s the Difference?',
    metaTitle: 'Estate Planning vs. Elder Law: What\'s the Difference? | ElderLawyerDirectory.com',
    metaDescription: 'Estate planning and elder law are related but different. Learn when you need each — and why most families navigating a parent\'s long-term care need an elder law specialist, not just an estate planning attorney.',
    intro: 'People use "estate planning attorney" and "elder law attorney" interchangeably. They shouldn\'t. Both practice areas deal with aging, death, and asset planning — but the problems they solve, the documents they draft, and the legal systems they navigate are meaningfully different. If your parent just received a dementia diagnosis and you\'re calling lawyers, you need to know which kind to call.',
    sections: [
      {
        heading: 'What Estate Planning Focuses On',
        body: 'Estate planning is primarily focused on what happens to your assets after you die. The core documents are:\n\n— A will, which directs how your probate estate is distributed\n— A revocable living trust, which avoids probate and controls asset distribution\n— Beneficiary designations on retirement accounts and life insurance\n— Powers of attorney and advance directives (often included in estate plans but less central than in elder law)\n\nEstate planning is planning for death — organized, thoughtful, and important, but operating on a different problem than aging-while-alive. A well-drafted will and revocable trust does nothing to help a family manage nursing home costs, qualify for Medicaid, or obtain legal authority to care for an incapacitated parent who never signed a power of attorney.\n\nEstate planning also typically assumes the client will die with meaningful assets. Elder law has to account for the possibility that long-term care costs consume nearly everything — and plan accordingly.',
      },
      {
        heading: 'What Elder Law Focuses On',
        body: 'Elder law is focused on incapacity and aging — the challenges that arise while a person is still alive but cannot manage their own affairs. The core concerns are:\n\n— **Medicaid planning**: Structuring assets and income to qualify for Medicaid nursing home coverage while protecting what the family can protect.\n— **Powers of attorney and healthcare proxies**: Drafted specifically to handle the financial and medical decisions that arise in elder care — including Medicaid applications, nursing home admission contracts, and long-term care management.\n— **Guardianship and conservatorship**: Obtaining court-ordered legal authority over an incapacitated person who has no valid POA in place.\n— **Special needs trusts**: Holding assets for disabled family members without disqualifying them from government benefits.\n— **Veterans benefits**: Qualifying wartime veterans for VA Aid and Attendance or other VA pension programs that fund long-term care.\n\nElder law attorneys see clients who are in the middle of a crisis — parent in the hospital, placement needed in 2 weeks, no powers of attorney signed, house deed in the wrong names. Their job is to impose legal order on a chaotic family situation under time pressure.',
      },
      {
        heading: 'The Documents Are Different',
        body: 'Both estate planning and elder law attorneys draft documents that look similar on the surface but serve different purposes.\n\nA revocable living trust in an estate plan is designed to avoid probate and distribute assets at death. A Medicaid Asset Protection Trust (MAPT) is an irrevocable trust designed to remove assets from Medicaid\'s countable resource list while still benefiting the family. You cannot use one for the other — they have completely different tax treatment, trustee structures, and Medicaid implications.\n\nA standard durable power of attorney covers typical financial management — bank accounts, real estate transactions, investment accounts. An elder law power of attorney includes specific authority for Medicaid applications, long-term care contracts, gifting to family members (essential for Medicaid planning), creating trusts, and other actions that generic POA templates often omit. A generic online POA may not give an agent the authority to sign a Medicaid application or make gifts to complete a Medicaid spend-down.\n\nThe difference matters most under pressure. A power of attorney that doesn\'t authorize Medicaid planning forces a family into court — at $5,000–$15,000 in legal fees and months of delay — to get authority the right document would have provided at no additional cost.',
      },
      {
        heading: 'When You Need Which',
        body: '**You primarily need an estate planning attorney when:**\n— You\'re planning your estate at 40–60, before any immediate incapacity concern\n— Your primary concern is minimizing estate taxes or directing asset distribution\n— You have a blended family, business interests, or significant investment assets needing trust planning\n— You want to avoid probate through revocable trusts and beneficiary designations\n\n**You primarily need an elder law attorney when:**\n— A parent has been diagnosed with dementia, Parkinson\'s, or another condition suggesting future incapacity\n— A parent needs or may soon need nursing home or assisted living care\n— You\'re concerned about long-term care costs depleting a parent\'s savings\n— A parent is already incapacitated and has no power of attorney\n— You want to qualify a parent for Medicaid or VA Aid and Attendance\n— A family member is disabled and needs a special needs trust\n\n**You need both when:**\n— You\'re 60–70 and want comprehensive planning that addresses both your estate and potential incapacity\n— A parent\'s estate includes real property, a business, or complex assets that require both Medicaid planning and post-death distribution planning\n\nMany elder law attorneys also do estate planning — the two practices overlap significantly. But fewer estate planning attorneys are competent in Medicaid law. When in doubt about which you need, call an elder law attorney first — they can tell you if the situation requires estate planning only or a combined approach.',
      },
    ],
    faqs: [
      {
        q: 'Can my parent\'s existing estate planning attorney handle Medicaid planning?',
        a: 'Maybe, but verify before assuming. Ask directly: how many Medicaid applications has this attorney filed in the past year? If the answer is fewer than 10, or if Medicaid planning is a small part of a general practice, the attorney may not be current on state-specific Medicaid rules that change annually. Medicaid planning is a specialized skill — having drafted revocable trusts for 20 years doesn\'t automatically mean an attorney knows how to structure assets for Medicaid eligibility.',
      },
      {
        q: 'Will an estate plan protect my parent\'s assets from nursing home costs?',
        a: 'A standard revocable living trust will not protect assets from Medicaid — the assets in a revocable trust are still "countable" for Medicaid purposes because the person who created the trust can revoke it and access the assets. Asset protection from Medicaid requires irrevocable planning tools: Medicaid Asset Protection Trusts (MAPTs), irrevocable annuities, or other structures designed specifically for Medicaid eligibility. These are elder law tools, not standard estate planning tools.',
      },
    ],
    cta: 'If your family needs Medicaid planning, guardianship, or incapacity planning — not just a will — search our directory for an elder law specialist near you.',
  },

  'how-much-does-an-elder-law-attorney-cost': {
    slug: 'how-much-does-an-elder-law-attorney-cost',
    title: 'How Much Does an Elder Law Attorney Cost?',
    metaTitle: 'How Much Does an Elder Law Attorney Cost? | 2024 Fee Guide | ElderLawyerDirectory.com',
    metaDescription: 'Elder law attorney fees vary widely by service type and geography. Here are realistic 2024 fee ranges for Medicaid planning, guardianship, POAs, and trusts — and when the cost is worth it.',
    intro: 'Elder law attorney fees are a real concern for families already stressed about long-term care costs. The short answer: elder law services are not cheap, but the return on investment — assets protected from Medicaid spend-down, government benefits obtained, legal crises avoided — is typically 10 to 100 times the attorney\'s fee. Here are realistic fee ranges for 2024 and context for when each service is worth the cost.',
    sections: [
      {
        heading: 'How Elder Law Attorneys Charge',
        body: 'Elder law attorneys use two primary billing structures:\n\n**Flat fees** are the norm for defined-scope projects: an elder law estate plan, a Medicaid Asset Protection Trust, or a Medicaid application. The attorney quotes a single fee for a specific deliverable. You know the cost upfront. For most consumers, flat fees are preferable — there\'s no clock-watching anxiety, and the fee is certain.\n\n**Hourly billing** is used for ongoing advice, complex crisis situations where the scope is uncertain, and guardianship proceedings where court timelines are unpredictable. Hourly rates for elder law attorneys range from $250–$450/hour, depending on market and experience. A CELA (Certified Elder Law Attorney) in a major metro typically charges $350–$450/hour.\n\nMost reputable elder law attorneys offer an initial consultation — sometimes free, sometimes at a fixed consultation fee of $150–$350 — before quoting fees for substantive work.',
      },
      {
        heading: 'Fee Ranges by Service Type',
        body: '**Elder Law Estate Plan** (durable POA, healthcare proxy, living will, will, possibly a revocable trust): $2,500–$7,000. Lower end is a solo attorney in a mid-size market; upper end is a specialized elder law firm in a major metro. This package should include all documents needed to manage incapacity and direct asset distribution. Do not buy an estate plan that doesn\'t include a properly drafted durable POA — it\'s the most critical document for elder care.\n\n**Medicaid Asset Protection Trust (MAPT)**: $2,500–$5,500. An irrevocable trust designed to move assets outside the Medicaid-countable universe, executed outside the 5-year lookback window. The deed transfer of real property to the trust may be included or billed separately.\n\n**Medicaid Application (straightforward)**: $1,500–$4,000. A Medicaid application for a client with simple financials — limited assets, income near or below the threshold, no recent lookback issues. Some elder law attorneys use paralegals for the application work and reserve attorney time for strategy.\n\n**Medicaid Crisis Planning** (inside-the-lookback, complex assets): $5,000–$15,000+. When a family is inside the 5-year lookback window and needs a comprehensive restructuring strategy — annuity purchases, gifting analysis, curative transfers, spousal asset allocation — the complexity and risk justify higher fees. This work directly determines whether a family can protect tens or hundreds of thousands of dollars.\n\n**Guardianship Petition and Initial Proceeding**: $3,000–$10,000. Highly variable by state and county. Some states have streamlined procedures; others require multiple court hearings. Attorney fees for guardianship in contested proceedings can exceed $20,000 — another reason to have powers of attorney in place before they\'re needed.\n\n**VA Aid and Attendance Application**: $1,500–$3,500. VA accredited attorneys (required to charge fees for VA representation) typically charge flat fees for Aid and Attendance applications. Some elder law attorneys bundle VA applications with Medicaid planning when both apply.',
      },
      {
        heading: 'The ROI Calculation',
        body: 'The return on investment for elder law services is unusually high compared to most legal fees — because the alternative is often unplanned Medicaid spend-down.\n\nA family with $300,000 in assets that spends $10,000 on crisis Medicaid planning and protects $200,000 has achieved a 20x return on their legal investment. A family that skips the planning and spends $300,000 on nursing home care before Medicaid eligibility has lost $300,000.\n\nFor VA Aid and Attendance: a $2,000 attorney fee to qualify a married veteran for $2,727/month in VA benefits pays for itself in 44 days. Over a 3-year long-term care stay, that\'s nearly $100,000 in total benefit — 50x the attorney fee.\n\nElder law fees are not small. But context matters: the question is not "is $8,000 expensive?" but "is $8,000 expensive relative to protecting $250,000 in family assets?"',
      },
      {
        heading: 'How to Get a Fair Fee',
        body: 'Get written fee quotes from at least two attorneys before engaging. Most elder law attorneys will quote a flat fee for defined work after an initial consultation — take them up on it. Compare scope, not just price: a $3,000 quote that doesn\'t include MAPT drafting or Medicaid application filing is not comparable to a $5,000 quote that does.\n\nAsk specifically:\n— Is this a flat fee or hourly? If flat, what\'s specifically included?\n— Are there additional costs for document recording, court filing fees, or paralegal time?\n— What happens if the scope changes (e.g., a Medicaid denial requires an appeal)?\n— Does the fee include implementation (deed transfer, account retitling) or just document drafting?\n\nAvoid attorneys who won\'t provide fee clarity upfront. An elder law attorney who can\'t tell you what a Medicaid Asset Protection Trust costs is either not doing them regularly or not being straight with you.',
      },
    ],
    faqs: [
      {
        q: 'Do elder law attorneys offer payment plans?',
        a: 'Some do, especially for larger engagements. It never hurts to ask. Many elder law attorneys who work with families in financial stress — which describes most families navigating Medicaid crisis planning — have experience accommodating payment over time. If upfront fees are a barrier, ask directly whether a payment plan or staged engagement is possible.',
      },
      {
        q: 'Can I use Medicaid itself to pay for elder law attorney fees?',
        a: 'Generally, no — Medicaid does not pay attorney fees for planning services. However, paying an elder law attorney for legitimate services is not a penalizable transfer — it\'s payment for fair market value. Spend-down of assets on attorney fees during the Medicaid planning process does not create a lookback penalty, as long as the fees are reasonable and documented.',
      },
      {
        q: 'Should I use a free legal aid service instead of paying an elder law attorney?',
        a: 'Legal aid organizations that specialize in elder law can be valuable for families with limited income and assets who qualify for their services. They handle Medicaid applications, guardianship, and basic elder law planning. However, legal aid capacity is limited — waitlists are common, and complex crisis planning or asset-protection work may be outside their scope. For families with significant assets to protect, the ROI on a paid elder law attorney is almost always positive.',
      },
    ],
    cta: 'Ready to find an elder law attorney? Our directory makes it free to search and contact elder law specialists near you. Browse by city, state, and practice area.',
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = GUIDES[slug]
  if (!guide) return { title: 'Guide Not Found' }

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `https://elderlawyerdirectory.com/guides/${slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      type: 'article',
    },
  }
}

export const revalidate = 86400

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params
  const guide = GUIDES[slug]
  if (!guide) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    publisher: {
      '@type': 'Organization',
      name: 'ElderLawyerDirectory.com',
      url: 'https://elderlawyerdirectory.com',
    },
    url: `https://elderlawyerdirectory.com/guides/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-surface">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-surface-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-sm text-gray-500">
              <Link href="/" className="hover:text-brand-slate">Home</Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <Link href="/listings" className="hover:text-brand-slate">Browse Directory</Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <span className="text-gray-900 font-medium truncate">{guide.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Article */}
            <article className="lg:col-span-2">
              <header className="mb-8">
                <div className="flex items-center gap-2 text-sm text-brand-amber font-semibold mb-3">
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  Elder Law Guide
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{guide.title}</h1>
                <p className="text-lg text-gray-600 leading-relaxed">{guide.intro}</p>
              </header>

              <div className="space-y-8">
                {guide.sections.map((section, i) => (
                  <section key={i}>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                    <div className="text-gray-700 leading-relaxed space-y-3">
                      {section.body.split('\n\n').map((paragraph, j) => (
                        <p key={j}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}

                {/* FAQ */}
                {guide.faqs.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {guide.faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-xl border border-surface-border p-5">
                          <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                          <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* CTA */}
                <div className="bg-brand-slate rounded-xl p-6 text-white">
                  <div className="flex items-start gap-4">
                    <Scale className="w-8 h-8 text-brand-amber flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Find an Elder Law Attorney Near You</h3>
                      <p className="text-blue-100 text-sm mb-4">{guide.cta}</p>
                      <Link
                        href="/listings"
                        className="inline-flex items-center gap-2 bg-brand-amber text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-amber-dark transition-colors"
                      >
                        Search the Directory <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Other guides */}
              <div className="bg-white rounded-xl border border-surface-border p-5">
                <h3 className="font-semibold text-gray-900 mb-3">More Elder Law Guides</h3>
                <ul className="space-y-2">
                  {Object.values(GUIDES)
                    .filter((g) => g.slug !== slug)
                    .map((g) => (
                      <li key={g.slug}>
                        <Link href={`/guides/${g.slug}`} className="text-sm text-brand-slate hover:underline block leading-snug">
                          {g.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Browse by practice area */}
              <div className="bg-white rounded-xl border border-surface-border p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Browse by Practice Area</h3>
                <ul className="space-y-1.5">
                  {[
                    { slug: 'medicaid_planning', label: 'Medicaid Planning' },
                    { slug: 'guardianship', label: 'Guardianship' },
                    { slug: 'special_needs_trust', label: 'Special Needs Trusts' },
                    { slug: 'estate_planning', label: 'Estate Planning' },
                    { slug: 'veterans_benefits', label: 'Veterans Benefits' },
                    { slug: 'powers_of_attorney', label: 'Powers of Attorney' },
                  ].map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={`/categories/${area.slug}`}
                        className="flex items-center justify-between text-sm text-gray-700 hover:text-brand-slate group"
                      >
                        <span>{area.label}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-slate" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Browse by location */}
              <div className="bg-white rounded-xl border border-surface-border p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Browse by State</h3>
                <ul className="space-y-1.5">
                  {[
                    { slug: 'florida', name: 'Florida' },
                    { slug: 'california', name: 'California' },
                    { slug: 'texas', name: 'Texas' },
                    { slug: 'new-york', name: 'New York' },
                    { slug: 'arizona', name: 'Arizona' },
                  ].map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/states/${s.slug}`}
                        className="flex items-center justify-between text-sm text-gray-700 hover:text-brand-slate group"
                      >
                        <span>{s.name}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-slate" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/listings"
                  className="inline-flex items-center gap-1 text-sm text-brand-slate hover:text-brand-slate-dark font-semibold mt-3"
                >
                  All states <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>

              {/* Submit listing */}
              <div className="bg-brand-amber rounded-xl p-5 text-white">
                <h3 className="font-bold mb-2">Elder Law Attorney?</h3>
                <p className="text-sm text-amber-50 mb-3">
                  Claim your free listing and let families find you when they need help most.
                </p>
                <Link
                  href="/submit"
                  className="block w-full text-center bg-white text-brand-amber font-semibold py-2 rounded-lg hover:bg-amber-50 transition-colors text-sm"
                >
                  Submit Your Listing
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
