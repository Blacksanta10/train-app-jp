/**
 * This is the structure of a Navigation bar 
 *
 * Purpose: 
 * Create a Navbar component that will be used in another file
 */

import Link from "next/link";

export function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="border-b bg-nav-bg">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center">
        {children}
      </div>
    </nav>
  );
}

export function NavbarSection({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-6">{children}</div>;
}

export function NavbarDivider(){
    return <div className="h-6 w-px bg-gray-200" />;
}

export function NavbarItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-accent font-medium"
    >
      {children}
    </Link>
  );
}

