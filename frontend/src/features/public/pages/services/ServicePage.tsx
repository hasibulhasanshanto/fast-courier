import { useTranslation } from "react-i18next";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { useDocumentTitle } from "@/hooks";

export default function AboutPage() {
  const { t } = useTranslation();
  useDocumentTitle("Services | Fast Courier");

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        eyebrow={"Services"}
        title={"This is a service page"}
        description={"This is a service description"}
      />

      {/* Code will added here  */}
    </Container>
  );
}
