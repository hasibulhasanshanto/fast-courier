import { APP_CONFIG, ROUTES } from '@/config'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/common/Container'
import { Package } from 'lucide-react'

import Linkedin from '@/assets/images/socials/linkedin'
import Twitter from '@/assets/images/socials/twitter'
import Facebook from '@/assets/images/socials/facebook'
import Youtube from '@/assets/images/socials/youtube'

const FOOTER_LINKS = [
  { to: ROUTES.home, labelKey: 'nav.home' as const, end: true },
  { to: ROUTES.services, labelKey: 'Services' as const },
  { to: ROUTES.coverage, labelKey: 'Coverage' as const },
  { to: ROUTES.about, labelKey: 'nav.about' as const },
  { to: ROUTES.pricing, labelKey: 'Pricing' as const },
  { to: ROUTES.blog, labelKey: 'Blog' as const },
  { to: ROUTES.contact, labelKey: 'nav.contact' as const },
]

export function PublicFooter() {
  const { t } = useTranslation()

  return (
    <footer className="bg-black mx-3 md:mx-4 lg:mx-16 rounded-2xl py-10 mb-10">
      <Container className="py-10">
        <div className="flex flex-col items-center justify-between">
          {/* Brand  */}
          <Link to="/" className="flex items-center gap-2 text-3xl font-semibold text-white mb-5">
            <span className="p-1 text-primary-foreground">
              <Package className="h-12 w-12" aria-hidden />
            </span>
            {APP_CONFIG.name}
          </Link>

          {/* Footer menu  */}
          <hr className="w-full border-t border-dashed border-violet-500 my-5" />
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            {FOOTER_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-white transition-colors">
                {t(l.labelKey)}
              </Link>
            ))}
          </nav>
          <hr className="w-full border-t border-dashed border-violet-500 my-5" />
          {/* Footer menu  */}

          {/* Copy Right Text */}
          <p className="text-xs text-white/70 mt-5">
            © {new Date().getFullYear()} {APP_CONFIG.name}. {t('footer.rights')}
          </p>

          {/* Socials  */}
          <div className="flex justify-center items-center mt-10 gap-3">
            <Link to="#" className="p-2 bg-white rounded-full">
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link to="#" className="p-2 bg-white rounded-full">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link to="#" className="p-2 bg-white rounded-full">
              <Facebook className="w-4 h-4" />
            </Link>
            <Link to="#" className="p-2 bg-white rounded-full">
              <Youtube className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
