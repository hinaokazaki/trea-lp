// prisma/seed.ts
// 仮画像(プレースホルダー)を使ったギャラリー初期データ。
// 実写が揃い次第、imageUrl を差し替え、必要ならtitle/descriptionも編集してください。

import { PrismaClient, TagType } from "@prisma/client";

const prisma = new PrismaClient();

const DESIGN_TAGS = ["ワンカラー", "シンプルアート", "ニュアンス", "フレンチ", "フット"] as const;
const SEASON_TAGS = ["春・夏", "秋・冬"] as const;

const slugMap: Record<string, string> = {
  "ワンカラー": "one-color",
  "シンプルアート": "simple-art",
  "ニュアンス": "nuance",
  "フレンチ": "french",
  "フット": "foot",
  "春・夏": "spring-summer",
  "秋・冬": "autumn-winter",
};

// [連番, デザインタグ, シーズンタグ]
const galleryPlan: [number, string, string][] = [
  [1, "ワンカラー", "春・夏"],
  [2, "ワンカラー", "秋・冬"],
  [3, "ワンカラー", "春・夏"],
  [4, "ワンカラー", "秋・冬"],
  [5, "シンプルアート", "春・夏"],
  [6, "シンプルアート", "秋・冬"],
  [7, "シンプルアート", "春・夏"],
  [8, "ニュアンス", "秋・冬"],
  [9, "ニュアンス", "春・夏"],
  [10, "ニュアンス", "秋・冬"],
  [11, "ニュアンス", "春・夏"],
  [12, "フレンチ", "春・夏"],
  [13, "フレンチ", "秋・冬"],
  [14, "フット", "春・夏"],
  [15, "フット", "秋・冬"],
];

async function main() {
  // タグを作成(デザイン系・季節系)
  const tagRecords: Record<string, string> = {};
  for (const name of DESIGN_TAGS) {
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name, slug: slugMap[name], type: TagType.DESIGN },
    });
    tagRecords[name] = tag.id;
  }
  for (const name of SEASON_TAGS) {
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name, slug: slugMap[name], type: TagType.SEASON },
    });
    tagRecords[name] = tag.id;
  }

  // ギャラリー作品(仮画像)を作成
  for (const [idx, designTag, seasonTag] of galleryPlan) {
    const fileName = `2026-07-${String(idx).padStart(3, "0")}.webp`;
    await prisma.galleryItem.create({
      data: {
        title: null, // 実写差し替え時にタイトルを入れる想定
        imageUrl: `/images/gallery/${fileName}`,
        isPublished: true, // 仮画像段階では非公開(false)にしてもよい
        sortOrder: idx,
        tags: {
          create: [
            { tag: { connect: { id: tagRecords[designTag] } } },
            { tag: { connect: { id: tagRecords[seasonTag] } } },
          ],
        },
      },
    });
  }

  console.log(`Seeded ${galleryPlan.length} gallery items with tags.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
