"use client";
import { useState } from "react";
import { LanguageStats } from "@/lib/types";

interface LanguageChartProps {
  stats: LanguageStats[];
}

export default function LanguageChart({ stats }: LanguageChartProps) {
  const [viewMode, setViewMode] = useState<"pie" | "bar">("bar");
  if (stats.length === 0) return null;

  return (
    <div className="glass rounded-2xl shadow-lg p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold dark:text-white">
          Language Distribution
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("bar")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              viewMode === "bar"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Bar
          </button>
          <button
            onClick={() => setViewMode("pie")}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              viewMode === "pie"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Pie
          </button>
        </div>
      </div>
      {viewMode === "bar" ? (
        <>
          <div className="flex h-3 rounded-full overflow-hidden mb-4">
            {stats.map((stat) => (
              <div
                key={stat.language}
                style={{
                  width: `${stat.percentage}%`,
                  backgroundColor: stat.color,
                }}
                title={`${stat.language}: ${stat.percentage}%`}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.language} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {stat.language}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                  {stat.percentage}%
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 mb-4">
            <svg viewBox="0 0 200 200" className="transform -rotate-90">
              {stats.reduce((acc, stat) => {
                const startAngle = acc.angle;
                const angle = (stat.percentage / 100) * 360;
                const endAngle = startAngle + angle;
                const x1 = 100 + 90 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 100 + 90 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 100 + 90 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 100 + 90 * Math.sin((endAngle * Math.PI) / 180);
                const largeArc = angle > 180 ? 1 : 0;
                const path = `M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArc} 1 ${x2} ${y2} Z`;
                acc.paths.push(
                  <path
                    key={stat.language}
                    d={path}
                    fill={stat.color}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <title>{`${stat.language}: ${stat.percentage}%`}</title>
                  </path>
                );
                acc.angle = endAngle;
                return acc;
              }, { paths: [] as JSX.Element[], angle: 0 }).paths}
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            {stats.map((stat) => (
              <div key={stat.language} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {stat.language}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                  {stat.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
