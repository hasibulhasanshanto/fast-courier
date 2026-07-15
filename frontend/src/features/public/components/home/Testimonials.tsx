import { useRef } from 'react'
import { Container } from '@/components/common/Container'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Quote, Star, BadgeCheck } from 'lucide-react'
import Carry from '@/assets/images/testimonials/carry.png'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type { Review } from '@/features/type/reviews'

// Review
export default function Testimonials({ reviews }: { reviews: Review[] }) {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <div className="flex justify-center items-center mb-10">
            <img src={Carry} alt="carry-items" />
          </div>
          <SectionHeader
            align="center"
            eyebrow=""
            title="What our customers are sayings"
            description="Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!"
          />
        </Container>
        {/* Sliders  */}

        <div className="mt-15 relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            centeredSlides={true}
            slidesPerView={1.2}
            spaceBetween={20}
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
            }}
            pagination={{ clickable: true, el: '.custom-pagination' }}
            breakpoints={{
              640: { slidesPerView: 3.2, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 24 },
            }}
          >
            {reviews.map((item) => (
              <SwiperSlide key={item.id} className="py-8">
                {({ isActive }) => (
                  <div
                    className={`
                        rounded-2xl p-6 transition-all duration-300 bg-white
                        ${
                          isActive
                            ? 'shadow-xl scale-105 opacity-100'
                            : 'shadow-sm scale-95 opacity-40'
                        }
                        `}
                  >
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-primary mb-4" />

                    {/* Review Text */}
                    <p className="text-sm text-gray-700 leading-relaxed mb-6">{item.review}</p>

                    {/* Rating */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.round(item.ratings)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}

                        <span className="ml-2 text-sm font-medium text-gray-600">
                          {item.ratings.toFixed(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <BadgeCheck className="h-4 w-4" />
                        Verified
                      </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-dashed border-gray-300 mb-4" />

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      {/* <span className="ring-2 ring-teal-500 p-5 bg-teal-500 rounded-full"></span> */}
                      <img
                        src={item.user_photoURL}
                        alt={item.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p
                          className={`font-semibold text-sm ${isActive ? 'text-gray-900' : 'text-gray-400'}`}
                        >
                          {item.userName}
                        </p>
                        <p className="text-xs text-gray-400">{item.designation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation + Pagination */}
          <div className="flex items-center justify-center gap-4 mt-6 w-[250px] mx-auto">
            <button
              ref={prevRef}
              className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition flex-shrink-0"
            >
              <span className="text-gray-600 leading-none">←</span>
            </button>
            <div className="custom-pagination flex gap-2" />
            <button
              ref={nextRef}
              className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center hover:bg-lime-500 transition flex-shrink-0"
            >
              <span className="text-gray-900 leading-none">→</span>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
