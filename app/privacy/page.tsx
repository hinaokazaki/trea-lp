import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | TRE'A",
  description: "TRE'A（トレア）のプライバシーポリシーについてのページです。",
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    heading: "1. 事業者情報",
    content: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>名称：TRE&apos;A（プライベートネイルサロン）</li>
        <li>
          お問い合わせ窓口：本サイトに記載のLINE公式アカウントまたはInstagramアカウントよりご連絡ください
        </li>
      </ul>
    ),
  },
  {
    heading: "2. 取得する情報について",
    content: (
      <>
        <p>
          当サイトは、ご予約フォームなど直接個人情報を入力・送信いただく仕組みは設けておらず、ご予約およびお問い合わせはLINE公式アカウントまたはInstagramのダイレクトメッセージを通じて行っていただいております。
        </p>
        <p className="mt-4">
          そのため、当サイト自体がお客様の氏名・連絡先等の個人情報を収集・保存することはありません。ご予約・お問い合わせの際にLINEまたはInstagram上でやり取りされるお名前、ご連絡先、ご希望内容等の情報は、それぞれのサービス（LINE株式会社、Meta社が提供するInstagram）が定める利用規約・プライバシーポリシーに基づき取り扱われます。各サービスにおける個人情報の取り扱いについては、各社の公表するプライバシーポリシーをご確認ください。
        </p>
      </>
    ),
  },
  {
    heading: "3. Cookie（クッキー）およびアクセス解析ツールについて",
    content: (
      <p>
        現時点で、当サイトではGoogle
        Analyticsをはじめとするアクセス解析ツールは導入しておらず、閲覧履歴等を収集するCookieの使用も行っておりません。今後、サイト改善等の目的でアクセス解析ツールを導入する場合は、本ポリシーを改定し、利用目的とあわせて明示いたします。
      </p>
    ),
  },
  {
    heading: "4. 第三者提供について",
    content: (
      <p>
        当サロンは、法令に基づく場合を除き、取得した情報を本人の同意なく第三者に提供することはありません。
      </p>
    ),
  },
  {
    heading: "5. ギャラリーに掲載する写真について",
    content: (
      <p>
        当サイトのギャラリーページに掲載しているネイルデザインの写真は、ご来店いただいたお客様の事前の同意を得たうえで掲載しております。写真の掲載について、掲載後にお客様よりお申し出があった場合は、速やかに削除等の対応を行います。
      </p>
    ),
  },
  {
    heading: "6. 個人情報に関するお問い合わせ",
    content: (
      <p>
        ご自身に関する情報の確認・訂正・削除等をご希望の場合は、上記お問い合わせ窓口（LINE公式アカウントまたはInstagram）までご連絡ください。内容を確認のうえ、合理的な範囲で対応いたします。
      </p>
    ),
  },
  {
    heading: "7. 本ポリシーの変更について",
    content: (
      <p>
        当サロンは、法令の変更やサービス内容の変更等に応じて、本ポリシーの内容を予告なく変更することがあります。変更後の内容は、当サイトに掲載した時点から効力を生じるものとします。
      </p>
    ),
  },
  {
    heading: "8. 制定日",
    content: <p>制定日：2026年7月26日</p>,
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Page header */}
      <div className="w-full border-b border-[#E4E2EE] bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-[11px] font-medium text-[#5D5786] tracking-[.12em] mb-4">
            ✦ PRIVACY POLICY
          </p>
          <h1 className="font-serif text-2xl font-medium text-[#312F55] mb-4">
            プライバシーポリシー
          </h1>
          <p className="text-sm text-[#6B6880] leading-[1.85]">
            TRE&apos;A（以下「当サロン」といいます）は、お客様の個人情報の重要性を認識し、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定め、個人情報の適切な保護に努めます。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 py-12">
        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="border-b border-[#D5D2E3] pb-10 last:border-b-0 last:pb-0"
            >
              <h2 className="font-serif text-base font-medium text-[#312F55] mb-4">
                {section.heading}
              </h2>
              <div className="text-sm text-[#2b2a40] leading-[2]">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
