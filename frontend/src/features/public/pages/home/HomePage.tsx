import { useDocumentTitle } from '@/hooks'
import HeroSlider from '@/features/public/components/home/HeroSlider'
import HowItWorks from '@/features/public/components/home/HowItWorks'
import OurServices from '@/features/public/components/home/OurServices'
import FaqSection from '@/features/public/components/home/FaqSection'
import SalesTeam from '@/features/public/components/home/SalesTeam'
import WhatWeOffer from '@/features/public/components/home/WhatWeOffer'
import Testimonials from '@/features/public/components/home/Testimonials'
import { useFetch } from '@/hooks/useFetch'
import type { Review } from '@/features/type/reviews'
import type { Faq } from '@/features/type/faqs'

export default function HomePage() {
  useDocumentTitle('Home | Fast Courier')

  const { data: reviews } = useFetch<Review[]>('/data/reviews.json')
  const { data: faqs } = useFetch<Faq[]>('/data/faqs.json')

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* How It Works */}
      <HowItWorks />

      {/* How It Works */}
      <OurServices />

      {/* What We Offer */}
      <WhatWeOffer />

      {/* Sales Team */}
      <SalesTeam />

      {/* Testimonials */}
      <Testimonials reviews={reviews ?? []} />

      {/* Faq Section */}
      <FaqSection faqs={faqs ?? []} />
    </>
  )
}
