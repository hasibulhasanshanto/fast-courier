import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Eye,
  Loader2,
  Mail,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
 * Users list page.
 *
 * Mirrors `PostsListPage`:
 *   - Fetches the canonical list on mount via the store.
 *   - Exposes a client-side search across name / username / email /
 *     company.
 *   - Each row links to detail, edit, and triggers a delete.
 */
export default function UsersListPage() {
  useDocumentTitle("Users | Dashboard");
  const navigate = useNavigate();

  const users = useUsersStore((s) => s.users);
  const listStatus = useUsersStore((s) => s.listStatus);
  const error = useUsersStore((s) => s.error);
  const fetchAll = useUsersStore((s) => s.fetchAll);
  const remove = useUsersStore((s) => s.remove);
  const clearError = useUsersStore((s) => s.clearError);

  const [query, setQuery] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.company?.name.toLowerCase().includes(q),
    );
  }, [users, query]);

  const handleDelete = async (id: number) => {
    const ok = window.confirm(
      "Delete this user? This cannot be undone (mock API won't persist it).",
    );
    if (!ok) return;
    setPendingDeleteId(id);
    await remove(id);
    setPendingDeleteId(null);
  };

  const isLoading = listStatus === "loading";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Full CRUD backed by JSONPlaceholder's /users endpoint.
          </p>
        </div>
        <Button asChild>
          <Link to={ROUTES.usersNew}>
            <Plus className="mr-1 h-4 w-4" />
            New User
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All users</CardTitle>
          <CardDescription>
            {users.length} total · {filtered.length} shown
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, username, email, or company…"
              className="pl-8"
              aria-label="Search users"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-center justify-between rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              <span>{error}</span>
              <Button size="xs" variant="ghost" onClick={clearError}>
                Dismiss
              </Button>
            </div>
          )}

          {isLoading && users.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading users…
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
              {query
                ? "No users match your search."
                : "No users yet. Create your first one."}
            </div>
          ) : (
            <ul className="divide-y">
              {filtered.map((u) => (
                <li
                  key={u.id}
                  className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      <span className="mr-2 text-muted-foreground">
                        #{u.id}
                      </span>
                      {u.name}{" "}
                      <span className="text-muted-foreground">
                        @{u.username}
                      </span>
                    </p>
                    <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" aria-hidden /> {u.email}
                      {u.company?.name ? (
                        <>
                          <span aria-hidden>·</span>
                          <span>{u.company.name}</span>
                        </>
                      ) : null}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => navigate(ROUTES.userDetail(u.id))}
                      aria-label="View user"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => navigate(ROUTES.userEdit(u.id))}
                      aria-label="Edit user"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleDelete(u.id)}
                      disabled={pendingDeleteId === u.id}
                      aria-label="Delete user"
                    >
                      {pendingDeleteId === u.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 text-destructive" />
                      )}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
