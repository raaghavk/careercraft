import { Upload, Cpu, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload your resume or paste a LinkedIn URL',
    description: 'Drag & drop a PDF or DOCX, paste plain text, or share your LinkedIn profile URL. We handle the rest.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'AI analyses every detail in seconds',
    description: 'Our AI (powered by GPT-4o) reviews formatting, keywords, tone, ATS compatibility, and content quality across every section.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: TrendingUp,
    step: '03',
    title: 'Get your score, fixes & improved version',
    description: 'See your score, read prioritised suggestions, and download an improved version — all in under 60 seconds.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready in <span className="gradient-text">60 seconds</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            No sign-up required for your first review. Just upload and go.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-emerald-500/30" />

          {steps.map((s) => (
            <div key={s.step} className="relative text-center group">
              {/* Step number */}
              <div className="relative inline-block mb-6">
                <div className={`w-20 h-20 rounded-2xl ${s.bg} border border-white/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <s.icon className={`w-8 h-8 ${s.color}`} />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-800 border border-white/10 text-xs font-bold text-zinc-400 flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">{s.description}</p>
            </div>
          ))}
        </div>

        {/* Video placeholder */}
        <div className="mt-16 glass rounded-2xl border border-white/10 p-8 max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-indigo-400 ml-1" />
          </div>
          <p className="text-sm text-zinc-500">Watch a 90-second demo</p>
        </div>
      </div>
    </section>
  )
}
