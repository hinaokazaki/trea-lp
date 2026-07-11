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
      <div className="w-full border-b border-[#E4E2EE] bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-[11px] font-medium text-[#5D5786] tracking-[.12em] mb-4">
            ✦ MENU &amp; PRICE
          </p>
          <h1 className="font-serif text-2xl font-medium text-[#312F55] mb-4">
            メニュー・料金
          </h1>
          <p className="text-sm text-[#6B6880] leading-[1.8]">
            すべて手指10本の料金です。フットは別途ご案内しております。
            <br />
            料金はすべて税込み表示です。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 py-8">
        {/* Menu table */}
        <MenuTable />
      </div>

      {/* Flow — full width background */}
      <section className="w-full bg-[#EFEBF1]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[#5D5786]">✦</span>
            <span className="font-serif text-sm font-medium text-[#312F55]">
              ご予約の流れ
            </span>
          </div>
          <ReservationFlowSteps />
        </div>
      </section>

      {/* Notes */}
      <section className="w-full border-y border-[#E4E2EE]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#5D5786]">✦</span>
            <span className="font-serif text-sm font-medium text-[#312F55]">
              ご来店前にご確認ください
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {notes.map((note, i) => (
              <p
                key={i}
                className="text-xs text-[#6B6880] leading-[1.8] flex gap-2"
              >
                <span className="text-[#5D5786] shrink-0">・</span>
                {note}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        variant="feature"
        title="ご不明な点はお気軽にご相談ください"
        description="LINEでのご質問も大歓迎です"
        primaryLabel="ご予約・お問い合わせ"
        primaryHref="/reservation"
      />
    </>
  );
}
