import { menuCategories } from "@/lib/data/menu";
import { Clock } from "lucide-react";

export default function MenuTable() {
  return (
    <div className="flex flex-col gap-8">
      {menuCategories.map((cat) => (
        <div key={cat.id}>
          {/* Category header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#5D5786]">✦</span>
            <span className="font-serif text-sm font-medium text-[#312F55]">
              {cat.name}
            </span>
            {cat.badge && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFEDF5] border border-[#D5D2E3] text-[#5D5786]">
                {cat.badge}
              </span>
            )}
          </div>

          {/* Items */}
          <div className="divide-y divide-[#EDEBF4] px-5 bg-white rounded-xl shadow-sm">
            {cat.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-baseline py-3.5 gap-4"
              >
                <div>
                  <p className="text-sm text-[#312F55]">{item.name}</p>
                  {item.description && (
                    <p className="text-[11px] text-[#8D8AA0] mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="font-serif text-sm font-medium text-[#5D5786]">
                    {item.price}
                  </p>
                  {item.duration && (
                    <p className="text-[11px] text-[#8D8AA0] mt-0.5 flex items-center justify-end gap-1">
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
