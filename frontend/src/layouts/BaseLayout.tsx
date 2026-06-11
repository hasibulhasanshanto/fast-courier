import Navbar from '@/components/home/Navbar'
import { Outlet } from 'react-router-dom'

export default function BaseLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Sticky Top Header */}
      <Navbar />

      {/* Main Feature Content Container */}
      <main className="flex-1 bg-muted/40">
        <div className="container max-w-screen-2xl p-4 md:p-8 animate-in fade-in duration-200">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
