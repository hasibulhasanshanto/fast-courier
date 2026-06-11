import AuthLayout from '@/layouts/AuthLayout'
import BaseLayout from '@/layouts/BaseLayout'
import HomePage from '@/pages/HomePage'
import { createBrowserRouter } from 'react-router-dom'

// Dynamic lazy imports to optimize performance
const ShipmentsPage = () => import('@/pages/ShipmentsPage')
const TrackingPage = () => import('@/pages/TrackingPage')
const LoginPage = () => import('@/pages/auth/LoginPage')
const RegisterPage = () => import('@/pages/auth/RegisterPage')

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'shipments',
        lazy: async () => ({ Component: (await ShipmentsPage()).default }),
      },
      {
        path: 'tracking',
        lazy: async () => ({ Component: (await TrackingPage()).default }),
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        lazy: async () => ({ Component: (await LoginPage()).default }),
      },
      {
        path: 'register',
        lazy: async () => ({ Component: (await RegisterPage()).default }),
      },
    ],
  },
])
