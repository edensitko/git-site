interface ContributionActivityProps {
  stats: {
    totalCommits: number;
    totalPRs: number;
    totalIssues: number;
    totalReviews: number;
  };
}

export default function ContributionActivity({ stats }: ContributionActivityProps) {
  const activities = [
    { label: "Commits", value: stats.totalCommits, icon: "💻", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
    { label: "Pull Requests", value: stats.totalPRs, icon: "🔀", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800" },
    { label: "Issues", value: stats.totalIssues, icon: "🐛", color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800" },
    { label: "Reviews", value: stats.totalReviews, icon: "👀", color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800" },
  ];

  const hasActivity = Object.values(stats).some(val => val > 0);

  if (!hasActivity) return null;

  return (
    <div className="glass rounded-2xl shadow-lg px-5 py-4 transition-colors">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
        📈 Recent Contribution Activity
      </p>
      <div className="flex flex-wrap gap-2">
        {activities.map((activity) => (
          <div
            key={activity.label}
            className={`${activity.color} flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm`}
          >
            <span>{activity.icon}</span>
            <span className="font-semibold">{activity.value}</span>
            <span className="opacity-70">{activity.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
