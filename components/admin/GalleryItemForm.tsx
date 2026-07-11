"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2 } from "lucide-react";
import type { AdminGalleryItem } from "@/types/admin";
import type { GalleryTag } from "@/types/gallery";
import { validateGalleryItemInput, GALLERY_LIMITS } from "@/lib/validation";
import { FieldError, LoadingButton, Message } from "./ui";

type Props = {
  tags: GalleryTag[];
  /** 編集時のみ渡す */
  item?: AdminGalleryItem;
};

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp";

export default function GalleryItemForm({ tags, item }: Props) {
  const router = useRouter();
  const isEdit = item !== undefined;

  const [imageUrl, setImageUrl] = useState(item?.imageUrl ?? "");
  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [isPublished, setIsPublished] = useState(item?.isPublished ?? true);
  const [sortOrder, setSortOrder] = useState(item?.sortOrder ?? 0);
  const [tagIds, setTagIds] = useState<string[]>(
    item?.tags.map(({ tag }) => tag.id) ?? []
  );

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const designTags = useMemo(() => tags.filter((t) => t.type === "DESIGN"), [tags]);
  const seasonTags = useMemo(() => tags.filter((t) => t.type === "SEASON"), [tags]);

  // 未保存の変更がある状態でのページ離脱を警告
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const markDirty = () => setDirty(true);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // 同じファイルの再選択を可能にする
    if (!file || uploading) return;

    setUploading(true);
    setMessage(null);
    setFieldErrors((prev) => ({ ...prev, imageUrl: "" }));
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMessage({
          type: "error",
          text: data?.error ?? "画像のアップロードに失敗しました",
        });
        return;
      }
      setImageUrl(data.url);
      markDirty();
    } catch {
      setMessage({ type: "error", text: "通信エラーが発生しました" });
    } finally {
      setUploading(false);
    }
  };

  const toggleTag = (tagId: string) => {
    setTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
    markDirty();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || uploading) return;
    setMessage(null);

    const input = {
      title: title || null,
      description: description || null,
      imageUrl,
      isPublished,
      sortOrder,
      tagIds,
    };

    // クライアント側バリデーション(API側と同じロジックを共有)
    const result = validateGalleryItemInput(input);
    if (!result.ok) {
      setFieldErrors(result.errors);
      setMessage({ type: "error", text: "入力内容を確認してください" });
      return;
    }
    setFieldErrors({});

    setSubmitting(true);
    try {
      const res = await fetch(
        isEdit ? `/api/admin/gallery/${item.id}` : "/api/admin/gallery",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.data),
        }
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setFieldErrors(data?.fieldErrors ?? {});
        setMessage({ type: "error", text: data?.error ?? "保存に失敗しました" });
        return;
      }
      setDirty(false);
      setMessage({ type: "success", text: isEdit ? "更新しました" : "投稿を作成しました" });
      router.push("/admin/gallery");
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "通信エラーが発生しました" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-[#D5D2E3] text-sm text-[#2B2A40] focus:outline-none focus:border-[#7E78A3] focus:ring-2 focus:ring-[#EFEDF5]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {message && <Message type={message.type}>{message.text}</Message>}

      {/* 画像 */}
      <div className="bg-white rounded-xl border border-[#E4E2EE] p-4 sm:p-5">
        <p className="text-xs font-bold text-[#4A4468] mb-3">
          画像 <span className="text-[#B05C6E]">*</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-[#EDEBF4] shrink-0">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="プレビュー"
                fill
                className="object-cover"
                sizes="160px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#9690AE]">
                <ImagePlus size={28} />
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-[rgba(255,255,255,.7)] flex items-center justify-center">
                <Loader2 size={22} className="animate-spin text-[#7E78A3]" />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_TYPES}
              onChange={handleFileChange}
              className="hidden"
            />
            <LoadingButton
              type="button"
              variant="outline"
              loading={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {imageUrl ? "画像を変更" : "画像を選択"}
            </LoadingButton>
            <p className="text-[11px] text-[#8D8AA0] leading-relaxed">
              JPEG・PNG・WebP / 8MBまで
              {isEdit && (
                <>
                  <br />
                  変更しない場合は現在の画像が維持されます
                </>
              )}
            </p>
            <FieldError message={fieldErrors.imageUrl} />
          </div>
        </div>
      </div>

      {/* テキスト情報 */}
      <div className="bg-white rounded-xl border border-[#E4E2EE] p-4 sm:p-5 space-y-4">
        <div>
          <label htmlFor="title" className="block text-xs font-bold text-[#4A4468] mb-1.5">
            タイトル（任意）
          </label>
          <input
            id="title"
            type="text"
            value={title}
            maxLength={GALLERY_LIMITS.titleMax}
            onChange={(e) => {
              setTitle(e.target.value);
              markDirty();
            }}
            className={inputClass}
          />
          <FieldError message={fieldErrors.title} />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-xs font-bold text-[#4A4468] mb-1.5"
          >
            説明文（任意）
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            maxLength={GALLERY_LIMITS.descriptionMax}
            onChange={(e) => {
              setDescription(e.target.value);
              markDirty();
            }}
            className={inputClass}
          />
          <FieldError message={fieldErrors.description} />
        </div>
      </div>

      {/* タグ */}
      <div className="bg-white rounded-xl border border-[#E4E2EE] p-4 sm:p-5 space-y-4">
        {(
          [
            ["デザインタグ", designTags],
            ["シーズンタグ", seasonTags],
          ] as const
        ).map(([label, groupTags]) => (
          <div key={label}>
            <p className="text-xs font-bold text-[#4A4468] mb-2">{label}</p>
            {groupTags.length === 0 ? (
              <p className="text-xs text-[#8D8AA0]">
                タグがありません。タグ管理から追加してください。
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {groupTags.map((tag) => {
                  const selected = tagIds.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      aria-pressed={selected}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                        selected
                          ? "bg-[#7E78A3] border border-[#7E78A3] text-white font-medium"
                          : "border border-[#D5D2E3] text-[#6B6880] hover:border-[#9690AE]"
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        <FieldError message={fieldErrors.tagIds} />
      </div>

      {/* 公開設定 */}
      <div className="bg-white rounded-xl border border-[#E4E2EE] p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#4A4468]">公開する</p>
            <p className="text-[11px] text-[#8D8AA0] mt-0.5">
              オフにすると公開サイトに表示されません
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isPublished}
            onClick={() => {
              setIsPublished((v) => !v);
              markDirty();
            }}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              isPublished ? "bg-[#7E78A3]" : "bg-[#D5D2E3]"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                isPublished ? "translate-x-[22px]" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
        <div>
          <label
            htmlFor="sortOrder"
            className="block text-xs font-bold text-[#4A4468] mb-1.5"
          >
            表示順（小さいほど先に表示）
          </label>
          <input
            id="sortOrder"
            type="number"
            min={0}
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(Math.max(0, Math.floor(Number(e.target.value) || 0)));
              markDirty();
            }}
            className={`${inputClass} !w-28`}
          />
          <FieldError message={fieldErrors.sortOrder} />
        </div>
      </div>

      <div className="flex gap-3">
        <LoadingButton type="submit" loading={submitting} disabled={uploading}>
          {isEdit ? "更新する" : "作成する"}
        </LoadingButton>
        <LoadingButton
          type="button"
          variant="outline"
          disabled={submitting}
          onClick={() => router.push("/admin/gallery")}
        >
          キャンセル
        </LoadingButton>
      </div>
    </form>
  );
}
