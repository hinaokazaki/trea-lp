import Link from "next/link";
import { topMenuItems } from "@/lib/data/menu";

export default function MenuPreview() {
  return (
    <section className="w-full border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-baseline mb-4">
          <p className="text-base font-medium text-stone-800">
            メニュー・料金（一部）
          </p>
          <Link
            href="/menu"
            className="text-xs text-[#993556] hover:underline"
          >
            すべてのメニューを見る →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          {topMenuItems.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center px-4 py-3 border border-stone-200 rounded-lg"
            >
              <span className="text-sm text-stone-800">{item.name}</span>
              <span className="text-sm font-medium text-[#993556]">
                {item.price}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-stone-400 mt-3">
          ※ 施術時間の目安はメニューページでご確認ください
        </p>
        <div className="mt-4">
          <Link
            href="/menu"
            className="text-xs text-[#993556] hover:underline"
          >
            メニュー詳細を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}
