import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-3xl font-bold mb-2">User Not Found</h1>
        <p className="text-gray-600 mb-6">
          This GitHub user doesn't exist or their profile is private.
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
