import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { ROUTES } from "@/config";

/**
 * Top-level error boundary rendered by the router.
 * Catches loader/render errors and shows a friendly message.
 */
export function RootErrorBoundary() {
  const { t } = useTranslation();
  const error = useRouteError();

  let title = t("error.title");
  let message = t("error.description");

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data?.message ?? t("error.description");
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        {t("error.eyebrow")}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{message}</p>
      <Button asChild className="mt-6">
        <Link to={ROUTES.home}>{t("common.backHome")}</Link>
      </Button>
    </Container>
  );
}
