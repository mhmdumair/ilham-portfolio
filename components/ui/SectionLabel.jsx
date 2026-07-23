export default function SectionLabel({ children, tone = "brand" }) {
  const toneClasses =
    tone === "light" ? "text-white/70" : "text-gradient-brand";

  return (
    <span
      className={`block text-xs font-semibold uppercase tracking-[0.2em] ${toneClasses}`}
    >
      {children}
    </span>
  );
}
