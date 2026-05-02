import Link from 'next/link'
import { Zap } from 'lucide-react'

const links = {
  Product: ['Resume Review', 'Resume Builder', 'LinkedIn Optimizer', 'ATS Checker', 'JD Match', 'Cover Letter', 'Interview Prep'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Support: ['Help Centre', 'Contact Us', 'Campus Pricing', 'Status'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white">CareerCraft</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              AI-powered career tools to help you land your dream job faster.
            </p>
            <p className="text-xs text-zinc-600 mt-4">Made with ❤️ in India 🇮🇳</p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">{cat}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">© 2024 CareerCraft. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-600">Powered by</span>
            <span className="text-xs font-medium text-zinc-500">GPT-4o</span>
            <span className="text-zinc-700">·</span>
            <span className="text-xs font-medium text-zinc-500">Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
