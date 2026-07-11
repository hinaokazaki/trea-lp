# ギャラリー詳細ページ 実装報告

`docs/TREA_ギャラリー詳細_実装指示.md` に基づき、ギャラリー作品詳細の「モーダル + 個別ページ両対応」を実装した際の報告書。

- 実装日: 2026-07-11
- ブランチ: `feature/design-update`
- 検証結果: TypeScript・Build ゼロエラー。本番ビルドの実サーバー(実DB接続)で、モーダル動作・SEOメタ出力・404・フィルタ復元まで検証済み

---

## 1. 実現した挙動

同じURL(`/gallery/[id]`)を、来訪経路によって2通りに出し分ける。

| 経路 | 表示 |
|---|---|
| 一覧から作品カードをクリック(ソフトナビゲーション) | モーダルでオーバーレイ表示。閉じると一覧のフィルタ・スクロール位置が復元される |
| URL直接アクセス / リロード / シェアリンク / クローラ | フルページの詳細ページ(SEOメタ・JSON-LD付き) |

App Router の **Parallel Routes(`@modal` スロット)+ Intercepting Routes(`(.)`)** で実装。

## 2. ルーティング構成

```
app/gallery/
├── page.tsx                 # 一覧(カードを <Link scroll={false}> 化)
├── layout.tsx               # {children} と {modal} の両スロットを描画
├── @modal/
│   ├── default.tsx          # null(モーダル非表示時のフォールバック。無いとハードナビで404)
│   └── (.)[id]/
│       └── page.tsx         # インターセプト時のモーダル
└── [id]/
    └── page.tsx             # フルページ詳細(SSG/ISR + SEO)
```

> **指示書との差分**: 指示書のツリーでは `@modal/(.)gallery/[id]/` だったが、`@modal` を `app/gallery/` 配下に置いたため、正しいインターセプト表記は `(.)[id]`(`(.)` はスロットを除いた同階層 = `app/gallery/` 直下を指す)。指示書の注意書き「404やインターセプト不発があれば公式規約に沿って調整」に従い、この表記で動作確認済み。

## 3. 追加・変更したファイル

### 新規作成

| ファイル | 内容 |
|---|---|
| `lib/gallery.ts` | 共有データ層。`getPublishedGalleryItems` / `getGalleryItem`(非公開・不存在は null)/ `getGalleryItemDisplayTitle`(タイトル未設定時は代表デザインタグから「◯◯ネイル」を自動生成)。一覧ページにあったDB未接続時フォールバックデータもここへ移動 |
| `app/gallery/layout.tsx` | `{children}` `{modal}` 両スロット描画 |
| `app/gallery/@modal/default.tsx` | null を返すフォールバック |
| `app/gallery/@modal/(.)[id]/page.tsx` | モーダル側ページ(データ取得はフルページと同一関数を共有) |
| `app/gallery/[id]/page.tsx` | フルページ詳細(下記 4. 参照) |
| `components/gallery/GalleryDetail.tsx` | 詳細UI共通コンポーネント。`variant: "page" \| "modal"` でレイアウト切替。画像(`alt` は「{title}のネイルデザイン \| TRE'A」)・タイトル・説明・タグリンク(`/gallery?tag={slug}`)・予約CTA・一覧へ戻るリンク |
| `components/gallery/GalleryModal.tsx` | Client Component。×ボタン / 背景クリック / Esc で `router.back()`、表示中は `body` スクロールロック、モバイルは画面幅いっぱいの下付きシート(`items-end` + `rounded-t-2xl`)、PCは中央カード |

### 変更

| ファイル | 内容 |
|---|---|
| `components/gallery/GalleryClient.tsx` | ①カードを `<Link href={/gallery/${id}} scroll={false}>` に変更 ②フィルタを `useState` から **URLクエリ同期**(`/gallery?tag=nuance`)に変更。`router.replace(..., { scroll: false })` で更新し、不正な `tag` 値は「すべて」にフォールバック |
| `app/gallery/page.tsx` | データ取得を `lib/gallery.ts` に委譲。`GalleryClient` を `<Suspense>` でラップ(`useSearchParams` 使用のため必須) |
| `app/layout.tsx` | `metadataBase` を追加(og:image / canonical の絶対URL解決) |
| `.env.example` | `NEXT_PUBLIC_SITE_URL` を追加 |
| `README.md` | ギャラリー運用ルール(下記 5.)を追記 |

## 4. SEO(フルページ側のみ)

`generateMetadata` で出力:

- `title`: `{作品タイトル} | ネイルデザインギャラリー | TRE'A`
- `description`: `description` フィールドをそのまま使用
- **`description` が空の作品は `robots: noindex`**(定型文は組み立てない。説明文が入力されると自動的にインデックス対象へ復帰)
- `openGraph`: `type: article` + 作品画像
- `alternates.canonical`: `/gallery/{id}`
- JSON-LD(`ImageObject`): `contentUrl`(絶対URL)/ `name` / `description` / `creator: TRE'A`

### SSG / ISR

- `generateStaticParams` で公開中の全作品をビルド時にSSG(検証時は実DBの18件を事前生成)
- `export const revalidate = 3600` のISRで、作品の追加・更新を最長1時間で反映(新規IDは初回アクセス時にオンデマンド生成)

## 5. 運用ルール(README にも記載)

- 説明文(`description`)が空の作品ページは検索エンジンにインデックスさせない(`noindex` 自動付与)
- 新規作品投稿時は **タイトル + 2〜3文の説明**(デザインの特徴・対応コース・施術時間の目安など)を書くことを推奨

## 6. 動作確認結果(指示書チェックリスト)

本番ビルド(`npm run build` → `next start`、実DB接続)で確認。

- [x] 一覧から作品クリック → モーダル表示、URLが `/gallery/[id]` に変化
- [x] モーダルを閉じる(× / 背景クリック / Esc)→ 一覧に復帰、**スクロール位置とフィルタ(`?tag=french`)が維持**
- [x] `/gallery/[id]` 直接アクセス・リロード → フルページ詳細を表示
- [x] 存在しないID → 404(非公開作品も同一ロジックで `notFound()`)
- [x] HTMLソースに title / meta description / og:image / canonical / JSON-LD を出力
- [x] description 未入力の作品に `noindex` 付与 + タイトル自動生成(例: ワンカラーネイル)
- [x] 詳細ページのタグリンク → フィルタ済み一覧へ遷移
- [x] モーダル表示中の背景スクロールロック(`body.overflow: hidden`)
- [ ] モバイル幅の目視確認のみ未実施(検証環境でウィンドウリサイズ不可のため)。レスポンシブはTailwindの標準クラスで実装済みなので、実機での一度の確認を推奨

## 7. 既知の注意点

1. **ページ読み込み直後の数秒はカードクリックが効かないことがある**
   ギャラリーグリッドは `useSearchParams` を使うため Suspense 内でクライアント描画され、ハイドレーション完了前のクリックは無効になる。通常閲覧ではほぼ問題にならないが、気になる場合はローディングスケルトンの追加を検討。
2. **モーダル表示中、背後の一覧はフィルタ解除状態で描画される**
   URLから `?tag=` が消えるため。モーダルを閉じると `router.back()` で復元されるので実害はない。
3. **`NEXT_PUBLIC_SITE_URL` をデプロイ時に必ず設定すること**
   未設定だと canonical / og:image / JSON-LD の絶対URLが `http://localhost:3000` になる。
