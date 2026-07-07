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
}: Props) {
  return (
    <section
      className={`py-12 px-6 text-center ${bg ? "bg-stone-50" : ""}`}
    >
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
    </section>
  );
}
