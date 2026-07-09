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
import { usePostsStore } from "../../stores/usePostsStore";
import { PostForm } from "../../components/PostForm";
import type { CreatePostFormValues } from "../../schemas/post.schema";

/**
 * Edit-post page.
 *
 * Fetches the post (if not already in the store) and pre-fills the
 * shared <PostForm /> with its current values. On save, calls the
 * store's `update` action which PUTs the full payload to the server
 * and patches the local list.
 */
export default function PostEditPage() {
  const { postId } = useParams<{ postId: string }>();
  const id = Number(postId);
  const navigate = useNavigate();

  const currentPost = usePostsStore((s) => s.currentPost);
  const detailStatus = usePostsStore((s) => s.detailStatus);
  const error = usePostsStore((s) => s.error);
  const fetchOne = usePostsStore((s) => s.fetchOne);
  const update = usePostsStore((s) => s.update);
  const clearError = usePostsStore((s) => s.clearError);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useDocumentTitle(
    currentPost ? `Edit #${currentPost.id} | Dashboard` : "Edit Post | Dashboard",
  );

  useEffect(() => {
    if (Number.isFinite(id) && (!currentPost || currentPost.id !== id)) {
      fetchOne(id);
    }
  }, [id, currentPost, fetchOne]);

  if (!Number.isFinite(id)) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        Invalid post id.
      </div>
    );
  }

  const handleSubmit = async (values: CreatePostFormValues) => {
    setIsSubmitting(true);
    const updated = await update(id, {
      userId: values.userId,
      title: values.title,
      body: values.body,
    });
    setIsSubmitting(false);
    if (updated) {
      navigate(`/dashboard/posts/${id}`);
      return true;
    }
    return false;
  };

  if (detailStatus === "loading" && !currentPost) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading post…
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
        <CardHeader>
          <CardTitle>Edit post #{currentPost.id}</CardTitle>
          <CardDescription>
            Update the title, body, or author. JSONPlaceholder will echo the
            change back; the local list is patched immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostForm
            defaultValues={{
              userId: currentPost.userId,
              title: currentPost.title,
              body: currentPost.body,
            }}
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
