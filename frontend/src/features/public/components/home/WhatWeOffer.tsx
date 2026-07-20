import { useTranslation } from 'react-i18next'
import { Card, CardDescription, CardTitle, CardContent } from '@/components/ui/card'
import { Container } from '@/components/common/Container'
import DropParcel from '@/assets/images/offer/drop-parcel.png'
import ManParcel from '@/assets/images/offer/man-parcel.png'

export default function WhatWeOffer() {
  const { t } = useTranslation()

  const OFFER_DATA = [
    {
      id: 1,
      icon: DropParcel,
      title: t('home.whatWeOffer.item1Title'),
      description: t('home.whatWeOffer.item1Desc'),
    },
    {
      id: 2,
      icon: ManParcel,
      title: t('home.whatWeOffer.item2Title'),
      description: t('home.whatWeOffer.item2Desc'),
    },
    {
      id: 3,
      icon: ManParcel,
      title: t('home.whatWeOffer.item3Title'),
      description: t('home.whatWeOffer.item3Desc'),
    },
  ]

  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <div className="mt-8 flex flex-col gap-10 drop-shadow-lg">
            {OFFER_DATA.map((service) => (
              <Card key={service.id}>
                <CardContent className="flex flex-col md:flex-row text-center md:text-left items-center gap-0 p-0">
                  {/* Image */}
                  <div className="w-56 shrink-0 p-6">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Vertical Divider */}
                  <div className="self-stretch border-l border-dashed border-gray-300" />

                  {/* Content */}
                  <div className="flex flex-col gap-2 px-8 py-6">
                    <CardTitle className="text-2xl text-primary font-bold">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
