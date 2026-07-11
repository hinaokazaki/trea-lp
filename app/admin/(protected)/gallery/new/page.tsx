import prisma from "@/lib/prisma";
import GalleryItemForm from "@/components/admin/GalleryItemForm";

export const dynamic = "force-dynamic";

export default async function AdminGalleryNewPage() {
  const tags = await prisma.tag.findMany({
    orderBy: [{ type: "asc" }, { name: "asc" }],
  });

  return (
    <div className="max-w-2xl">
      <h1 className="text-lg font-bold text-[#312F55] mb-6">新規投稿</h1>
      <GalleryItemForm tags={tags} />
    </div>
  );
}
