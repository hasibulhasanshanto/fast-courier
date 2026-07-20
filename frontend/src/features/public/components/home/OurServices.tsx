import { useTranslation } from 'react-i18next'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/common/Container'
import ServiceIcon from '@/assets/images/icons/service-icon.svg'

export default function OurServices() {
  const { t } = useTranslation()

  const SERVICES_DATA = [
    {
      id: 1,
      icon: ServiceIcon,
      title: t('home.ourServices.service1Title'),
      description: t('home.ourServices.service1Desc'),
    },
    {
      id: 2,
      icon: ServiceIcon,
      title: t('home.ourServices.service2Title'),
      description: t('home.ourServices.service2Desc'),
    },
    {
      id: 3,
      icon: ServiceIcon,
      title: t('home.ourServices.service3Title'),
      description: t('home.ourServices.service3Desc'),
    },
    {
      id: 4,
      icon: ServiceIcon,
      title: t('home.ourServices.service4Title'),
      description: t('home.ourServices.service4Desc'),
    },
    {
      id: 5,
      icon: ServiceIcon,
      title: t('home.ourServices.service5Title'),
      description: t('home.ourServices.service5Desc'),
    },
    {
      id: 6,
      icon: ServiceIcon,
      title: t('home.ourServices.service6Title'),
      description: t('home.ourServices.service6Desc'),
    },
  ]

  return (
    <>
      <section className="bg-fuchsia-800 mx-3 md:mx-4 lg:mx-16 rounded-2xl">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">
              {t('home.ourServices.title')}
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-[#DADADA]">
              {t('home.ourServices.subtitle')}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((service) => (
              <Card
                className="flex flex-col justify-center text-center p-5 md:p-8 hover:bg-pink-300 cursor-pointer"
                key={service.id}
              >
                <CardHeader className="flex flex-col items-center">
                  <img src={service.icon} alt="service-icon" className="h-20 w-20" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
