// モーダル非表示時のフォールバック。
// これがないとハードナビゲーション時にスロットが解決できず404になる。
export default function Default() {
  return null;
}
