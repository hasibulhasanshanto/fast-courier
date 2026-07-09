import { Link } from "react-router";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandProps = {
  to?: string;
  label?: string;
  className?: string;
  showIcon?: boolean;
};

export function Brand({
  to = "/",
  label = "Fast Courier",
  showIcon = true,
  className,
}: BrandProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 text-base font-semibold tracking-tight",
        className,
      )}
    >
      {showIcon && (
        <span className="rounded-md bg-primary p-1 text-primary-foreground">
          <Package className="h-4 w-4" aria-hidden />
        </span>
      )}
      {label}
    </Link>
  );
}
