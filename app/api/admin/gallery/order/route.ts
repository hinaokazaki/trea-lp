import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";
import { validateOrderInput } from "@/lib/validation";

export const dynamic = "force-dynamic";

// 管理用: 表示順の一括更新
export async function PATCH(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const result = validateOrderInput(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: "入力内容を確認してください", fieldErrors: result.errors },
      { status: 400 }
    );
  }

  const ids = result.data.map((item) => item.id);
  const found = await prisma.galleryItem.count({ where: { id: { in: ids } } });
  if (found !== ids.length) {
    return NextResponse.json(
      { error: "存在しない投稿が含まれています" },
      { status: 400 }
    );
  }

  await prisma.$transaction(
    result.data.map(({ id, sortOrder }) =>
      prisma.galleryItem.update({ where: { id }, data: { sortOrder } })
    )
  );

  // ギャラリー一覧の表示順を即時反映(トップの最新4件はcreatedAt順のため影響なしだが念のため)
  revalidatePath("/");
  revalidatePath("/gallery");

  return NextResponse.json({ ok: true });
}
