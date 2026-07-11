import { notFound } from "next/navigation";
import GalleryDetail from "@/components/gallery/GalleryDetail";
import GalleryModal from "@/components/gallery/GalleryModal";
import { getGalleryItem } from "@/lib/gallery";

// 一覧からのソフトナビゲーション時のみ /gallery/[id] をインターセプトし、
// モーダルとして表示する（直アクセス・リロードはフルページ側が描画される）。
// `(.)` は @modal スロットを除いた同階層（app/gallery/ 直下）の [id] を指す。
export default async function GalleryItemModal({
  params,
}: {
  params: { id: string };
}) {
  const item = await getGalleryItem(params.id);
  if (!item) notFound();

  return (
    <GalleryModal>
      <GalleryDetail item={item} variant="modal" />
    </GalleryModal>
  );
}
