import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "outline-light" | "dark" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  gold: "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-ink shadow-gold hover:brightness-110",
  outline: "border border-ink/20 text-ink hover:border-gold hover:text-gold-deep",
  "outline-light": "border border-gold/60 text-cream hover:bg-gold hover:text-ink",
  dark: "bg-ink text-cream hover:bg-ink-muted",
  whatsapp: "bg-whatsapp text-ink hover:brightness-110",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

type StyleProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  children: ReactNode;
};

type LinkButtonProps = StyleProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type NativeButtonProps = StyleProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

/**
 * Renders a <Link> for internal routes, an <a> for external/tel links,
 * or a <button> when no href is given.
 */
export function Button(props: ButtonProps) {
  const { variant = "gold", size = "md", className, children, icon } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, variant: _variant, size: _size, className: _className, icon: _icon, children: _children, ...anchorProps } =
      props;
    void _variant; void _size; void _className; void _icon; void _children;

    const isExternal = /^(https?:|tel:|mailto:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...anchorProps}
        >
          {icon}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {icon}
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _variant, size: _size, className: _className, icon: _icon, children: _children, ...buttonProps } =
    props;
  void _href; void _variant; void _size; void _className; void _icon; void _children;

  return (
    <button className={classes} {...buttonProps}>
      {icon}
      {children}
    </button>
  );
}
