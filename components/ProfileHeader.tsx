"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { GitHubUser } from "@/lib/types";

interface ProfileHeaderProps {
  user: GitHubUser;
}

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const createdDate = new Date(user.created_at);
  const formattedDate = createdDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  const handlePointerMove = useCallback((event: PointerEvent): void => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const width = card.clientWidth || 1;
    const height = card.clientHeight || 1;
    const percentX = clamp((100 / width) * x);
    const percentY = clamp((100 / height) * y);
    const centerX = percentX - 50;
    const centerY = percentY - 50;

    wrap.style.setProperty('--pointer-x', `${percentX}%`);
    wrap.style.setProperty('--pointer-y', `${percentY}%`);
    wrap.style.setProperty('--rotate-x', `${round(-(centerX / 3))}deg`);
    wrap.style.setProperty('--rotate-y', `${round(centerY / 3)}deg`);
  }, []);

  const handlePointerEnter = useCallback((): void => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'none';
  }, []);

  const handlePointerLeave = useCallback((): void => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;
    
    card.style.transition = 'transform 0.5s ease';
    wrap.style.setProperty('--rotate-x', '0deg');
    wrap.style.setProperty('--rotate-y', '0deg');
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const moveHandler = handlePointerMove as EventListener;
    const enterHandler = handlePointerEnter as EventListener;
    const leaveHandler = handlePointerLeave as EventListener;

    card.addEventListener('pointermove', moveHandler);
    card.addEventListener('pointerenter', enterHandler);
    card.addEventListener('pointerleave', leaveHandler);

    return () => {
      card.removeEventListener('pointermove', moveHandler);
      card.removeEventListener('pointerenter', enterHandler);
      card.removeEventListener('pointerleave', leaveHandler);
    };
  }, [handlePointerMove, handlePointerEnter, handlePointerLeave]);

  return (
    <div 
      ref={wrapRef}
      className="relative mb-8"
      style={{
        perspective: '1000px',
        '--pointer-x': '50%',
        '--pointer-y': '50%',
        '--rotate-x': '0deg',
        '--rotate-y': '0deg',
      } as React.CSSProperties}
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-3xl"
        style={{
          background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(59, 130, 246, 0.5) 0%, transparent 50%)`,
        }}
      />

      <div
        ref={cardRef}
        className="relative group"
        style={{
          transform: 'rotateX(var(--rotate-y)) rotateY(var(--rotate-x))',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Main card with holographic effect */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 dark:border-white/5 shadow-2xl">
          {/* Animated gradient background */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(circle at var(--pointer-x) var(--pointer-y), 
                  rgba(59, 130, 246, 0.3) 0%, 
                  rgba(147, 51, 234, 0.2) 30%, 
                  transparent 60%
                ),
                linear-gradient(145deg, rgba(96, 73, 110, 0.3) 0%, rgba(113, 196, 255, 0.2) 100%)
              `,
            }}
          />

          {/* Shine effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), 
                rgba(255, 255, 255, 0.2) 0%, 
                transparent 50%
              )`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Content */}
          <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar with 3D effect */}
              <div className="relative" style={{ transform: 'translateZ(50px)' }}>
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative">
                  <Image
                    src={user.avatar_url}
                    alt={user.name || user.login}
                    width={140}
                    height={140}
                    className="rounded-full ring-4 ring-white/30 dark:ring-white/20 relative z-10 transform group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
              </div>

              {/* User info with 3D effect */}
              <div className="flex-1 text-center md:text-left" style={{ transform: 'translateZ(30px)' }}>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {user.name || user.login}
                </h1>
                
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4 group/link"
                >
                  <span>@{user.login}</span>
                  <svg className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                
                {user.bio && (
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl leading-relaxed">
                    {user.bio}
                  </p>
                )}
                
                {/* Info badges with 3D effect */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/50 hover:scale-105 transition-transform" style={{ transform: 'translateZ(20px)' }}>
                    <span className="text-xl">📅</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Since {formattedDate}
                    </span>
                  </div>
                  
                  {user.location && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/50 hover:scale-105 transition-transform" style={{ transform: 'translateZ(20px)' }}>
                      <span className="text-xl">📍</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.location}
                      </span>
                    </div>
                  )}
                  
                  {user.company && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/50 hover:scale-105 transition-transform" style={{ transform: 'translateZ(20px)' }}>
                      <span className="text-xl">🏢</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.company}
                      </span>
                    </div>
                  )}
                  
                  {user.blog && (
                    <a
                      href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/50 hover:scale-105 transition-transform text-blue-600 dark:text-blue-400 hover:border-blue-400 dark:hover:border-blue-600"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <span className="text-xl">🔗</span>
                      <span className="text-sm font-medium">
                        {user.blog.replace(/^https?:\/\//, '')}
                      </span>
                    </a>
                  )}
                  
                  {user.twitter_username && (
                    <a
                      href={`https://twitter.com/${user.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/50 hover:scale-105 transition-transform text-blue-600 dark:text-blue-400 hover:border-blue-400 dark:hover:border-blue-600"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <span className="text-xl">𝕏</span>
                      <span className="text-sm font-medium">
                        @{user.twitter_username}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
