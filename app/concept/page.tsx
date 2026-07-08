import SectionHeading from "@/components/common/SectionHeading";
import SalonThought from "@/components/concept/SalonThought";
import NameOrigin from "@/components/concept/NameOrigin";
import CtaBanner from "@/components/common/CtaBanner";

const values = [
  {
    icon: "🫧",
    title: '短い爪でも"可愛い"を',
    description:
      "爪を伸ばせなくても大丈夫。美しいフォルムで可愛さと上品さを引き出します。",
  },
  {
    icon: "🏡",
    title: "完全貸切の安心空間",
    description:
      "一席のみの完全貸切サロン。他のお客様を気にせず、ゆったりとした時間を。",
  },
  {
    icon: "✨",
    title: "実用的だけど可愛い",
    description:
      "家事や育児の中でも安心なフォルム。日常に寄り添う、実用的なデザインを。",
  },
];

export default function ConceptPage() {
  return (
    <>
      {/* Page header */}
      <div className="w-full bg-[#FBEAF0] border-b border-[#F4C0D1]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="text-[11px] text-[#993556] tracking-[.12em] mb-4 font-medium">
            ✦ CONCEPT
          </p>
          <h1 className="font-serif text-2xl font-medium leading-[1.65] text-[#72243E] mb-4">
            ネイルを見た瞬間、
            <br />
            ふっと心が軽くなる時間へ。
          </h1>
          <p className="text-sm text-[#993556] leading-[1.9] max-w-xl">
            毎日家事や育児、お仕事を頑張っているあなたへ。
            <br />
            TRE&apos;Aは、&ldquo;ご褒美&rdquo;を意味する「treat」から生まれたサロンです。
          </p>
        </div>
      </div>

      {/* Salon thought */}
      <div className="max-w-5xl mx-auto w-full">
        <SalonThought />

        {/* Values */}
        <section className="py-10 px-6 border-b border-stone-200">
          <p className="text-[11px] font-medium text-stone-400 tracking-[.1em] uppercase mb-6">
            TRE&apos;A が大切にしていること
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="px-5 py-5 border border-[#F4C0D1] rounded-xl bg-[#FBEAF0]"
              >
                <p className="text-xl mb-3">{v.icon}</p>
                <p className="font-serif text-sm font-medium text-[#72243E] mb-2">
                  {v.title}
                </p>
                <p className="text-xs text-[#993556] leading-[1.75]">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <NameOrigin />
      </div>

      <CtaBanner
        title="皆さまにお会いできる日を楽しみにしております"
        description="ご予約・ご相談はお気軽にどうぞ"
        primaryLabel="ご予約はこちら"
        primaryHref="/reservation"
      />
    </>
  );
}
