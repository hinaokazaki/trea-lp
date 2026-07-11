"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Images, LayoutDashboard, LogOut, Tags } from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/admin/gallery", label: "ギャラリー", icon: Images },
  { href: "/admin/tags", label: "タグ管理", icon: Tags },
];

/** 管理画面共通レイアウト(ヘッダー+ナビ) */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6FA]">
      <header className="bg-white border-b border-[#E4E2EE] sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <Link href="/admin" className="flex items-baseline gap-2">
              <span className="font-serif text-base font-medium text-[#312F55]">
                TRE&rsquo;A
              </span>
              <span className="text-[11px] text-[#8D8AA0] tracking-[.08em]">
                管理画面
              </span>
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 text-xs text-[#6B6880] hover:text-[#4A4468] transition-colors disabled:opacity-50"
            >
              <LogOut size={14} />
              ログアウト
            </button>
          </div>
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
                    active
                      ? "border-[#7E78A3] text-[#5D5786]"
                      : "border-transparent text-[#8D8AA0] hover:text-[#5D5786]"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>
    </div>
  );
}
