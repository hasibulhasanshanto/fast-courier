import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router";
import { LogOut, Mail, Settings, User as UserIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/features/auth";
import { useDisclosure } from "@/hooks";
import { ROUTES } from "@/config";
import { cn } from "@/lib/utils";

/**
 * UserMenu
 *
 * Avatar button + popover that surfaces the authenticated user's
 * profile / settings / logout actions. Used in:
 *   - PublicNavbar (right-cluster, on md+)
 *   - DashboardHeader (right side, on mobile)
 *   - DashboardSidebar's user card (clickable avatar)
 *
 * Behavior:
 *   - Click the avatar to toggle.
 *   - Closes on: action click, outside click, Escape, route change.
 *   - Anchored under the trigger by default; renders via portal so
 *     sticky/overflow-hidden parents don't clip it.
 *   - Renders nothing when there is no authenticated user.
 *
 * The anchor position is calculated from the trigger's bounding
 * rect on open. We re-measure on scroll/resize so the popover stays
 * glued to the trigger.
 */

type UserMenuProps = {
  /**
   * Render a compact avatar (icon-sized) vs. the default medium
   * (used in headers). The compact variant is used inside the
   * dashboard sidebar's user card.
   */
  size?: "default" | "compact";
  /** Extra classes for the trigger button. */
  className?: string;
  /** Optional className for the popover panel. */
  panelClassName?: string;
};

const PANEL_WIDTH = 240;

export function UserMenu({
  size = "default",
  className,
  panelClassName,
}: UserMenuProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const { isOpen, close, toggle } = useDisclosure(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  // Don't render anything for unauthenticated visitors — the navbar
  // shows login/register buttons in that case.
  if (!isAuthenticated || !user) return null;

  // Recompute the panel position from the trigger's rect.
  const measure = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Default: anchored to the bottom-left of the trigger. Clamp
    // horizontally so the panel doesn't overflow the viewport on
    // very small screens.
    const left = Math.min(
      Math.max(8, rect.left + rect.width / 2 - PANEL_WIDTH / 2),
      window.innerWidth - PANEL_WIDTH - 8,
    );
    const top = rect.bottom + 8;
    setPos({ top, left });
  };

  // Measure on open, on scroll, and on resize.
  useEffect(() => {
    if (!isOpen) return;
    measure();
    const onScroll = () => measure();
    const onResize = () => measure();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Close on outside click + Escape + route change.
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (!t) return;
      if (panelRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t)) return;
      close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  // Close on route change.
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleAction = (action: () => void) => () => {
    close();
    action();
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.home, { replace: true });
  };

  const triggerSize = size === "compact" ? "h-9 w-9 text-sm" : "h-9 w-9 text-sm";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t("userMenu.openMenu")}
        className={cn(
          "flex items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          triggerSize,
          className,
        )}
      >
        {user.name?.[0]?.toUpperCase() ?? "U"}
      </button>

      {isOpen && pos && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={panelRef}
              role="menu"
              aria-label={t("userMenu.openMenu")}
              style={{
                position: "fixed",
                top: pos.top,
                left: pos.left,
                width: PANEL_WIDTH,
              }}
              className={cn(
                "z-50 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-lg",
                "animate-in fade-in-0 zoom-in-95",
                panelClassName,
              )}
            >
              {/* Header: name + email */}
              <div className="border-b bg-muted/40 px-3 py-2.5">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p
                  className="truncate text-xs text-muted-foreground"
                  title={user.email}
                >
                  {user.email}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col p-1">
                {user.email && (
                  <a
                    role="menuitem"
                    href={`mailto:${user.email}`}
                    onClick={close}
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{user.email}</span>
                  </a>
                )}

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleAction(() => navigate(ROUTES.settings))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  {t("userMenu.settings")}
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleAction(() => navigate(ROUTES.profile))}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
                >
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  {t("userMenu.profile")}
                </button>

                <div className="my-1 h-px bg-border" />

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleAction(handleLogout)}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 focus:bg-destructive/10 focus:outline-none"
                >
                  <LogOut className="h-4 w-4" />
                  {t("userMenu.logout")}
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
