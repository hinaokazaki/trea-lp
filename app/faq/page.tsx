import { faqCategories } from "@/lib/data/faq";
import FaqCategorySection from "@/components/faq/FaqCategorySection";
import Button from "@/components/common/Button";

export default function FaqPage() {
  return (
    <>
      {/* Page header */}
      <div className="px-8 py-10 border-b border-stone-200">
        <p className="text-[11px] font-medium text-stone-400 tracking-[.1em] uppercase mb-3">
          FAQ
        </p>
        <h1 className="text-xl font-medium text-stone-800 mb-3">
          よくあるご質問
        </h1>
        <p className="text-sm text-stone-500 leading-[1.8]">
          ご予約前にぜひご一読ください。解決しない場合はLINEからお気軽にご相談ください。
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 py-8">
        {faqCategories.map((cat, i) => (
          <FaqCategorySection
            key={cat.id}
            category={cat}
            firstOpen={i === 0}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="py-10 px-6 bg-stone-50 border-t border-stone-200 text-center">
        <p className="text-sm font-medium text-stone-800 mb-2">
          解決しない場合は、お気軽にご連絡ください
        </p>
        <p className="text-xs text-stone-500 mb-6">
          LINEでのご質問・ご相談も大歓迎です
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            href="https://lin.ee/RnMcmQl"
            variant="line"
            external
          >
            LINEで質問する
          </Button>
          <Button href="/reservation">ご予約はこちら</Button>
        </div>
      </section>
    </>
  );
}
