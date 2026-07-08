type Step = {
  title: string;
  description: React.ReactNode;
};

type Props = {
  method: "line" | "instagram";
  title: string;
  methodNum: string;
  steps: Step[];
  buttonLabel: string;
  buttonHref: string;
  extra?: React.ReactNode;
};

export default function ReservationMethodCard({
  method,
  title,
  methodNum,
  steps,
  buttonLabel,
  buttonHref,
  extra,
}: Props) {
  const isLine = method === "line";
  const headBg = isLine ? "bg-[#f0fbf2] border-b border-[#b2e6be]" : "bg-[#faf0ff] border-b border-[#d9b2f0]";
  const methodColor = isLine ? "text-[#2d7a30]" : "text-[#6a1fa0]";
  const titleColor = isLine ? "text-[#1a5c1e]" : "text-[#6a1fa0]";
  const stepNumStyle = isLine
    ? "bg-[#FBEAF0] border-[#D4537E] text-[#993556]"
    : "bg-[#faf0ff] border-[#d9b2f0] text-[#6a1fa0]";
  const btnStyle = isLine
    ? "border-[#06C755] text-[#06C755] bg-[#f0fbf2] hover:bg-[#d0f0d8]"
    : "border-[#833AB4] text-[#833AB4] bg-[#faf0ff] hover:bg-[#eed9ff]";

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden flex flex-col">
      <div className={`px-5 py-4 flex items-center gap-3 ${headBg}`}>
        <span className="text-2xl">{isLine ? "💬" : "📷"}</span>
        <div>
          <p className={`text-[11px] font-medium tracking-[.08em] ${methodColor}`}>
            {methodNum}
          </p>
          <p className={`text-[15px] font-semibold ${titleColor}`}>{title}</p>
        </div>
      </div>

      <div className="px-5 pt-4 pb-5 flex flex-col gap-4 flex-1">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3.5 items-start">
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-semibold shrink-0 mt-0.5 ${stepNumStyle}`}
            >
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-medium text-stone-800 mb-1">
                {step.title}
              </p>
              <div className="text-xs text-stone-500 leading-[1.75]">
                {step.description}
              </div>
            </div>
          </div>
        ))}

        {extra}

        <a
          href={buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-2 w-full flex justify-center items-center py-2.5 rounded-full text-sm font-medium border-[1.5px] transition-colors ${btnStyle}`}
        >
          {buttonLabel}
        </a>
      </div>
    </div>
  );
}
