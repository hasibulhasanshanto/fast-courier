import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Drawer
 *
 * Lightweight side-drawer used by the public and dashboard layouts
 * for their mobile menus. Renders into `document.body` via a portal
 * so it escapes any `overflow-hidden` ancestor (the dashboard layout
 * pins `h-screen overflow-hidden` on the outer flex container, which
 * would otherwise clip a fixed-positioned child).
 *
 * Behavior:
 *   - Closes on backdrop click and Escape key.
 *   - Locks body scroll while open so the page underneath doesn't
 *     scroll when the user pans on the panel.
 *   - Slides in from the requested side with a 200ms transition.
 *   - Renders nothing on the server (guards `document`).
 *
 * Intentionally not built on Radix's dialog primitive — Escape +
 * body-scroll-lock is enough for a nav drawer, and pulling in a
 * focus-trap dep just for a menu is overkill.
 */

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  /** Which edge the panel slides in from. Defaults to "left". */
  side?: "left" | "right";
  /** Accessible label for the dialog. Falls back to "Menu". */
  title?: string;
  children: React.ReactNode;
  /** Extra classes appended to the panel. */
  className?: string;
  /** Extra classes appended to the backdrop. */
  overlayClassName?: string;
};

const PANEL_BASE =
  "fixed top-0 z-50 flex h-screen w-72 max-w-[85vw] flex-col bg-background shadow-xl transition-transform duration-200 ease-out";

const SIDE_STYLES: Record<NonNullable<DrawerProps["side"]>, string> = {
  left: "left-0 border-r",
  right: "right-0 border-l",
};

const SLIDE_FROM: Record<NonNullable<DrawerProps["side"]>, string> = {
  left: "-translate-x-full",
  right: "translate-x-full",
};

export function Drawer({
  open,
  onClose,
  side = "left",
  title = "Menu",
  children,
  className,
  overlayClassName,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Don't render on the server.
  if (typeof document === "undefined") return null;

  // We keep the panel mounted only when `open` so the slide-in
  // transition fires from off-screen. `aria-hidden` mirrors the same
  // state for assistive tech.
  return createPortal(
    <div
      aria-hidden={!open}
      className={cn(
        "pointer-events-none fixed inset-0 z-50",
        open ? "pointer-events-auto" : "",
      )}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
          overlayClassName,
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          PANEL_BASE,
          SIDE_STYLES[side],
          open ? "translate-x-0" : SLIDE_FROM[side],
          className,
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <span className="text-sm font-semibold">{title}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
