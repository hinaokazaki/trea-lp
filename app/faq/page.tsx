import { faqCategories } from "@/lib/data/faq";
import FaqCategorySection from "@/components/faq/FaqCategorySection";
import Button from "@/components/common/Button";

export default function FaqPage() {
  return (
    <>
      {/* Page header */}
      <div className="w-full border-b border-stone-200 bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-[11px] font-medium text-[#993556] tracking-[.12em] mb-4">
            ✦ FAQ
          </p>
          <h1 className="text-2xl font-medium text-stone-800 mb-4">
            よくあるご質問
          </h1>
          <p className="text-sm text-stone-500 leading-[1.8]">
            ご予約前にぜひご一読ください。解決しない場合はLINEからお気軽にご相談ください。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 py-8">
        {faqCategories.map((cat, i) => (
          <FaqCategorySection
            key={cat.id}
            category={cat}
            firstOpen={i === 0}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="w-full border-t border-stone-200 bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-lg font-medium text-stone-800 mb-1.5">
              解決しない場合は、お気軽にご連絡ください
            </p>
            <p className="text-sm text-stone-500">
              LINEでのご質問・ご相談も大歓迎です
            </p>
          </div>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Button
              href="https://lin.ee/RnMcmQl"
              variant="line"
              external
            >
              LINEで質問する
            </Button>
            <Button href="/reservation">ご予約はこちら</Button>
          </div>
        </div>
      </section>
    </>
  );
}
