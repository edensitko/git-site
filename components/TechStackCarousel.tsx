import { DetectedSkills } from "@/lib/types";
import techIconsData from "@/lib/tech-icons.json";

interface TechStackCarouselProps {
  skills: DetectedSkills;
}

// Flatten all tech icons into a single object
const techIcons: Record<string, string> = Object.values(techIconsData).reduce(
  (acc, category) => ({ ...acc, ...category }),
  {}
);

export default function TechStackCarousel({ skills }: TechStackCarouselProps) {
  const allSkills = [
    ...skills.languages,
    ...skills.frameworks,
    ...skills.tools,
  ];

  // Split skills into two rows
  const midPoint = Math.ceil(allSkills.length / 2);
  const firstRow = allSkills.slice(0, midPoint);
  const secondRow = allSkills.slice(midPoint);

  const SkillBadge = ({ skill }: { skill: string }) => (
    <div
      className="flex items-center gap-3 px-6 py-3 bg-gray-200 dark:bg-gray-800/80 rounded-lg border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm whitespace-nowrap shadow-sm"
      title={skill}
    >
      {techIcons[skill] && (
        <img
          src={techIcons[skill]}
          alt={skill}
          className="w-6 h-6"
        />
      )}
      <span className="text-base font-medium text-gray-700 dark:text-gray-300">
        {skill}
      </span>
    </div>
  );

  return (
    <div className="mb-8 py-8">
      {/* First carousel - scrolling left */}
      <div className="overflow-hidden mb-3">
        <div className="flex gap-3 animate-scroll-left">
          {[...firstRow, ...firstRow, ...firstRow].map((skill, index) => (
            <SkillBadge key={`first-${skill}-${index}`} skill={skill} />
          ))}
        </div>
      </div>

      {/* Second carousel - scrolling right */}
      <div className="overflow-hidden">
        <div className="flex gap-3 animate-scroll-right">
          {[...secondRow, ...secondRow, ...secondRow].map((skill, index) => (
            <SkillBadge key={`second-${skill}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
