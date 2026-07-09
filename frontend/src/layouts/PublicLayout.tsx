import { Outlet } from "react-router";
import { PublicNavbar, PublicFooter } from "@/features/public";

/**
 * PublicLayout — used for marketing & informational pages (home, about, contact).
 * Wraps children in the standard branded chrome.
 */
export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicNavbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <PublicFooter />
    </div>
  );
}
