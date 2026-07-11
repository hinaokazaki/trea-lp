import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// 公開ギャラリー一覧: 公開中のみ・sortOrder昇順。公開サイトに必要な項目だけ返す。
export async function GET() {
  const items = await prisma.galleryItem.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { tags: { include: { tag: true } } },
  });

  return NextResponse.json(
    items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      sortOrder: item.sortOrder,
      tags: item.tags.map(({ tag }) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        type: tag.type,
      })),
    }))
  );
}
