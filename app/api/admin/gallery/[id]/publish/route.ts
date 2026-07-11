import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

// 管理用: 公開状態の切り替え
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const isPublished = (body as Record<string, unknown> | null)?.isPublished;
  if (typeof isPublished !== "boolean") {
    return NextResponse.json({ error: "公開状態の値が不正です" }, { status: 400 });
  }

  const existing = await prisma.galleryItem.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });
  }

  const item = await prisma.galleryItem.update({
    where: { id: params.id },
    data: { isPublished },
  });
  return NextResponse.json(item);
}
