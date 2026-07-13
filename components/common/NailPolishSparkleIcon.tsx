/**
 * ネイルポリッシュボトル+キラキラのカスタムアイコン。
 * Lucideと同じ24pxグリッド・stroke幅2で描いているので、Lucideアイコンと並べても馴染む。
 * 使用箇所: トップのFeatures 1枚目カード / コンセプトの「大切にしていること」1枚目カード
 */
export default function NailPolishSparkleIcon({
  size = 20,
}: {
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="8" y="3" width="4" height="5" rx="1" />
      <path d="M8 8h4v2.4c1.8.6 3 2.3 3 4.3V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5.3c0-2 1.2-3.7 3-4.3V8z" />
      <path d="M19 2v4" />
      <path d="M21 4h-4" />
      <path d="M19.5 10v2" />
      <path d="M20.5 11h-2" />
    </svg>
  );
}
