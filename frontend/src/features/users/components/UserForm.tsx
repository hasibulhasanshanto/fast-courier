import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createUserSchema,
  type CreateUserFormValues,
} from "../schemas/user.schema";
import type {
  Address,
  Company,
  Geo,
  User,
} from "../types/user";

/**
 * Reusable user form. Used by both Create and Edit pages.
 *
 * The form fields are a **flat** shape (street, city, companyName, …)
 * for a single linear editing experience. On submit we re-nest into
 * the API shape (`address: { street, city, ... }`,
 * `company: { name, catchPhrase, bs }`, `address.geo` defaulting to
 * lat/lng strings).
 *
 * The same flatten / nest helpers are used for `defaultValues` so the
 * Edit page can prefill the form from a loaded `User`.
 */

export type UserFormProps = {
  defaultValues?: Partial<CreateUserFormValues>;
  onSubmit: (values: CreateUserFormValues) => Promise<boolean> | boolean;
  submitLabel: string;
  isSubmitting?: boolean;
  serverError?: string | null;
  onServerErrorClear?: () => void;
};

export function UserForm({
  defaultValues,
  onSubmit,
  submitLabel,
  isSubmitting = false,
  serverError = null,
  onServerErrorClear,
}: UserFormProps) {
  const form = useForm<CreateUserFormValues>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      username: defaultValues?.username ?? "",
      email: defaultValues?.email ?? "",
      phone: defaultValues?.phone ?? "",
      website: defaultValues?.website ?? "",
      street: defaultValues?.street ?? "",
      suite: defaultValues?.suite ?? "",
      city: defaultValues?.city ?? "",
      zipcode: defaultValues?.zipcode ?? "",
      companyName: defaultValues?.companyName ?? "",
      catchPhrase: defaultValues?.catchPhrase ?? "",
      bs: defaultValues?.bs ?? "",
    },
    mode: "onTouched",
  });

  const handleSubmit = async (values: CreateUserFormValues) => {
    const ok = await onSubmit(values);
    if (ok) form.reset(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        onChange={() => onServerErrorClear?.()}
        noValidate
        className="space-y-6"
      >
        {serverError && (
          <div
            role="alert"
            className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {serverError}
          </div>
        )}

        {/* ── Personal info ──────────────────────────────────────── */}
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Personal info</h3>
            <p className="text-xs text-muted-foreground">
              The user's name, login, and contact details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Leanne Graham" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="bret" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="leanne@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="1-770-736-8031" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="hildegard.org"
                      autoComplete="url"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Bare domain or full URL — both are accepted.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* ── Address ────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Address</h3>
            <p className="text-xs text-muted-foreground">
              Where the user is based.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Kulas Light" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="suite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suite</FormLabel>
                  <FormControl>
                    <Input placeholder="Apt. 556" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Gwenborough" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input placeholder="92998-3874" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* ── Company ────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <p className="text-xs text-muted-foreground">
              Where the user works.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Romaguera-Crona" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="catchPhrase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catch phrase</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Multi-layered client-server neural-net"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BS</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="harness real-time e-markets"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}

/* ─── Flatten ↔ nest helpers ─────────────────────────────────────── */

/** Default `geo` for a new user when none is provided. */
const DEFAULT_GEO: Geo = { lat: "0", lng: "0" };

/** Default empty address / company for a brand-new user. */
const DEFAULT_ADDRESS: Address = {
  street: "",
  suite: "",
  city: "",
  zipcode: "",
  geo: DEFAULT_GEO,
};

const DEFAULT_COMPANY: Company = {
  name: "",
  catchPhrase: "",
  bs: "",
};

/** Flatten a `User` into the form's flat shape. */
export function userToFormValues(user: User): CreateUserFormValues {
  return {
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    street: user.address?.street ?? "",
    suite: user.address?.suite ?? "",
    city: user.address?.city ?? "",
    zipcode: user.address?.zipcode ?? "",
    companyName: user.company?.name ?? "",
    catchPhrase: user.company?.catchPhrase ?? "",
    bs: user.company?.bs ?? "",
  };
}

/** Re-nest flat form values into the API's `User` shape. */
export function formValuesToUserInput(
  values: CreateUserFormValues,
): Omit<User, "id"> {
  return {
    name: values.name,
    username: values.username,
    email: values.email,
    phone: values.phone,
    website: values.website,
    address: {
      ...DEFAULT_ADDRESS,
      street: values.street,
      suite: values.suite ?? "",
      city: values.city,
      zipcode: values.zipcode,
      geo: DEFAULT_GEO,
    },
    company: {
      ...DEFAULT_COMPANY,
      name: values.companyName,
      catchPhrase: values.catchPhrase ?? "",
      bs: values.bs ?? "",
    },
  };
}
