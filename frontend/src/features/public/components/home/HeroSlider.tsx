import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/features/auth'
import {
  PackageCheck,
  Truck,
  Globe,
  Clock3,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Swiper core styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// ─── Static slide config (styling only, no text) ───────────────────────────────
const SLIDE_CONFIG = [
  {
    id: 1,
    gradient: 'from-[#1a0533] via-[#2d0a52] to-[#3b0764]',
    accentColor: 'text-violet-400',
    accentBg: 'bg-violet-500/20 border-violet-500/30',
    accentBtn: 'bg-violet-600 hover:bg-violet-700',
    badgeIconKey: 'truck' as const,
    primaryTo: '/send',
    secondaryTo: '/track',
    stat1Value: '50K+',
    stat2Value: '99.8%',
    stat3Value: '24/7',
    illustrationVariant: 'truck' as const,
  },
  {
    id: 2,
    gradient: 'from-[#001a33] via-[#002a52] to-[#003366]',
    accentColor: 'text-sky-400',
    accentBg: 'bg-sky-500/20 border-sky-500/30',
    accentBtn: 'bg-sky-600 hover:bg-sky-700',
    badgeIconKey: 'globe' as const,
    primaryTo: '/coverage',
    secondaryTo: '/pricing',
    stat1Value: '64',
    stat2Value: '500+',
    stat3Value: '3–5h',
    illustrationVariant: 'globe' as const,
  },
  {
    id: 3,
    gradient: 'from-[#1a1a00] via-[#2d2d00] to-[#3d3300]',
    accentColor: 'text-amber-400',
    accentBg: 'bg-amber-500/20 border-amber-500/30',
    accentBtn: 'bg-amber-600 hover:bg-amber-700',
    badgeIconKey: 'shield' as const,
    primaryTo: '/register',
    secondaryTo: '/merchant',
    stat1Value: '10K+',
    stat2Value: '100%',
    stat3Value: '4.9★',
    illustrationVariant: 'shield' as const,
  },
]

// ─── Illustration sub-components ───────────────────────────────────────────────
function TruckIllustration({ badge1, badge2 }: { badge1: string; badge2: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-72 w-72 rounded-full border border-violet-500/20 animate-ping [animation-duration:3s]" />
      <div className="absolute h-56 w-56 rounded-full border border-violet-500/30" />
      <div className="absolute h-40 w-40 rounded-full bg-violet-500/10" />
      <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-2xl shadow-violet-900/50">
        <Truck className="h-14 w-14 text-white" />
      </div>
      <div className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-full bg-green-500/20 border border-green-500/40 px-3 py-1.5 text-xs font-semibold text-green-400 backdrop-blur-sm">
        <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
        {badge1}
      </div>
      <div className="absolute -bottom-4 -left-4 flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 px-3 py-1.5 text-xs font-semibold text-blue-400 backdrop-blur-sm">
        <Clock3 className="h-3 w-3" />
        {badge2}
      </div>
    </div>
  )
}

function GlobeIllustration({ badge1, badge2 }: { badge1: string; badge2: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-72 w-72 rounded-full border border-sky-500/20 animate-ping [animation-duration:4s]" />
      <div className="absolute h-56 w-56 rounded-full border border-sky-500/30" />
      <div className="absolute h-40 w-40 rounded-full bg-sky-500/10" />
      <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-600 to-blue-700 shadow-2xl shadow-blue-900/50">
        <Globe className="h-14 w-14 text-white" />
      </div>
      <div className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
        <ShieldCheck className="h-3 w-3" />
        {badge1}
      </div>
      <div className="absolute -bottom-4 -left-4 flex items-center gap-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 px-3 py-1.5 text-xs font-semibold text-orange-400 backdrop-blur-sm">
        <PackageCheck className="h-3 w-3" />
        {badge2}
      </div>
    </div>
  )
}

function ShieldIllustration({ badge1, badge2 }: { badge1: string; badge2: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-72 w-72 rounded-full border border-amber-500/20 animate-ping [animation-duration:3.5s]" />
      <div className="absolute h-56 w-56 rounded-full border border-amber-500/30" />
      <div className="absolute h-40 w-40 rounded-full bg-amber-500/10" />
      <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl shadow-orange-900/50">
        <ShieldCheck className="h-14 w-14 text-white" />
      </div>
      <div className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-full bg-green-500/20 border border-green-500/40 px-3 py-1.5 text-xs font-semibold text-green-400 backdrop-blur-sm">
        <PackageCheck className="h-3 w-3" />
        {badge1}
      </div>
      <div className="absolute -bottom-4 -left-4 flex items-center gap-1.5 rounded-full bg-violet-500/20 border border-violet-500/40 px-3 py-1.5 text-xs font-semibold text-violet-400 backdrop-blur-sm">
        <Clock3 className="h-3 w-3" />
        {badge2}
      </div>
    </div>
  )
}

// ─── component ─────────────────────────────────────────────────────────────────
export default function HeroSlider() {
  const { t } = useTranslation()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.user)

  // Per-slide translated data
  const slideData = [
    {
      badge: t('home.hero.slide1.badge'),
      headline: t('home.hero.slide1.headline'),
      subheading: t('home.hero.slide1.subheading'),
      primaryCta: t('home.hero.slide1.primaryCta'),
      secondaryCta: t('home.hero.slide1.secondaryCta'),
      stat1Label: t('home.hero.slide1.stat1Label'),
      stat2Label: t('home.hero.slide1.stat2Label'),
      stat3Label: t('home.hero.slide1.stat3Label'),
      badge1: t('home.hero.slide1.badge1'),
      badge2: t('home.hero.slide1.badge2'),
    },
    {
      badge: t('home.hero.slide2.badge'),
      headline: t('home.hero.slide2.headline'),
      subheading: t('home.hero.slide2.subheading'),
      primaryCta: t('home.hero.slide2.primaryCta'),
      secondaryCta: t('home.hero.slide2.secondaryCta'),
      stat1Label: t('home.hero.slide2.stat1Label'),
      stat2Label: t('home.hero.slide2.stat2Label'),
      stat3Label: t('home.hero.slide2.stat3Label'),
      badge1: t('home.hero.slide2.badge1'),
      badge2: t('home.hero.slide2.badge2'),
    },
    {
      badge: t('home.hero.slide3.badge'),
      headline: t('home.hero.slide3.headline'),
      subheading: t('home.hero.slide3.subheading'),
      primaryCta: t('home.hero.slide3.primaryCta'),
      secondaryCta: t('home.hero.slide3.secondaryCta'),
      stat1Label: t('home.hero.slide3.stat1Label'),
      stat2Label: t('home.hero.slide3.stat2Label'),
      stat3Label: t('home.hero.slide3.stat3Label'),
      badge1: t('home.hero.slide3.badge1'),
      badge2: t('home.hero.slide3.badge2'),
    },
  ]

  return (
    <section className="relative overflow-hidden border-b">
      {/* Custom pagination styles */}
      <style>{`
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          display: none;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 28px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.35);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #fff;
          width: 48px;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ nextEl: '.hero-next', prevEl: '.hero-prev' }}
        loop
        className="hero-swiper"
      >
        {SLIDE_CONFIG.map((cfg, idx) => {
          const data = slideData[idx]
          return (
            <SwiperSlide key={cfg.id}>
              {/* Dark gradient background */}
              <div
                className={`relative min-h-[620px] bg-gradient-to-br ${cfg.gradient} flex items-center`}
              >
                {/* Decorative grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                  }}
                />

                {/* Content */}
                <div className="container relative z-10 mx-auto px-4 py-20 sm:py-28">
                  <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* ── Left: Text ── */}
                    <div className="space-y-6 text-white">
                      {/* Badge */}
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm ${cfg.accentBg} ${cfg.accentColor}`}
                      >
                        {cfg.illustrationVariant === 'truck' && <Truck className="h-3.5 w-3.5" />}
                        {cfg.illustrationVariant === 'globe' && <Globe className="h-3.5 w-3.5" />}
                        {cfg.illustrationVariant === 'shield' && (
                          <ShieldCheck className="h-3.5 w-3.5" />
                        )}
                        {data.badge}
                      </span>

                      {/* Headline */}
                      <h1 className="whitespace-pre-line text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        {data.headline}
                      </h1>

                      {/* Subheading */}
                      <p className="max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
                        {data.subheading}
                      </p>

                      {/* CTA buttons */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {isAuthenticated && user ? (
                          <>
                            <Button
                              asChild
                              size="lg"
                              className={`gap-2 text-white shadow-lg ${cfg.accentBtn}`}
                            >
                              <Link to="/dashboard">
                                {t('home.hero.ctaDashboard')}{' '}
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              asChild
                              size="lg"
                              variant="outline"
                              className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                            >
                              <Link to="/track">{t('home.hero.ctaTrack')}</Link>
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              asChild
                              size="lg"
                              className={`gap-2 text-white shadow-lg ${cfg.accentBtn}`}
                            >
                              <Link to={cfg.primaryTo}>
                                {data.primaryCta} <ArrowRight className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              asChild
                              size="lg"
                              variant="outline"
                              className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                            >
                              <Link to={cfg.secondaryTo}>{data.secondaryCta}</Link>
                            </Button>
                          </>
                        )}
                      </div>

                      {/* Stats row */}
                      <div className="flex flex-wrap gap-6 pt-4">
                        {[
                          { value: cfg.stat1Value, label: data.stat1Label },
                          { value: cfg.stat2Value, label: data.stat2Label },
                          { value: cfg.stat3Value, label: data.stat3Label },
                        ].map((stat) => (
                          <div key={stat.label} className="text-center">
                            <p className={`text-2xl font-bold ${cfg.accentColor}`}>{stat.value}</p>
                            <p className="text-xs text-white/50">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── Right: Illustration ── */}
                    <div className="flex justify-center lg:justify-end">
                      <div className="h-64 w-64 lg:h-80 lg:w-80">
                        {cfg.illustrationVariant === 'truck' && (
                          <TruckIllustration badge1={data.badge1} badge2={data.badge2} />
                        )}
                        {cfg.illustrationVariant === 'globe' && (
                          <GlobeIllustration badge1={data.badge1} badge2={data.badge2} />
                        )}
                        {cfg.illustrationVariant === 'shield' && (
                          <ShieldIllustration badge1={data.badge1} badge2={data.badge2} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}

        {/* Custom navigation arrows */}
        <button
          className="hero-prev absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 transition hover:bg-white/25"
          aria-label={t('home.hero.prevSlide')}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          className="hero-next absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 transition hover:bg-white/25"
          aria-label={t('home.hero.nextSlide')}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </Swiper>
    </section>
  )
}
