import prisma from "@/lib/prisma";
import TagManager from "@/components/admin/TagManager";
import type { AdminTag } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function AdminTagsPage() {
  const tags = await prisma.tag.findMany({
    orderBy: [{ type: "asc" }, { name: "asc" }],
    include: { _count: { select: { items: true } } },
  });

  const serialized: AdminTag[] = tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    type: tag.type,
    usageCount: tag._count.items,
  }));

  return (
    <div className="max-w-2xl">
      <h1 className="text-lg font-bold text-[#312F55] mb-6">タグ管理</h1>
      <TagManager initialTags={serialized} />
    </div>
  );
}
