import { Container } from '@/components/common/Container'
import { SectionHeader } from '@/components/common/SectionHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Faq } from '@/features/type/faqs'

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
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
            <Accordion type="single" collapsible defaultValue="first" className="max-w-4xl mx-auto">
              {faqs.map((faq) => (
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
  )
}
