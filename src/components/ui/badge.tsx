import { cn } from "@/lib/utils";

/** One classic blue family for every discipline. */
export function TypeBadge({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-ember/15 bg-ember-50 px-2.5 py-1 font-display text-xs font-semibold text-ember-600",
        className
      )}
    >
      {type}
    </span>
  );
}

export function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-semibold",
        className
      )}
    >
      {children}
    </span>
  );
}
