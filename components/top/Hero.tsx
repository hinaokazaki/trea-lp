import Image from "next/image";
import Button from "@/components/common/Button";

export default function Hero() {
  return (
    <section className="w-full border-b border-[#E4E2EE] bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 min-h-80">
          {/* Copy */}
          <div className="flex flex-col justify-center gap-4 py-10">
            <Image
              src="/images/top/logo.webp"
              alt="TRE'A private nail salon"
              width={235}
              height={101}
            />
            <p className="text-[11px] text-[#5D5786] tracking-[.12em] font-medium">
              完全貸切一席サロン
            </p>
            <h1 className="font-serif text-2xl font-medium leading-[1.6] text-[#312F55]">
              短い爪でも、可愛くて上品に。
            </h1>
            <p className="text-sm text-[#6B6880] leading-[1.8]">
              家事や育児で爪を伸ばせないあなたへ。
              <br />
              毎日頑張るご自分への、小さなご褒美を。
            </p>
            <div className="flex gap-3 flex-wrap mt-1">
              <Button href="/reservation" variant="solid">
                ご予約はこちら
              </Button>
              <Button href="/gallery" variant="ghost">
                ギャラリーを見る
              </Button>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative min-h-72 md:min-h-[420px] flex items-end justify-center md:justify-start overflow-hidden">
            <div className="relative w-full h-full max-w-[440px]">
              <Image
                src="/images/top/hero-nail.webp"
                alt="TRE'A nails の実際のネイルデザイン"
                fill
                className="object-contain object-bottom md:object-left-bottom"
                sizes="(min-width: 768px) 440px, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
