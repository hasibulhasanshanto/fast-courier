/**
 * Shared, cross-feature types.
 *
 * Anything that more than one bounded context needs to know about
 * lives here. Domain-specific types (e.g. `LoginFormValues`,
 * `RegisterFormValues`) stay inside the owning feature — they are
 * implementation details and should not leak across the boundary.
 *
 * Adding a new shared type:
 *   1. Create `src/features/type/<name>.ts` and define the type.
 *   2. Re-export it from this barrel.
 *   3. Import it via `import type { Foo } from "@/features/type"`.
 */
export type { User } from "./user";
