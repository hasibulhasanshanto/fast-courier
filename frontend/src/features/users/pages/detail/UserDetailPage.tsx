import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Building2,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
} from "lucide-react";
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
import { ROUTES } from "@/config";

/**
 * Single-user detail page.
 *
 * Reads `:userId` from the URL, fetches the user via the store, and
 * renders the nested address / company sub-objects. Includes edit /
 * delete affordances.
 */
export default function UserDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  const id = Number(userId);
  const navigate = useNavigate();

  const currentUser = useUsersStore((s) => s.currentUser);
  const detailStatus = useUsersStore((s) => s.detailStatus);
  const error = useUsersStore((s) => s.error);
  const fetchOne = useUsersStore((s) => s.fetchOne);
  const remove = useUsersStore((s) => s.remove);

  const [isDeleting, setIsDeleting] = useState(false);

  useDocumentTitle(
    currentUser
      ? `${currentUser.name} | Dashboard`
      : "User | Dashboard",
  );

  useEffect(() => {
    if (Number.isFinite(id)) {
      fetchOne(id);
    }
  }, [id, fetchOne]);

  if (!Number.isFinite(id)) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        Invalid user id.
      </div>
    );
  }

  const handleDelete = async () => {
    const ok = window.confirm("Delete this user?");
    if (!ok) return;
    setIsDeleting(true);
    const removed = await remove(id);
    setIsDeleting(false);
    if (removed) navigate(ROUTES.users);
  };

  if (detailStatus === "loading" && !currentUser) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading user…
      </div>
    );
  }

  if (error && !currentUser) {
    return (
      <div
        role="alert"
        className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
      >
        {error}
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
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="min-w-0">
            <CardDescription className="mb-1">
              User #{currentUser.id} · @{currentUser.username}
            </CardDescription>
            <CardTitle className="text-xl">{currentUser.name}</CardTitle>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to={ROUTES.userEdit(currentUser.id)}>
                <Pencil className="mr-1 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-1 h-4 w-4" />
              )}
              Delete
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DetailRow icon={Mail} label="Email" value={currentUser.email} />
            <DetailRow icon={Phone} label="Phone" value={currentUser.phone} />
            <DetailRow
              icon={Globe}
              label="Website"
              value={currentUser.website}
            />
            <DetailRow
              icon={MapPin}
              label="Address"
              value={
                currentUser.address
                  ? `${currentUser.address.street}${
                      currentUser.address.suite
                        ? `, ${currentUser.address.suite}`
                        : ""
                    }, ${currentUser.address.city} ${currentUser.address.zipcode}`
                  : "—"
              }
            />
            <DetailRow
              icon={Building2}
              label="Company"
              value={
                currentUser.company
                  ? `${currentUser.company.name}${
                      currentUser.company.catchPhrase
                        ? ` — ${currentUser.company.catchPhrase}`
                        : ""
                    }`
                  : "—"
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-md border bg-muted/30 p-3">
      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden />
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="truncate text-sm">{value}</p>
      </div>
    </div>
  );
}
