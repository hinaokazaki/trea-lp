export default function NameOrigin() {
  return (
    <section className="py-10 px-6">
      <p className="text-[11px] font-medium text-stone-400 tracking-[.1em] uppercase mb-6">
        店名の由来
      </p>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="text-center shrink-0 px-8 py-6 border border-[#F4C0D1] rounded-xl bg-[#FBEAF0]">
          <p className="text-3xl font-medium tracking-[.14em] text-[#72243E]">
            TRE&apos;A
          </p>
          <p className="text-[11px] text-[#993556] tracking-[.08em] mt-1">
            トレア
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-medium text-stone-800">treat</span>
            <span className="text-xs text-stone-400">/triːt/</span>
            <span className="text-xs text-stone-500">ご褒美・特別なおもてなし</span>
          </div>
          <p className="text-sm text-stone-500 leading-[1.8]">
            「treat（ご褒美）」からインスピレーションを受け、
            <br className="hidden md:block" />
            頑張るあなたへの&ldquo;ちょっとしたご褒美&rdquo;という想いを込めた店名です。
          </p>
        </div>
      </div>
    </section>
  );
}
