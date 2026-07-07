import { menuCategories } from "@/lib/data/menu";
import { Clock } from "lucide-react";

export default function MenuTable() {
  return (
    <div className="flex flex-col gap-5">
      {menuCategories.map((cat) => (
        <div
          key={cat.id}
          className="border border-stone-200 rounded-xl overflow-hidden"
        >
          {/* Category header */}
          <div className="px-5 py-3.5 bg-[#FBEAF0] border-b border-[#F4C0D1] flex items-center gap-2">
            <span className="text-sm font-medium text-[#72243E]">
              {cat.name}
            </span>
            {cat.badge && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#F4C0D1] text-[#993556]">
                {cat.badge}
              </span>
            )}
          </div>

          {/* Items */}
          <div className="divide-y divide-stone-100 px-5">
            {cat.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-baseline py-3.5 gap-4"
              >
                <div>
                  <p className="text-sm text-stone-800">{item.name}</p>
                  {item.description && (
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium text-[#993556]">
                    {item.price}
                  </p>
                  {item.duration && (
                    <p className="text-[11px] text-stone-400 mt-0.5 flex items-center justify-end gap-1">
                      <Clock size={10} />
                      {item.duration}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
