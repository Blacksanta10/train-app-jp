/**
 * 
 * The layout page is a consistent UI that wraps pages
 * AKA the frame around the pages (HTML, body, nav, footer)
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Navbar components
import { Navbar, NavbarItem, NavbarSection, NavbarDivider} from "@/components/navbar"

//Logo components
import { Logo } from "@/components/logo";
import Link from "next/link";

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
          bg-background
          text-gray-900
          `}
      >
        {/* Navbar for all pages */}
        <Navbar>
          <Link href="/" aria-label="Home">
            <Logo className="size-10 sm:size-8" />
          </Link>

          <NavbarDivider />
          
          <NavbarSection>
            <NavbarItem href="/">Home</NavbarItem>
            <NavbarItem href="/page2">Shinkansen</NavbarItem>
            <NavbarItem href="/page3">Tokyo-Area</NavbarItem>
          </NavbarSection>
        </Navbar>


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
