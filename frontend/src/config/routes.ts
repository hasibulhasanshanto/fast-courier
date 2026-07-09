/**
 * Centralized route paths. Use these constants instead of hard-coded
 * strings so refactors stay safe.
 */
export const ROUTES = {
  // Public
  home: "/",
  services: "/services",
  coverage: "/coverage",
  about: "/about-us",
  pricing: "/pricing",
  blog: "/blog",
  contact: "/contact",

  // Auth
  login: "/auth/login",
  register: "/auth/register",

  // Dashboard (protected)
  dashboard: "/dashboard",
  profile: "/dashboard/profile",
  settings: "/dashboard/settings",

  // Posts (CRUD, mounted as children of the dashboard layout)
  posts: "/dashboard/posts",
  postsNew: "/dashboard/posts/new",
  // Detail / edit are addressed by id; these helpers keep the
  // construction in one place.
  postDetail: (id: number | string) => `/dashboard/posts/${id}`,
  postEdit: (id: number | string) => `/dashboard/posts/${id}/edit`,

  // Users (CRUD, mounted as children of the dashboard layout)
  users: "/dashboard/users",
  usersNew: "/dashboard/users/new",
  userDetail: (id: number | string) => `/dashboard/users/${id}`,
  userEdit: (id: number | string) => `/dashboard/users/${id}/edit`,
} as const;

export type RouteKey = keyof typeof ROUTES;
