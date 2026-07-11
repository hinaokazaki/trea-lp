// クライアント・API共通のバリデーション。
// Zod未導入のため、依存を増やさない軽量な自前実装を使用する。

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: Record<string, string> };

export type GalleryItemInput = {
  title: string | null;
  description: string | null;
  imageUrl: string;
  isPublished: boolean;
  sortOrder: number;
  tagIds: string[];
};

export type TagInput = {
  name: string;
  slug: string;
  type: "DESIGN" | "SEASON";
};

export const GALLERY_LIMITS = {
  titleMax: 100,
  descriptionMax: 1000,
} as const;

export const TAG_LIMITS = {
  nameMax: 50,
  slugMax: 50,
} as const;

export const SLUG_PATTERN = /^[a-z0-9-]+$/;

/** 空文字を null に正規化しつつ trim する */
function normalizeOptionalText(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function isValidImageUrl(value: string): boolean {
  // アップロード済みのサイト内パス("/uploads/..." や "/images/...")と絶対URLの両方を許可
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateGalleryItemInput(
  raw: unknown
): ValidationResult<GalleryItemInput> {
  const errors: Record<string, string> = {};
  const input = (raw ?? {}) as Record<string, unknown>;

  const title = normalizeOptionalText(input.title);
  if (title === undefined && input.title !== undefined && input.title !== null) {
    errors.title = "タイトルの形式が不正です";
  } else if (title && title.length > GALLERY_LIMITS.titleMax) {
    errors.title = `タイトルは${GALLERY_LIMITS.titleMax}文字以内で入力してください`;
  }

  const description = normalizeOptionalText(input.description);
  if (
    description === undefined &&
    input.description !== undefined &&
    input.description !== null
  ) {
    errors.description = "説明文の形式が不正です";
  } else if (description && description.length > GALLERY_LIMITS.descriptionMax) {
    errors.description = `説明文は${GALLERY_LIMITS.descriptionMax}文字以内で入力してください`;
  }

  const imageUrl = typeof input.imageUrl === "string" ? input.imageUrl.trim() : "";
  if (!imageUrl) {
    errors.imageUrl = "画像をアップロードしてください";
  } else if (!isValidImageUrl(imageUrl)) {
    errors.imageUrl = "画像URLの形式が不正です";
  }

  const isPublished = input.isPublished;
  if (typeof isPublished !== "boolean") {
    errors.isPublished = "公開状態の値が不正です";
  }

  const sortOrder = input.sortOrder;
  if (
    typeof sortOrder !== "number" ||
    !Number.isInteger(sortOrder) ||
    sortOrder < 0 ||
    sortOrder > 1_000_000
  ) {
    errors.sortOrder = "表示順は0以上の整数で入力してください";
  }

  const rawTagIds = input.tagIds ?? [];
  let tagIds: string[] = [];
  if (
    !Array.isArray(rawTagIds) ||
    rawTagIds.some((id) => typeof id !== "string" || !id)
  ) {
    errors.tagIds = "タグの指定が不正です";
  } else {
    tagIds = Array.from(new Set(rawTagIds as string[])); // 重複除去
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      title: title ?? null,
      description: description ?? null,
      imageUrl,
      isPublished: isPublished as boolean,
      sortOrder: sortOrder as number,
      tagIds,
    },
  };
}

export function validateTagInput(raw: unknown): ValidationResult<TagInput> {
  const errors: Record<string, string> = {};
  const input = (raw ?? {}) as Record<string, unknown>;

  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name) {
    errors.name = "タグ名を入力してください";
  } else if (name.length > TAG_LIMITS.nameMax) {
    errors.name = `タグ名は${TAG_LIMITS.nameMax}文字以内で入力してください`;
  }

  const slug = typeof input.slug === "string" ? input.slug.trim() : "";
  if (!slug) {
    errors.slug = "slugを入力してください";
  } else if (slug.length > TAG_LIMITS.slugMax) {
    errors.slug = `slugは${TAG_LIMITS.slugMax}文字以内で入力してください`;
  } else if (!SLUG_PATTERN.test(slug)) {
    errors.slug = "slugは半角英小文字・数字・ハイフンのみ使用できます";
  }

  const type = input.type;
  if (type !== "DESIGN" && type !== "SEASON") {
    errors.type = "タグ種別が不正です";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, data: { name, slug, type: type as "DESIGN" | "SEASON" } };
}

export type OrderInput = { id: string; sortOrder: number }[];

export function validateOrderInput(raw: unknown): ValidationResult<OrderInput> {
  const items = (raw as Record<string, unknown> | null)?.items;
  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    items.some(
      (item) =>
        typeof item !== "object" ||
        item === null ||
        typeof (item as Record<string, unknown>).id !== "string" ||
        !(item as Record<string, unknown>).id ||
        typeof (item as Record<string, unknown>).sortOrder !== "number" ||
        !Number.isInteger((item as Record<string, unknown>).sortOrder) ||
        ((item as Record<string, unknown>).sortOrder as number) < 0
    )
  ) {
    return { ok: false, errors: { items: "表示順データが不正です" } };
  }
  return { ok: true, data: items as OrderInput };
}
