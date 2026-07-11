"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

/**
 * 公開サイトではHeader/Footer付きの既存構造を維持し、
 * /admin配下では管理画面レイアウトに任せてHeader/Footerを表示しない。
 */
export default function SiteChrome({ header, footer, children }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
