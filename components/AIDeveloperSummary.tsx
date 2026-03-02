"use client";

import { useState } from "react";
import { AISummary } from "@/lib/ai-summary";
import { DetectedSkills } from "@/lib/types";

interface AIDeveloperSummaryProps {
  aiSummary: AISummary;
  skills: DetectedSkills;
}

const COLLAPSED_LIMIT = 8;

export default function AIDeveloperSummary({ aiSummary, skills }: AIDeveloperSummaryProps) {
  const [expanded, setExpanded] = useState(false);

  const allSkills = [
    ...skills.languages.map((s) => ({ name: s, type: "Language" })),
    ...skills.frameworks.map((s) => ({ name: s, type: "Framework" })),
    ...skills.tools.map((s) => ({ name: s, type: "Tool" })),
  ];

  const visibleSkills = expanded ? allSkills : allSkills.slice(0, COLLAPSED_LIMIT);
  const hasMore = allSkills.length > COLLAPSED_LIMIT;

  return (
    <div className="glass rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h2 className="text-2xl font-bold dark:text-white">Developer Insights</h2>
        </div>
        <span className="px-3 py-1 bg-purple-100/70 dark:bg-purple-900/70 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium backdrop-blur-sm">
          {aiSummary.careerLevel}
        </span>
      </div>

      {/* Tagline */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50">
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 italic">
          "{aiSummary.tagline}"
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
          Professional Summary
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {aiSummary.summary}
        </p>
      </div>

      {/* Strengths */}
      {aiSummary.strengths.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
            Key Strengths
          </h3>
          <div className="flex flex-wrap gap-2">
            {aiSummary.strengths.map((strength, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-300/50 dark:border-blue-600/50 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium backdrop-blur-sm"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Skills Detected */}
      {allSkills.length > 0 && (
        <div className="pt-5 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
              🎯 Skills Detected
              <span className="text-xs font-normal normal-case text-gray-400 dark:text-gray-500">
                ({allSkills.length})
              </span>
            </h3>
            {hasMore && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 transition-colors"
              >
                {expanded ? "Show less ↑" : `Show all ${allSkills.length} ↓`}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {visibleSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform"
              >
                {skill.name}
              </span>
            ))}
            {!expanded && hasMore && (
              <button
                onClick={() => setExpanded(true)}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                +{allSkills.length - COLLAPSED_LIMIT} more
              </button>
            )}
          </div>
        </div>
      )}

      {/* Analysis Badge */}
      <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Analyzed from {aiSummary.strengths.length} key skills and project patterns
        </p>
      </div>
    </div>
  );
}
