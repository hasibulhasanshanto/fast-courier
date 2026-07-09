import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
} from "@/lib/apiClient";
import type {
  CreatePostInput,
  CreatedPost,
  Post,
  UpdatePostInput,
} from "../types/post";

/**
 * Thin service layer over the JSONPlaceholder /posts endpoint.
 *
 * Each function:
 *   - talks to the network via the shared `apiClient` wrappers,
 *   - returns plain typed data (no Axios leakage),
 *   - lets `ApiError` propagate to the caller (store / component) so
 *     error handling stays close to the UI.
 *
 * NOTE: JSONPlaceholder is a mock API. It does NOT persist data — a
 * successful `POST`/`PUT`/`DELETE` only echoes the payload back. The
 * store compensates for this by treating the echoed payload as the new
 * "source of truth" and inserting it into the local list.
 */

const BASE = "/posts" as const;

export async function fetchPosts(): Promise<Post[]> {
  return apiGet<Post[]>(BASE);
}

export async function fetchPostById(id: number): Promise<Post> {
  return apiGet<Post>(`${BASE}/${id}`);
}

export async function createPost(input: CreatePostInput): Promise<CreatedPost> {
  return apiPost<CreatedPost, CreatePostInput>(BASE, input);
}

export async function updatePost(
  id: number,
  input: UpdatePostInput,
): Promise<Post> {
  return apiPut<Post, UpdatePostInput>(`${BASE}/${id}`, input);
}

export async function patchPost(
  id: number,
  input: UpdatePostInput,
): Promise<Post> {
  return apiPatch<Post, UpdatePostInput>(`${BASE}/${id}`, input);
}

export async function deletePost(id: number): Promise<unknown> {
  return apiDelete(`${BASE}/${id}`);
}
