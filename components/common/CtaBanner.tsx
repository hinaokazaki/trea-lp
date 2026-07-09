import Button from "./Button";

type Props = {
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryVariant?: "line" | "instagram" | "ghost";
  bg?: boolean;
  variant?: "light" | "feature";
};

export default function CtaBanner({
  title,
  description,
  primaryLabel = "ご予約はこちら",
  primaryHref = "/reservation",
  secondaryLabel,
  secondaryHref,
  secondaryVariant = "ghost",
  bg,
  variant = "light",
}: Props) {
  if (variant === "feature") {
    return (
      <section className="w-full bg-[url('/images/common/bg-marble.webp')] bg-cover bg-center">
        <div className="max-w-5xl mx-auto px-6 py-15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-lg font-medium text-[#312F55] mb-1.5">
              {title}
            </p>
            {description && (
              <p className="text-sm text-[#6B6880]">{description}</p>
            )}
          </div>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Button href={primaryHref} variant="solid">
              {primaryLabel} →
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button href={secondaryHref} variant={secondaryVariant}>
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full ${bg ? "bg-[#F6F5F9]" : ""}`}>
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <p className="font-serif text-sm font-medium text-[#312F55] mb-2">
          {title}
        </p>
        {description && (
          <p className="text-xs text-[#6B6880] mb-6">{description}</p>
        )}
        <div className="flex gap-3 justify-center flex-wrap">
          <Button href={primaryHref}>{primaryLabel}</Button>
          {secondaryLabel && secondaryHref && (
            <Button href={secondaryHref} variant={secondaryVariant}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
