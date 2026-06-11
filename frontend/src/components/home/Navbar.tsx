import { Link, useLocation } from 'react-router-dom'
import { Package2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const location = useLocation()
  // Helper function to highlight the active route
  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        {/* Brand / Logo */}
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">Fast Courier</span>
          </Link>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            to="/shipments"
            className={`transition-colors hover:text-foreground/80 ${
              isActive('/shipments') ? 'text-foreground' : 'text-foreground/60'
            }`}
          >
            Shipments
          </Link>
          <Link
            to="/tracking"
            className={`transition-colors hover:text-foreground/80 ${
              isActive('/tracking') ? 'text-foreground' : 'text-foreground/60'
            }`}
          >
            Tracking
          </Link>
        </nav>

        {/* Right Side Actions (Auth Buttons) */}
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
