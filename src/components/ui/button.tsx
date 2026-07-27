import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "yellow" | "dark" | "outline" | "outlineLight" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold font-display transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:translate-y-px disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "gloss-blue text-white",
  yellow: "gloss-yellow text-white",
  dark: "gloss-dark text-white",
  outline:
    "border border-ember/25 text-ember bg-white hover:border-ember hover:bg-ember-50",
  outlineLight:
    "border border-white/40 text-white hover:border-white hover:bg-white/10",
  ghost: "text-ember hover:bg-ember-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  onClick,
}: CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}
