'use client'
import { useState } from 'react'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    priceMonthly: 0,
    priceAnnual: 0,
    description: 'Get a taste of AI-powered career tools.',
    cta: 'Get started free',
    ctaHref: '/dashboard',
    highlight: false,
    features: [
      '1 resume review per month',
      'Basic ATS check',
      'Resume score (0–100)',
      'Top 3 improvement tips',
      'PDF & DOCX upload',
    ],
    missing: ['LinkedIn optimizer', 'JD match score', 'Cover letter generator', 'Interview prep', 'Human expert review'],
  },
  {
    name: 'Pro',
    priceMonthly: 499,
    priceAnnual: 3999,
    description: 'Everything you need to land the interview.',
    cta: 'Start Pro free for 7 days',
    ctaHref: '/dashboard?plan=pro',
    highlight: true,
    badge: 'Most popular',
    features: [
      'Unlimited resume reviews',
      'Full ATS checker + fixes',
      'LinkedIn profile optimizer',
      'JD match score & gap analysis',
      'Cover letter generator',
      'Interview prep questions',
      'Resume builder (10+ templates)',
      'Priority AI (GPT-4o)',
      'Download improved resume',
    ],
    missing: ['Human expert review'],
  },
  {
    name: 'Elite',
    priceMonthly: 1499,
    priceAnnual: 11999,
    description: 'Pro + a real human expert in your corner.',
    cta: 'Get Elite',
    ctaHref: '/dashboard?plan=elite',
    highlight: false,
    features: [
      'Everything in Pro',
      '1 human expert review/month',
      '24-hour turnaround',
      'Expert rewrite of resume',
      'LinkedIn makeover by expert',
      'Career strategy session (30 min)',
      'Dedicated support',
    ],
    missing: [],
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, <span className="gradient-text">honest pricing</span>
          </h2>
          <p className="text-lg text-zinc-400 mb-8">Start free. Upgrade when you're ready.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-zinc-900 border border-white/10 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!annual ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${annual ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Annual
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">Save 33%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                plan.highlight
                  ? 'bg-indigo-600/10 border-indigo-500/50 ring-1 ring-indigo-500/30 shadow-xl shadow-indigo-500/10 scale-105'
                  : 'glass border-white/10'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    <Zap className="w-3 h-3" /> {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-zinc-500 mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.priceMonthly === 0 ? 'Free' : `₹${annual ? Math.round((plan.priceAnnual / 12)) : plan.priceMonthly}`}
                  </span>
                  {plan.priceMonthly > 0 && (
                    <span className="text-zinc-500 text-sm mb-1">/month</span>
                  )}
                </div>
                {plan.priceMonthly > 0 && annual && (
                  <p className="text-xs text-emerald-400 mt-1">₹{plan.priceAnnual} billed annually</p>
                )}
              </div>

              <Link
                href={plan.ctaHref}
                className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 mb-6 ${
                  plan.highlight
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-2.5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Campus pricing */}
        <div className="mt-10 glass rounded-xl border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <div>
            <h4 className="text-white font-semibold">🎓 Campus & Placement Cell Pricing</h4>
            <p className="text-sm text-zinc-400 mt-1">Bulk licenses for colleges, placement officers, and career centres. Custom pricing available.</p>
          </div>
          <Link href="mailto:campus@careercraft.in" className="flex-shrink-0 text-sm font-medium bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg border border-white/10 transition-colors whitespace-nowrap">
            Contact us →
          </Link>
        </div>
      </div>
    </section>
  )
}
