# Design Implementation Rules

このプロジェクトでは、`reference/` フォルダ内のデザイン画像を完成イメージとして実装してください。

---

# Reference Images

画像はページ単位で管理しています。

```
reference/
├── trea_nails_top_mockup.png
├── trea_concept_page.png
├── trea_gallery_page.png
├── trea_menu_page.png
├── trea_reservation_page.png
└── trea_faq_page.png
```

各画像は1ページ全体の完成デザインです。

## 対応関係

| Image                     | Page             |
| ------------------------- | ---------------- |
| trea_nails_top_mockup.png | Top Page         |
| trea_concept_page.png     | Concept Page     |
| trea_gallery_page.png     | Gallery Page     |
| trea_menu_page.png        | Menu Page        |
| trea_reservation_page.png | Reservation Page |
| trea_faq_page.png         | FAQ Page         |

---

# Design Rules

実装時は以下を必ず守ってください。

## 1. デザイン優先

画像を完成版デザインとして扱います。

レイアウト・余白・サイズ感・配色・タイポグラフィをできる限り忠実に再現してください。

---

## 2. コンポーネント構成

Reactコンポーネント構成は可能な限り維持してください。

不要なコンポーネント分割や統合は行わないでください。

---

## 3. TailwindCSS

スタイリングはTailwindCSSのみ使用してください。

インラインCSSやCSS Modulesは追加しないでください。

---

## 4. レスポンシブ

PCデザインを基準とし、

- Desktop
- Tablet
- Mobile

すべて自然に表示できるよう調整してください。

デザインがない部分は現在の実装を参考にしてください。

---

## 5. 内容は変更しない

文章

画像

リンク

ボタン

機能

これらは変更しません。

デザインのみ修正してください。

---

## 6. コンポーネントの再利用

同じデザインは既存コンポーネントを再利用してください。

同じUIを重複実装しないでください。

---

## 7. セクション単位で実装

画像全体を見るだけでなく、

各セクション単位で確認しながら実装してください。

例

Top

- Hero
- Features
- Gallery
- Access
- Footer

Concept

- Hero
- Introduction
- Concept Section
- Footer

など。

---

## 8. デザインが曖昧な場合

画像で判断できない部分は、

現在の実装を維持してください。

推測で仕様変更しないでください。

---

# Implementation Workflow

ページごとに以下の流れで実装してください。

1. reference画像を確認

2. 現在の実装を確認

3. デザイン差分を洗い出す

4. 差分のみ修正

5. レスポンシブ確認

6. 完了後に変更内容をまとめる

---

# Priority

優先順位

1. レイアウト
2. 余白
3. タイポグラフィ
4. カラー
5. 装飾
6. アニメーション

---

# Important

デザイン以外は変更しないこと。

以下は禁止です。

- API変更
- データ構造変更
- 機能追加
- 機能削除
- ルーティング変更
- コンポーネントの大規模リファクタリング

必要最低限の変更でデザインを合わせてください。
