/**
 * Posts feature public API.
 *
 * Pages are intentionally NOT re-exported here — import them via their
 * direct path so React.lazy() can code-split them.
 *
 *   import PostsListPage from "@/features/posts/pages/list/PostsListPage";
 */
export { usePostsStore } from "./stores/usePostsStore";
export { postsRoutes } from "./routes";
export {
  createPostSchema,
  updatePostSchema,
  type CreatePostFormValues,
  type UpdatePostFormValues,
} from "./schemas/post.schema";
export type { Post, CreatePostInput, UpdatePostInput } from "./types/post";
