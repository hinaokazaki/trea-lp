"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { href: "/concept", label: "コンセプト" },
  { href: "/menu", label: "メニュー" },
  { href: "/gallery", label: "ギャラリー" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-base font-medium tracking-widest text-stone-800 hover:text-[#993556] transition-colors"
        >
          {/* <Image src="/icon.png" alt="TREA logo" width={120} height={60} /> */}
          TRE&apos;A nails
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-[#993556] font-medium"
                  : "text-stone-500 hover:text-[#993556]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/reservation"
            className="text-sm font-medium px-4 py-1.5 rounded-full border-[1.5px] border-[#D4537E] text-[#993556] bg-[#FBEAF0] hover:bg-[#F4C0D1] transition-colors"
          >
            ご予約
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-stone-600"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="メニューを開く"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm ${
                pathname === link.href
                  ? "text-[#993556] font-medium"
                  : "text-stone-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/reservation"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-center px-4 py-2 rounded-full border-[1.5px] border-[#D4537E] text-[#993556] bg-[#FBEAF0]"
          >
            ご予約
          </Link>
        </div>
      )}
    </header>
  );
}
