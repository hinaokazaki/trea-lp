# ギャラリー管理機能 実装報告

`docs/admin-rules.md` に基づき、サロンオーナー専用のギャラリー管理機能を実装した際の報告書。

- 実装日: 2026-07-10
- ブランチ: `feature/design-update`
- 検証結果: TypeScript・Lint・Build すべてゼロエラー。認証フロー・画像アップロード・公開ページ非影響を実サーバーで検証済み

---

## 1. 採用した方式

### 認証: 独自 Cookie セッション(ライブラリ追加なし)

- パスワードは **scrypt ハッシュ**を環境変数に保存(平文保存なし)
- セッションは **HMAC-SHA256 署名トークン**を HttpOnly / SameSite=Lax / Secure(本番) Cookie で管理(有効期限7日)
- **三層で認証を確認**: middleware(`/admin` 全体)+ 保護レイアウト(サーバー側)+ 全管理 API
- Web Crypto API のみ使用のため Edge(middleware)と Node(Route Handler)の両方で動作
- オーナー1名想定のため Auth.js 等は過剰と判断

### 画像ストレージ: ローカル `public/uploads/gallery/`

- 依存追加ゼロ、`next/image` 互換
- UUID ファイル名で衝突回避
- **マジックバイト**で JPEG / PNG / WebP を判定(拡張子・Content-Type は信用しない)。HEIC 拒否、8MB 上限
- 投稿削除・画像差し替え時は **DB 更新成功後に**旧ファイルを削除する順序で不整合を防止
- 画像パスは URL プレフィックス(`/uploads/gallery/`)から安全に導出できるため **`imagePath` カラム追加は不要**

### バリデーション: 自作共有モジュール(`lib/validation.ts`)

- Zod / React Hook Form 未導入のため依存を増やさず自作
- **クライアントと API で同一ロジックを共有**(タイトル100文字・説明1000文字・slug 形式・sortOrder 整数など)

### Prisma スキーマ変更: なし

既存の `GalleryItem` / `Tag` / `GalleryItemTag` をそのまま使用。**Migration も不要**。

---

## 2. 追加・変更したファイル

### 新規作成

| ファイル | 内容 |
|---|---|
| `middleware.ts` | `/admin` のアクセス制限・ログイン済みリダイレクト |
| `lib/auth/session.ts` | HMAC 署名セッショントークン(Edge/Node 両対応) |
| `lib/auth/server.ts` | scrypt 検証・`getAdminSession`・`requireAdmin` |
| `lib/validation.ts` | GalleryItem / Tag / 表示順の共有バリデーション |
| `lib/uploads.ts` | 画像保存・削除・マジックバイト判定 |
| `scripts/hash-password.mjs` | パスワードハッシュ生成スクリプト |
| `app/api/gallery/route.ts` ほか | 公開 API |
| `app/api/admin/**` | 管理 API 一式(下表参照) |
| `app/admin/login/page.tsx` | ログインページ |
| `app/admin/(protected)/layout.tsx` | 認証チェック+管理画面レイアウト |
| `app/admin/(protected)/page.tsx` | ダッシュボード(投稿数・公開数・タグ数) |
| `app/admin/(protected)/gallery/page.tsx` | ギャラリー一覧 |
| `app/admin/(protected)/gallery/new/page.tsx` | 新規投稿 |
| `app/admin/(protected)/gallery/[id]/edit/page.tsx` | 投稿編集 |
| `app/admin/(protected)/tags/page.tsx` | タグ管理 |
| `components/admin/AdminShell.tsx` | 管理画面ヘッダー+ナビ+ログアウト |
| `components/admin/GalleryAdminList.tsx` | 一覧(公開切替・表示順・削除) |
| `components/admin/GalleryItemForm.tsx` | 新規/編集フォーム |
| `components/admin/TagManager.tsx` | タグ CRUD |
| `components/admin/ConfirmDialog.tsx` | 削除確認ダイアログ |
| `components/admin/LoginForm.tsx` | ログインフォーム |
| `components/admin/ui.tsx` | バッジ・ボタン・メッセージ・EmptyState |
| `components/layout/SiteChrome.tsx` | `/admin` で Header/Footer を出さないラッパー |
| `types/admin.ts` | 管理画面用の型 |
| `.env.example` | 必要な環境変数の見本 |

### 既存ファイルの変更(公開サイトへの影響は最小限)

| ファイル | 変更内容 |
|---|---|
| `app/gallery/page.tsx` | `orderBy` に `createdAt: "desc"` の第2キー追加(1行のみ) |
| `app/layout.tsx` | Header/Footer を `SiteChrome` で包む(公開側の DOM 構造は不変を検証済み) |
| `.gitignore` | アップロード画像を除外 |
| `eslint.config.mjs` | 既存の Lint 破損を修復(§6 参照) |
| `package.json` / `package-lock.json` | `eslint-plugin-react-hooks` の override 追加のみ(依存の新規追加なし) |

---

## 3. 作成した API

### 公開 API(認証不要・公開投稿のみ)

| ルート | メソッド | 内容 |
|---|---|---|
| `/api/gallery` | GET | `isPublished: true` のみ、`sortOrder` 昇順 → `createdAt` 降順、タグ付き |
| `/api/gallery/[id]` | GET | 公開投稿の詳細(非公開は 404) |

