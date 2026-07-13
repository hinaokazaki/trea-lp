import Image from "next/image";
import Link from "next/link";
import {
  getLatestGalleryItems,
  getGalleryItemDisplayTitle,
} from "@/lib/gallery";

export default async function GalleryPreview() {
  // アドミンでアップロードされた公開中の作品のうち、最新の4件を表示する
  const items = await getLatestGalleryItems(4);

  if (items.length === 0) return null;

  return (
    <section className="w-full border-b border-[#E4E2EE] bg-[#F6F5F9]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-baseline mb-4">
          <p className="font-serif text-base font-medium text-[#312F55]">
            デザインギャラリー
          </p>
          <Link
            href="/gallery"
            className="text-xs text-[#5D5786] hover:underline"
          >
            すべて見る →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-lg overflow-hidden bg-[#EDEBF4]"
            >
              <Image
                src={item.imageUrl}
                alt={`${getGalleryItemDisplayTitle(item)}の作品写真`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {[
            "ワンカラー",
            "シンプルアート",
            "ニュアンス",
            "フレンチ",
            "春・夏",
            "秋・冬",
          ].map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-3 py-1 rounded-full border border-[#E4E2EE] text-[#6B6880]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
