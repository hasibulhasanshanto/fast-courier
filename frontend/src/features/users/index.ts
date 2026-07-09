/**
 * Users feature public API.
 *
 * Pages are intentionally NOT re-exported here — import them via their
 * direct path so React.lazy() can code-split them.
 *
 *   import UsersListPage from "@/features/users/pages/list/UsersListPage";
 */
export { useUsersStore } from "./stores/useUsersStore";
export { usersRoutes } from "./routes";
export {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormValues,
  type UpdateUserFormValues,
} from "./schemas/user.schema";
export type {
  User,
  Address,
  Company,
  Geo,
  CreateUserInput,
  UpdateUserInput,
} from "./types/user";
