import Image from "next/image";

export default function SalonThought() {
  return (
    <section className="py-10 px-6 border-b border-stone-200">
      <p className="text-[11px] font-medium text-stone-400 tracking-[.1em] uppercase mb-6">
        サロンの想い
      </p>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-5 text-sm text-stone-500 leading-[1.9]">
          <p>
            ネイルを見た瞬間、ふっと心が軽くなったり、少し嬉しい気持ちになれたり。
          </p>
          <p>
            サロンに来る時間が、ほっとひと息つける
            <em className="not-italic text-stone-800 font-medium">
              &ldquo;ちょっとしたご褒美時間&rdquo;
            </em>
            になってほしい。
          </p>
          <p>
            そんな願いを込めて、&ldquo;ご褒美&rdquo;を意味する「treat」から
            <em className="not-italic text-[#993556] font-medium">
              TRE&apos;A（トレア）
            </em>
            という名前を付けました。
          </p>
          <p>皆さまにお会いできる日を、楽しみにしております。</p>
          <p className="text-xs text-stone-400 italic mt-1">— TRE&apos;A nails</p>
        </div>

        <div className="relative h-56 md:h-64 rounded-xl overflow-hidden bg-stone-100">
          <Image
            src="/images/concept/salon-thought.webp"
            alt="サロン内観（仮画像 / PLACEHOLDER）"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="absolute bottom-2 right-2 text-[10px] bg-black/40 text-white px-2 py-0.5 rounded">
            PLACEHOLDER
          </span>
        </div>
      </div>
    </section>
  );
}
