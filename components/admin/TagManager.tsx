"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Tags, Trash2, X } from "lucide-react";
import type { AdminTag } from "@/types/admin";
import type { TagType } from "@/types/gallery";
import { validateTagInput } from "@/lib/validation";
import { EmptyState, FieldError, LoadingButton, Message } from "./ui";
import ConfirmDialog from "./ConfirmDialog";

type Props = { initialTags: AdminTag[] };

type TagFormState = { name: string; slug: string; type: TagType };

const EMPTY_FORM: TagFormState = { name: "", slug: "", type: "DESIGN" };

const TYPE_LABELS: Record<TagType, string> = {
  DESIGN: "デザイン",
  SEASON: "シーズン",
};

export default function TagManager({ initialTags }: Props) {
  const router = useRouter();
  const [tags, setTags] = useState(initialTags);
  const [form, setForm] = useState<TagFormState>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminTag | null>(null);
  const [deleting, setDeleting] = useState(false);

  const isEditing = editingId !== null;

  const startEdit = (tag: AdminTag) => {
    setEditingId(tag.id);
    setForm({ name: tag.name, slug: tag.slug, type: tag.type });
    setFieldErrors({});
    setMessage(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFieldErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setMessage(null);

    // クライアント側バリデーション(API側と共有)
    const result = validateTagInput(form);
    if (!result.ok) {
      setFieldErrors(result.errors);
      return;
    }

    // クライアント側でも重複を事前チェック
    const duplicate = tags.find(
      (t) =>
        t.id !== editingId &&
        (t.name === result.data.name || t.slug === result.data.slug)
    );
    if (duplicate) {
      setFieldErrors(
        duplicate.name === result.data.name
          ? { name: "すでに使用されています" }
          : { slug: "すでに使用されています" }
      );
      return;
    }
    setFieldErrors({});

    setSubmitting(true);
    try {
      const res = await fetch(
        isEditing ? `/api/admin/tags/${editingId}` : "/api/admin/tags",
        {
          method: isEditing ? "PATCH" : "POST",
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
      if (isEditing) {
        setTags((prev) =>
          prev.map((t) => (t.id === editingId ? { ...t, ...data } : t))
        );
        setMessage({ type: "success", text: "タグを更新しました" });
      } else {
        setTags((prev) => [...prev, { ...data, usageCount: 0 }]);
        setMessage({ type: "success", text: "タグを作成しました" });
      }
      cancelEdit();
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "通信エラーが発生しました" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/tags/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setMessage({ type: "error", text: data?.error ?? "削除に失敗しました" });
        return;
      }
      setTags((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      if (editingId === deleteTarget.id) cancelEdit();
      setMessage({ type: "success", text: "タグを削除しました" });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "通信エラーが発生しました" });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-[#D5D2E3] text-sm text-[#2B2A40] focus:outline-none focus:border-[#7E78A3] focus:ring-2 focus:ring-[#EFEDF5]";

  return (
    <div className="space-y-6">
      {message && <Message type={message.type}>{message.text}</Message>}

      {/* 作成・編集フォーム */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-[#E4E2EE] p-4 sm:p-5 space-y-4"
        noValidate
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-[#4A4468]">
            {isEditing ? "タグを編集" : "タグを追加"}
          </p>
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center gap-1 text-[11px] text-[#8D8AA0] hover:text-[#5D5786]"
            >
              <X size={12} />
              編集をやめる
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tag-name" className="block text-xs text-[#6B6880] mb-1.5">
              タグ名（例: ワンカラー）
            </label>
            <input
              id="tag-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputClass}
            />
            <FieldError message={fieldErrors.name} />
          </div>
          <div>
            <label htmlFor="tag-slug" className="block text-xs text-[#6B6880] mb-1.5">
              slug（例: one-color）
            </label>
            <input
              id="tag-slug"
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className={inputClass}
            />
            <FieldError message={fieldErrors.slug} />
          </div>
        </div>

        <div>
          <p className="text-xs text-[#6B6880] mb-1.5">種別</p>
          <div className="flex gap-2">
            {(Object.keys(TYPE_LABELS) as TagType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setForm((f) => ({ ...f, type }))}
                aria-pressed={form.type === type}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                  form.type === type
                    ? "bg-[#7E78A3] border border-[#7E78A3] text-white font-medium"
                    : "border border-[#D5D2E3] text-[#6B6880] hover:border-[#9690AE]"
                }`}
              >
                {TYPE_LABELS[type]}
              </button>
            ))}
          </div>
          <FieldError message={fieldErrors.type} />
        </div>

        <LoadingButton type="submit" loading={submitting}>
          <Plus size={14} />
          {isEditing ? "更新する" : "追加する"}
        </LoadingButton>
      </form>

      {/* タグ一覧(種別ごと) */}
      {tags.length === 0 ? (
        <EmptyState
          icon={<Tags size={32} />}
          title="タグがありません"
          description="上のフォームから最初のタグを追加してください"
        />
      ) : (
        (Object.keys(TYPE_LABELS) as TagType[]).map((type) => {
          const group = tags.filter((t) => t.type === type);
          return (
            <div key={type}>
              <p className="text-xs font-bold text-[#4A4468] mb-2">
                {TYPE_LABELS[type]}タグ
              </p>
              {group.length === 0 ? (
                <p className="text-xs text-[#8D8AA0] bg-white rounded-xl border border-[#E4E2EE] px-4 py-4">
                  まだありません
                </p>
              ) : (
                <div className="bg-white rounded-xl border border-[#E4E2EE] divide-y divide-[#F0EFF5]">
                  {group.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center gap-3 px-4 py-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#312F55] font-medium truncate">
                          {tag.name}
                        </p>
                        <p className="text-[11px] text-[#8D8AA0] truncate">
                          {tag.slug} ・ {tag.usageCount}件の投稿で使用中
                        </p>
                      </div>
                      <button
                        onClick={() => startEdit(tag)}
                        className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md border border-[#D5D2E3] text-[#5D5786] hover:bg-[#EFEDF5] transition-colors"
                      >
                        <Pencil size={11} />
                        編集
                      </button>
                      <button
                        onClick={() => setDeleteTarget(tag)}
                        className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md border border-[#EBD4D9] text-[#B05C6E] hover:bg-[#FBF0F2] transition-colors"
                      >
                        <Trash2 size={11} />
                        削除
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title={`「${deleteTarget?.name ?? ""}」を削除しますか？`}
        description={
          deleteTarget && deleteTarget.usageCount > 0 ? (
            <p>
              このタグは
              <span className="font-bold text-[#B05C6E]">
                {deleteTarget.usageCount}件
              </span>
              の投稿で使用中です。削除するとそれらの投稿からタグが外れます（投稿自体は削除されません）。
            </p>
          ) : (
            <p>この操作は取り消せません。</p>
          )
        }
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
