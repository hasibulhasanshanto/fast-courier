/**
 * Cross-cutting user shape exposed throughout the app.
 *
 * Owned by the `type` feature so it can be imported from any bounded
 * context (auth, dashboard, billing, …) without forming a dependency
 * on the auth feature's internals.
 *
 * Replace `id` typing with the real backend's user ID type when you
 * wire a real API.
 */
export type User = {
  id: string;
  email: string;
  name: string;
};
