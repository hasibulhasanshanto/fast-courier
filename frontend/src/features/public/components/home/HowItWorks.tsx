import { useTranslation } from 'react-i18next'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Container } from '@/components/common/Container'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Banknote, Building2, CirclePile, Truck } from 'lucide-react'

export default function HowItWorks() {
  const { t } = useTranslation()

  const WORKS_SECTION_DATA = [
    {
      id: 1,
      icon: Truck,
      title: t('home.howItWorks.item1Title'),
      description: t('home.howItWorks.item1Desc'),
    },
    {
      id: 2,
      icon: Banknote,
      title: t('home.howItWorks.item2Title'),
      description: t('home.howItWorks.item2Desc'),
    },
    {
      id: 3,
      icon: CirclePile,
      title: t('home.howItWorks.item3Title'),
      description: t('home.howItWorks.item3Desc'),
    },
    {
      id: 4,
      icon: Building2,
      title: t('home.howItWorks.item4Title'),
      description: t('home.howItWorks.item4Desc'),
    },
  ]

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeader
            align="left"
            eyebrow=""
            title={t('home.howItWorks.title')}
            description=""
          />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKS_SECTION_DATA.map((f) => (
              <Card key={f.id}>
                <CardHeader>
                  <f.icon className="h-12 w-12" aria-hidden />
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
