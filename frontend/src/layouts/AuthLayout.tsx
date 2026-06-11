import { Outlet } from 'react-router-dom'
import { Package2 } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Branding Column / Banner Left Panel */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
          <Package2 className="h-6 w-6" />
          <span>CourierPro Enterprise</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              'Managing logistics has never been this simple, modular, and fast.'
            </p>
            <footer className="text-sm text-muted-foreground">- Global Delivery Systems</footer>
          </blockquote>
        </div>
      </div>

      {/* Render Authentication Forms on Right Panel */}
      <div className="lg:p-8 flex items-center justify-center min-h-screen">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-87.5">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
