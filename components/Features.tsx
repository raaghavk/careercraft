import {
  FileText, Linkedin, ShieldCheck, Target,
  Mail, MessageSquare, Sparkles, ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: FileText,
    title: 'Resume Builder',
    description: 'Upload your details or paste your LinkedIn URL. AI generates a polished, ATS-ready resume in seconds.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    badge: 'Most popular',
  },
  {
    icon: Sparkles,
    title: 'Resume Review',
    description: 'Upload PDF, DOCX, or paste text. Get a detailed score, section-by-section feedback, and one-click fixes.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    badge: null,
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Optimizer',
    description: 'Paste your LinkedIn URL or profile text. AI audits every section and rewrites your headline, summary, and skills.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    badge: null,
  },
  {
    icon: ShieldCheck,
    title: 'ATS Checker',
    description: 'See exactly how your resume performs against Applicant Tracking Systems. Fix formatting, keywords, and structure.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    badge: null,
  },
  {
    icon: Target,
    title: 'JD Match Score',
    description: 'Paste any job description and instantly see how well your resume matches — with specific suggestions to close gaps.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    badge: null,
  },
  {
    icon: Mail,
    title: 'Cover Letter Generator',
    description: 'AI crafts a tailored, human-sounding cover letter from your resume and the job description in under 10 seconds.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    badge: null,
  },
  {
    icon: MessageSquare,
    title: 'Interview Prep',
    description: 'Get the 10 most likely interview questions for your target role, with tailored model answers based on your resume.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    badge: null,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Everything you need
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Your entire career toolkit,<br />
            <span className="gradient-text">powered by AI</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Seven powerful tools working together to get you more interviews and better job offers.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group relative glass rounded-xl p-6 border ${f.border} hover:border-opacity-50 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${i === 0 ? 'lg:col-span-1 ring-1 ring-indigo-500/30' : ''}`}
            >
              {f.badge && (
                <span className="absolute top-4 right-4 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  {f.badge}
                </span>
              )}
              <div className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.description}</p>
              <div className={`mt-4 flex items-center gap-1 text-xs ${f.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                Try it free <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}

          {/* Human review upgrade card */}
          <div className="glass rounded-xl p-6 border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-900/50">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
              <span className="text-lg">👨‍💼</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Human Expert Review</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Want a real career expert to review your resume? Upgrade to Elite for a 1:1 professional review within 24 hours.
            </p>
            <Link href="#pricing" className="text-xs text-amber-400 flex items-center gap-1 hover:gap-2 transition-all">
              View Elite plan <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
