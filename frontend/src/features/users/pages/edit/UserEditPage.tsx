import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks";
import { useUsersStore } from "../../stores/useUsersStore";
import {
  UserForm,
  formValuesToUserInput,
  userToFormValues,
} from "../../components/UserForm";
import { ROUTES } from "@/config";
import type { CreateUserFormValues } from "../../schemas/user.schema";

/**
 * Edit-user page.
 *
 * Fetches the user (if not already in the store) and pre-fills the
 * shared <UserForm /> with its current values via `userToFormValues`.
 * On save, the flat form values are re-nested with
 * `formValuesToUserInput` and PUT to the server.
 */
export default function UserEditPage() {
  const { userId } = useParams<{ userId: string }>();
  const id = Number(userId);
  const navigate = useNavigate();

  const currentUser = useUsersStore((s) => s.currentUser);
  const detailStatus = useUsersStore((s) => s.detailStatus);
  const error = useUsersStore((s) => s.error);
  const fetchOne = useUsersStore((s) => s.fetchOne);
  const update = useUsersStore((s) => s.update);
  const clearError = useUsersStore((s) => s.clearError);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useDocumentTitle(
    currentUser ? `Edit ${currentUser.name} | Dashboard` : "Edit User | Dashboard",
  );

  useEffect(() => {
    if (Number.isFinite(id) && (!currentUser || currentUser.id !== id)) {
      fetchOne(id);
    }
  }, [id, currentUser, fetchOne]);

  if (!Number.isFinite(id)) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        Invalid user id.
      </div>
    );
  }

  const handleSubmit = async (values: CreateUserFormValues) => {
    setIsSubmitting(true);
    const updated = await update(id, formValuesToUserInput(values));
    setIsSubmitting(false);
    if (updated) {
      navigate(ROUTES.userDetail(id));
      return true;
    }
    return false;
  };

  if (detailStatus === "loading" && !currentUser) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading user…
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
        User not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link to={ROUTES.users}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to users
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit user #{currentUser.id}</CardTitle>
          <CardDescription>
            Update the user's personal info, address, or company. The
            local list is patched immediately on success.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm
            defaultValues={userToFormValues(currentUser)}
            onSubmit={handleSubmit}
            submitLabel="Save changes"
            isSubmitting={isSubmitting}
            serverError={error}
            onServerErrorClear={clearError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
