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
        <p className="text-[11px] font-medium text-[#5D5786] tracking-[.1em] uppercase mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-xl font-medium text-[#312F55] mb-3">{title}</h2>
      {description && (
        <p className="text-sm text-[#6B6880] leading-relaxed">{description}</p>
      )}
    </div>
  );
}
