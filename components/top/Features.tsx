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
    <section className="w-full border-b border-stone-200 bg-stone-50">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col items-center mb-8">
          <p className="font-serif text-base font-medium text-stone-800">
            TRE&apos;A NAILS について
          </p>
          <span className="w-8 h-px bg-[#D4537E] mt-3" />
        </div>
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-xl p-6 flex flex-col items-center text-center gap-3 shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-[#FBEAF0] flex items-center justify-center text-[#993556] shrink-0">
                {f.icon}
              </div>
              <p className="font-serif text-sm font-medium text-stone-800">{f.title}</p>
              <p className="text-xs text-stone-500 leading-[1.75]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
