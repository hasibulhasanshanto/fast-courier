import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/common/Container'
import { useAuthStore } from '@/features/auth'
import { useDocumentTitle } from '@/hooks'
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
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.user)

  const { data: reviews } = useFetch<Review[]>('/data/reviews.json')
  const { data: faqs } = useFetch<Faq[]>('/data/faqs.json')

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-muted/30">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Welcome{isAuthenticated && user ? `, ${user.name}` : ''}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A production-grade React starter with React Router, Zustand, and react-hook-form —
              typed, layered, and ready to ship.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {isAuthenticated ? (
                <>
                  <Button asChild size="lg">
                    <Link to="/dashboard">Go to dashboard</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/about">Learn more</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg">
                    <Link to="/register">Get started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/login">I already have an account</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

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
