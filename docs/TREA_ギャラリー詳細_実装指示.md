# ギャラリー詳細ページ実装指示（Intercepting Routes: モーダル + 個別ページ両対応）

対象プロジェクト: TRE'A プライベートネイルサロン LP（Next.js App Router + TypeScript + Tailwind CSS + Prisma）
前提: `docs/TREA_開発準備計画.md` のDB設計（GalleryItem / Tag / GalleryItemTag）と `/gallery` 一覧ページが実装済みであること。

---

## 1. ゴール

ギャラリー作品の詳細を、次の2つの表示方法で**同じURL（`/gallery/[id]`）**により提供する。

1. **一覧ページから作品カードをクリックした場合** → モーダルとして詳細をオーバーレイ表示（一覧のスクロール位置・フィルタ状態を維持）
2. **URLを直接開いた場合／シェアされたリンクから来た場合／リロードした場合／クローラがアクセスした場合** → フルページの詳細ページとして表示

これを App Router の **Parallel Routes + Intercepting Routes** で実装する。

## 2. ルーティング構成

```
app/
├── gallery/
│   ├── page.tsx                        # 一覧（実装済み。作品カードを <Link href={`/gallery/${id}`}> にする）
│   ├── layout.tsx                      # 一覧レイアウト。{children} と {modal} の両スロットを描画
│   ├── @modal/
│   │   ├── default.tsx                 # null を返す（モーダル非表示時のフォールバック。必須）
│   │   └── (.)gallery/
│   │       └── [id]/
│   │           └── page.tsx            # インターセプト時のモーダル表示
│   └── [id]/
│       └── page.tsx                    # フルページの詳細（直アクセス・リロード・クローラ用）
```

注意点:
- `@modal/default.tsx` を忘れるとハードナビゲーション時に404になる。**必ず作成する**。
- インターセプトのパス表記（`(.)` / `(..)` など）は、`@modal` スロットを配置した階層に対する相対で決まる。上記の構成で動作確認し、404やインターセプト不発があればNext.js公式ドキュメント（Intercepting Routes）の規約に沿ってパスを調整すること。
- 一覧の `<Link>` によるソフトナビゲーション時のみインターセプトされ、モーダルになる。それ以外はフルページが表示される（この仕組み自体が要件）。

## 3. フルページ詳細（`gallery/[id]/page.tsx`）

Server Component とし、Prismaで `GalleryItem`（タグ含む）を取得する。`isPublished: false` または存在しないIDは `notFound()`。

表示内容:
- 作品画像（`next/image`、`alt` は `title` を元に「{title}のネイルデザイン | TRE'A」のような説明的な文言にする）
- タイトル（`title`。未設定なら代表タグ名から自動生成: 例「ニュアンスネイル」）
- 説明文（`description`）
- タグ一覧（デザイン系・季節系）。各タグは `/gallery?tag={slug}` へのリンクにして一覧のフィルタに戻れるようにする（内部リンクとしてSEOにも有効）
- 「ギャラリー一覧へ戻る」リンクと、ご予約ページ（`/reservation`）へのCTA

### 3.1 SEOメタデータ（フルページ側のみ。モーダル側には不要）

`generateMetadata` を実装する:

- `title`: `{作品タイトル} | ネイルデザインギャラリー | TRE'A`
- `description`: `description` フィールドを使用。**未入力の場合はタグ名から定型文を組み立てず、そのページに `robots: { index: false }` を設定する**（説明文のない薄いページをインデックスさせない。説明文が入力されたら自動的にインデックス対象に戻る）
- `openGraph`: 作品画像を `og:image` に設定（`type: 'article'` 相当でOK）
- `alternates.canonical`: `/gallery/{id}`

構造化データ（JSON-LD）を `<script type="application/ld+json">` で埋め込む:

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "（画像の絶対URL）",
  "name": "（作品タイトル）",
  "description": "（description）",
  "creator": { "@type": "Organization", "name": "TRE'A" }
}
```

### 3.2 SSG/ISR

- `generateStaticParams` で公開中の作品IDを事前生成する（ビルド時SSG）
- 作品追加を反映できるよう ISR（`export const revalidate = 3600` 程度）または on-demand revalidation を設定する。DB接続構成と相性の良い方を選択してよい

## 4. モーダル（`@modal/(.)gallery/[id]/page.tsx`）

- データ取得はフルページと同じロジックを共有する（取得関数を `lib/` に切り出し、両方から使う）
- モーダルUIは Client Component（`'use client'`）でラップし、以下のUXを実装:
  - 背景オーバーレイ（半透明黒）クリックで閉じる
  - 閉じる = `router.back()`（URLが `/gallery` に戻り、フィルタ状態・スクロール位置が維持される）
  - `Esc` キーで閉じる
  - モーダル表示中は背景スクロールをロック
  - 閉じるボタン（×）を右上に配置
- 表示内容はフルページと同等（画像・タイトル・説明・タグ・予約CTA）だが、レイアウトはモーダル向けにコンパクトにしてよい
- デザインはサイト共通のトーン（大理石×ゴールドの世界観、`docs/TREA_開発準備計画.md` 参照）に合わせる
- モバイルでは画面幅いっぱいに近いシート状の表示にする（作品画像が主役なので画像を大きく）

## 5. 一覧ページ側の変更

- 作品カードを `<Link href={`/gallery/${item.id}`} scroll={false}>` に変更する（`scroll={false}` でモーダル開閉時のスクロールジャンプを防ぐ）
- 一覧のフィルタ状態はURLクエリ（`/gallery?tag=nuance`）で管理されていることが望ましい。現在stateのみで管理している場合は、この機会にクエリパラメータ同期に変更する（モーダルから戻ったときにフィルタが維持される + フィルタ状態のURLがシェア可能になる）

## 6. 運用ルール（コードではなくコメント/READMEに残す）

- **説明文（description）が空の作品はインデックスさせない**方針である旨をコードコメントに残す
- 新規作品投稿時は、タイトル + 2〜3文の説明（デザインの特徴・対応コース・施術時間の目安など）を書くことを推奨する旨を README または docs に追記する

## 7. 動作確認チェックリスト

- [ ] 一覧から作品クリック → モーダルで表示され、URLが `/gallery/[id]` に変わる
- [ ] モーダルを閉じる（×・背景クリック・Esc）→ 一覧に戻り、スクロール位置とフィルタが維持されている
- [ ] `/gallery/[id]` を直接開く・モーダル表示中にリロード → フルページ詳細が表示される
- [ ] 存在しないID・非公開作品 → 404
- [ ] フルページのHTMLソースに title / meta description / og:image / JSON-LD が出力されている
- [ ] description未入力の作品ページに `noindex` が付与されている
- [ ] タグリンクから一覧のフィルタ済み表示に遷移できる
- [ ] モバイル幅でモーダル・フルページ双方のレイアウトが崩れない
