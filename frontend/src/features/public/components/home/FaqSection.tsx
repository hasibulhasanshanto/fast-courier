import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeader
            align="center"
            eyebrow=""
            title={t('home.faq.title')}
            description={t('home.faq.description')}
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
