import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";
import { getGalleryItemDisplayTitle } from "@/lib/gallery";
import type { GalleryItemWithTags } from "@/types/gallery";

type Props = {
  item: GalleryItemWithTags;
  variant?: "page" | "modal";
};

export default function GalleryDetail({ item, variant = "page" }: Props) {
  const title = getGalleryItemDisplayTitle(item);
  const isModal = variant === "modal";

  return (
    <div
      className={
        isModal
          ? "flex flex-col"
          : "grid md:grid-cols-2 gap-8 md:gap-12 items-start"
      }
    >
      {/* 作品画像 */}
      <div
        className={`relative aspect-4/5 overflow-hidden bg-[#EDEBF4] ${
          isModal ? "w-full" : "rounded-xl"
        }`}
      >
        <Image
          src={item.imageUrl}
          alt={`${title}のネイルデザイン | TRE'A`}
          fill
          className="object-cover"
          sizes={
            isModal
              ? "(max-width: 640px) 100vw, 768px"
              : "(max-width: 768px) 100vw, 50vw"
          }
          priority
        />
      </div>

      {/* 作品情報 */}
      <div className={isModal ? "px-6 py-6 sm:px-8" : ""}>
        <p className="text-[11px] font-medium text-[#5D5786] tracking-[.12em] mb-3">
          ✦ NAIL DESIGN
        </p>
        <h1 className="font-serif text-xl md:text-2xl font-medium text-[#312F55] mb-4">
          {title}
        </h1>

        {item.description && (
          <p className="text-sm text-[#6B6880] leading-[1.85] mb-6 whitespace-pre-wrap">
            {item.description}
          </p>
        )}

        {/* タグ（一覧のフィルタへの内部リンク） */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map(({ tag }) => (
              <Link
                key={tag.id}
                href={`/gallery?tag=${tag.slug}`}
                className="px-4 py-1.5 rounded-full text-xs border border-[#E4E2EE] text-[#6B6880] hover:border-[#9690AE] hover:text-[#5D5786] transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button href="/reservation" variant="primary">
            このデザインで予約する
          </Button>
          <Button href="/gallery" variant="ghost">
            ギャラリー一覧へ戻る
          </Button>
        </div>
      </div>
    </div>
  );
}
