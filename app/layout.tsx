import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CareerCraft — AI-Powered Resume & LinkedIn Optimizer',
  description: 'Get instant AI feedback on your resume and LinkedIn profile. Beat ATS filters, match job descriptions, and land more interviews.',
  keywords: 'resume review, LinkedIn optimization, ATS checker, cover letter, interview prep, AI resume',
  openGraph: {
    title: 'CareerCraft — AI Career Tools',
    description: 'Resume reviews, LinkedIn audits, ATS checks, and more — powered by AI.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  )
}
