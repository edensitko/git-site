import { GitHubOrganization } from "@/lib/types";

interface OrganizationsProps {
  orgs: GitHubOrganization[];
}

export default function Organizations({ orgs }: OrganizationsProps) {
  if (orgs.length === 0) return null;

  return (
    <div className="glass rounded-2xl shadow-lg p-6 mb-8 transition-colors">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Organizations</h3>
      
      <div className="flex flex-wrap gap-3">
        {orgs.map((org) => (
          <a
            key={org.login}
            href={`https://github.com/${org.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 rounded-lg p-2 transition-colors backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50"
            title={org.description || org.login}
          >
            <img
              src={org.avatar_url}
              alt={org.login}
              className="w-8 h-8 rounded"
            />
            <span className="text-sm font-medium dark:text-gray-300">{org.login}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
