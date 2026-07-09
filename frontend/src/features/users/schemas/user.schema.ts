import * as yup from "yup";

/**
 * User form validation.
 *
 * The form layer flattens the nested `address` and `company` objects
 * into a single flat shape (street, city, companyName, …) so the UI
 * is a single linear flow. The flatten ↔ nest conversion happens in
 * `UserForm`; this file only owns the field-level rules.
 *
 * The form's value type (`CreateUserFormValues`) is declared
 * **explicitly** so RHF's `useForm<T>` is stable. The yup schema
 * validates against this type. `updateUserSchema` is a relaxed
 * version with the same fields made optional (for PATCH-style
 * updates) but the Edit page still requires all of them in practice.
 */

/** Flat form value shape — see UserForm for the flatten ↔ nest helpers. */
export type CreateUserFormValues = {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  companyName: string;
  catchPhrase: string;
  bs: string;
};

const nameSchema = yup
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(80, "Name is too long (max 80)")
  .required("Name is required");

const usernameSchema = yup
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters")
  .max(40, "Username is too long (max 40)")
  .matches(
    /^[a-zA-Z0-9._-]+$/,
    "Username may only contain letters, numbers, dots, dashes, and underscores",
  )
  .required("Username is required");

const emailSchema = yup
  .string()
  .trim()
  .email("Please enter a valid email address")
  .required("Email is required");

const phoneSchema = yup
  .string()
  .trim()
  .min(3, "Phone is too short")
  .max(40, "Phone is too long (max 40)")
  .required("Phone is required");

const websiteBase = yup
  .string()
  .trim()
  .max(120, "Website is too long (max 120)")
  .test("is-url-or-empty", "Website must be a valid URL", (value) => {
    if (!value) return true;
    try {
      // Accept both bare domains (hildegard.org) and full URLs.
      const v = /^https?:\/\//i.test(value) ? value : `https://${value}`;
      new URL(v);
      return true;
    } catch {
      return false;
    }
  });

const websiteSchema = websiteBase.required("Website is required");

const streetSchema = yup
  .string()
  .trim()
  .min(2, "Street must be at least 2 characters")
  .max(120, "Street is too long (max 120)")
  .required("Street is required");

const suiteSchema = yup
  .string()
  .trim()
  .max(80, "Suite is too long (max 80)")
  .default("");

const citySchema = yup
  .string()
  .trim()
  .min(2, "City must be at least 2 characters")
  .max(80, "City is too long (max 80)")
  .required("City is required");

const zipcodeSchema = yup
  .string()
  .trim()
  .min(3, "Zipcode is too short")
  .max(20, "Zipcode is too long (max 20)")
  .required("Zipcode is required");

const companyNameSchema = yup
  .string()
  .trim()
  .min(2, "Company name must be at least 2 characters")
  .max(120, "Company name is too long (max 120)")
  .required("Company name is required");

const catchPhraseSchema = yup
  .string()
  .trim()
  .max(160, "Catch phrase is too long (max 160)")
  .default("");

const bsSchema = yup
  .string()
  .trim()
  .max(120, "BS is too long (max 120)")
  .default("");

export const createUserSchema = yup.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  phone: phoneSchema,
  website: websiteSchema,
  street: streetSchema,
  suite: suiteSchema,
  city: citySchema,
  zipcode: zipcodeSchema,
  companyName: companyNameSchema,
  catchPhrase: catchPhraseSchema,
  bs: bsSchema,
});

/**
 * Relaxed version for PATCH-style updates — every field optional.
 * The Edit page still requires all fields in practice.
 */
export const updateUserSchema = yup.object({
  name: nameSchema.optional(),
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  website: websiteBase.optional(),
  street: streetSchema.optional(),
  suite: suiteSchema,
  city: citySchema.optional(),
  zipcode: zipcodeSchema.optional(),
  companyName: companyNameSchema.optional(),
  catchPhrase: catchPhraseSchema,
  bs: bsSchema,
});

export type UpdateUserFormValues = yup.InferType<typeof updateUserSchema>;
