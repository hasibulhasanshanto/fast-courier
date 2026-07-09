import * as yup from "yup";

/**
 * Centralized validation schemas for auth flows.
 * Keep messages friendly and consistent; the form layer renders them.
 */

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
