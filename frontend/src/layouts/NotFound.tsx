import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { ROUTES } from "@/config";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        {t("notFound.eyebrow")}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        {t("notFound.title")}
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        {t("notFound.description")}
      </p>
      <Button asChild className="mt-6">
        <Link to={ROUTES.home}>{t("common.backHome")}</Link>
      </Button>
    </Container>
  );
}
