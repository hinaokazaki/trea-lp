import { Sparkles } from "lucide-react";

export default function NameOrigin() {
  return (
    <section className="py-10 px-6">
      <p className="flex items-center gap-2.5 text-xs font-medium text-[#312F55] tracking-[.16em] mb-6">
        <Sparkles size={15} className="text-[#5D5786]" />
        店名の由来
      </p>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="text-center shrink-0 px-8 py-6 border border-[#D5D2E3] rounded-xl bg-[#EFEDF5]">
          <p className="font-serif text-3xl font-medium tracking-[.14em] text-[#3A3560]">
            TRE&apos;A
          </p>
          <p className="text-[11px] text-[#5D5786] tracking-[.08em] mt-1">
            トレア
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-medium text-[#312F55]">treat</span>
            <span className="text-xs text-[#8D8AA0]">/triːt/</span>
            <span className="text-xs text-[#6B6880]">
              ご褒美・特別なおもてなし
            </span>
          </div>
          <p className="text-sm text-[#6B6880] leading-[1.8]">
            「treat（ご褒美）」からインスピレーションを受け、
            <br className="hidden md:block" />
            頑張るあなたへの&ldquo;ちょっとしたご褒美&rdquo;という想いを込めた店名です。
          </p>
        </div>
      </div>
    </section>
  );
}
