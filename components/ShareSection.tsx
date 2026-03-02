"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

interface ShareSectionProps {
  username: string;
}

export default function ShareSection({ username }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);
  const profileUrl = `https://git-site.com/${username}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out @${username}'s developer portfolio — built with git-site.com`)}&url=${encodeURIComponent(profileUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;

  return (
    <div id="share-section" className="py-12 mb-4 text-center">
      <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Share this portfolio</p>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Know someone who'd love this profile?
      </h3>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* X / Twitter */}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors shadow-sm w-full sm:w-auto justify-center"
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on 𝕏
        </a>

        {/* LinkedIn */}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] text-white text-sm font-semibold hover:bg-[#0958a8] transition-colors shadow-sm w-full sm:w-auto justify-center"
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Share on LinkedIn
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/80 border border-gray-200 dark:bg-white/5 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors shadow-sm w-full sm:w-auto justify-center"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
