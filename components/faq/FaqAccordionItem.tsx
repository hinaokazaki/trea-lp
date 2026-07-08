"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type Props = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export default function FaqAccordionItem({
  question,
  answer,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`border rounded-lg overflow-hidden mb-2 ${
        open ? "border-[#F4C0D1]" : "border-stone-200"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex justify-between items-center px-4 py-3.5 text-left transition-colors ${
          open ? "bg-[#FFF5F8] text-[#993556]" : "bg-white text-stone-800"
        }`}
      >
        <span className="text-sm font-medium pr-3">{question}</span>
        <span className="shrink-0 text-[#993556]">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>

      {open && (
        <div className="px-4 py-3.5 border-t border-[#F4C0D1] bg-white">
          {answer.split("\n\n").map((para, i) => {
            if (para.startsWith("⚠️")) {
              return (
                <div
                  key={i}
                  className="mt-3 bg-[#fff8f0] border border-[#f5c97a] rounded-lg px-3 py-2.5 text-xs text-[#7a4a00] leading-[1.8]"
                >
                  {para}
                </div>
              );
            }
            if (para.startsWith("📍")) {
              return (
                <div
                  key={i}
                  className="mt-3 bg-[#FBEAF0] border border-[#F4C0D1] rounded-lg px-3 py-2.5 text-xs text-[#72243E] leading-[1.8]"
                >
                  {para}
                </div>
              );
            }
            if (para.startsWith("①")) {
              return (
                <ol key={i} className="list-decimal pl-5 flex flex-col gap-2 text-xs text-stone-500 mb-2">
                  {para
                    .split(" → ")
                    .map((s) => s.replace(/^[①②③④⑤]\s*/, ""))
                    .map((s, j) => (
                      <li key={j}>{s}</li>
                    ))}
                </ol>
              );
            }
            return (
              <p key={i} className={`text-xs text-stone-500 leading-[1.85] ${i > 0 ? "mt-2" : ""}`}>
                {para}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
