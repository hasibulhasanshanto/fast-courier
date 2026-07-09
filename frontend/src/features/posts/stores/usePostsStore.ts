import { create } from "zustand";
import { ApiError } from "@/lib/apiClient";
import {
  createPost as createPostRequest,
  deletePost as deletePostRequest,
  fetchPostById,
  fetchPosts,
  updatePost as updatePostRequest,
} from "../services/postService";
import type {
  CreatePostInput,
  Post,
  UpdatePostInput,
} from "../types/post";

/**
 * Posts store.
 *
 * Holds the canonical list of posts for the app plus per-request
 * loading / error flags. Components subscribe to the slices they need
 * (e.g. `usePostsStore(s => s.posts)`) so unrelated re-renders are
 * avoided.
 *
 * Why not persist? Posts change often and would balloon the
 * localStorage payload. We refetch on mount instead.
 */

type Status = "idle" | "loading" | "success" | "error";

type PostsState = {
  // Data
  posts: Post[];
  currentPost: Post | null;

  // Status flags
  listStatus: Status;
  detailStatus: Status;
  mutationStatus: Status;
  error: string | null;

  // Selectors
  getPostById: (id: number) => Post | undefined;

  // Actions
  fetchAll: () => Promise<void>;
  fetchOne: (id: number) => Promise<void>;
  create: (input: CreatePostInput) => Promise<Post | null>;
  update: (id: number, input: UpdatePostInput) => Promise<Post | null>;
  remove: (id: number) => Promise<boolean>;
  clearError: () => void;
  reset: () => void;
};

const initialState = {
  posts: [] as Post[],
  currentPost: null as Post | null,
  listStatus: "idle" as Status,
  detailStatus: "idle" as Status,
  mutationStatus: "idle" as Status,
  error: null as string | null,
};

export const usePostsStore = create<PostsState>((set, get) => ({
  ...initialState,

  getPostById: (id) => get().posts.find((p) => p.id === id),

  fetchAll: async () => {
    set({ listStatus: "loading", error: null });
    try {
      const posts = await fetchPosts();
      set({ posts, listStatus: "success" });
    } catch (err) {
      set({
        listStatus: "error",
        error: errorMessage(err, "Failed to load posts"),
      });
    }
  },

  fetchOne: async (id) => {
    set({ detailStatus: "loading", error: null, currentPost: null });
    try {
      const post = await fetchPostById(id);
      set({ currentPost: post, detailStatus: "success" });
    } catch (err) {
      set({
        detailStatus: "error",
        error: errorMessage(err, "Failed to load post"),
      });
    }
  },

  create: async (input) => {
    set({ mutationStatus: "loading", error: null });
    try {
      const created = await createPostRequest(input);
      // JSONPlaceholder echoes a synthetic id (usually 101) — keep
      // what the server gave us but assign a new id if it collides
      // with an existing one.
      const safeId =
        get().posts.some((p) => p.id === created.id)
          ? nextLocalId(get().posts)
          : created.id;
      const newPost: Post = { ...created, id: safeId };
      set((s) => ({
        posts: [newPost, ...s.posts],
        mutationStatus: "success",
      }));
      return newPost;
    } catch (err) {
      set({
        mutationStatus: "error",
        error: errorMessage(err, "Failed to create post"),
      });
      return null;
    }
  },

  update: async (id, input) => {
    set({ mutationStatus: "loading", error: null });
    try {
      const updated = await updatePostRequest(id, input);
      set((s) => ({
        posts: s.posts.map((p) => (p.id === id ? { ...p, ...updated } : p)),
        currentPost:
          s.currentPost?.id === id
            ? { ...s.currentPost, ...updated }
            : s.currentPost,
        mutationStatus: "success",
      }));
      return { ...get().posts.find((p) => p.id === id)!, ...updated } as Post;
    } catch (err) {
      set({
        mutationStatus: "error",
        error: errorMessage(err, "Failed to update post"),
      });
      return null;
    }
  },

  remove: async (id) => {
    set({ mutationStatus: "loading", error: null });
    try {
      await deletePostRequest(id);
      set((s) => ({
        posts: s.posts.filter((p) => p.id !== id),
        currentPost: s.currentPost?.id === id ? null : s.currentPost,
        mutationStatus: "success",
      }));
      return true;
    } catch (err) {
      set({
        mutationStatus: "error",
        error: errorMessage(err, "Failed to delete post"),
      });
      return false;
    }
  },

  clearError: () => set({ error: null }),

  reset: () => set({ ...initialState }),
}));

/**
 * Extract a user-facing message from an unknown error. `ApiError` already
 * normalizes everything that comes back from the network layer.
 */
function errorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return fallback;
}

/**
 * JSONPlaceholder's POST /posts always returns id=101. After the first
 * create, every subsequent create collides, so we pick a fresh id higher
 * than the current max. This is a client-side convenience only — a real
 * API would assign ids server-side.
 */
function nextLocalId(posts: Post[]): number {
  const max = posts.reduce((acc, p) => (p.id > acc ? p.id : acc), 0);
  return max + 1;
}
