import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Eye,
  Loader2,
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
import { usePostsStore } from "../../stores/usePostsStore";
import { ROUTES } from "@/config";

/**
 * Posts list page.
 *
 * - Fetches the canonical list on mount via the store.
 * - Exposes a client-side search (title/body) so the list is usable
 *   with 100 rows of mock data.
 * - Each row links to detail, edit, and triggers a delete.
 */
export default function PostsListPage() {
  useDocumentTitle("Posts | Dashboard");
  const navigate = useNavigate();

  const posts = usePostsStore((s) => s.posts);
  const listStatus = usePostsStore((s) => s.listStatus);
  const error = usePostsStore((s) => s.error);
  const fetchAll = usePostsStore((s) => s.fetchAll);
  const remove = usePostsStore((s) => s.remove);
  const clearError = usePostsStore((s) => s.clearError);

  const [query, setQuery] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  useEffect(() => {
    // Always refetch on mount so deletes from other tabs / hard refresh
    // show fresh data. The store is in-memory only by design.
    fetchAll();
  }, [fetchAll]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q),
    );
  }, [posts, query]);

  const handleDelete = async (id: number) => {
    const ok = window.confirm(
      "Delete this post? This cannot be undone (mock API won't persist it).",
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
          <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
          <p className="text-muted-foreground">
            Full CRUD backed by JSONPlaceholder's /posts endpoint.
          </p>
        </div>
        <Button asChild>
          <Link to={ROUTES.postsNew}>
            <Plus className="mr-1 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All posts</CardTitle>
          <CardDescription>
            {posts.length} total · {filtered.length} shown
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
              placeholder="Search by title or body…"
              className="pl-8"
              aria-label="Search posts"
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

          {isLoading && posts.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading posts…
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
              {query
                ? "No posts match your search."
                : "No posts yet. Create your first one."}
            </div>
          ) : (
            <ul className="divide-y">
              {filtered.map((post) => (
                <li
                  key={post.id}
                  className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      <span className="mr-2 text-muted-foreground">
                        #{post.id}
                      </span>
                      {post.title}
                    </p>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {post.body}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => navigate(`/dashboard/posts/${post.id}`)}
                      aria-label="View post"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() =>
                        navigate(`/dashboard/posts/${post.id}/edit`)
                      }
                      aria-label="Edit post"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleDelete(post.id)}
                      disabled={pendingDeleteId === post.id}
                      aria-label="Delete post"
                    >
                      {pendingDeleteId === post.id ? (
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
