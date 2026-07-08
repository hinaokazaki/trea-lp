import FaqAccordionItem from "./FaqAccordionItem";
import type { FaqCategory } from "@/lib/data/faq";

type Props = { category: FaqCategory; firstOpen?: boolean };

export default function FaqCategorySection({ category, firstOpen }: Props) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span>{category.icon}</span>
        <span className="font-serif text-base font-medium text-stone-800">
          {category.name}
        </span>
      </div>
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
