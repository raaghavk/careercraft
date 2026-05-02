'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Zap } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">CareerCraft</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How it works</Link>
            <Link href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="#faq" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get started free →
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-zinc-400 hover:text-white">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-zinc-950 px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-3">
            {['Features', 'How it works', 'Pricing', 'FAQ'].map(item => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm text-zinc-400 hover:text-white py-2"
                onClick={() => setOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="mt-2 text-sm font-medium bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-center"
              onClick={() => setOpen(false)}
            >
              Get started free →
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
