import { Camera } from "lucide-react";
import GalleryClient from "@/components/gallery/GalleryClient";
import CtaBanner from "@/components/common/CtaBanner";
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

async function getGalleryItems(): Promise<GalleryItemWithTags[]> {
  if (!process.env.DATABASE_URL) return FALLBACK_ITEMS;
  try {
    const prisma = (await import("@/lib/prisma")).default;
    return await prisma.galleryItem.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      include: { tags: { include: { tag: true } } },
    });
  } catch {
    return FALLBACK_ITEMS;
  }
}

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      {/* Page header */}
      <div className="w-full border-b border-[#E4E2EE] bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-[11px] font-medium text-[#5D5786] tracking-[.12em] mb-4">
            ✦ GALLERY
          </p>
          <h1 className="font-serif text-2xl font-medium text-[#312F55] mb-4">
            デザインギャラリー
          </h1>
          <p className="text-sm text-[#6B6880] leading-[1.85]">
            短い爪・小さい爪でも可愛く仕上げた実例をご紹介します。
            <br />
            気になるデザインはご予約時の参考画像としてお送りください。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <GalleryClient items={items} />
      </div>

      <CtaBanner
        variant="feature"
        title="最新のデザインはInstagramで随時更新中"
        description="営業日のお知らせもInstagramのハイライトでご確認いただけます。"
        primaryLabel="Instagram: @trea_nails_"
        primaryHref="https://www.instagram.com/trea_nails_/"
      />
    </>
  );
}
