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
      className={`border rounded-xl overflow-hidden mb-2 ${
        open ? "border-[#D5D2E3]" : "border-[#E4E2EE]"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex justify-between items-center px-4 py-3.5 text-left transition-colors ${
          open ? "bg-[#F5F3F9] text-[#5D5786]" : "bg-white text-[#312F55]"
        }`}
      >
        <span className="text-sm font-medium pr-3">{question}</span>
        <span className="shrink-0 text-[#5D5786]">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>

      {open && (
        <div className="px-4 py-3.5 border-t border-[#D5D2E3] bg-white">
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
                  className="mt-3 bg-[#EFEDF5] border border-[#D5D2E3] rounded-lg px-3 py-2.5 text-xs text-[#3A3560] leading-[1.8]"
                >
                  {para}
                </div>
              );
            }
            if (para.startsWith("①")) {
              return (
                <ol key={i} className="list-decimal pl-5 flex flex-col gap-2 text-xs text-[#6B6880] mb-2">
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
              <p key={i} className={`text-xs text-[#6B6880] leading-[1.85] ${i > 0 ? "mt-2" : ""}`}>
                {para}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
