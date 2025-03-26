import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import App from "./context";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YCTC - Your Computer Training Center",
  description:
    "Join YCTC for expert-led computer training courses in programming, design, and more.",
  keywords: [
    "YCTC",
    "computer training",
    "coding courses",
    "programming classes",
    "web development",
    "design courses",
  ],
  robots: "index, follow",
  openGraph: {
    title: "YCTC - Your Computer Training Center",
    description:
      "Join YCTC for expert-led computer training courses in programming, design, and more.",
    url: "https://yctc.in",
    siteName: "YCTC",
    images: [
      {
        url: "https://yctc.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YCTC Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YCTC - Your Computer Training Center",
    description: "Join YCTC for expert-led computer training courses.",
    images: ["https://yctc.in/twitter-card.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        {/* Charset & Viewport for SEO */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Canonical URL to avoid duplicate content */}
        <link rel="canonical" href="https://yctc.in" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Schema Markup for better search engine understanding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "YCTC",
              url: "https://yctc.in",
              logo: "https://yctc.in/logo.png",
              description:
                "Join YCTC for expert-led computer training courses.",
              sameAs: [
                "https://twitter.com/yctc",
                "https://www.facebook.com/yctc",
              ],
            }),
          }}
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <App>{children}</App>

        {/* Optimized ToastContainer */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
