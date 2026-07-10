import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function SalonThought() {
  return (
    <section className="py-12 px-6">
      <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 items-center">
        <div>
          <p className="flex items-center gap-2.5 text-xs font-medium text-[#312F55] tracking-[.16em] mb-6">
            <Sparkles size={15} className="text-[#5D5786]" />
            サロンの想い
          </p>

          <h2 className="font-serif text-[22px] md:text-2xl font-medium leading-[1.75] text-[#312F55] tracking-[.06em] mb-8">
            ふっと心が軽くなる、
            <br />
            そんな時間を。
          </h2>

          <div className="flex flex-col gap-6 text-sm text-[#454263] leading-[2.05] tracking-[.02em]">
            <p>
              ネイルを見た瞬間、ふっと心が軽くなったり、
              <br className="hidden sm:block" />
              少し嬉しい気持ちになれたり。
            </p>
            <p>
              サロンに来る時間が、ほっとひと息つける
              <br className="hidden sm:block" />
              &ldquo;ちょっとしたご褒美時間&rdquo;になってほしい。
            </p>
            <p>
              そんな願いを込めて、&ldquo;ご褒美&rdquo;を意味する「treat」から
              <br className="hidden sm:block" />
              TRE&apos;A（トレア）という名前を付けました。
            </p>
            <p>皆さまにお会いできる日を、楽しみにしております。</p>
          </div>

          <p className="font-serif text-[15px] text-[#312F55] tracking-[.08em] mt-8">
            &mdash;&ensp;TRE&apos;A nails
          </p>
        </div>

        <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-[#EDEBF4]">
          <Image
            src="/images/concept/salon-thought.webp"
            alt="サロン内観（仮画像 / PLACEHOLDER）"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 560px"
          />
          {/* <span className="absolute bottom-2 right-2 text-[10px] bg-black/40 text-white px-2 py-0.5 rounded">
            サロン内観
          </span> */}
        </div>
      </div>
    </section>
  );
}
