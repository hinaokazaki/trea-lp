import Link from "next/link";

type Variant = "primary" | "line" | "instagram" | "ghost" | "solid";

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

const styles: Record<Variant, string> = {
  primary:
    "inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-br from-[#938CB4] to-[#77709C] shadow-sm hover:from-[#867FA9] hover:to-[#6A6390] transition-all",
  line: "inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-medium border-[1.5px] border-[#06C755] text-[#06C755] bg-[#f0fbf2] hover:bg-[#d0f0d8] transition-colors",
  instagram:
    "inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-medium border-[1.5px] border-[#833AB4] text-[#833AB4] bg-[#faf0ff] hover:bg-[#eed9ff] transition-colors",
  ghost:
    "inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium border border-[#4A4468] text-[#4A4468] bg-white/80 hover:bg-[#F0EEF6] transition-colors",
  solid:
    "inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-br from-[#938CB4] to-[#77709C] shadow-sm hover:from-[#867FA9] hover:to-[#6A6390] transition-all",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  external,
}: Props) {
  const cls = `${styles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
