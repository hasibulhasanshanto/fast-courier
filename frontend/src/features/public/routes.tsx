import { lazy } from 'react'
import type { RouteObject } from 'react-router'
import { withLayout } from '@/layouts/withLayout'
import { RootErrorBoundary } from '@/layouts/RootErrorBoundary'
import { ROUTES } from '@/config'

const HomePage = lazy(() => import('@/features/public/pages/home/HomePage'))
const ServicePage = lazy(() => import('@/features/public/pages/services/ServicePage'))
const CoveragePage = lazy(() => import('@/features/public/pages/coverage/CoveragePage'))
const AboutPage = lazy(() => import('@/features/public/pages/about/AboutPage'))
const PricingPage = lazy(() => import('@/features/public/pages/pricing/PricingPage'))
const BlogPage = lazy(() => import('@/features/public/pages/blog/BlogPage'))
const ContactPage = lazy(() => import('@/features/public/pages/contact/ContactPage'))

/**
 * Public pages routes. Mounted at "/" with the public layout.
 */
export const publicRoutes: RouteObject[] = [
  {
    path: ROUTES.home,
    element: withLayout('public'),
    errorElement: <RootErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.services, element: <ServicePage /> },
      {
        path: ROUTES.coverage,
        element: <CoveragePage />,
        loader: () => fetch('/data/centers.json').then((res) => res.json()),
      },
      { path: ROUTES.about, element: <AboutPage /> },
      { path: ROUTES.pricing, element: <PricingPage /> },
      { path: ROUTES.blog, element: <BlogPage /> },
      {
        path: ROUTES.contact,
        element: <ContactPage />,
      },
    ],
  },
]
