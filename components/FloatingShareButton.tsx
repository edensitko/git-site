"use client";

import { useEffect, useRef, useState } from "react";
import { Share2, Check, Link2, X } from "lucide-react";

interface FloatingShareButtonProps {
  username: string;
}

export default function FloatingShareButton({ username }: FloatingShareButtonProps) {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const profileUrl = `https://git-site.com/${username}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out @${username}'s developer portfolio — built with git-site.com`)}&url=${encodeURIComponent(profileUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;

  // Hide button when ShareSection is in view
  useEffect(() => {
    const target = document.getElementById("share-section");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={menuRef}
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 transition-all duration-300 ${
        sectionVisible ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Share options — appear above the button */}
      <div
        className={`flex flex-col items-end gap-2 transition-all duration-200 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {/* X / Twitter */}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-sm font-semibold shadow-lg hover:bg-gray-900 transition-colors whitespace-nowrap"
        >
          <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on 𝕏
        </a>

        {/* LinkedIn */}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] text-white text-sm font-semibold shadow-lg hover:bg-[#0958a8] transition-colors whitespace-nowrap"
        >
          <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Share on LinkedIn
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
        >
          {copied ? <Check className="w-4 h-4 text-green-500 shrink-0" /> : <Link2 className="w-4 h-4 shrink-0" />}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      {/* Circle toggle button + label */}
      <div className="flex items-center gap-2">
        {!open && (
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
            Share profile!
          </span>
        )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Share this portfolio"
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
          open
            ? "bg-gray-200 dark:bg-gray-700 rotate-90"
            : "bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
        }`}
      >
        {open ? (
          <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        ) : (
          <Share2 className="w-5 h-5 text-white" />
        )}
      </button>
      </div>
    </div>
  );
}
