import { useTranslation } from "react-i18next";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { useDocumentTitle } from "@/hooks";

export default function AboutPage() {
  const { t } = useTranslation();
  useDocumentTitle("Pricing | Fast Courier");

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        eyebrow={"Pricing"}
        title={"This is a pricing page"}
        description={"This is a pricing description"}
      />

      {/* Code will added here  */}
    </Container>
  );
}
