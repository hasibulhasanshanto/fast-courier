import { Link, NavLink } from 'react-router'
import { LogOut, Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { Brand, LanguageSwitcher, ThemeSwitcher, UserMenu } from '@/components/common'
import { useAuthStore } from '@/features/auth'
import { useDisclosure } from '@/hooks'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/config'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'text-sm font-medium transition-colors hover:text-primary',
    isActive ? 'text-foreground' : 'text-muted-foreground'
  )

/**
 * Shared list of public nav links. Used by both the inline desktop
 * nav and the mobile drawer so the two stay in sync.
 */
const PUBLIC_NAV_LINKS = [
  { to: ROUTES.home, labelKey: 'nav.home' as const, end: true },
  { to: ROUTES.services, labelKey: 'Services' as const },
  { to: ROUTES.coverage, labelKey: 'Coverage' as const },
  { to: ROUTES.about, labelKey: 'nav.about' as const },
  { to: ROUTES.pricing, labelKey: 'Pricing' as const },
  // { to: ROUTES.blog, labelKey: 'Blog' as const },
  { to: ROUTES.contact, labelKey: 'nav.contact' as const },
]

export function PublicNavbar() {
  const { t } = useTranslation()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const logout = useAuthStore((s) => s.logout)
  const { isOpen, open, close } = useDisclosure(false)

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-3 md:mx-4 lg:mx-16 flex h-16 items-center justify-between gap-2">
          <Brand />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {PUBLIC_NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={navLinkClass}>
                {t(l.labelKey)}
              </NavLink>
            ))}
            {isAuthenticated && (
              <NavLink to={ROUTES.dashboard} className={navLinkClass}>
                {t('nav.dashboard')}
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-1">
            <div className="hidden md:flex md:items-center md:gap-1">
              <LanguageSwitcher />
              <ThemeSwitcher />
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link to={ROUTES.login}>{t('nav.login')}</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to={ROUTES.register}>{t('nav.register')}</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile-only cluster: switchers + UserMenu (if signed in)
                stay reachable without opening the drawer. */}
            <div className="flex items-center gap-1 md:hidden">
              <LanguageSwitcher />
              <ThemeSwitcher />
              {isAuthenticated && <UserMenu />}
            </div>

            {/* Hamburger — only on mobile. */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={open}
              aria-label={t('nav.openMenu')}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile drawer with the same nav links + auth controls. */}
      <Drawer open={isOpen} onClose={close} title={<Brand />}>
        <div className="flex h-full flex-col">
          <nav className="flex flex-col gap-1 p-4">
            {PUBLIC_NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={close}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )
                }
              >
                {t(l.labelKey)}
              </NavLink>
            ))}
            {isAuthenticated && (
              <NavLink
                to={ROUTES.dashboard}
                onClick={close}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )
                }
              >
                {t('nav.dashboard')}
              </NavLink>
            )}
          </nav>

          <div className="mt-auto border-t p-4">
            {isAuthenticated ? (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  close()
                  logout()
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t('nav.logout')}
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full" onClick={close}>
                  <Link to={ROUTES.login}>{t('nav.login')}</Link>
                </Button>
                <Button asChild className="w-full" onClick={close}>
                  <Link to={ROUTES.register}>{t('nav.register')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  )
}
