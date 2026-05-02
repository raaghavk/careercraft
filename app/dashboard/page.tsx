'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  FileText, Linkedin, ShieldCheck, Target, Mail, MessageSquare,
  Sparkles, Upload, Loader2, CheckCircle2, AlertTriangle, XCircle,
  Download, Copy, ChevronRight, Zap, Home
} from 'lucide-react'

type Service = 'resume-review' | 'resume-builder' | 'linkedin' | 'ats-check' | 'jd-match' | 'cover-letter' | 'interview-prep'

const services = [
  { id: 'resume-review' as Service, icon: Sparkles, label: 'Resume Review', color: 'text-violet-400', bg: 'bg-violet-500/10', desc: 'Score & detailed feedback' },
  { id: 'resume-builder' as Service, icon: FileText, label: 'Resume Builder', color: 'text-indigo-400', bg: 'bg-indigo-500/10', desc: 'Build from scratch' },
  { id: 'linkedin' as Service, icon: Linkedin, label: 'LinkedIn Optimizer', color: 'text-blue-400', bg: 'bg-blue-500/10', desc: 'Audit & rewrite suggestions' },
  { id: 'ats-check' as Service, icon: ShieldCheck, label: 'ATS Checker', color: 'text-emerald-400', bg: 'bg-emerald-500/10', desc: 'Beat the bots' },
  { id: 'jd-match' as Service, icon: Target, label: 'JD Match Score', color: 'text-orange-400', bg: 'bg-orange-500/10', desc: 'Match any job description' },
  { id: 'cover-letter' as Service, icon: Mail, label: 'Cover Letter', color: 'text-pink-400', bg: 'bg-pink-500/10', desc: 'AI-written in seconds' },
  { id: 'interview-prep' as Service, icon: MessageSquare, label: 'Interview Prep', color: 'text-cyan-400', bg: 'bg-cyan-500/10', desc: 'Top questions & answers' },
]

interface ReviewResult {
  score?: number
  sections?: { name: string; score: number; feedback: string }[]
  suggestions?: { type: 'error' | 'warning' | 'tip'; text: string }[]
  rewritten?: string
  questions?: { question: string; answer: string }[]
  raw?: string
}

