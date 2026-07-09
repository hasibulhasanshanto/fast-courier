import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Settings,
  User as UserIcon,
  FileText,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Brand, UserMenu } from "@/components/common";
import { useAuthStore } from "@/features/auth";
import { ROUTES } from "@/config";

type NavItem = {
  to: string;
  // Kept open as a union of all known label keys so adding a nav
  // item is a one-line change without a follow-up type fix.
  labelKey:
    | "nav.dashboard"
    | "nav.profile"
    | "nav.settings"
    | "nav.posts"
    | "nav.users";
  icon: LucideIcon;
  end?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.dashboard, labelKey: "nav.dashboard", icon: LayoutDashboard, end: true },
  { to: ROUTES.posts, labelKey: "nav.posts", icon: FileText },
  { to: ROUTES.users, labelKey: "nav.users", icon: Users },
  { to: ROUTES.profile, labelKey: "nav.profile", icon: UserIcon },
  { to: ROUTES.settings, labelKey: "nav.settings", icon: Settings },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-primary/10 text-primary"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  );

/**
 * The shared contents of the dashboard sidebar — used by both the
 * desktop `<DashboardSidebar />` and the mobile `<Drawer />` opened
 * from `<DashboardHeader />`. Keeping the two in sync is just a
 * matter of rendering this component in both places.
 */
export function DashboardSidebarBody({
  onNavigate,
}: {
  /**
   * Called after the user activates a nav link. Used by the mobile
   * drawer to close itself; the desktop sidebar can ignore it.
   */
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  return (
    <>
      <div className="flex h-16 items-center border-b px-6">
        <Brand />
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map(({ to, labelKey, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={linkClass}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-lg bg-background p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
            {/* The avatar opens the same UserMenu popover used in
                the header. Clicking it surfaces Email / Settings /
                Profile / Logout. */}
            <UserMenu />
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Desktop dashboard sidebar. Sticky and full-height so it stays in
 * place while only the main column scrolls. Hidden on small screens
 * — the dashboard layout mounts a `<Drawer />` with the same body
 * content for mobile.
 */
export function DashboardSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r bg-muted/20 md:flex md:flex-col">
      <DashboardSidebarBody />
    </aside>
  );
}
