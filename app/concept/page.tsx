import SectionHeading from "@/components/common/SectionHeading";
import SalonThought from "@/components/concept/SalonThought";
import NameOrigin from "@/components/concept/NameOrigin";
import CtaBanner from "@/components/common/CtaBanner";
import { HandHeart, Home, Scissors, Sparkles } from "lucide-react";

const values = [
  {
    icon: <Scissors size={20} />,
    title: '短い爪でも"可愛い"を',
    description:
      "爪を伸ばせなくても大丈夫。美しいフォルムで可愛さと上品さを引き出します。",
  },
  {
    icon: <Home size={20} />,
    title: "完全貸切の安心空間",
    description:
      "一席のみの完全貸切サロン。他のお客様を気にせず、ゆったりとした時間を。",
  },
  {
    icon: <HandHeart size={20} />,
    title: "実用的だけど可愛い",
    description:
      "家事や育児の中でも安心なフォルム。日常に寄り添う、実用的なデザインを。",
  },
];

export default function ConceptPage() {
  return (
    <>
      {/* Page header */}
      <div className="w-full bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center border-b border-[#D5D2E3]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="flex items-center gap-2.5 text-xs font-medium text-[#312F55] tracking-[.16em] mb-6">
            <Sparkles size={15} className="text-[#5D5786]" />✦ CONCEPT
          </p>
          <h1 className="font-serif text-2xl font-medium leading-[1.65] text-[#3A3560] mb-4">
            ネイルを通して、
            <br />
            毎日に小さなご褒美を。
          </h1>
          <p className="text-sm text-[#5D5786] leading-[1.9] max-w-xl">
            毎日家事や育児、お仕事を頑張っているあなたへ。
            <br />
            TRE&apos;Aは、心がふっと軽くなるようなご褒美の時間をお届けします。
          </p>
        </div>
      </div>

      {/* Salon thought */}
      <div className="max-w-5xl mx-auto w-full">
        <SalonThought />
        {/* Values */}
        <section className="py-10 px-6 border-b border-[#E4E2EE]">
          <p className="flex items-center gap-2.5 text-xs font-medium text-[#312F55] tracking-[.16em] mb-6">
            <Sparkles size={15} className="text-[#5D5786]" />
            TRE&apos;A が大切にしていること
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto ">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl p-6 bg-[#EFEDF5] border-gray-500 flex flex-col items-center text-center gap-3 shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-[#9690AE] flex items-center justify-center text-white shrink-0">
                  {v.icon}
                </div>
                <p className="font-serif text-sm font-medium text-[#312F55]">
                  {v.title}
                </p>
                <p className="text-xs text-[#6B6880] leading-[1.75]">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <NameOrigin />
      </div>

      <CtaBanner
        variant="feature"
        title="皆さまにお会いできる日を楽しみにしております"
        description="ご予約・ご相談はお気軽にどうぞ"
        primaryLabel="ご予約はこちら"
        primaryHref="/reservation"
      />
    </>
  );
}
