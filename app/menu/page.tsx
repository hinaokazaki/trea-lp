import { Info } from "lucide-react";
import MenuTable from "@/components/menu/MenuTable";
import ReservationFlowSteps from "@/components/menu/ReservationFlowSteps";
import CtaBanner from "@/components/common/CtaBanner";

const notes = [
  "爪の状態（長さ・形・傷み具合）によって料金・施術時間が変わる場合がございます。お気軽にご相談ください。",
  "自宅サロンのため、住所はご予約確定後にLINEまたはメールにてお知らせします。ゆったりとした駐車場をご用意しています。",
  "デザインのご相談はインスタグラムの参考画像をお持ちいただくとスムーズです。",
];

export default function MenuPage() {
  return (
    <>
      {/* Page header */}
      <div className="px-8 py-10 border-b border-stone-200">
        <p className="text-[11px] font-medium text-stone-400 tracking-[.1em] uppercase mb-3">
          MENU &amp; PRICE
        </p>
        <h1 className="text-xl font-medium text-stone-800 mb-3">
          メニュー・料金
        </h1>
        <p className="text-sm text-stone-500 leading-[1.8]">
          すべて手指10本の料金です。フットは別途ご案内しております。
          <br />
          料金はすべて税込み表示です。
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 py-8">
        {/* Menu table */}
        <MenuTable />

        {/* Notes */}
        <section className="mt-10">
          <p className="text-[11px] font-medium text-stone-400 tracking-[.1em] uppercase mb-4">
            ご来店前にご確認ください
          </p>
          <div className="flex flex-col gap-3">
            {notes.map((note, i) => (
              <div
                key={i}
                className="flex gap-3 items-start bg-stone-50 rounded-lg px-4 py-3 text-xs text-stone-500 leading-[1.8]"
              >
                <Info size={15} className="text-[#993556] shrink-0 mt-0.5" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Flow */}
        <section className="mt-10">
          <p className="text-[11px] font-medium text-stone-400 tracking-[.1em] uppercase mb-5">
            施術の流れ
          </p>
          <ReservationFlowSteps />
        </section>
      </div>

      <CtaBanner
        title="ご不明な点はお気軽にご相談ください"
        description="LINEでのご質問も大歓迎です"
        primaryLabel="ご予約・お問い合わせ"
        primaryHref="/reservation"
      />
    </>
  );
}
