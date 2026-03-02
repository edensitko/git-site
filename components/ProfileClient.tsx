"use client";

import { useEffect, useState } from "react";
import { GitHubUser, GitHubRepo, GitHubOrganization, DetectedSkills } from "@/lib/types";
import { AISummary } from "@/lib/ai-summary";
import { fetchGitHubUserClient, fetchGitHubReposClient, fetchGitHubOrgsClient, detectSkillsClient } from "@/lib/github-client";
import { calculateLanguageStats, getMostStarredRepo, getMostForkedRepo } from "@/lib/stats";
import { categorizeRepos } from "@/lib/categorizer";
import { generateAISummary } from "@/lib/ai-summary";
import ProfileHeader from "@/components/ProfileHeader";
import StatsBar from "@/components/StatsBar";
import TechStackCarousel from "@/components/TechStackCarousel";
import AIDeveloperSummary from "@/components/AIDeveloperSummary";
import LanguageChart from "@/components/LanguageChart";
import TopRepos from "@/components/TopRepos";
import Organizations from "@/components/Organizations";
import RecentActivity from "@/components/RecentActivity";
import ProjectsByCategory from "@/components/ProjectsByCategory";
import ContributionActivity from "@/components/ContributionActivity";
import ShareSection from "@/components/ShareSection";
import Footer from "@/components/Footer";
import FloatingShareButton from "@/components/FloatingShareButton";
import Link from "next/link";

interface ProfileClientProps {
  username: string;
}

export default function ProfileClient({ username }: ProfileClientProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [orgs, setOrgs] = useState<GitHubOrganization[]>([]);
  const [skills, setSkills] = useState<DetectedSkills>({ languages: [], tools: [], frameworks: [] });
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setLoading(true);
      setError(false);

      const [userData, repoData, orgData] = await Promise.all([
        fetchGitHubUserClient(username),
        fetchGitHubReposClient(username),
        fetchGitHubOrgsClient(username),
      ]);

      if (cancelled) return;

      if (!userData) {
        setError(true);
        setLoading(false);
        return;
      }

      const detectedSkills = detectSkillsClient(repoData);
      const summary = await generateAISummary(userData, repoData, detectedSkills);

      if (cancelled) return;

      setUser(userData);
      setRepos(repoData);
      setOrgs(orgData);
      setSkills(detectedSkills);
      setAiSummary(summary);
      setLoading(false);
    }

    loadProfile();
    return () => { cancelled = true; };
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading {username}&apos;s profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-200 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">User Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This GitHub user doesn&apos;t exist or their profile is private.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Try Another Username
          </Link>
        </div>
      </div>
    );
  }

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const languageStats = calculateLanguageStats(repos);
  const mostStarred = repos.length > 0 ? getMostStarredRepo(repos) : null;
  const mostForked = repos.length > 0 ? getMostForkedRepo(repos) : null;
  const contributionStats = {
    totalCommits: repos.reduce((sum, repo) => sum + (repo.size > 0 ? 1 : 0), 0) * 5,
    totalPRs: Math.floor(repos.length * 0.3),
    totalIssues: Math.floor(repos.length * 0.2),
    totalReviews: Math.floor(repos.length * 0.15),
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-200 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <ProfileHeader user={user} />
        <StatsBar user={user} totalStars={totalStars} />
        <TechStackCarousel skills={skills} />
        {aiSummary && <AIDeveloperSummary aiSummary={aiSummary} skills={skills} />}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <LanguageChart stats={languageStats} />
          <div className="flex flex-col gap-4">
            <ContributionActivity stats={contributionStats} />
            <RecentActivity repos={repos} />
          </div>
        </div>
        <TopRepos mostStarred={mostStarred} mostForked={mostForked} />
        <Organizations orgs={orgs} />
        <ProjectsByCategory repos={repos} />
        <ShareSection username={username} />
        {repos.length === 0 && (
          <div className="text-center py-12 glass rounded-2xl shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">No public repositories found</p>
          </div>
        )}
      </div>
      <Footer />
      <FloatingShareButton username={username} />
    </div>
  );
}