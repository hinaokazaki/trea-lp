import Image from "next/image";
import Link from "next/link";
import ReservationMethodCard from "@/components/reservation/ReservationMethodCard";

const afterSteps = [
  {
    title: "日程・メニューの確認",
    description: "ご希望の日時・メニューをお伺いし、日程を確定します。",
  },
  {
    title: "住所のご案内",
    description: (
      <>
        <p>ご予約確定後、サロンの住所・駐車場の詳細をお知らせします。</p>
        <div className="mt-2 bg-[#EFEDF5] border border-[#D5D2E3] rounded-lg px-3 py-2 text-[#3A3560]">
          📍
          自宅サロンのため、住所はご予約確定前にはお伝えしておりません。ご了承ください。
        </div>
      </>
    ),
  },
  {
    title: "ご来店・施術",
    description:
      "完全貸切の空間で、ゆっくりとお過ごしください。施術は約2〜3時間です。",
  },
];

const otherNotes = [
  "お問い合わせも同様に、LINEまたはInstagramのDMにてご連絡ください。",
  "営業日はInstagramのハイライトにて随時更新しています。",
  "お支払いは現金のみです。ご来店の際はお手数ですがご用意ください。",
  "デザインの参考画像がある場合は、ご予約時にお送りいただくとスムーズです（持ち込みデザインは施術日3日前までに送付）。",
];

export default function ReservationPage() {
  return (
    <>
      {/* Page header */}
      <div className="w-full border-b border-[#E4E2EE] bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-[11px] font-medium text-[#5D5786] tracking-[.12em] mb-4">
            ✦ RESERVATION
          </p>
          <h1 className="font-serif text-2xl font-medium text-[#312F55] mb-4">
            ご予約
          </h1>
          <p className="text-sm text-[#6B6880] leading-[1.85]">
            LINEまたはInstagramのDMからご予約いただけます。
            <br />
            ご予約前に必ず{" "}
            <Link href="/faq" className="text-[#5D5786] underline">
              FAQ（注意事項）
            </Link>{" "}
            をお読みください。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 py-8">
        {/* Warning banner */}
        <div className="bg-[#fff8f0] border border-[#f5c97a] rounded-xl px-5 py-4 flex gap-4 items-start mb-8">
          <span className="text-xl shrink-0">⚠️</span>
          <div>
            <p className="text-sm font-medium text-[#7a4a00] mb-1">
              ご予約前に必ずご確認ください
            </p>
            <p className="text-xs text-[#7a4a00] leading-[1.75]">
              キャンセルポリシー・施術内容・所要時間（約2〜3時間）などをFAQページにまとめています。ご同意いただける方のみご予約をお願いいたします。
            </p>
          </div>
        </div>

        {/* Method cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <ReservationMethodCard
            method="line"
            methodNum="METHOD 01"
            title="LINEから予約"
            buttonLabel="LINEで予約・お問い合わせ"
            buttonHref="https://lin.ee/RnMcmQl"
            steps={[
              {
                title: "LINEお友達追加",
                description: (
                  <>
                    <p>
                      下記のボタンまたはQRコードからTRE&apos;A
                      nailsのLINEを友達追加してください。
                    </p>
                    <div className="my-3 text-center">
                      <div className="inline-block relative w-20 h-20 rounded-lg overflow-hidden border border-[#E4E2EE] bg-white">
                        <Image
                          src="/images/reservation/line.png"
                          alt="TRE'A nails LINE友だち追加QRコード"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-[10px] text-[#8D8AA0] mt-1">
                        lin.ee/RnMcmQl
                      </p>
                    </div>
                  </>
                ),
              },
              {
                title: "注意事項を確認",
                description:
                  "LINEメニューの「INFORMATION（注意事項）」をご確認ください。",
              },
              {
                title: "『ネイル希望』と送信",
                description: (
                  <>
                    トークにて
                    <strong className="text-[#06C755]">「ネイル希望」</strong>
                    とお送りください。順次ご返信いたします。
                  </>
                ),
              },
            ]}
          />

          <ReservationMethodCard
            method="instagram"
            methodNum="METHOD 02"
            title="Instagramから予約"
            buttonLabel="Instagramをフォロー"
            buttonHref="https://www.instagram.com/trea_nails_/"
            steps={[
              {
                title: "フォロー",
                description: (
                  <>
                    <p>
                      Instagramアカウント <strong>@trea_nails_</strong>{" "}
                      をフォローしてください。
                    </p>
                    <div className="my-3 text-center">
                      <div className="inline-block relative w-20 h-20 rounded-lg overflow-hidden border border-[#E4E2EE] bg-white">
                        <Image
                          src="/images/reservation/instagram.jpg"
                          alt="TRE'A nails InstagramフォローQRコード"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-[10px] text-[#8D8AA0] mt-1">
                        @trea_nails_
                      </p>
                    </div>
                  </>
                ),
              },
              {
                title: "注意事項を確認",
                description:
                  "プロフィールのハイライト「注意事項」をご確認ください。営業日もハイライトにて更新しています。",
              },
              {
                title: "DMで『ネイル希望』と送信",
                description: (
                  <>
                    メッセージ（DM）にて
                    <strong className="text-[#833AB4]">「ネイル希望」</strong>
                    とお送りください。順次ご返信いたします。
                  </>
                ),
              },
            ]}
          />
        </div>

        {/* After confirmation flow */}
        <section className="border-t border-[#CFCCDD] pt-8 mb-10">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[#5D5786]">✦</span>
            <span className="font-serif text-sm font-medium text-[#312F55]">
              ご予約確定後の流れ
            </span>
          </div>
          <div className="flex flex-col gap-5">
            {afterSteps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-[#EFEDF5] border-[1.5px] border-[#9690AE] flex items-center justify-center text-[12px] font-semibold text-[#5D5786] shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="font-serif text-sm font-medium text-[#312F55]">
                    {step.title}
                  </p>
                  <div className="text-xs text-[#6B6880] mt-1 leading-[1.75]">
                    {typeof step.description === "string" ? (
                      <p>{step.description}</p>
                    ) : (
                      step.description
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other notes */}
        <section className="border-t border-[#CFCCDD] pt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#5D5786]">✦</span>
            <span className="font-serif text-sm font-medium text-[#312F55]">
              その他ご注意
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {otherNotes.map((note, i) => (
              <div
                key={i}
                className="flex gap-3 text-xs text-[#6B6880] leading-[1.75]"
              >
                <span className="text-[#5D5786] text-sm shrink-0">✦</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <section className="w-full border-t border-[#E4E2EE] bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center">
        <div className="max-w-5xl mx-auto px-6 py-15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-serif text-lg font-medium text-[#312F55]">
            皆さまにお会いできる日を楽しみにしております
          </p>
          <div className="flex gap-3 flex-wrap shrink-0">
            <a
              href="https://lin.ee/RnMcmQl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-medium border-[1.5px] border-[#06C755] text-[#06C755] bg-[#f0fbf2] hover:bg-[#d0f0d8] transition-colors"
            >
              LINEで予約
            </a>
            <a
              href="https://www.instagram.com/trea_nails_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-medium border-[1.5px] border-[#833AB4] text-[#833AB4] bg-[#faf0ff] hover:bg-[#eed9ff] transition-colors"
            >
              Instagramから予約
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
