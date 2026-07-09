import { useTranslation } from "react-i18next";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks";

const VALUE_KEYS = ["predictable", "boring", "ships"] as const;

export default function AboutPage() {
  const { t } = useTranslation();
  useDocumentTitle("About | Fast Courier");

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        description={t("about.subtitle")}
      />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {VALUE_KEYS.map((k) => (
          <Card key={k}>
            <CardContent className="space-y-2 pt-6">
              <h3 className="text-base font-semibold">
                {t(`about.value${k.charAt(0).toUpperCase() + k.slice(1)}Title`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`about.value${k.charAt(0).toUpperCase() + k.slice(1)}Body`)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="prose prose-neutral dark:prose-invert mt-12 max-w-none">
        <h2>{t("about.howOrganizedTitle")}</h2>
        <p>{t("about.howOrganizedP1")}</p>
        <p>{t("about.howOrganizedP2")}</p>
      </div>
    </Container>
  );
}
