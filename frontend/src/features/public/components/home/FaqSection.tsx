import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_DATA = [
  {
    id: 1,
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    value: "first",
  },
  {
    id: 2,
    question: "Is it suitable for all ages and body types?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    value: "second",
  },
  {
    id: 3,
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    value: "third",
  },
  {
    id: 4,
    question: "Does it have smart features like vibration alerts?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    value: "fourth",
  },
  {
    id: 5,
    question: "How will I be notified when the product is back in stock?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    value: "fifth",
  },
];

export default function FaqSection() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeader
            align="center"
            eyebrow=""
            title="Frequently Asked Question (FAQ)"
            description="Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!"
          />

          <div className="mt-8 flex">
            <Accordion
              type="single"
              collapsible
              defaultValue="first"
              className="max-w-4xl mx-auto"
            >
              {FAQ_DATA.map((faq) => (
                <AccordionItem value={faq.value} key={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>
    </>
  );
}
