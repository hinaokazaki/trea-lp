"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

type Props = { children: React.ReactNode };

export default function GalleryModal({ children }: Props) {
  const router = useRouter();

  // router.back() で /gallery に戻す（一覧のフィルタ状態・スクロール位置が維持される）
  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    // モーダル表示中は背景スクロールをロック
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [close]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-[rgba(35,32,60,.6)]"
        onClick={close}
        aria-hidden="true"
      />

      {/* モバイルは画面幅いっぱいのシート状、PCは中央のカード */}
      <div className="relative w-full sm:max-w-2xl sm:mx-6 max-h-[92dvh] overflow-y-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl">
        <button
          onClick={close}
          aria-label="閉じる"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#E4E2EE] text-[#5D5786] flex items-center justify-center hover:bg-[#F0EEF6] transition-colors"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
