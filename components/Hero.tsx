'use client'
import Link from 'next/link'
import { ArrowRight, Star, CheckCircle2 } from 'lucide-react'

const stats = [
  { value: '50,000+', label: 'Resumes reviewed' },
  { value: '94%', label: 'Interview rate improvement' },
  { value: '4.9★', label: 'Average rating' },
]

const checks = [
  'ATS-optimized instantly',
  'LinkedIn score & fixes',
  'Job description match',
]

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-8">
          <Star className="w-3.5 h-3.5 fill-indigo-400" />
          <span>Rated #1 AI Career Tool in India</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Land your dream job<br />
          <span className="gradient-text">10x faster</span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          AI-powered resume reviews, LinkedIn optimization, ATS checks, cover letters, and interview prep — everything you need in one place.
        </p>

        {/* Checks */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {checks.map(c => (
            <span key={c} className="flex items-center gap-1.5 text-sm text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              {c}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/30 hover:scale-105"
          >
            Review my resume free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#how-it-works"
            className="text-zinc-400 hover:text-white text-sm font-medium px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
          >
            See how it works
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard preview mockup */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950 z-10 pointer-events-none" style={{ top: '60%' }} />
          <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 max-w-4xl mx-auto">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 mx-4 h-6 rounded bg-white/5 flex items-center px-3">
                <span className="text-xs text-zinc-600">careercraft.in/dashboard</span>
              </div>
            </div>
            {/* Dashboard preview */}
            <div className="p-6 bg-zinc-900/50">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Resume Score', value: '87', color: 'text-green-400', bg: 'bg-green-400/10' },
                  { label: 'ATS Pass', value: '✓', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
                  { label: 'LinkedIn Score', value: '74', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                ].map(card => (
                  <div key={card.label} className={`${card.bg} rounded-xl p-4 border border-white/5`}>
                    <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
                    <div className="text-xs text-zinc-500 mt-1">{card.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { text: 'Add measurable achievements to Experience section', type: 'warning' },
                  { text: 'Your LinkedIn headline is weak — try: "Full-Stack Developer | 3 years @ Infosys"', type: 'tip' },
                  { text: 'Missing keywords: "React", "Node.js", "REST APIs"', type: 'error' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${item.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : item.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                      {item.type}
                    </span>
                    <span className="text-xs text-zinc-400">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
