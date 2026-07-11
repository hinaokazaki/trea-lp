"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImageOff, Pencil, Trash2 } from "lucide-react";
import type { AdminGalleryItem } from "@/types/admin";
import { EmptyState, LoadingButton, Message, PublishStatusBadge } from "./ui";
import ConfirmDialog from "./ConfirmDialog";

type Props = { initialItems: AdminGalleryItem[] };

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}

export default function GalleryAdminList({ initialItems }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [orderDraft, setOrderDraft] = useState<Record<string, number>>({});
  const [deleteTarget, setDeleteTarget] = useState<AdminGalleryItem | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const orderDirty = useMemo(
    () =>
      Object.entries(orderDraft).some(([id, value]) => {
        const item = items.find((i) => i.id === id);
        return item && item.sortOrder !== value;
      }),
    [orderDraft, items]
  );

  const handleTogglePublish = async (item: AdminGalleryItem) => {
    if (busyId) return;
    setBusyId(item.id);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/gallery/${item.id}/publish`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setMessage({ type: "error", text: data?.error ?? "公開状態の変更に失敗しました" });
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, isPublished: !item.isPublished } : i
        )
      );
      setMessage({
        type: "success",
        text: !item.isPublished ? "公開しました" : "非公開にしました",
      });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "通信エラーが発生しました" });
    } finally {
      setBusyId(null);
    }
  };

  const handleSaveOrder = async () => {
    if (savingOrder || !orderDirty) return;
    setSavingOrder(true);
    setMessage(null);
    const payload = items.map((item) => ({
      id: item.id,
      sortOrder: orderDraft[item.id] ?? item.sortOrder,
    }));
    try {
      const res = await fetch("/api/admin/gallery/order", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payload }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setMessage({ type: "error", text: data?.error ?? "表示順の保存に失敗しました" });
        return;
      }
      setItems((prev) =>
        [...prev]
          .map((item) => ({
            ...item,
            sortOrder: orderDraft[item.id] ?? item.sortOrder,
          }))
          .sort(
            (a, b) =>
              a.sortOrder - b.sortOrder ||
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
      );
      setOrderDraft({});
      setMessage({ type: "success", text: "表示順を保存しました" });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "通信エラーが発生しました" });
    } finally {
      setSavingOrder(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/gallery/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setMessage({ type: "error", text: data?.error ?? "削除に失敗しました" });
        return;
      }
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      setMessage({ type: "success", text: "投稿を削除しました" });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "通信エラーが発生しました" });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ImageOff size={32} />}
        title="まだ投稿がありません"
        description="最初のネイルデザインを投稿してギャラリーを作りましょう"
        action={
          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center bg-[#7E78A3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#6A6390] transition-colors"
          >
            新規投稿を作成
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {message && <Message type={message.type}>{message.text}</Message>}

      {orderDirty && (
        <div className="flex items-center justify-between bg-[#EFEDF5] border border-[#D5D2E3] rounded-lg px-4 py-2.5">
          <p className="text-xs text-[#5D5786]">表示順が変更されています</p>
          <LoadingButton
            loading={savingOrder}
            onClick={handleSaveOrder}
            className="!py-1.5 !px-3 !text-xs"
          >
            表示順を保存
          </LoadingButton>
        </div>
      )}

      {/* カード形式(モバイルでもはみ出さない) */}
      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-[#E4E2EE] p-3 sm:p-4 flex gap-3 sm:gap-4"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-[#EDEBF4]">
              <Image
                src={item.imageUrl}
                alt={item.title ?? "ギャラリー画像"}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <PublishStatusBadge isPublished={item.isPublished} />
                <p className="text-sm font-medium text-[#312F55] truncate">
                  {item.title || <span className="text-[#8D8AA0]">（タイトルなし）</span>}
                </p>
              </div>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {item.tags.map(({ tag }) => (
                    <span
                      key={tag.id}
                      className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#EFEDF5] text-[#5D5786]"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-[10px] text-[#8D8AA0]">
                作成 {formatDate(item.createdAt)} ／ 更新 {formatDate(item.updatedAt)}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <label className="flex items-center gap-1 text-[11px] text-[#6B6880]">
                  表示順
                  <input
                    type="number"
                    min={0}
                    value={orderDraft[item.id] ?? item.sortOrder}
                    onChange={(e) =>
                      setOrderDraft((prev) => ({
                        ...prev,
                        [item.id]: Math.max(0, Number(e.target.value) || 0),
                      }))
                    }
                    className="w-16 px-2 py-1 rounded-md border border-[#D5D2E3] text-xs text-[#2B2A40] focus:outline-none focus:border-[#7E78A3]"
                  />
                </label>
                <button
                  onClick={() => handleTogglePublish(item)}
                  disabled={busyId === item.id}
                  className="text-[11px] px-2.5 py-1 rounded-md border border-[#D5D2E3] text-[#5D5786] hover:bg-[#EFEDF5] transition-colors disabled:opacity-50"
                >
                  {item.isPublished ? "非公開にする" : "公開する"}
                </button>
                <Link
                  href={`/admin/gallery/${item.id}/edit`}
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md border border-[#D5D2E3] text-[#5D5786] hover:bg-[#EFEDF5] transition-colors"
                >
                  <Pencil size={11} />
                  編集
                </Link>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md border border-[#EBD4D9] text-[#B05C6E] hover:bg-[#FBF0F2] transition-colors"
                >
                  <Trash2 size={11} />
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="投稿を削除しますか？"
        description={
          deleteTarget && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-[#EDEBF4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={deleteTarget.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-[#312F55] font-medium">
                  {deleteTarget.title || "（タイトルなし）"}
                </p>
              </div>
              <p>この操作は取り消せません。画像とタグの関連付けも削除されます。</p>
            </div>
          )
        }
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
