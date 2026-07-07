import FaqAccordionItem from "./FaqAccordionItem";
import type { FaqCategory } from "@/lib/data/faq";

type Props = { category: FaqCategory; firstOpen?: boolean };

export default function FaqCategorySection({ category, firstOpen }: Props) {
  return (
    <div className="mb-8">
      <p className="text-xs font-medium text-[#993556] tracking-[.08em] px-3 py-1.5 bg-[#FBEAF0] border-l-4 border-[#D4537E] rounded-r-lg inline-block mb-3">
        {category.icon} {category.name}
      </p>
      {category.items.map((item, i) => (
        <FaqAccordionItem
          key={i}
          question={item.question}
          answer={item.answer}
          defaultOpen={firstOpen && i === 0}
        />
      ))}
    </div>
  );
}
