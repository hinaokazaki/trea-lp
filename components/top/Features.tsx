import { Scissors, Home, Car } from "lucide-react";

const features = [
  {
    icon: <Scissors size={20} />,
    title: "短い爪が得意",
    description:
      "爪を伸ばせなくても大丈夫。美しいフォルムで可愛さを引き出します。",
  },
  {
    icon: <Home size={20} />,
    title: "完全貸切・一席のみ",
    description:
      "他のお客様を気にせず、ゆったりと過ごせる空間です。",
  },
  {
    icon: <Car size={20} />,
    title: "広い駐車場あり",
    description:
      "お車でのご来店も安心。ゆったりした駐車スペースをご用意。",
  },
];

export default function Features() {
  return (
    <section className="py-10 px-6 border-b border-stone-200">
      <p className="text-[11px] font-medium text-stone-400 tracking-[.1em] uppercase mb-4">
        TRE&apos;A nails について
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-stone-200 rounded-xl p-5 flex flex-col gap-3 shadow-sm"
          >
            <div className="w-9 h-9 rounded-full bg-[#FBEAF0] flex items-center justify-center text-[#993556] shrink-0">
              {f.icon}
            </div>
            <p className="text-sm font-medium text-stone-800">{f.title}</p>
            <p className="text-xs text-stone-500 leading-[1.75]">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
