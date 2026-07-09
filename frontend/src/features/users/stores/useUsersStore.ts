import { create } from "zustand";
import { ApiError } from "@/lib/apiClient";
import {
  createUser as createUserRequest,
  deleteUser as deleteUserRequest,
  fetchUserById,
  fetchUsers,
  updateUser as updateUserRequest,
} from "../services/userService";
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "../types/user";

/**
 * Users store.
 *
 * Holds the canonical list of users for the app plus per-request
 * loading / error flags. Components subscribe to the slices they need
 * so unrelated re-renders are avoided.
 *
 * Mirrors `usePostsStore` — same status flags, same compensation for
 * JSONPlaceholder's echoed ids (it returns id=11 for every POST), and
 * the same in-memory (non-persisted) shape.
 */

type Status = "idle" | "loading" | "success" | "error";

type UsersState = {
  // Data
  users: User[];
  currentUser: User | null;

  // Status flags
  listStatus: Status;
  detailStatus: Status;
  mutationStatus: Status;
  error: string | null;

  // Selectors
  getUserById: (id: number) => User | undefined;

  // Actions
  fetchAll: () => Promise<void>;
  fetchOne: (id: number) => Promise<void>;
  create: (input: CreateUserInput) => Promise<User | null>;
  update: (id: number, input: UpdateUserInput) => Promise<User | null>;
  remove: (id: number) => Promise<boolean>;
  clearError: () => void;
  reset: () => void;
};

const initialState = {
  users: [] as User[],
  currentUser: null as User | null,
  listStatus: "idle" as Status,
  detailStatus: "idle" as Status,
  mutationStatus: "idle" as Status,
  error: null as string | null,
};

export const useUsersStore = create<UsersState>((set, get) => ({
  ...initialState,

  getUserById: (id) => get().users.find((u) => u.id === id),

  fetchAll: async () => {
    set({ listStatus: "loading", error: null });
    try {
      const users = await fetchUsers();
      set({ users, listStatus: "success" });
    } catch (err) {
      set({
        listStatus: "error",
        error: errorMessage(err, "Failed to load users"),
      });
    }
  },

  fetchOne: async (id) => {
    set({ detailStatus: "loading", error: null, currentUser: null });
    try {
      const user = await fetchUserById(id);
      set({ currentUser: user, detailStatus: "success" });
    } catch (err) {
      set({
        detailStatus: "error",
        error: errorMessage(err, "Failed to load user"),
      });
    }
  },

  create: async (input) => {
    set({ mutationStatus: "loading", error: null });
    try {
      const created = await createUserRequest(input);
      // JSONPlaceholder echoes id=11 for every POST /users. Pick a
      // fresh local id on collision so the list stays unique.
      const safeId =
        get().users.some((u) => u.id === created.id)
          ? nextLocalId(get().users)
          : created.id;
      const newUser: User = { ...created, id: safeId };
      set((s) => ({
        users: [newUser, ...s.users],
        mutationStatus: "success",
      }));
      return newUser;
    } catch (err) {
      set({
        mutationStatus: "error",
        error: errorMessage(err, "Failed to create user"),
      });
      return null;
    }
  },

  update: async (id, input) => {
    set({ mutationStatus: "loading", error: null });
    try {
      const updated = await updateUserRequest(id, input);
      set((s) => ({
        users: s.users.map((u) => (u.id === id ? { ...u, ...updated } : u)),
        currentUser:
          s.currentUser?.id === id
            ? { ...s.currentUser, ...updated }
            : s.currentUser,
        mutationStatus: "success",
      }));
      return {
        ...(get().users.find((u) => u.id === id) as User),
        ...updated,
      };
    } catch (err) {
      set({
        mutationStatus: "error",
        error: errorMessage(err, "Failed to update user"),
      });
      return null;
    }
  },

  remove: async (id) => {
    set({ mutationStatus: "loading", error: null });
    try {
      await deleteUserRequest(id);
      set((s) => ({
        users: s.users.filter((u) => u.id !== id),
        currentUser: s.currentUser?.id === id ? null : s.currentUser,
        mutationStatus: "success",
      }));
      return true;
    } catch (err) {
      set({
        mutationStatus: "error",
        error: errorMessage(err, "Failed to delete user"),
      });
      return false;
    }
  },

  clearError: () => set({ error: null }),

  reset: () => set({ ...initialState }),
}));

/**
 * Extract a user-facing message from an unknown error. `ApiError`
 * already normalizes everything that comes back from the network
 * layer.
 */
function errorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return fallback;
}

/**
 * JSONPlaceholder's POST /users always returns id=11. After the first
 * create, every subsequent create collides, so we pick a fresh id
 * higher than the current max. Client-side convenience only — a real
 * API would assign ids server-side.
 */
function nextLocalId(users: User[]): number {
  const max = users.reduce((acc, u) => (u.id > acc ? u.id : acc), 0);
  return max + 1;
}
