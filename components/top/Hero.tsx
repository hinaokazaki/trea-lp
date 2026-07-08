import Image from "next/image";
import Button from "@/components/common/Button";

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 min-h-80 border-b border-stone-200">
      {/* Copy */}
      <div className="flex flex-col justify-center gap-4 px-8 py-10">
        <p className="text-[11px] text-[#993556] tracking-[.12em] font-medium">
          完全貸切一席サロン
        </p>
        <h1 className="text-2xl font-medium leading-[1.6] text-stone-800">
          短い爪でも、
          <br />
          可愛くて上品に。
        </h1>
        <p className="text-sm text-stone-500 leading-[1.8]">
          家事や育児で爪を伸ばせないあなたへ。
          <br />
          毎日頑張るご自分への、小さなご褒美を。
        </p>
        <div className="flex gap-3 flex-wrap mt-1">
          <Button href="/reservation">ご予約はこちら</Button>
          <Button href="/gallery" variant="ghost">
            ギャラリーを見る
          </Button>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative min-h-60 md:min-h-0 bg-stone-100">
        <Image
          src="/images/top/hero-nail.webp"
          alt="ネイル施術写真（仮画像 / PLACEHOLDER）"
          fill
          className="object-cover"
          priority
        />
        <span className="absolute bottom-2 right-2 text-[10px] bg-black/40 text-white px-2 py-0.5 rounded">
          PLACEHOLDER
        </span>
      </div>
    </section>
  );
}
