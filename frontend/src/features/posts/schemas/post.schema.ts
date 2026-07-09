import * as yup from "yup";

/**
 * Centralized validation for post create/edit forms.
 *
 * The create and edit forms share the same field-level rules, but edit
 * makes every field optional (since PATCH may update a single field).
 * The form layer still requires all of them in practice — this is just
 * type-safe.
 */

const titleSchema = yup
  .string()
  .trim()
  .min(3, "Title must be at least 3 characters")
  .max(120, "Title is too long (max 120)")
  .required("Title is required");

const bodySchema = yup
  .string()
  .trim()
  .min(10, "Body must be at least 10 characters")
  .max(2000, "Body is too long (max 2000)")
  .required("Body is required");

const userIdSchema = yup
  .number()
  .typeError("User ID must be a number")
  .integer("User ID must be an integer")
  .positive("User ID must be positive")
  .required("User ID is required");

export const createPostSchema = yup.object({
  userId: userIdSchema,
  title: titleSchema,
  body: bodySchema,
});

export type CreatePostFormValues = yup.InferType<typeof createPostSchema>;

export const updatePostSchema = yup.object({
  userId: userIdSchema.optional(),
  title: titleSchema.optional(),
  body: bodySchema.optional(),
});

export type UpdatePostFormValues = yup.InferType<typeof updatePostSchema>;
