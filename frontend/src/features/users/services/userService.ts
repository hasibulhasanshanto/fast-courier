import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
} from "@/lib/apiClient";
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "../types/user";

/**
 * Thin service layer over the JSONPlaceholder /users endpoint.
 *
 * Mirrors `postService`:
 *   - Talks to the network via the shared `apiClient` wrappers,
 *   - Returns plain typed data (no Axios leakage),
 *   - Lets `ApiError` propagate to the store / component.
 *
 * JSONPlaceholder doesn't persist; the store compensates by treating
 * the echoed payload as the new source of truth and inserting /
 * patching the local list.
 */

const BASE = "/users" as const;

export async function fetchUsers(): Promise<User[]> {
  return apiGet<User[]>(BASE);
}

export async function fetchUserById(id: number): Promise<User> {
  return apiGet<User>(`${BASE}/${id}`);
}

export async function createUser(input: CreateUserInput): Promise<User> {
  return apiPost<User, CreateUserInput>(BASE, input);
}

export async function updateUser(
  id: number,
  input: UpdateUserInput,
): Promise<User> {
  return apiPut<User, UpdateUserInput>(`${BASE}/${id}`, input);
}

export async function patchUser(
  id: number,
  input: UpdateUserInput,
): Promise<User> {
  return apiPatch<User, UpdateUserInput>(`${BASE}/${id}`, input);
}

export async function deleteUser(id: number): Promise<unknown> {
  return apiDelete(`${BASE}/${id}`);
}
