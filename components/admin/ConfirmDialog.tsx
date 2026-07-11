"use client";

import type { ReactNode } from "react";
import { LoadingButton } from "./ui";

type Props = {
  open: boolean;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/** 削除などの確認ダイアログ */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "削除する",
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-[rgba(43,42,64,.45)]"
        onClick={loading ? undefined : onCancel}
      />
      <div className="relative bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
        <h2 className="text-sm font-bold text-[#312F55] mb-2">{title}</h2>
        {description && (
          <div className="text-xs text-[#6B6880] leading-relaxed mb-5">
            {description}
          </div>
        )}
        <div className="flex justify-end gap-2">
          <LoadingButton
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            キャンセル
          </LoadingButton>
          <LoadingButton
            type="button"
            variant="danger"
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
