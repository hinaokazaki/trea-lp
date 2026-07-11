import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// 公開ギャラリー詳細: 非公開投稿は404扱いで返さない。
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const item = await prisma.galleryItem.findUnique({
    where: { id: params.id },
    include: { tags: { include: { tag: true } } },
  });

  if (!item || !item.isPublished) {
    return NextResponse.json({ error: "見つかりません" }, { status: 404 });
  }

  return NextResponse.json({
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
  });
}
