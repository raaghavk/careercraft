'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Is my resume data private?',
    a: 'Absolutely. Your data is encrypted in transit and at rest. We never share or sell your resume data. You can delete your account and all associated data at any time.',
  },
  {
    q: 'How accurate is the AI review?',
    a: 'Our AI is powered by GPT-4o and trained on patterns from thousands of successful resumes. It is highly accurate for ATS formatting, keyword gaps, and structural issues. For nuanced industry-specific advice, the Elite human review is recommended.',
  },
  {
    q: 'What file formats do you support?',
    a: 'We support PDF, DOCX, DOC, and plain text. You can also paste your resume text directly or share your LinkedIn profile URL.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes, you can cancel anytime from your dashboard. You will retain access until the end of your billing period. No questions asked.',
  },
  {
    q: 'How does the LinkedIn optimizer work?',
    a: 'Paste your LinkedIn profile URL or copy-paste your profile text. Our AI analyses your headline, summary, experience descriptions, skills section, and recommendations — then provides rewritten versions you can copy directly into LinkedIn.',
  },
  {
    q: 'What is an ATS and why does it matter?',
    a: 'ATS (Applicant Tracking System) is software used by 98% of large companies to filter resumes before a human ever sees them. If your resume has poor formatting, missing keywords, or incompatible file structures, it gets rejected automatically. Our ATS checker makes sure yours gets through.',
  },
  {
    q: 'Do you support Razorpay? Can I pay in INR?',
    a: 'Yes! We use Razorpay for all payments, so you can pay in INR using UPI, credit/debit cards, net banking, or wallets. All prices are inclusive of GST.',
  },
  {
    q: 'What is the human expert review in Elite?',
    a: 'A certified career coach and resume writer reviews your resume manually, provides written feedback, and optionally rewrites sections. Turnaround is within 24 hours on weekdays.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl border border-white/8 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left group"
              >
                <span className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
