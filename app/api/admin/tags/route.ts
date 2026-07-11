import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";
import { validateTagInput } from "@/lib/validation";

export const dynamic = "force-dynamic";

// 管理用: タグ一覧(?type=DESIGN|SEASON で絞り込み、使用数付き)
export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const typeParam = request.nextUrl.searchParams.get("type");
  const where =
    typeParam === "DESIGN" || typeParam === "SEASON"
      ? { type: typeParam as "DESIGN" | "SEASON" }
      : {};

  const tags = await prisma.tag.findMany({
    where,
    orderBy: [{ type: "asc" }, { name: "asc" }],
    include: { _count: { select: { items: true } } },
  });
  return NextResponse.json(tags);
}

// 管理用: タグ作成
export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const result = validateTagInput(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: "入力内容を確認してください", fieldErrors: result.errors },
      { status: 400 }
    );
  }

  const duplicate = await prisma.tag.findFirst({
    where: { OR: [{ name: result.data.name }, { slug: result.data.slug }] },
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

  const tag = await prisma.tag.create({ data: result.data });
  return NextResponse.json(tag, { status: 201 });
}
