const steps = [
  {
    title: "ご予約",
    description:
      "フォームまたはLINEでご予約。希望デザインのイメージも一緒にお送りください。",
  },
  {
    title: "住所のご案内",
    description: "ご予約確定後、サロンの住所をお知らせします。",
  },
  {
    title: "ご来店・カウンセリング",
    description:
      "お好みやその日の気分をヒアリング。お悩みも気軽にご相談を。",
  },
  {
    title: "施術",
    description:
      "完全貸切のゆったりとした空間で、ほっとひと息ついてください。",
  },
  {
    title: "お会計・ご帰宅",
    description:
      "お支払いは現金にてお願いします。次回ご予約もここでどうぞ。",
  },
];

export default function ReservationFlowSteps() {
  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-6 h-6 rounded-full bg-[#FBEAF0] border border-[#D4537E] flex items-center justify-center text-[11px] font-semibold text-[#993556] shrink-0 mt-0.5">
            {i + 1}
          </div>
          <div>
            <p className="text-sm font-medium text-stone-800">{step.title}</p>
            <p className="text-xs text-stone-500 mt-1 leading-[1.75]">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
