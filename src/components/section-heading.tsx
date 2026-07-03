import Link from "next/link";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  action,
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: { href: string; label: string };
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div>
        {eyebrow && (
          <p className={cn("eyebrow", onDark ? "text-ember" : "text-ember")}>
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl",
            onDark ? "text-paper" : "text-ink"
          )}
        >
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className={cn(
            "hidden shrink-0 pb-1.5 text-sm font-medium transition-colors sm:inline-flex sm:items-center sm:gap-1",
            onDark ? "text-paper hover:text-ember" : "text-ink hover:text-ember"
          )}
        >
          {action.label}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
