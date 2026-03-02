"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import {
  BarChart2,
  Tag,
  Sparkles,
  TrendingUp,
  Star,
  Palette,
  User,
  ArrowRight,
  Search,
  Zap,
  Globe,
} from "lucide-react";

const popularProfiles = [
  "vercel", "facebook", "microsoft", "google", "apple",
  "netflix", "airbnb", "uber", "spotify", "twitter",
  "denoland", "tailwindlabs", "vuejs", "sveltejs", "oven-sh",
];

const popularProfiles2 = [
  "torvalds", "gaearon", "sindresorhus", "tj", "yyx990803",
  "nicolo-ribaudo", "antfu", "wesbos", "kentcdodds", "paulirish",
  "addyosmani", "jakearchibald", "mrdoob", "gvergnaud", "ThePrimeagen",
];

const features = [
  {
    icon: BarChart2,
    title: "Tech Stack Visualization",
    desc: "Language distribution displayed with beautiful charts and breakdowns across all your repositories.",
    from: "#3b82f6",
    to: "#06b6d4",
  },
  {
    icon: Tag,
    title: "Smart Categories",
    desc: "Repositories auto-grouped by type, tech, and purpose — no tagging needed.",
    from: "#a855f7",
    to: "#ec4899",
  },
  {
    icon: Sparkles,
    title: "Developer Insights",
    desc: "An automated summary of your coding style, activity patterns, and strengths.",
    from: "#f97316",
    to: "#ef4444",
  },
  {
    icon: TrendingUp,
    title: "Activity Timeline",
    desc: "Recent commits and contributions visualized at a glance.",
    from: "#22c55e",
    to: "#10b981",
  },
  {
    icon: Star,
    title: "Top Repositories",
    desc: "Your most starred and forked projects highlighted front and center.",
    from: "#eab308",
    to: "#f97316",
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    desc: "Modern UI with dark mode, glass effects, and smooth animations built in.",
    from: "#ec4899",
    to: "#f43f5e",
  },
];

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Enter any GitHub username",
    desc: "Type in any public GitHub username — yours, a company's, or your favorite developer's.",
    from: "#3b82f6",
    to: "#8b5cf6",
  },
  {
    number: "02",
    icon: Zap,
    title: "We do the rest instantly",
    desc: "Git-Site fetches public profile data, repos, languages, and activity in real time. No setup, no API key, no account.",
    from: "#8b5cf6",
    to: "#ec4899",
  },
  {
    number: "03",
    icon: Globe,
    title: "Share a beautiful portfolio",
    desc: "Get a shareable URL that turns a raw GitHub profile into a polished developer portfolio — ready in seconds.",
    from: "#ec4899",
    to: "#f97316",
  },
];

