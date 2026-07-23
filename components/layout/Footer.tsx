import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import InstagramIcon from "@/components/common/InstagramIcon";

const footerLinks = [
  { href: "/concept", label: "コンセプト" },
  { href: "/menu", label: "メニュー" },
  { href: "/gallery", label: "ギャラリー" },
  { href: "/faq", label: "FAQ" },
  { href: "/reservation", label: "ご予約" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F6F5F9] border-t border-[#E4E2EE] mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Image
              src="/images/top/logo.webp"
              alt="TRE'A private nail salon"
              width={130}
              height={56}
            />
            <p className="text-xs text-[#6B6880] leading-relaxed">
              完全貸切・一席のみのプライベートネイルサロン
              <br />
              短い爪でも可愛く上品に。
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[#6B6880] hover:text-[#5D5786] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Info */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-[#6B6880] leading-relaxed">
              営業日はInstagramのハイライトでご確認ください
            </p>
            <p className="text-xs text-[#6B6880]">
              ご予約：LINE / Instagram DM
            </p>
            <div className="flex items-center gap-3 mt-1">
              <Link
                href="/reservation"
                className="text-[#8D8AA0] hover:text-[#06C755] transition-colors"
                aria-label="ご予約ページ（LINE予約のご案内）"
              >
                <MessageCircle size={24} />
              </Link>
              <a
                href="https://www.instagram.com/trea_nails_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8D8AA0] hover:text-[#833AB4] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E4E2EE] flex flex-col md:flex-row md:justify-between gap-2 text-xs text-[#8D8AA0]">
          <Link href="#" className="hover:text-[#55527A]">
            プライバシーポリシー
          </Link>
          <span>© {new Date().getFullYear()} TRE&apos;A nails</span>
        </div>
      </div>
    </footer>
  );
}
