import { useTranslation } from "react-i18next";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { useDocumentTitle } from "@/hooks";

export default function AboutPage() {
  const { t } = useTranslation();
  useDocumentTitle("Blog | Fast Courier");

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        eyebrow={"Blog"}
        title={"This is a blog page"}
        description={"This is a blog description"}
      />

      {/* Code will added here  */}
    </Container>
  );
}