export default function Dashboard() {
  const [activeService, setActiveService] = useState<Service>('resume-review')
  const [resumeText, setResumeText] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ReviewResult | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) readFile(file)
  }, [])

  const readFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setResumeText(e.target?.result as string || '')
    }
    reader.readAsText(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) readFile(file)
  }

  const handleSubmit = async () => {
    if (!resumeText && activeService !== 'linkedin') return
    setLoading(true)
    setError('')
    setResult(null)

    const endpoints: Record<Service, string> = {
      'resume-review': '/api/review',
      'resume-builder': '/api/review',
      'linkedin': '/api/linkedin',
      'ats-check': '/api/ats-check',
      'jd-match': '/api/jd-match',
      'cover-letter': '/api/cover-letter',
      'interview-prep': '/api/interview-prep',
    }

    try {
      const res = await fetch(endpoints[activeService], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          linkedinUrl,
          jobDescription,
          targetRole,
          service: activeService,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Failed to analyse. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyResult = () => {
    if (result?.rewritten || result?.raw) {
      navigator.clipboard.writeText(result.rewritten || result.raw || '')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const activeServiceData = services.find(s => s.id === activeService)!

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col py-5 px-3 hidden md:flex">
        <Link href="/" className="flex items-center gap-2 px-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-base font-bold text-white">CareerCraft</span>
        </Link>

        <nav className="flex flex-col gap-1 flex-1">
          {services.map(s => (
            <button
              key={s.id}
              onClick={() => { setActiveService(s.id); setResult(null); setError('') }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                activeService === s.id
                  ? 'bg-indigo-600/15 border border-indigo-500/30 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`w-7 h-7 rounded-md ${s.bg} flex items-center justify-center flex-shrink-0`}>
                <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
              </div>
              <div>
                <div className="text-xs font-medium">{s.label}</div>
                <div className="text-[10px] text-zinc-600">{s.desc}</div>
              </div>
            </button>
          ))}
        </nav>

        <div className="mt-auto px-2">
          <div className="glass rounded-xl border border-white/8 p-3 text-center">
            <p className="text-xs font-semibold text-white mb-1">Free plan</p>
            <p className="text-[10px] text-zinc-500 mb-2">1 review left this month</p>
            <Link href="#pricing" className="block text-xs bg-indigo-600 hover:bg-indigo-500 text-white py-1.5 rounded-lg transition-colors">
              Upgrade to Pro →
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-10 h-10 rounded-xl ${activeServiceData.bg} flex items-center justify-center`}>
              <activeServiceData.icon className={`w-5 h-5 ${activeServiceData.color}`} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{activeServiceData.label}</h1>
              <p className="text-sm text-zinc-500">{activeServiceData.desc}</p>
            </div>
          </div>

          {/* Input area */}
          {!result && (
            <div className="space-y-5">
              {/* File drop zone (for resume-based services) */}
              {activeService !== 'linkedin' && (
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Upload your resume</label>
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                      dragging ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/10 hover:border-white/20'
                    }`}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <input id="file-input" type="file" accept=".pdf,.docx,.doc,.txt" onChange={handleFileInput} className="hidden" />
                    <Upload className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                    <p className="text-sm text-zinc-400">Drop your resume here or <span className="text-indigo-400">browse</span></p>
                    <p className="text-xs text-zinc-600 mt-1">PDF, DOCX, DOC, TXT supported</p>
                  </div>

                  <div className="flex items-center gap-3 my-3">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-xs text-zinc-600">or paste text</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>

                  <textarea
                    value={resumeText}
                    onChange={e => setResumeText(e.target.value)}
                    placeholder="Paste your resume text here..."
                    className="w-full h-40 bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 placeholder-zinc-600 resize-none focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
              )}

              {/* LinkedIn URL */}
              {activeService === 'linkedin' && (
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={e => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourname"
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                  <p className="text-xs text-zinc-600 mt-2">Or paste your LinkedIn profile text below instead</p>
                  <textarea
                    value={resumeText}
                    onChange={e => setResumeText(e.target.value)}
                    placeholder="Paste your LinkedIn profile content here..."
                    className="mt-2 w-full h-40 bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 placeholder-zinc-600 resize-none focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
              )}

              {/* JD input for jd-match and cover-letter */}
              {(activeService === 'jd-match' || activeService === 'cover-letter') && (
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Job Description</label>
                  <textarea
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here..."
                    className="w-full h-36 bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 placeholder-zinc-600 resize-none focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
              )}

              {/* Target role for interview prep */}
              {activeService === 'interview-prep' && (
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Target Role</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={e => setTargetRole(e.target.value)}
                    placeholder="e.g. Senior Software Engineer at Google"
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || (!resumeText && activeService !== 'linkedin')}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Analysing with AI...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Analyse Now</>
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Results</h2>
                <button
                  onClick={() => setResult(null)}
                  className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
                >
                  ← Analyse again
                </button>
              </div>

              {/* Score */}
              {result.score !== undefined && (
                <div className="glass rounded-xl border border-white/10 p-6 text-center">
                  <div className="relative inline-flex items-center justify-center w-28 h-28 mb-3">
                    <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="45" fill="none"
                        stroke={result.score >= 80 ? '#34d399' : result.score >= 60 ? '#fbbf24' : '#f87171'}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * result.score) / 100}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-white">{result.score}</span>
                      <span className="text-xs text-zinc-500">/100</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400">
                    {result.score >= 80 ? '🎉 Excellent! Your resume is strong.' : result.score >= 60 ? '⚡ Good, but there\'s room to improve.' : '🔴 Needs significant work before applying.'}
                  </p>
                </div>
              )}

              {/* Section scores */}
              {result.sections && result.sections.length > 0 && (
                <div className="glass rounded-xl border border-white/10 p-5">
                  <h3 className="text-sm font-semibold text-white mb-4">Section Breakdown</h3>
                  <div className="space-y-3">
                    {result.sections.map(section => (
                      <div key={section.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-zinc-300">{section.name}</span>
                          <span className={`text-xs font-semibold ${section.score >= 80 ? 'text-emerald-400' : section.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {section.score}/100
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${section.score >= 80 ? 'bg-emerald-400' : section.score >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                            style={{ width: `${section.score}%` }}
                          />
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">{section.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions && result.suggestions.length > 0 && (
                <div className="glass rounded-xl border border-white/10 p-5">
                  <h3 className="text-sm font-semibold text-white mb-4">Suggestions</h3>
                  <div className="space-y-2.5">
                    {result.suggestions.map((s, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/2">
                        {s.type === 'error' && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />}
                        {s.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />}
                        {s.type === 'tip' && <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />}
                        <p className="text-xs text-zinc-300 leading-relaxed">{s.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interview questions */}
              {result.questions && result.questions.length > 0 && (
                <div className="glass rounded-xl border border-white/10 p-5">
                  <h3 className="text-sm font-semibold text-white mb-4">Likely Interview Questions</h3>
                  <div className="space-y-4">
                    {result.questions.map((q, i) => (
                      <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                        <p className="text-sm font-medium text-white mb-2">Q{i+1}: {q.question}</p>
                        <p className="text-xs text-zinc-400 leading-relaxed">{q.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rewritten content */}
              {(result.rewritten || result.raw) && (
                <div className="glass rounded-xl border border-white/10 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">Generated Content</h3>
                    <button
                      onClick={copyResult}
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap font-sans">
                    {result.rewritten || result.raw}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
