import type { LoginFormValues, RegisterFormValues } from "../schemas/auth.schema";
import type { User } from "@/features/type";

/**
 * Mock authentication service.
 *
 * Swap these functions for real `fetch`/`axios` calls in production.
 * Keep the function signatures stable so call sites don't change.
 */

const FAKE_JWT = (id: string) =>
  // Not a real JWT — just an opaque demo token. Replace server-side.
  `demo.${id}.${Math.random().toString(36).slice(2, 10)}`;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function loginRequest(
  values: LoginFormValues,
): Promise<{ user: User; token: string }> {
  await sleep(400);

  if (values.password === "wrong") {
    throw new Error("Invalid email or password");
  }

  const id = `usr_${values.email.split("@")[0]}`;
  return {
    user: {
      id,
      email: values.email,
      name: values.email.split("@")[0] ?? "User",
    },
    token: FAKE_JWT(id),
  };
}

export async function registerRequest(
  values: RegisterFormValues,
): Promise<{ user: User; token: string }> {
  await sleep(500);

  if (values.email.endsWith("@blocked.test")) {
    throw new Error("This email is not allowed");
  }

  const id = `usr_${values.email.split("@")[0]}_${Date.now()}`;
  return {
    user: {
      id,
      email: values.email,
      name: values.name,
    },
    token: FAKE_JWT(id),
  };
}
