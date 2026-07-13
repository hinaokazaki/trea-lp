import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";
import { validateGalleryItemInput } from "@/lib/validation";

export const dynamic = "force-dynamic";

// 管理用: 全投稿一覧(非公開含む)
export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const items = await prisma.galleryItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { tags: { include: { tag: true } } },
  });
  return NextResponse.json(items);
}

// 管理用: 新規投稿作成
export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const result = validateGalleryItemInput(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: "入力内容を確認してください", fieldErrors: result.errors },
      { status: 400 }
    );
  }
  const { tagIds, ...data } = result.data;

  // 送信されたtagIdが実在するか確認
  if (tagIds.length > 0) {
    const found = await prisma.tag.count({ where: { id: { in: tagIds } } });
    if (found !== tagIds.length) {
      return NextResponse.json(
        { error: "存在しないタグが指定されています" },
        { status: 400 }
      );
    }
  }

  const item = await prisma.galleryItem.create({
    data: {
      ...data,
      tags: {
        create: tagIds.map((tagId) => ({ tag: { connect: { id: tagId } } })),
      },
    },
    include: { tags: { include: { tag: true } } },
  });

  // 公開ページに新着を即時反映(トップの最新4件・ギャラリー一覧)
  revalidatePath("/");
  revalidatePath("/gallery");

  return NextResponse.json(item, { status: 201 });
}
