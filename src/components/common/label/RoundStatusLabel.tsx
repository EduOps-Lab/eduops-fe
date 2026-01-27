type LabelColor = "green" | "yellow" | "red";

type LabelProps = {
  color: LabelColor;
  children: React.ReactNode;
};

export default function MiniLabel({ color, children }: LabelProps) {
  const colorClasses: Record<LabelColor, string> = {
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
}
