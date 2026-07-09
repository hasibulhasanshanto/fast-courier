import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

/**
 * Centered content wrapper with sensible max-widths.
 * Use the global `.container` utility in markup when you need
 * the CSS-defined width; this is for explicit max-width control.
 */
export function Container({
  className,
  size = "xl",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "sm" && "max-w-2xl",
        size === "md" && "max-w-4xl",
        size === "lg" && "max-w-6xl",
        size === "xl" && "max-w-7xl",
        size === "full" && "max-w-none",
        className,
      )}
      {...props}
    />
  );
}
