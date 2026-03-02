import { DetectedSkills } from "@/lib/types";

interface SkillsDetectedProps {
  skills: DetectedSkills;
}

export default function SkillsDetected({ skills }: SkillsDetectedProps) {
  const allSkills = [
    ...skills.languages.map(s => ({ name: s, type: "Language" })),
    ...skills.frameworks.map(s => ({ name: s, type: "Framework" })),
    ...skills.tools.map(s => ({ name: s, type: "Tool" })),
  ];

  if (allSkills.length === 0) return null;

  return (
    <div className="glass rounded-2xl shadow-lg p-6 mb-8 transition-colors">
      <h3 className="text-xl font-bold mb-4 dark:text-white">🎯 Skills Detected</h3>
      <div className="flex flex-wrap gap-2">
        {allSkills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
