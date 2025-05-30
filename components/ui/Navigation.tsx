"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Events", path: "/events" },
    { name: "Satellites", path: "/satellites" },
    { name: "News", path: "/news" },
    { name: "Learn", path: "/learn" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 py-4 px-6 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/globe.svg" alt="AstroVerse Logo" width={32} height={32} />
          <span className="text-xl font-bold">AstroVerse</span>
        </Link>
        
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`transition-colors ${pathname === item.path ? 'text-purple-400 font-medium' : 'text-slate-300 hover:text-white'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button className="text-slate-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}