import { GitHubUser } from "@/lib/types";

interface StatsBarProps {
  user: GitHubUser;
  totalStars: number;
}

export default function StatsBar({ user, totalStars }: StatsBarProps) {
  const stats = [
    { label: "Public Repos", value: user.public_repos },
    { label: "Followers", value: user.followers },
    { label: "Following", value: user.following },
    { label: "Total Stars", value: totalStars },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass rounded-xl shadow-lg p-6 text-center transition-colors"
        >
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {stat.value.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