### 管理 API(すべてサーバー側で認証確認)

| ルート | メソッド | 内容 |
|---|---|---|
| `/api/admin/login` | POST | ログイン(Cookie 発行) |
| `/api/admin/logout` | POST | ログアウト(Cookie 破棄) |
| `/api/admin/gallery` | GET / POST | 全投稿一覧(非公開含む)/ 新規作成 |
| `/api/admin/gallery/[id]` | GET / PATCH / DELETE | 詳細 / 更新 / 削除 |
| `/api/admin/gallery/[id]/publish` | PATCH | 公開・非公開切り替え |
| `/api/admin/gallery/order` | PATCH | 表示順一括更新(トランザクション) |
| `/api/admin/tags` | GET / POST | 一覧(`?type=` 絞り込み・使用数付き)/ 作成 |
| `/api/admin/tags/[id]` | PATCH / DELETE | 更新 / 削除(name・slug 重複チェック) |
| `/api/admin/upload` | POST | 画像アップロード |

- タグ更新は `$transaction` で `GalleryItemTag` を貼り替え、送信された tagId の実在確認も API 側で実施
- タグ削除は `onDelete: Cascade` で関連 `GalleryItemTag` のみ削除され、`GalleryItem` 本体は残る

---

## 4. 必要な環境変数

`.env` に追記済み。`.env.example` に見本あり。

| 変数 | 内容 |
|---|---|
| `DATABASE_URL` | PostgreSQL 接続文字列(**現在プレースホルダのため要設定**) |
| `ADMIN_EMAIL` | オーナーのログインメールアドレス(設定済み) |
| `ADMIN_PASSWORD_HASH` | scrypt ハッシュ。開発用初期パスワード **`trea-admin`** で設定済み |
| `SESSION_SECRET` | セッション署名用ランダム文字列(生成・設定済み) |

### オーナーアカウントの作成・パスワード変更方法

```bash
node scripts/hash-password.mjs "新しいパスワード"
# 出力された "scrypt:..." を .env の ADMIN_PASSWORD_HASH に貼り替え、サーバーを再起動
```

アカウントは DB ではなく環境変数で管理(オーナー1名のため)。

---

## 5. 管理画面へのアクセス・動作確認手順

1. PostgreSQL を起動し、`.env` の `DATABASE_URL` を実際の接続先に設定
2. 初回のみ: `npx prisma db push && npx prisma db seed`
3. `npm run dev`
4. `http://localhost:3000/admin/login` を開き、`ADMIN_EMAIL` のアドレスと初期パスワード `trea-admin` でログイン
5. ギャラリー管理から投稿の作成・編集・削除・公開切替・表示順変更、タグ管理からタグの CRUD を確認
6. 公開サイト `http://localhost:3000/gallery` に公開中の投稿だけが sortOrder 順で表示されることを確認

---

## 6. 検証結果

### 実サーバーで確認済み

- 未ログインで `/admin`・`/admin/gallery` → `/admin/login` へ 307 リダイレクト
- ログイン済みで `/admin/login` → `/admin` へリダイレクト
- 全管理 API が未認証で 401(GET / POST / upload)
- 誤パスワードで 401、正規ログインで HttpOnly Cookie 発行、ログアウトで破棄
- 正規 PNG アップロード 201(UUID ファイル名で保存・配信確認)、拡張子と MIME を偽装したファイルはマジックバイト検証で 400
- 公開ページ(`/`・`/gallery`)は Header/Footer 含め表示不変、`/admin` 配下には Header/Footer が出ないこと
- `npx tsc --noEmit`・`npm run lint`・`next build` すべてゼロエラー

### 未検証(環境要因)

- **DB 依存の CRUD は実行未検証**。`.env` の `DATABASE_URL` がプレースホルダで、実装環境に PostgreSQL / Docker がなかったため。コードはビルド・型・認証境界まで検証済みで、実 DB を用意すれば上記手順で動作確認できる。

### 既存 Lint 設定の修復(付随作業)

`npm run lint` が実装前から壊れていた(`eslint.config.mjs` が eslint-config-next v15 の書式なのに v14 がインストールされていた)。以下の最小修正で復旧:

1. `FlatCompat` 経由で `next/core-web-vitals` を読み込むよう変更
2. `package.json` に `overrides.eslint-plugin-react-hooks: ^5.2.0` を追加(v4 が ESLint 9 非対応のため)
3. ESLint 9 非対応でクラッシュする `@next/next/no-duplicate-head` ルールを無効化(Pages Router の `_document` 専用ルールで本プロジェクトでは無関係)

---

## 7. 今後の改善案

- **画像ストレージのクラウド移行**: Vercel 等へデプロイする場合、ローカルファイル保存は永続化されないため Vercel Blob / Supabase Storage へ移行する(`lib/uploads.ts` の差し替えのみで対応可能な構成にしてある)
- **画像圧縮**: sharp を導入して Web 表示用に自動リサイズ・WebP 変換
- **ドラッグ&ドロップ並び替え**: 現在は数値入力。dnd ライブラリ導入で直感的に
- **ログイン試行のレート制限**: 総当たり対策(現在は scrypt の計算コストと一般化エラーメッセージのみ)
- **Prisma Migration の導入**: 現在は `db push` 運用。本番運用ではマイグレーション履歴の管理を推奨
