import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks";
import { usePostsStore } from "../../stores/usePostsStore";

/**
 * Single-post detail page.
 *
 * Reads `:postId` from the URL, fetches the post via the store, and
 * renders it. Includes edit / delete affordances.
 */
export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const id = Number(postId);
  const navigate = useNavigate();

  const currentPost = usePostsStore((s) => s.currentPost);
  const detailStatus = usePostsStore((s) => s.detailStatus);
  const error = usePostsStore((s) => s.error);
  const fetchOne = usePostsStore((s) => s.fetchOne);
  const remove = usePostsStore((s) => s.remove);

  const [isDeleting, setIsDeleting] = useState(false);

  useDocumentTitle(
    currentPost ? `Post #${currentPost.id} | Dashboard` : "Post | Dashboard",
  );

  useEffect(() => {
    if (Number.isFinite(id)) {
      fetchOne(id);
    }
  }, [id, fetchOne]);

  if (!Number.isFinite(id)) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        Invalid post id.
      </div>
    );
  }

  const handleDelete = async () => {
    const ok = window.confirm("Delete this post?");
    if (!ok) return;
    setIsDeleting(true);
    const removed = await remove(id);
    setIsDeleting(false);
    if (removed) navigate("/dashboard/posts");
  };

  if (detailStatus === "loading" && !currentPost) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading post…
      </div>
    );
  }

  if (error && !currentPost) {
    return (
      <div
        role="alert"
        className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
      >
        {error}
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
        Post not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/dashboard/posts">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to posts
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="min-w-0">
            <CardDescription className="mb-1">
              Post #{currentPost.id} · by user {currentPost.userId}
            </CardDescription>
            <CardTitle className="text-xl">{currentPost.title}</CardTitle>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to={`/dashboard/posts/${currentPost.id}/edit`}>
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
        <CardContent>
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {currentPost.body}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
