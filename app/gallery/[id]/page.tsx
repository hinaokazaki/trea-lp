import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryDetail from "@/components/gallery/GalleryDetail";
import {
  getGalleryItem,
  getGalleryItemDisplayTitle,
  getPublishedGalleryItems,
  SITE_URL,
} from "@/lib/gallery";

// ISR: 作品の追加・更新を1時間以内に反映する
export const revalidate = 3600;

// 公開中の作品をビルド時にSSGする（新規IDは初回アクセス時に生成）
export async function generateStaticParams() {
  const items = await getPublishedGalleryItems();
  return items.map((item) => ({ id: item.id }));
}

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getGalleryItem(params.id);
  if (!item) return {};

  const title = getGalleryItemDisplayTitle(item);

  return {
    title: `${title} | ネイルデザインギャラリー | TRE'A`,
    description: item.description ?? undefined,
    // 運用ルール: 説明文（description）が空の作品はインデックスさせない。
    // タグ名から定型文は組み立てず noindex とし、説明文が入力されたら自動的にインデックス対象に戻る。
    robots: item.description ? undefined : { index: false },
    alternates: { canonical: `/gallery/${item.id}` },
    openGraph: {
      type: "article",
      title: `${title} | ネイルデザインギャラリー | TRE'A`,
      description: item.description ?? undefined,
      images: [item.imageUrl],
    },
  };
}

export default async function GalleryItemPage({ params }: Props) {
  const item = await getGalleryItem(params.id);
  if (!item) notFound();

  const title = getGalleryItemDisplayTitle(item);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: new URL(item.imageUrl, SITE_URL).toString(),
    name: title,
    ...(item.description ? { description: item.description } : {}),
    creator: { "@type": "Organization", name: "TRE'A" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page header */}
      <div className="w-full border-b border-[#E4E2EE] bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="text-[11px] font-medium text-[#5D5786] tracking-[.12em]">
            ✦ GALLERY
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 py-12">
        <GalleryDetail item={item} variant="page" />
      </div>
    </>
  );
}
