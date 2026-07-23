import * as Icons from "lucide-react";

const colorMap = {
  violet: "bg-brand-violet",
  pink: "bg-brand-pink",
  orange: "bg-brand-orange",
  teal: "bg-brand-teal",
};

export default function IconBadge({ icon, color = "violet", size = "md" }) {
  const Icon = Icons[icon] ?? Icons.Sparkles;
  const sizeClasses = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const iconSize = size === "lg" ? 22 : 18;

  return (
    <span
      className={`inline-flex ${sizeClasses} shrink-0 items-center justify-center rounded-xl ${colorMap[color] ?? colorMap.violet} text-white shadow-sm`}
    >
      <Icon size={iconSize} strokeWidth={2} />
    </span>
  );
}
