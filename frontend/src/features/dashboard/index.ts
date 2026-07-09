/**
 * Dashboard feature public API.
 * Pages are intentionally NOT re-exported here — import them via
 * their direct path so React.lazy() can code-split them.
 *
 *   import { DashboardHomePage } from "@/features/dashboard/pages/home/DashboardHomePage";
 */
export { DashboardSidebar } from "./components/DashboardSidebar";
export { DashboardHeader } from "./components/DashboardHeader";
export { dashboardRoutes } from "./routes";
