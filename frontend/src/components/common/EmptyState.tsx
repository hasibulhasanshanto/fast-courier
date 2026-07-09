import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Container
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-center",
        className,
      )}
    >
      {Icon && (
        <div className="rounded-full bg-muted p-3 text-muted-foreground">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="pt-2">{action}</div>}
    </Container>
  );
}
