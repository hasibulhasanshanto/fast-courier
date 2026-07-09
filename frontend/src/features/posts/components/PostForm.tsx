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
import { createPostSchema, type CreatePostFormValues } from "../schemas/post.schema";

type PostFormProps = {
  /**
   * Initial values for the form. Useful for the edit page, which
   * pre-fills the form with the loaded post.
   */
  defaultValues?: Partial<CreatePostFormValues>;
  /**
   * Submit handler. Receives validated form values. Should return
   * `true` on success so the form knows when to stop its submitting
   * state. Throwing or returning `false` keeps the loading state on
   * and surfaces the server error.
   */
  onSubmit: (values: CreatePostFormValues) => Promise<boolean> | boolean;
  /** Text shown on the primary submit button. */
  submitLabel: string;
  /** Loading state to disable the form while the parent is busy. */
  isSubmitting?: boolean;
  /** Server-side error to surface above the form. */
  serverError?: string | null;
  /** Callback to clear the server error when the user edits a field. */
  onServerErrorClear?: () => void;
};

/**
 * Reusable post form. Used by both Create and Edit pages.
 *
 * - Uses `react-hook-form` for state + `yupResolver` for validation.
 * - Renders the form fields through the shared `<Form />` shadcn-style
 *   components so errors, labels, and a11y wiring stay consistent.
 */
export function PostForm({
  defaultValues,
  onSubmit,
  submitLabel,
  isSubmitting = false,
  serverError = null,
  onServerErrorClear,
}: PostFormProps) {
  const form = useForm<CreatePostFormValues>({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      userId: defaultValues?.userId ?? 1,
      title: defaultValues?.title ?? "",
      body: defaultValues?.body ?? "",
    },
    mode: "onTouched",
  });

  const handleSubmit = async (values: CreatePostFormValues) => {
    const ok = await onSubmit(values);
    if (ok) form.reset(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        onChange={() => onServerErrorClear?.()}
        noValidate
        className="space-y-4"
      >
        {serverError && (
          <div
            role="alert"
            className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {serverError}
          </div>
        )}

        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="1"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    field.onChange(v === "" ? undefined : Number(v));
                  }}
                />
              </FormControl>
              <FormDescription>
                The author of the post (numeric ID).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="A short, descriptive title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <textarea
                  rows={6}
                  placeholder="Write your post content here..."
                  className="flex w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-3 aria-[invalid=true]:ring-destructive/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
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
