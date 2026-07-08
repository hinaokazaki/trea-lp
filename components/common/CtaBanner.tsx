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
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-lg font-medium text-stone-800 mb-1.5">{title}</p>
            {description && (
              <p className="text-sm text-stone-500">{description}</p>
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
    <section className={`w-full ${bg ? "bg-stone-50" : ""}`}>
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <p className="text-sm font-medium text-stone-800 mb-2">{title}</p>
        {description && (
          <p className="text-xs text-stone-500 mb-6">{description}</p>
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
