import { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer } from "@/components/ui/drawer";
import {
  LanguageSwitcher,
  ThemeSwitcher,
  UserMenu,
} from "@/components/common";
import { useAuthStore } from "@/features/auth";
import { DashboardSidebarBody } from "./DashboardSidebar";

type DashboardHeaderProps = {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

/**
 * Dashboard top bar.
 *
 * - The outer layout (`DashboardLayout`) is `h-screen overflow-hidden`,
 *   so this header is pinned at the top of the column without needing
 *   its own `sticky` positioning.
 * - On mobile, a hamburger button opens a side-drawer that renders
 *   the same `<DashboardSidebarBody />` used by the desktop sidebar.
 *   Selecting a link closes the drawer and navigates.
 * - A `<UserMenu />` is always visible on the right (mobile and
 *   desktop) so the profile / settings / logout actions are
 *   reachable from anywhere in the dashboard.
 */
export function DashboardHeader({
  title,
  subtitle,
  actions,
}: DashboardHeaderProps) {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-between gap-3 border-b bg-background px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          {/* Hamburger — only on mobile. Triggers the side-drawer. */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label={t("nav.openMenu")}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold">
              {title ?? t("dashboard.title", { name: user?.name ?? "there" })}
            </h1>
            {subtitle && (
              <p className="truncate text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("dashboard.search")}
                className="h-9 w-56 pl-8"
                aria-label={t("dashboard.search")}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("dashboard.notifications")}
              title={t("dashboard.notifications")}
            >
              <Bell className="h-4 w-4" />
            </Button>
            <LanguageSwitcher />
            <ThemeSwitcher />
            {actions}
          </div>
          {/* Mobile-only: surface the switchers + UserMenu so they're
              reachable on small screens too. */}
          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          {/* UserMenu is always visible — that's the only way the
              user can reach Email / Settings / Profile / Logout from
              mobile. */}
          <UserMenu />
        </div>
      </header>

      <Drawer
        open={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        title={t("nav.dashboard")}
      >
        <div
          onClick={() => setMenuOpen(false)}
          // The body itself is rendered as the drawer's content; the
          // inner NavLink onClicks also close the drawer (via the
          // `onNavigate` prop on DashboardSidebarBody) so the same
          // handler covers both taps on a link and taps on the
          // surrounding padding.
          className="flex h-full flex-col"
        >
          <DashboardSidebarBody onNavigate={() => setMenuOpen(false)} />
        </div>
      </Drawer>
    </>
  );
}
