import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Outlet } from "react-router";

/**
 * DashboardLayout – used for authenticated user dashboard pages.
 *
 * Layout:
 *   - Outer flex row is `h-screen overflow-hidden` so the page itself
 *     never scrolls — only the main column does. The sidebar is
 *     `sticky top-0 h-screen overflow-y-auto` (see DashboardSidebar)
 *     so it stays pinned while the main content scrolls.
 *   - The header is part of the right-hand column and is pinned at
 *     the top by the flex layout; the column below it scrolls
 *     independently.
 *
 * Mobile (<md): the sidebar is hidden; the header's hamburger opens
 * a side-drawer containing the same nav links.
 */
export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/20">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
