/**
 * Public feature public API.
 * Pages are intentionally NOT re-exported here — import them via
 * their direct path so React.lazy() can code-split them.
 *
 *   import { HomePage } from "@/features/public/pages/home/HomePage";
 */
export { PublicNavbar } from "./components/PublicNavbar";
export { PublicFooter } from "./components/PublicFooter";
export { publicRoutes } from "./routes";
