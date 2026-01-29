type LabelColor = "green" | "yellow" | "red" | "blue";

type LabelProps = {
  color: LabelColor;
  children: React.ReactNode;
  showDot?: boolean;
};

export default function MiniLabel({
  color,
  children,
  showDot = false,
}: LabelProps) {
  const colorClasses: Record<LabelColor, string> = {
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
    blue: "bg-blue-50 text-blue-700",
  };

  const dotColorClasses: Record<LabelColor, string> = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ${colorClasses[color]}`}
    >
      {showDot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColorClasses[color]}`}
        />
      )}
      {children}
    </span>
  );
}
