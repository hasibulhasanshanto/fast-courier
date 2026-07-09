import { lazy } from "react";
import type { RouteObject } from "react-router";
import { withLayout } from "@/layouts/withLayout";
import { RootErrorBoundary } from "@/layouts/RootErrorBoundary";
import { AuthGuard } from "@/features/auth";
import { ROUTES } from "@/config";

const PostsListPage = lazy(
  () => import("@/features/posts/pages/list/PostsListPage"),
);
const PostDetailPage = lazy(
  () => import("@/features/posts/pages/detail/PostDetailPage"),
);
const PostCreatePage = lazy(
  () => import("@/features/posts/pages/create/PostCreatePage"),
);
const PostEditPage = lazy(
  () => import("@/features/posts/pages/edit/PostEditPage"),
);

/**
 * Posts routes.
 *
 * Mounted as children of the `/dashboard` layout so they share the
 * dashboard chrome (sidebar / header) with the rest of the
 * authenticated app. The detail / edit routes use `:postId` to
 * identify the post.
 *
 * Pages are lazy-loaded so the initial bundle doesn't pay for them.
 */
export const postsRoutes: RouteObject[] = [
  {
    path: ROUTES.posts,
    element: withLayout("dashboard"),
    errorElement: <RootErrorBoundary />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          { index: true, element: <PostsListPage /> },
          { path: "new", element: <PostCreatePage /> },
          { path: ":postId", element: <PostDetailPage /> },
          { path: ":postId/edit", element: <PostEditPage /> },
        ],
      },
    ],
  },
];
