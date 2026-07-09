/**
 * Post domain types.
 *
 * Mirrors the shape returned by JSONPlaceholder's /posts endpoint:
 *   { userId: number; id: number; title: string; body: string }
 *
 * `CreatePostInput` and `UpdatePostInput` are the payloads we send to the
 * server — they're structurally identical to `Post` except for `id`,
 * which the server assigns on create. For `update` we use a `Partial`
 * so callers can PATCH a single field if they want.
 */
export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type CreatePostInput = {
  userId: number;
  title: string;
  body: string;
};

export type UpdatePostInput = Partial<CreatePostInput>;

/**
 * The "post" record JSONPlaceholder returns for `POST /posts` is the
 * same shape as a `Post`, but its `id` is whatever the server echoes
 * back (usually 101). We type it the same way for simplicity.
 */
export type CreatedPost = Post;
