"use client";

import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/** 公開状態バッジ */
export function PublishStatusBadge({ isPublished }: { isPublished: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
        isPublished
          ? "bg-[#EFEDF5] text-[#5D5786]"
          : "bg-[#F3F2F0] text-[#8D8AA0]"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isPublished ? "bg-[#7E78A3]" : "bg-[#C4C2CE]"
        }`}
      />
      {isPublished ? "公開中" : "非公開"}
    </span>
  );
}

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "outline" | "danger";
  children: ReactNode;
};

/** 送信中スピナー付きボタン(loading中は自動で無効化し二重送信を防ぐ) */
export function LoadingButton({
  loading = false,
  variant = "primary",
  children,
  className = "",
  disabled,
  ...rest
}: LoadingButtonProps) {
  const styles = {
    primary:
      "bg-[#7E78A3] text-white hover:bg-[#6A6390] disabled:bg-[#C4C2CE]",
    outline:
      "border border-[#D5D2E3] text-[#4A4468] hover:bg-[#EFEDF5] disabled:text-[#C4C2CE] disabled:hover:bg-transparent",
    danger:
      "bg-[#B05C6E] text-white hover:bg-[#9A4C5E] disabled:bg-[#D8B4BC]",
  }[variant];

  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed ${styles} ${className}`}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
}

/** エラー・成功メッセージ */
export function Message({
  type,
  children,
}: {
  type: "error" | "success";
  children: ReactNode;
}) {
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`px-4 py-3 rounded-lg text-sm ${
        type === "error"
          ? "bg-[#FBF0F2] text-[#B05C6E] border border-[#EBD4D9]"
          : "bg-[#EFEDF5] text-[#5D5786] border border-[#D5D2E3]"
      }`}
    >
      {children}
    </div>
  );
}

/** 投稿0件時などの空状態 */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white rounded-xl border border-[#E4E2EE]">
      {icon && <div className="text-[#9690AE] mb-4">{icon}</div>}
      <p className="text-sm font-medium text-[#312F55] mb-1">{title}</p>
      {description && <p className="text-xs text-[#8D8AA0] mb-5">{description}</p>}
      {action}
    </div>
  );
}

/** フォーム項目のエラーテキスト */
export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-[#B05C6E] mt-1">{message}</p>;
}
