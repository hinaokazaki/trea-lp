export type MenuItem = {
  name: string;
  description?: string;
  price: string;
  duration?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  badge?: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "gel",
    name: "ジェルネイル",
    badge: "手指10本",
    items: [
      {
        name: "ワンカラー",
        description: "シンプルで上品。どんな場面にも合わせやすい定番スタイル",
        price: "¥〇,〇〇〇",
        duration: "約60分",
      },
      {
        name: "シンプルアート",
        description: "ラメ・ラインなど控えめなアートをプラス",
        price: "¥〇,〇〇〇〜",
        duration: "約75分",
      },
      {
        name: "デザインネイル",
        description:
          "ご希望のデザインをご相談ください（インスタ参考画像歓迎）",
        price: "¥〇,〇〇〇〜",
        duration: "約90分〜",
      },
    ],
  },
  {
    id: "foot",
    name: "フットネイル",
    badge: "足指10本",
    items: [
      {
        name: "フットワンカラー",
        description: "足元も清潔感のある仕上がりに",
        price: "¥〇,〇〇〇",
        duration: "約60分",
      },
      {
        name: "手足セット",
        description: "手指＋足指をまとめてケア。お得なセット料金",
        price: "¥〇〇,〇〇〇",
        duration: "約120分",
      },
    ],
  },
  {
    id: "off",
    name: "オフ・ケア",
    items: [
      {
        name: "ジェルオフのみ",
        description: "他店施術のオフも承ります（状態によりご相談）",
        price: "¥〇,〇〇〇",
        duration: "約30分",
      },
      {
        name: "オフ＋付け替え",
        description: "付け替えの場合はこちら（セット割引あり）",
        price: "¥〇,〇〇〇〜",
        duration: "約90分〜",
      },
    ],
  },
  {
    id: "option",
    name: "オプション",
    badge: "各メニューに追加可",
    items: [
      { name: "ラメグラデーション", price: "＋¥〇〇〇" },
      { name: "ストーン（3粒まで）", price: "＋¥〇〇〇" },
      { name: "ネイルケア（甘皮処理）", price: "＋¥〇〇〇" },
    ],
  },
];

export const topMenuItems = [
  { name: "ワンカラー", price: "¥〇,〇〇〇〜" },
  { name: "シンプルアート", price: "¥〇,〇〇〇〜" },
  { name: "フットネイル", price: "¥〇,〇〇〇〜" },
  { name: "オフのみ", price: "¥〇,〇〇〇〜" },
];
