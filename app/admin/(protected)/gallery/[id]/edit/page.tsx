import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import GalleryItemForm from "@/components/admin/GalleryItemForm";
import type { AdminGalleryItem } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function AdminGalleryEditPage({
  params,
}: {
  params: { id: string };
}) {
  const [item, tags] = await Promise.all([
    prisma.galleryItem.findUnique({
      where: { id: params.id },
      include: { tags: { include: { tag: true } } },
    }),
    prisma.tag.findMany({ orderBy: [{ type: "asc" }, { name: "asc" }] }),
  ]);

  if (!item) notFound();

  const serialized: AdminGalleryItem = {
    id: item.id,
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl,
    isPublished: item.isPublished,
    sortOrder: item.sortOrder,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    tags: item.tags.map(({ tag }) => ({ tag })),
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-lg font-bold text-[#312F55] mb-1">投稿を編集</h1>
      <p className="text-[11px] text-[#8D8AA0] mb-6">
        作成 {item.createdAt.toLocaleString("ja-JP")} ／ 更新{" "}
        {item.updatedAt.toLocaleString("ja-JP")}
      </p>
      <GalleryItemForm tags={tags} item={serialized} />
    </div>
  );
}
