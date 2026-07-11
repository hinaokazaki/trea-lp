import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";
import { validateGalleryItemInput } from "@/lib/validation";
import { deleteGalleryImage } from "@/lib/uploads";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

// 管理用: 投稿詳細取得
export async function GET(_request: NextRequest, { params }: Params) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const item = await prisma.galleryItem.findUnique({
    where: { id: params.id },
    include: { tags: { include: { tag: true } } },
  });
  if (!item) {
    return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });
  }
  return NextResponse.json(item);
}

// 管理用: 投稿更新(タグ関連はトランザクションで貼り替え)
export async function PATCH(request: NextRequest, { params }: Params) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const existing = await prisma.galleryItem.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });
  }

  const result = validateGalleryItemInput(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: "入力内容を確認してください", fieldErrors: result.errors },
      { status: 400 }
    );
  }
  const { tagIds, ...data } = result.data;

  if (tagIds.length > 0) {
    const found = await prisma.tag.count({ where: { id: { in: tagIds } } });
    if (found !== tagIds.length) {
      return NextResponse.json(
        { error: "存在しないタグが指定されています" },
        { status: 400 }
      );
    }
  }

  const item = await prisma.$transaction(async (tx) => {
    await tx.galleryItemTag.deleteMany({ where: { galleryItemId: params.id } });
    return tx.galleryItem.update({
      where: { id: params.id },
      data: {
        ...data,
        tags: {
          create: tagIds.map((tagId) => ({ tag: { connect: { id: tagId } } })),
        },
      },
      include: { tags: { include: { tag: true } } },
    });
  });

  // 画像が差し替えられた場合、DB更新成功後に古い画像を削除
  if (existing.imageUrl !== item.imageUrl) {
    await deleteGalleryImage(existing.imageUrl);
  }

  return NextResponse.json(item);
}

// 管理用: 投稿削除(GalleryItemTagはonDelete: Cascadeで削除される)
export async function DELETE(_request: NextRequest, { params }: Params) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const existing = await prisma.galleryItem.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });
  }

  await prisma.galleryItem.delete({ where: { id: params.id } });
  // DB削除成功後にストレージの画像を削除
  await deleteGalleryImage(existing.imageUrl);

  return NextResponse.json({ ok: true });
}
