/**
 * 
 * The layout page is a consistent UI that wraps pages
 * AKA the frame around the pages (HTML, body, nav, footer)
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//Search engine optimization + browser metadata
export const metadata: Metadata = {
  title: "Train App JP",
  description: "Shinkansen station explorer",
};


// Root layout that wraps all pages in the app
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable}
          antialiased
          min-h-screen
          flex
          flex-col
          bg-gray-50
          text-gray-900
          `}
      >
        {/* Header for all pages */}
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <h1 className="text-xl font-semibold tracking-tight">
                Shinkansen Station Explorer
            </h1>
            <p className="text-sm text-gray-500">
                Explore Japan's bullet train stations
            </p>
          </div>
        </header>


        {/* Main content area (page.tsx renders) */}
        <main className="flex-1 mx-auto max-w-6xl px-4 py-6 w-full">
          {children}
        </main>

        {/* Footer for all pages */}
        <footer className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-gray-500 flex justify-between">
            <span>© {new Date().getFullYear()} Train App JP </span>
            <span>Built with Next.js & Tailwind</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
