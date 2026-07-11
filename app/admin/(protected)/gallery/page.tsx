import Link from "next/link";
import { Plus } from "lucide-react";
import prisma from "@/lib/prisma";
import GalleryAdminList from "@/components/admin/GalleryAdminList";
import type { AdminGalleryItem } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { tags: { include: { tag: true } } },
  });

  const serialized: AdminGalleryItem[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl,
    isPublished: item.isPublished,
    sortOrder: item.sortOrder,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    tags: item.tags.map(({ tag }) => ({ tag })),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-[#312F55]">ギャラリー管理</h1>
        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center gap-1.5 bg-[#7E78A3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#6A6390] transition-colors"
        >
          <Plus size={15} />
          新規投稿
        </Link>
      </div>
      <GalleryAdminList initialItems={serialized} />
    </div>
  );
}
