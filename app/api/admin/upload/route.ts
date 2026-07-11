import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth/server";
import { detectImageType, saveGalleryImage, MAX_UPLOAD_BYTES } from "@/lib/uploads";

export const dynamic = "force-dynamic";

// 管理用: ギャラリー画像アップロード
// JPEG / PNG / WebP のみ許可。マジックバイトで検証し、拡張子・Content-Typeは信用しない。
export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "ファイルを選択してください" }, { status: 400 });
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "空のファイルです" }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `ファイルサイズは${MAX_UPLOAD_BYTES / 1024 / 1024}MB以内にしてください` },
      { status: 400 }
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const detected = detectImageType(bytes);
  if (!detected) {
    return NextResponse.json(
      { error: "JPEG・PNG・WebP形式の画像のみアップロードできます(HEICは非対応です)" },
      { status: 400 }
    );
  }

  try {
    const url = await saveGalleryImage(bytes, detected.ext);
    return NextResponse.json({ url }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "画像の保存に失敗しました。時間をおいて再度お試しください" },
      { status: 500 }
    );
  }
}
