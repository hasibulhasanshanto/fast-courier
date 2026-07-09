import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
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
} from "../../components/UserForm";
import { ROUTES } from "@/config";
import type { CreateUserFormValues } from "../../schemas/user.schema";

/**
 * Create-user page.
 *
 * Renders the shared <UserForm /> in "create" mode. On successful
 * create, navigates to the new user's detail page.
 */
export default function UserCreatePage() {
  useDocumentTitle("New User | Dashboard");
  const navigate = useNavigate();
  const create = useUsersStore((s) => s.create);
  const error = useUsersStore((s) => s.error);
  const clearError = useUsersStore((s) => s.clearError);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: CreateUserFormValues) => {
    setIsSubmitting(true);
    const created = await create(formValuesToUserInput(values));
    setIsSubmitting(false);
    if (created) {
      navigate(ROUTES.userDetail(created.id));
      return true;
    }
    return false;
  };

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
          <CardTitle>New user</CardTitle>
          <CardDescription>
            Create a new user. JSONPlaceholder will echo the payload back
            without persisting it; the local list is updated so you can see
            it immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm
            onSubmit={handleSubmit}
            submitLabel="Create user"
            isSubmitting={isSubmitting}
            serverError={error}
            onServerErrorClear={clearError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
