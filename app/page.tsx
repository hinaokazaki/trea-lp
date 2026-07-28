import Hero from "@/components/top/Hero";
import Features from "@/components/top/Features";
import GalleryPreview from "@/components/top/GalleryPreview";
import MenuPreview from "@/components/top/MenuPreview";
import CtaBanner from "@/components/common/CtaBanner";

// ISR: ギャラリー最新4件を反映する(管理APIのrevalidatePathで即時反映もされる)
export const revalidate = 3600;

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
