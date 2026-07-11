// ギャラリー画像のローカルストレージ処理(public/uploads/gallery)。
// Route Handler(Nodeランタイム)からのみ使用すること。
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export const UPLOAD_URL_PREFIX = "/uploads/gallery/";
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "gallery");

type DetectedImage = { ext: "jpg" | "png" | "webp"; mime: string };

/** マジックバイトで画像形式を判定する(拡張子・Content-Typeは信用しない) */
export function detectImageType(bytes: Uint8Array): DetectedImage | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { ext: "jpg", mime: "image/jpeg" };
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return { ext: "png", mime: "image/png" };
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 && // R
    bytes[1] === 0x49 && // I
    bytes[2] === 0x46 && // F
    bytes[3] === 0x46 && // F
    bytes[8] === 0x57 && // W
    bytes[9] === 0x45 && // E
    bytes[10] === 0x42 && // B
    bytes[11] === 0x50 // P
  ) {
    return { ext: "webp", mime: "image/webp" };
  }
  return null;
}

/** 画像を保存し、公開URL("/uploads/gallery/xxx.webp")を返す */
export async function saveGalleryImage(bytes: Uint8Array, ext: string): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const fileName = `${randomUUID()}.${ext}`; // UUIDでファイル名衝突を回避
  await writeFile(path.join(UPLOAD_DIR, fileName), bytes);
  return `${UPLOAD_URL_PREFIX}${fileName}`;
}

/**
 * アップロード済み画像をベストエフォートで削除する。
 * DB更新成功後に呼ぶこと(削除失敗してもDBとの深刻な不整合にならない順序)。
 * 管理対象外のURL(シード画像や外部URL)は無視する。
 */
export async function deleteGalleryImage(imageUrl: string): Promise<void> {
  if (!imageUrl.startsWith(UPLOAD_URL_PREFIX)) return;
  const fileName = path.basename(imageUrl); // パストラバーサル防止
  if (!/^[A-Za-z0-9-]+\.(jpg|png|webp)$/.test(fileName)) return;
  try {
    await unlink(path.join(UPLOAD_DIR, fileName));
  } catch {
    // 存在しない・削除失敗は無視(孤児ファイルは許容)
  }
}
