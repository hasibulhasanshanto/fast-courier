/**
 * Auth feature public API.
 * Pages are intentionally NOT re-exported here — import them via
 * their direct path so React.lazy() can code-split them.
 *
 *   import Login from "@/features/auth/pages/Login";
 */
export { useAuthStore } from "./stores/useAuthStore";
export type { User } from "@/features/type";
export { AuthGuard, GuestGuard } from "./routes/AuthGuard";
export { loginRequest, registerRequest } from "./services/authService";
export { loginSchema, registerSchema } from "./schemas/auth.schema";
export type { LoginFormValues, RegisterFormValues } from "./schemas/auth.schema";
export { authRoutes } from "./routes";
