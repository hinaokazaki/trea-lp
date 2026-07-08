import { Calendar, MapPin, MessageCircle, Sparkles, Heart } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "ご予約",
    description:
      "フォームまたはLINEでご予約。希望デザインのイメージも一緒にお送りください。",
  },
  {
    icon: MapPin,
    title: "住所のご案内",
    description: "ご予約確定後、サロンの住所をお知らせします。",
  },
  {
    icon: MessageCircle,
    title: "ご来店・カウンセリング",
    description:
      "お好みやその日の気分をヒアリング。お悩みも気軽にご相談を。",
  },
  {
    icon: Sparkles,
    title: "施術",
    description:
      "完全貸切のゆったりとした空間で、ほっとひと息ついてください。",
  },
  {
    icon: Heart,
    title: "お会計・ご帰宅",
    description:
      "お支払いは現金にてお願いします。次回ご予約もここでどうぞ。",
  },
];

export default function ReservationFlowSteps() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {steps.map((step, i) => (
        <div
          key={i}
          className="relative bg-white border border-stone-200 rounded-xl p-5 pt-6 flex flex-col items-center text-center gap-2"
        >
          <span className="absolute top-2.5 left-2.5 w-5 h-5 rounded-full bg-[#FBEAF0] text-[#993556] text-[10px] font-semibold flex items-center justify-center">
            {String(i + 1).padStart(2, "0")}
          </span>
          <step.icon size={22} className="text-[#993556] mb-1" />
          <p className="text-sm font-medium text-stone-800">{step.title}</p>
          <p className="text-xs text-stone-500 leading-[1.75]">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
