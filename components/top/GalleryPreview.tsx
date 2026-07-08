import Image from "next/image";
import Link from "next/link";

const previewImages = [
  { src: "/images/gallery/2026-07-001.webp", alt: "ギャラリー1（仮画像）" },
  { src: "/images/gallery/2026-07-005.webp", alt: "ギャラリー2（仮画像）" },
  { src: "/images/gallery/2026-07-009.webp", alt: "ギャラリー3（仮画像）" },
  { src: "/images/gallery/2026-07-012.webp", alt: "ギャラリー4（仮画像）" },
];

export default function GalleryPreview() {
  return (
    <section className="w-full border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-baseline mb-4">
          <p className="text-base font-medium text-stone-800">
            デザインギャラリー
          </p>
          <Link
            href="/gallery"
            className="text-xs text-[#993556] hover:underline"
          >
            すべて見る →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {previewImages.map((img) => (
            <div
              key={img.src}
              className="relative aspect-square rounded-lg overflow-hidden bg-stone-100"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {["ワンカラー", "シンプルアート", "ニュアンス", "フレンチ", "春・夏", "秋・冬"].map(
            (tag) => (
              <span
                key={tag}
                className="text-[11px] px-3 py-1 rounded-full border border-stone-200 text-stone-500"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