export default function HomePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40 dark:bg-none dark:bg-[#080c14] text-gray-900 dark:text-white overflow-hidden transition-colors">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-56 -left-56 w-[600px] h-[600px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-56 w-[600px] h-[600px] bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-pink-400/15 dark:bg-pink-600/15 rounded-full blur-[120px]" />

        {/* Dot grid — light mode */}
        <div
          className="absolute inset-0 opacity-[0.22] dark:hidden"
          style={{
            backgroundImage: "radial-gradient(circle, #334155 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Dot grid — dark mode */}
        <div
          className="absolute inset-0 hidden dark:block opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(circle, #94a3b8 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex items-center justify-between">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
          git-site
        </span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          GitHub <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </nav>

      {/* Hero */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-20 md:pt-28 pb-16 sm:pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 dark:border-white/10 dark:bg-white/5 backdrop-blur-sm text-xs sm:text-sm text-blue-700 dark:text-gray-400 mb-6 sm:mb-8 transition-colors">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse shrink-0" />
          Free for any public GitHub profile
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-5 sm:mb-6">
          <span className="bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Your GitHub,
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            beautifully reimagined.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
          Transform any GitHub profile into a stunning developer portfolio.
          No sign-up. No config. Just a URL.
        </p>

        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white/70 border border-gray-200 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm text-xs sm:text-sm font-mono mb-8 sm:mb-10 shadow-sm dark:shadow-none transition-colors">
          <span className="text-gray-400 dark:text-gray-600 line-through">github.com</span>
          <span className="text-gray-400 dark:text-gray-600">→</span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">git-site.com</span>
        </div>

        {/* Form — stacked on mobile, inline on sm+ */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-12 sm:mb-14">
          <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:p-2 sm:rounded-2xl sm:bg-white/80 sm:border sm:border-gray-200 sm:dark:bg-white/5 sm:dark:border-white/10 sm:backdrop-blur-md sm:shadow-sm sm:dark:shadow-none sm:focus-within:border-blue-300 sm:dark:focus-within:border-white/20 transition-all">
            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3.5 sm:py-0 sm:px-0 sm:pl-3 sm:flex-1 rounded-2xl sm:rounded-none bg-white/80 sm:bg-transparent border border-gray-200 sm:border-0 dark:bg-white/5 sm:dark:bg-transparent dark:border-white/10 sm:dark:border-0 backdrop-blur-md sm:backdrop-blur-none shadow-sm sm:shadow-none dark:shadow-none focus-within:border-blue-300 sm:focus-within:border-0 dark:focus-within:border-white/20 sm:dark:focus-within:border-0 transition-colors">
              <User className="w-4 h-4 text-gray-400 dark:text-gray-600 shrink-0" strokeWidth={1.5} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username..."
                className="flex-1 sm:py-3 sm:px-2 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none text-base"
                autoFocus
              />
            </div>
            {/* Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl sm:rounded-xl font-semibold transition-all text-sm shadow-md active:scale-95"
            >
              Generate <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Popular profiles — full-width ticker */}
      <div className="relative z-10 w-full py-8 sm:py-10">
        <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest text-center mb-4 sm:mb-5">
          Popular profiles
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-40 z-10"
            style={{ background: "linear-gradient(to right, var(--fade-color) 0%, transparent 100%)" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-40 z-10"
            style={{ background: "linear-gradient(to left, var(--fade-color) 0%, transparent 100%)" }} />

          <div className="overflow-hidden">
            <div className="flex gap-2 sm:gap-3 animate-scroll-left">
              {[...popularProfiles, ...popularProfiles].map((profile, i) => (
                <a key={`${profile}-${i}`} href={`/${profile}`}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/80 border border-gray-200 hover:border-blue-300 hover:bg-white dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/25 backdrop-blur-sm transition-all whitespace-nowrap text-xs sm:text-sm font-mono text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white shadow-sm dark:shadow-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex-shrink-0" />
                  @{profile}
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden mt-2 sm:mt-3">
            <div className="flex gap-2 sm:gap-3 animate-scroll-right">
              {[...popularProfiles2, ...popularProfiles2].map((profile, i) => (
                <a key={`${profile}-${i}`} href={`/${profile}`}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/80 border border-gray-200 hover:border-purple-300 hover:bg-white dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/25 backdrop-blur-sm transition-all whitespace-nowrap text-xs sm:text-sm font-mono text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white shadow-sm dark:shadow-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0" />
                  @{profile}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-28">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            From GitHub to portfolio
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              in three seconds flat.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            Git-Site is a free, open-source tool that reads any public GitHub profile and transforms it into a rich, shareable developer page — automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.number} className="relative group">
                {/* Connector line between steps */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(100%-1rem)] w-8 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-white/10 z-20" />
                )}

                <div className="relative p-6 sm:p-7 rounded-2xl bg-white/70 border border-gray-200 dark:bg-white/[0.04] dark:border-white/10 backdrop-blur-sm shadow-sm dark:shadow-none hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(to right, ${s.from}, ${s.to})` }}
                  />

                  {/* Step number */}
                  <span
                    className="absolute top-5 right-5 text-4xl font-black opacity-[0.07] leading-none select-none"
                    style={{ color: s.from }}
                  >
                    {s.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.75} />
                  </div>

                  <h3 className="font-bold text-base sm:text-lg mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 md:pb-28">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Everything your profile deserves
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            GitHub shows your repos. Git-Site tells your story as a developer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative p-5 sm:p-6 rounded-2xl bg-white/70 border border-gray-200 dark:bg-white/[0.03] dark:border-white/8 backdrop-blur-sm shadow-sm dark:shadow-none hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none hover:border-gray-300 dark:hover:border-white/15 transition-all duration-300 overflow-hidden"
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, ${f.from}, ${f.to})` }}
                />

                {/* Card glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${f.from}18 0%, transparent 65%)` }}
                />

                {/* Icon */}
                <div
                  className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-md transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${f.from}, ${f.to})` }}
                >
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                </div>

                <h3 className="relative font-bold text-sm sm:text-base mb-2 tracking-tight">{f.title}</h3>
                <p className="relative text-sm text-gray-500 dark:text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
