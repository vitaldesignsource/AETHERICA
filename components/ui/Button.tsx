import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
};

const variants = {
  primary: "bg-gold text-obsidian hover:bg-ivory",
  secondary: "border border-gold/60 text-ivory hover:bg-gold/10",
  ghost: "text-parchment hover:text-ivory hover:bg-ivory/5"
};

export function Button({ href, children, variant = "primary", type = "button", onClick, ariaLabel }: ButtonProps) {
  const className = `focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded px-5 py-2.5 text-sm font-semibold uppercase tracking-[.14em] transition ${variants[variant]}`;
  if (href) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
