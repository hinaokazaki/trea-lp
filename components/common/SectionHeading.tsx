type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center,
}: Props) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-[11px] font-medium text-[#993556] tracking-[.1em] uppercase mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-xl font-medium text-stone-800 mb-3">{title}</h2>
      {description && (
        <p className="text-sm text-stone-500 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
