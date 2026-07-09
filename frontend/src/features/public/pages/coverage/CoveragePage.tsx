import { useTranslation } from "react-i18next";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { useDocumentTitle } from "@/hooks";

export default function AboutPage() {
  const { t } = useTranslation();
  useDocumentTitle("Coverage | Fast Courier");

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        eyebrow={"Coverage"}
        title={"This is a coverage page"}
        description={"This is a coverage description"}
      />

      {/* Code will added here  */}
    </Container>
  );
}
