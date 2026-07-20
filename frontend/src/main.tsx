import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Side-effect import: initializes i18next before any component reads from it.
import '@/i18n'
import { RouterProvider } from 'react-router'
import { router } from '@/routes/router'
import { AppProviders } from '@/App'
import './index.css'
import 'swiper/css'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Root element #root not found in index.html')
}

createRoot(rootEl).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
)
