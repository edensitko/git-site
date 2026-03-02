import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Git-Site.com - Beautiful GitHub Profile Visualizer",
  description: "Transform any GitHub profile into a beautiful developer portfolio",
  keywords: [
    "Git-Site",
    "git-site.com",
    "GitHub profile",
    "developer portfolio",
    "profile visualizer",
    "open source",
    "coding analytics",
  ],
  openGraph: {
    title: "Git-Site.com - Beautiful GitHub Portfolios",
    description: "Transform any GitHub profile into a beautiful developer portfolio",
    url: "https://git-site.com/",
    siteName: "Git-Site.com",
    images: [
      {
        url: "https://git-site.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Git-Site preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Git-Site.com",
    description: "Beautiful GitHub portfolio visualizer",
    site: "@edensitko",
  },
  other: {
    "geo.region": "US",
    "geo.placename": "San Francisco, CA",
    "geo.position": "37.7749;-122.4194",
    "ICBM": "37.7749, -122.4194"
  },
  alternates: {
    canonical: "https://git-site.com/"
  },
  metadataBase: new URL(process.env.SITE_URL || "https://git-site.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors">
        <ThemeToggle />
        {children}
        {/* JSON-LD structured data for website */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Git-Site.com",
          "url": process.env.SITE_URL || "https://git-site.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://git-site.com/{search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }) }} />
      </body>
    </html>
  );
}
