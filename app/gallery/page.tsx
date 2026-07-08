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

        {/* Instagram */}
        <section className="px-6 py-8 bg-[#F5F1FA] border-y border-[#EADFF3] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-sm font-medium text-[#312F55] mb-1.5">
              最新のデザインはInstagramで随時更新中
            </p>
            <p className="text-xs text-[#6B6880] leading-[1.75]">
              営業日のお知らせもInstagramのハイライトでご確認いただけます。
              <br />
              フォローしていただけると最新情報をお届けします。
            </p>
          </div>
          <a
            href="https://www.instagram.com/trea_nails_/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border-[1.5px] border-[#833AB4] text-[#833AB4] bg-[#faf0ff] hover:bg-[#eed9ff] transition-colors"
          >
            <Camera size={16} />
            Instagram: @trea_nails_
          </a>
        </section>
      </div>

      <CtaBanner
        title="気になるデザインがあればご予約時にお知らせください"
        description="画像をそのまま送っていただくと、イメージが伝わりやすいです"
        primaryLabel="ご予約はこちら"
        primaryHref="/reservation"
      />
    </>
  );
}
