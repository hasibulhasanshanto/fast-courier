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
import { usePostsStore } from "../../stores/usePostsStore";
import { PostForm } from "../../components/PostForm";
import type { CreatePostFormValues } from "../../schemas/post.schema";

/**
 * Create-post page.
 *
 * Renders the shared <PostForm /> in "create" mode. On successful
 * create, navigates to the new post's detail page.
 */
export default function PostCreatePage() {
  useDocumentTitle("New Post | Dashboard");
  const navigate = useNavigate();
  const create = usePostsStore((s) => s.create);
  const error = usePostsStore((s) => s.error);
  const clearError = usePostsStore((s) => s.clearError);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: CreatePostFormValues) => {
    setIsSubmitting(true);
    const created = await create({
      userId: values.userId,
      title: values.title,
      body: values.body,
    });
    setIsSubmitting(false);
    if (created) {
      navigate(`/dashboard/posts/${created.id}`);
      return true;
    }
    return false;
  };

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
          <CardTitle>New post</CardTitle>
          <CardDescription>
            Create a new post. JSONPlaceholder will echo the payload back
            without persisting it; the local list is updated so you can see
            it immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostForm
            onSubmit={handleSubmit}
            submitLabel="Create post"
            isSubmitting={isSubmitting}
            serverError={error}
            onServerErrorClear={clearError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
