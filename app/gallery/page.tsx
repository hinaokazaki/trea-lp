import { Suspense } from "react";
import GalleryClient from "@/components/gallery/GalleryClient";
import CtaBanner from "@/components/common/CtaBanner";
import { getPublishedGalleryItems } from "@/lib/gallery";

// ISR: 作品の追加・更新を反映する(管理APIのrevalidatePathで即時反映もされる)
export const revalidate = 3600;

export default async function GalleryPage() {
  const items = await getPublishedGalleryItems();

  return (
    <>
      {/* Page header */}
      <div className="w-full border-b border-[#E4E2EE] bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-[11px] font-medium text-[#5D5786] tracking-[.12em] mb-4">
            ✦ GALLERY
          </p>
          <h1 className="font-serif text-2xl font-medium text-[#312F55] mb-4">
            ギャラリー
          </h1>
          <p className="text-sm text-[#6B6880] leading-[1.85]">
            短い爪・小さい爪でも可愛く仕上げた実例をご紹介します。
            <br />
            気になるデザインはご予約時の参考画像としてお送りください。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        {/* GalleryClient は useSearchParams を使うため Suspense 境界が必要 */}
        <Suspense>
          <GalleryClient items={items} />
        </Suspense>
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
