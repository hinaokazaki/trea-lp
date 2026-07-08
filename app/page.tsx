import { Check } from "lucide-react";
import Hero from "@/components/top/Hero";
import Features from "@/components/top/Features";
import GalleryPreview from "@/components/top/GalleryPreview";
import MenuPreview from "@/components/top/MenuPreview";
import CtaBanner from "@/components/common/CtaBanner";

const recommendedFor = [
  "爪が短くてネイルを諦めていた方",
  "家事・育児で伸ばせないけれど、おしゃれしたい方",
  "ゆっくりできる一人の時間が欲しい方",
  "初めてネイルサロンに行く方",
];

export default function TopPage() {
  return (
    <>
      <Hero />
      <Features />
      <GalleryPreview />
      <MenuPreview />

      {/* こんな方におすすめ */}
      {/* <section className="w-full bg-[#F6F5F9] border-b border-[#E4E2EE]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="text-[11px] font-medium text-[#8D8AA0] tracking-[.1em] uppercase mb-5">
            こんな方におすすめ
          </p>
          <div className="flex flex-col gap-3 max-w-lg">
            {recommendedFor.map((text) => (
              <div key={text} className="flex items-center gap-3 text-sm text-[#454263]">
                <Check size={16} className="text-[#5D5786] shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <CtaBanner
        variant="feature"
        title="毎日頑張るあなたへ、ネイルでちょっとご褒美を"
        description="ご予約はLINEまたはInstagramのDMからお気軽にどうぞ"
        primaryLabel="ご予約はこちら"
        primaryHref="/reservation"
        secondaryLabel="LINEで予約・相談"
        secondaryHref="https://lin.ee/RnMcmQl"
        secondaryVariant="line"
      />
    </>
  );
}
