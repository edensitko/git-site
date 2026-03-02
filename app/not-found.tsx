"use client";

import { useEffect, useState } from "react";
import ProfileClient from "@/components/ProfileClient";
import Link from "next/link";

export default function NotFound() {
  const [username, setUsername] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
    // Single path segment that looks like a GitHub username
    if (path && !path.includes("/") && /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(path)) {
      setUsername(path);
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (username) {
    return <ProfileClient username={username} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-200 dark:bg-gray-900">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}