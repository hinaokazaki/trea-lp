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
    id: "simple",
    name: "シンプルメニュー",
    items: [
      {
        name: "クリア",
        price: "¥4,500",
      },
      {
        name: "ワンカラー",
        price: "¥5,000",
      },
      {
        name: "グラデーション",
        description: "ベースカラー追加：+¥500",
        price: "¥5,500",
      },
      {
        name: "マグネット",
        price: "¥5,500",
      },
      {
        name: "フラッシュ",
        price: "¥5,500",
      },
      {
        name: "フレンチ",
        description: "ベースカラー追加：+¥500",
        price: "¥6,000",
      },
    ],
  },
  {
    id: "design",
    name: "デザインメニュー",
    items: [
      {
        name: "シンプルデザイン",
        price: "¥6,200",
      },
      {
        name: "スタンダードデザイン",
        price: "¥7,200",
      },
      {
        name: "プレミアムデザイン",
        price: "¥8,200",
      },
    ],
  },
  {
    id: "off",
    name: "オフメニュー",
    items: [
      {
        name: "当店付け替えオフ",
        description: "次回4週間以内のご予約でオフ無料",
        price: "¥500",
      },
      {
        name: "他店付け替えオフ",
        description: "ご新規様オフ無料",
        price: "¥1,000",
      },
    ],
  },
  {
    id: "other",
    name: "その他メニュー",
    items: [
      {
        name: "当店オフのみ",
        price: "¥3,000",
      },
      {
        name: "他店オフのみ",
        description: "スカルプオフは行っておりません",
        price: "¥4,000",
      },
      {
        name: "長さだし",
        description:
          "・10本長さだしは行っておりません\n・他の爪の長さに合わせるための長さだしのみ対応",
        price: "＋¥250 / 1本",
      },
    ],
  },
  {
    id: "option",
    name: "オプションメニュー",
    items: [
      {
        name: "フットネイル",
        price: "＋¥1,000",
      },
      {
        name: "パウダー",
        price: "＋¥100 / 1本",
      },
      {
        name: "フレンチ",
        price: "＋¥150 / 1本",
      },
      {
        name: "スキニーフレンチ",
        price: "＋¥100 / 1本",
      },
      {
        name: "マットコーティング",
        price: "＋¥50 / 1本",
      },
      {
        name: "ホログラム",
        price: "＋¥50〜200 / 1本",
      },
      {
        name: "ストーン・スタッズ",
        price: "＋¥100〜 / 1本",
      },
      {
        name: "ぷっくり仕上げ",
        price: "＋¥100 / 1本",
      },
    ],
  },
];

export const topMenuItems = [
  { name: "ワンカラー", price: "¥5,000" },
  { name: "シンプルデザイン", price: "¥6,200" },
  { name: "当店付け替えオフ", price: "¥500" },
  { name: "当店オフのみ", price: "¥3,000" },
];
