既存のネイルサロンWebサイトに、ギャラリー投稿を管理するためのサロンオーナー専用管理機能を追加してください。

## 目的

サロンオーナーが管理画面へログインし、公開サイトのギャラリーに表示するネイル画像や投稿内容を登録・編集・削除できるようにしたいです。

公開サイト全体のデザイン、レイアウト、ページ構成はすでに完成しています。既存の見た目や構造は変更せず、ギャラリーのデータ連携と管理機能のみを追加してください。

---

## 現在の技術構成

データベースにはPostgreSQLを使用し、Prismaで接続しています。

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model GalleryItem {
  id          String   @id @default(cuid())
  title       String?
  description String?
  imageUrl    String
  isPublished Boolean  @default(true)
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  tags GalleryItemTag[]

  @@index([isPublished, sortOrder])
}

model Tag {
  id   String  @id @default(cuid())
  name String  @unique
  slug String  @unique
  type TagType @default(DESIGN)

  items GalleryItemTag[]
}

enum TagType {
  DESIGN
  SEASON
}

model GalleryItemTag {
  galleryItemId String
  tagId         String

  galleryItem GalleryItem @relation(
    fields: [galleryItemId],
    references: [id],
    onDelete: Cascade
  )

  tag Tag @relation(
    fields: [tagId],
    references: [id],
    onDelete: Cascade
  )

  @@id([galleryItemId, tagId])
}
```

この既存スキーマを基本的にそのまま使用してください。

新しく`gallery_posts`などの重複するテーブルは作成しないでください。

スキーマ変更が本当に必要な場合は、実装前に理由と変更内容を提示し、最小限の変更にしてください。

---

## 実装範囲

### 1. サロンオーナー用ログイン機能

サロンオーナー専用のログインページを作成してください。

必要な機能：

- メールアドレスとパスワードによるログイン
- ログアウト
- 管理画面のアクセス制限
- 未ログイン状態で管理画面にアクセスした場合はログインページへリダイレクト
- ログイン済みでログインページへアクセスした場合は管理画面へリダイレクト
- 公開ユーザー向けの新規登録機能は不要
- サロンオーナー1名での利用を想定
- 認証情報を安全にCookieまたはSessionで管理
- API側でも必ず認証を確認する

現在のプロジェクトに認証ライブラリが導入されている場合は、既存構成を優先してください。

認証が未実装の場合は、現在のNext.js構成に適した安全な認証方法を選択してください。

候補：

- Auth.js
- Supabase Auth
- 独自のCookie Session認証

独自認証を実装する場合は、パスワードを平文保存しないでください。環境変数、ハッシュ化、HttpOnly Cookie、Secure属性、SameSite属性を適切に使用してください。

---

### 2. 管理画面のルート

以下のような管理画面用ルートを作成してください。

```text
/admin/login
/admin
/admin/gallery
/admin/gallery/new
/admin/gallery/[id]/edit
/admin/tags
```

実際のルート構成は既存プロジェクトの設計に合わせて調整して構いません。

#### 管理画面で必要な操作

- ギャラリー投稿一覧の表示
- 新規投稿
- 投稿内容の編集
- 投稿の削除
- 公開・非公開の切り替え
- 表示順の変更
- 投稿画像のプレビュー
- タグの選択
- タグの追加・編集・削除
- 作成日時と更新日時の確認

---

## 3. GalleryItemの管理項目

既存の`GalleryItem`モデルに合わせ、以下の情報を管理してください。

- `imageUrl`
- `title`
- `description`
- `isPublished`
- `sortOrder`
- `tags`
- `createdAt`
- `updatedAt`

### 項目ごとの要件

#### imageUrl

- 必須
- 画像アップロード後のURLを保存
- 一覧画面とフォーム画面でプレビューを表示
- 編集時に画像を変更できる
- 画像未変更の場合は既存URLを維持する

#### title

- 任意
- 管理画面上では入力できるようにする
- 公開サイト側では既存デザイン上必要な場合のみ表示する

#### description

- 任意
- 管理画面上では複数行入力できるようにする
- 公開サイト側では既存デザイン上必要な場合のみ表示する

#### isPublished

- 公開・非公開を管理
- 公開サイトには`true`の投稿だけを表示
- 管理画面では両方表示
- 一覧画面から切り替えられるようにする

#### sortOrder

- 数値で表示順を管理
- 数値が小さい投稿を先に表示
- 同じ数値の場合は、作成日時またはIDで安定した並び順にする
- 管理画面から編集できるようにする

#### tags

- 複数選択可能
- `GalleryItemTag`を経由して保存
- GalleryItemの作成・更新時に関連テーブルも正しく更新する
- 同じタグを重複登録しない

---

## 4. タグ管理

既存の`Tag`モデルと`TagType`を使用してください。

```prisma
enum TagType {
  DESIGN
  SEASON
}
```

### DESIGNタグの例

- simple
- nuance
- french
- magnet
- flower
- parts
- gradation

### SEASONタグの例

- spring
- summer
- autumn
- winter
- bridal
- christmas

これらは参考例です。実際のタグ名やslugは、管理画面から追加・編集できるようにしてください。

### タグ管理機能

- タグ一覧表示
- タグ作成
- タグ編集
- タグ削除
- `DESIGN`と`SEASON`の分類
- name入力
- slug入力
- slugの重複チェック
- nameの重複チェック
- 使用中タグを削除する場合の確認
- 削除時は関連する`GalleryItemTag`も削除されること

タグ削除によってGalleryItem自体が削除されないようにしてください。

---

## 5. 画像アップロード

ギャラリー画像をアップロードできるようにしてください。

現在のプロジェクトに既存の画像ストレージやアップロード機能がある場合は、それを利用してください。

未実装の場合は、以下のいずれか適切な方法を選んでください。

- Supabase Storage
- Cloudinary
- Vercel Blob
- その他、現在の構成に適した画像ストレージ

### 画像アップロード要件

- JPEG
- PNG
- WebP
- 必要に応じてHEICを拒否または変換
- ファイルサイズ制限
- MIME typeの検証
- 拡張子だけで判定しない
- アップロード中のローディング表示
- アップロード失敗時のエラー表示
- アップロード前または後の画像プレビュー
- ファイル名の衝突を避ける
- クライアント側へ秘密鍵を公開しない

可能であれば、Web表示用に適切なサイズへ圧縮または最適化してください。

画像の削除方針も決めてください。

- GalleryItem削除時にストレージ上の画像も削除する
- 画像差し替え時に古い画像を削除する
- 削除失敗時にDBとの不整合が起きにくい処理順にする

既存の`GalleryItem`には`imageUrl`のみが存在するため、ストレージ上の削除にパスが必要な場合は、URLから安全に特定できる構成にするか、必要最小限のスキーマ変更として`imagePath`追加を検討してください。

ただし、スキーマ変更前に必要性を確認してください。

---

## 6. API作成

GalleryItemとTagを管理するAPIを作成してください。

ルートの命名は、既存のAPI設計に合わせて調整して構いません。

### 公開ギャラリーAPI

```text
GET /api/gallery
GET /api/gallery/[id]
```

#### 公開一覧取得

- `isPublished: true`のみ取得
- `sortOrder`の昇順で取得
- 必要なタグ情報を含める
- 非公開投稿を返さない
- 公開サイトに必要なデータだけ返す

レスポンス例：

```ts
type PublicGalleryItem = {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  sortOrder: number;
  tags: {
    id: string;
    name: string;
    slug: string;
    type: "DESIGN" | "SEASON";
  }[];
};
```

### 管理画面用ギャラリーAPI

```text
GET /api/admin/gallery
GET /api/admin/gallery/[id]
POST /api/admin/gallery
PATCH /api/admin/gallery/[id]
DELETE /api/admin/gallery/[id]
PATCH /api/admin/gallery/[id]/publish
PATCH /api/admin/gallery/order
```

必要な処理：

- 全投稿一覧取得
- 投稿詳細取得
- 新規投稿作成
- 投稿更新
- 投稿削除
- 公開状態変更
- 表示順変更
- GalleryItemTagの作成と更新

すべての管理画面用APIで、サーバー側の認証確認を行ってください。

### タグAPI

```text
GET /api/admin/tags
POST /api/admin/tags
PATCH /api/admin/tags/[id]
DELETE /api/admin/tags/[id]
```

必要な処理：

- タグ一覧取得
- タグ作成
- タグ更新
- タグ削除
- typeによる絞り込み
- nameとslugの重複チェック

---

## 7. Prismaでの関連データ更新

GalleryItem作成時は、GalleryItemとGalleryItemTagを一貫した状態で保存してください。

例：

```ts
await prisma.galleryItem.create({
  data: {
    imageUrl,
    title,
    description,
    isPublished,
    sortOrder,
    tags: {
      create: tagIds.map((tagId) => ({
        tag: {
          connect: {
            id: tagId,
          },
        },
      })),
    },
  },
  include: {
    tags: {
      include: {
        tag: true,
      },
    },
  },
});
```

更新時は、既存のGalleryItemTagを整理したうえで、新しいタグ構成へ更新してください。

必要に応じてPrisma Transactionを使用し、GalleryItemとタグ関連データの更新途中で不整合が起きないようにしてください。

クライアントから送信されたtagIdが本当に存在するかもAPI側で確認してください。

---

## 8. バリデーション

クライアント側とAPI側の両方でバリデーションを行ってください。

現在のプロジェクトにZodとReact Hook Formが導入されている場合は、それらを使用してください。

### GalleryItemのバリデーション例

```ts
const galleryItemSchema = z.object({
  title: z.string().trim().max(100).optional().nullable(),
  description: z.string().trim().max(1000).optional().nullable(),
  imageUrl: z.string().url(),
  isPublished: z.boolean(),
  sortOrder: z.number().int().min(0),
  tagIds: z.array(z.string()).default([]),
});
```

実際にはフォーム送信時の値に合わせ、空文字を`null`へ変換するなど適切に調整してください。

### Tagのバリデーション例

```ts
const tagSchema = z.object({
  name: z.string().trim().min(1).max(50),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/),
  type: z.enum(["DESIGN", "SEASON"]),
});
```

API側では以下も確認してください。

- 対象GalleryItemの存在
- 対象Tagの存在
- nameの重複
- slugの重複
- 不正なtagId
- 不正なsortOrder
- 認証されているか
- 許可されていないHTTPメソッドではないか

---

## 9. 管理画面のデザイン

管理画面はシンプルで操作しやすいデザインにしてください。

公開サイトとは別の管理画面用レイアウトを作成して構いません。

### デザイン要件

- 公開サイトに合うパープル基調
- 白または薄いパープルの背景
- 濃いパープルをメインカラーに使用
- 角丸のカードとボタン
- 控えめな影
- 過度な装飾は避ける
- スマートフォン対応
- 操作ボタンを分かりやすく配置
- 公開状態をバッジで表示
- エラーと成功メッセージを分かりやすく表示
- 公開サイト用のCSSへ影響を与えない

具体的なパープルの色は、公開サイトで現在使用されている色を確認し、それに近い色を使用してください。

新しいブランドカラーを勝手に追加するのではなく、既存サイトのカラー変数やTailwind設定があれば再利用してください。

### 管理画面用コンポーネント例

```text
AdminLayout
AdminHeader
AdminSidebar
GalleryItemList
GalleryItemCard
GalleryItemForm
GalleryImageUploader
TagSelector
TagManagementList
PublishStatusBadge
DeleteConfirmDialog
LoadingButton
EmptyState
```

コンポーネント名は既存の命名規則に合わせて変更して構いません。

---

## 10. ギャラリー一覧画面

管理画面のギャラリー一覧には、最低限以下を表示してください。

- サムネイル
- タイトル
- 選択されているタグ
- 公開・非公開
- sortOrder
- 作成日時
- 更新日時
- 編集ボタン
- 削除ボタン
- 公開状態変更ボタン

スマートフォンではテーブルが横にはみ出さないよう、カード形式など適切なレスポンシブ表示にしてください。

投稿が0件の場合は、空のテーブルではなく、新規作成を促すEmpty Stateを表示してください。

---

## 11. 新規作成・編集フォーム

フォームには以下を含めてください。

- 画像アップロード
- 画像プレビュー
- タイトル
- 説明文
- DESIGNタグの複数選択
- SEASONタグの複数選択
- 公開・非公開
- sortOrder
- 保存ボタン
- キャンセルボタン

必要な挙動：

- 保存中はボタンを無効化
- 二重送信を防止
- 保存成功時にフィードバックを表示
- 保存成功後は一覧または編集画面へ遷移
- エラー時は入力内容を可能な限り維持
- 編集時は既存データを初期値として表示
- 画像未変更時は既存画像を維持
- ページ離脱時に未保存の変更がある場合は警告を検討

---

## 12. 削除処理

削除前に確認ダイアログを表示してください。

確認内容には、削除対象のタイトルまたは画像を表示してください。

削除時は以下を考慮してください。

- GalleryItemの削除
- `onDelete: Cascade`によるGalleryItemTagの削除
- ストレージ上の画像削除
- 削除失敗時のエラー表示
- 操作中の二重クリック防止

---

## 13. 公開サイトのギャラリーとの接続

既存のギャラリーセクションのデザイン、構図、余白、画像比率、フォント、色、レスポンシブ表示、アニメーションは変更しないでください。

現在ハードコードされているデータがある場合は、見た目を維持したまま、Prisma経由で取得したGalleryItemへ置き換えてください。

公開サイトでは以下の条件で取得してください。

```ts
where: {
  isPublished: true,
},
orderBy: [
  {
    sortOrder: "asc",
  },
  {
    createdAt: "desc",
  },
],
```

必要に応じてタグ情報を取得してください。

公開サイト側へ管理機能や管理画面用コンポーネントを混在させないでください。

データ取得処理を追加するために必要な最小限の変更のみ行ってください。

---

## 14. 既存サイトを変更しないための重要な制約

以下を必ず守ってください。

- 公開サイト全体のデザインを変更しない
- 公開サイトのページ構成を変更しない
- ギャラリー以外のセクションを変更しない
- 既存のHeaderやFooterを変更しない
- 既存のフォントを変更しない
- 既存のカラー設定を変更しない
- 既存の余白を変更しない
- 既存のアニメーションを変更しない
- 既存コンポーネントを不要にリファクタリングしない
- GalleryItem連携に不要なファイルは変更しない
- 管理画面用スタイルを公開サイト側へ影響させない
- グローバルCSSへ不要なスタイルを追加しない
- Prismaスキーマを不要に変更しない
- 現在のGalleryItem、Tag、GalleryItemTagを再利用する
- 認証情報や秘密鍵をクライアントへ公開しない
- DATABASE_URLをクライアント側で使用しない

---

## 15. 実装前に確認すること

最初からコードを変更せず、まず現在のプロジェクトを調査してください。

以下を簡潔に報告してください。

1. Next.jsのバージョンとApp RouterまたはPages Routerのどちらか
2. 現在のPrisma Clientの配置
3. GalleryItemが現在どこで使用されているか
4. ギャラリーセクションの現在のデータ取得方法
5. 現在の画像表示方法
6. 既存の認証機能の有無
7. 既存の画像ストレージの有無
8. ZodとReact Hook Formの有無
9. 使用中のUIコンポーネントやアイコンライブラリ
10. 追加・変更予定のファイル一覧
11. Prismaスキーマ変更が必要かどうか
12. 採用する認証方法
13. 採用する画像ストレージ
14. API設計

調査後、既存デザインを維持できる実装方針を示してから作業を開始してください。

---

## 16. 実装順序

以下の順番で進めてください。

1. 既存コードと依存関係の調査
2. 実装計画と変更ファイル一覧の提示
3. 認証方法の決定
4. 画像アップロード方法の決定
5. 管理画面用認証処理
6. GalleryItemとTagのAPI
7. 画像アップロード処理
8. 管理画面レイアウト
9. ギャラリー一覧画面
10. 新規作成フォーム
11. 編集フォーム
12. 公開・非公開切り替え
13. 削除処理
14. タグ管理
15. 表示順管理
16. 公開サイトのギャラリーとDBの接続
17. 認証・バリデーション・エラー処理の確認
18. TypeScript、Lint、Buildの確認

---

## 17. 完了条件

以下がすべて動作する状態を完了とします。

- サロンオーナーがログインできる
- ログアウトできる
- 未ログインでは管理画面へ入れない
- APIへ直接アクセスしても未認証では更新できない
- GalleryItemの一覧を確認できる
- GalleryItemを新規作成できる
- 画像をアップロードできる
- GalleryItemを編集できる
- GalleryItemを削除できる
- 公開・非公開を切り替えられる
- sortOrderを変更できる
- DESIGNタグを管理できる
- SEASONタグを管理できる
- 投稿へ複数タグを設定できる
- 公開サイトには公開中のGalleryItemだけが表示される
- 公開サイトではsortOrder順に表示される
- 既存の公開サイトデザインが維持されている
- スマートフォンから管理画面を操作できる
- クライアント側とAPI側の両方でバリデーションされている
- 認証情報や秘密鍵がクライアントへ公開されていない
- 不要なPrismaモデルが追加されていない
- TypeScriptエラーがない
- Lintエラーがない
- Buildエラーがない

実装完了後は、以下を報告してください。

- 追加・変更したファイル
- 作成したAPI
- 採用した認証方法
- 採用した画像ストレージ
- 必要な環境変数
- Prisma Migrationの有無
- オーナーアカウントの作成方法
- 管理画面へのアクセス方法
- 動作確認手順
- 今後追加できる改善案
