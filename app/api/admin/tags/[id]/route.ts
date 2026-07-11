import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";
import { validateTagInput } from "@/lib/validation";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

// 管理用: タグ更新
export async function PATCH(request: NextRequest, { params }: Params) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const existing = await prisma.tag.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "タグが見つかりません" }, { status: 404 });
  }

  const result = validateTagInput(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: "入力内容を確認してください", fieldErrors: result.errors },
      { status: 400 }
    );
  }

  // 自分以外との重複チェック
  const duplicate = await prisma.tag.findFirst({
    where: {
      id: { not: params.id },
      OR: [{ name: result.data.name }, { slug: result.data.slug }],
    },
  });
  if (duplicate) {
    const field = duplicate.name === result.data.name ? "name" : "slug";
    return NextResponse.json(
      {
        error:
          field === "name"
            ? "同じ名前のタグがすでに存在します"
            : "同じslugのタグがすでに存在します",
        fieldErrors: { [field]: "すでに使用されています" },
      },
      { status: 409 }
    );
  }

  const tag = await prisma.tag.update({ where: { id: params.id }, data: result.data });
  return NextResponse.json(tag);
}

// 管理用: タグ削除(GalleryItemTagはCascadeで削除、GalleryItem本体は残る)
export async function DELETE(_request: NextRequest, { params }: Params) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const existing = await prisma.tag.findUnique({
    where: { id: params.id },
    include: { _count: { select: { items: true } } },
  });
  if (!existing) {
    return NextResponse.json({ error: "タグが見つかりません" }, { status: 404 });
  }

  await prisma.tag.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true, removedFromItems: existing._count.items });
}
