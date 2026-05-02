import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer @ Flipkart',
    avatar: 'PS',
    color: 'bg-indigo-500',
    stars: 5,
    text: "CareerCraft's ATS check found 6 critical formatting issues I never knew about. Fixed them in 10 minutes — got a callback from Flipkart the next week!",
  },
  {
    name: 'Arjun Mehta',
    role: 'MBA Graduate, IIM Ahmedabad',
    avatar: 'AM',
    color: 'bg-violet-500',
    stars: 5,
    text: "The JD match score is a game-changer. I used to apply blindly — now I customise my resume for each role and my response rate has tripled.",
  },
  {
    name: 'Sneha Patel',
    role: 'Product Manager @ Swiggy',
    avatar: 'SP',
    color: 'bg-pink-500',
    stars: 5,
    text: "The LinkedIn optimizer completely rewrote my headline and summary. My profile views went up 300% in a month. Worth every rupee.",
  },
  {
    name: 'Rahul Verma',
    role: 'Data Analyst @ Razorpay',
    avatar: 'RV',
    color: 'bg-emerald-500',
    stars: 5,
    text: "I was skeptical about AI tools but CareerCraft blew me away. The interview prep questions were spot-on — 4 of them came up in my actual interview.",
  },
  {
    name: 'Kavya Nair',
    role: 'UX Designer @ Meesho',
    avatar: 'KN',
    color: 'bg-cyan-500',
    stars: 5,
    text: "Cover letter generator saved me hours. I used to spend 45 minutes per application — now it's under 2 minutes and the letters are 10x better.",
  },
  {
    name: 'Aditya Singh',
    role: 'Fresher → SDE @ TCS',
    avatar: 'AS',
    color: 'bg-amber-500',
    stars: 5,
    text: "As a fresher with no network, I thought I had no chance. CareerCraft helped me build a resume that actually got noticed. First job secured!",
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Loved by job seekers<br />
            <span className="gradient-text">across India</span>
          </h2>
          <p className="text-lg text-zinc-400">Join 50,000+ professionals who landed their dream jobs with CareerCraft.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="glass rounded-xl p-5 border border-white/8 hover:border-white/15 transition-colors">
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
