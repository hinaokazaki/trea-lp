import type { GalleryItemWithTags } from "@/types/gallery";

// Static fallback while DB is not configured
const FALLBACK_ITEMS: GalleryItemWithTags[] = [
  [1, "ワンカラー", "one-color", "春・夏", "spring-summer"],
  [2, "ワンカラー", "one-color", "秋・冬", "autumn-winter"],
  [3, "ワンカラー", "one-color", "春・夏", "spring-summer"],
  [4, "ワンカラー", "one-color", "秋・冬", "autumn-winter"],
  [5, "シンプルアート", "simple-art", "春・夏", "spring-summer"],
  [6, "シンプルアート", "simple-art", "秋・冬", "autumn-winter"],
  [7, "シンプルアート", "simple-art", "春・夏", "spring-summer"],
  [8, "ニュアンス", "nuance", "秋・冬", "autumn-winter"],
  [9, "ニュアンス", "nuance", "春・夏", "spring-summer"],
  [10, "ニュアンス", "nuance", "秋・冬", "autumn-winter"],
  [11, "ニュアンス", "nuance", "春・夏", "spring-summer"],
  [12, "フレンチ", "french", "春・夏", "spring-summer"],
  [13, "フレンチ", "french", "秋・冬", "autumn-winter"],
  [14, "フット", "foot", "春・夏", "spring-summer"],
  [15, "フット", "foot", "秋・冬", "autumn-winter"],
].map(([idx, designName, designSlug, seasonName, seasonSlug]) => ({
  id: String(idx),
  title: null,
  description: null,
  imageUrl: `/images/gallery/2026-07-${String(idx).padStart(3, "0")}.webp`,
  isPublished: true,
  sortOrder: Number(idx),
  tags: [
    {
      tag: {
        id: `d-${designSlug}`,
        name: String(designName),
        slug: String(designSlug),
        type: "DESIGN" as const,
      },
    },
    {
      tag: {
        id: `s-${seasonSlug}`,
        name: String(seasonName),
        slug: String(seasonSlug),
        type: "SEASON" as const,
      },
    },
  ],
}));

export async function getPublishedGalleryItems(): Promise<
  GalleryItemWithTags[]
> {
  if (!process.env.DATABASE_URL) return FALLBACK_ITEMS;
  try {
    const prisma = (await import("@/lib/prisma")).default;
    return await prisma.galleryItem.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: { tags: { include: { tag: true } } },
    });
  } catch {
    return FALLBACK_ITEMS;
  }
}

/** 公開中の作品を1件取得する。非公開・存在しないIDは null */
export async function getGalleryItem(
  id: string
): Promise<GalleryItemWithTags | null> {
  if (!process.env.DATABASE_URL) {
    return FALLBACK_ITEMS.find((item) => item.id === id) ?? null;
  }
  try {
    const prisma = (await import("@/lib/prisma")).default;
    return await prisma.galleryItem.findFirst({
      where: { id, isPublished: true },
      include: { tags: { include: { tag: true } } },
    });
  } catch {
    return FALLBACK_ITEMS.find((item) => item.id === id) ?? null;
  }
}

/** タイトル未設定の作品は代表タグ名から表示タイトルを自動生成する（例: ニュアンスネイル） */
export function getGalleryItemDisplayTitle(item: GalleryItemWithTags): string {
  if (item.title) return item.title;
  const designTag = item.tags.find((t) => t.tag.type === "DESIGN");
  return designTag ? `${designTag.tag.name}ネイル` : "ネイルデザイン";
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
