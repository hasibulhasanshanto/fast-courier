import { Container } from '@/components/common/Container'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Casio from '@/assets/images/brands/casio.png'
import Amazon from '@/assets/images/brands/amazon.png'
import MoonStar from '@/assets/images/brands/moonstar.png'
import Star from '@/assets/images/brands/star.png'
import StartPeople from '@/assets/images/brands/start-people.png'
import RandStand from '@/assets/images/brands/randstand.png'
export interface Brand {
  id: number
  name: string
  img: string
}

const BRANDS_DATA: Brand[] = [
  { id: 1, name: 'Casio', img: Casio },
  { id: 2, name: 'Amazon', img: Amazon },
  { id: 3, name: 'Moon-star', img: MoonStar },
  { id: 4, name: 'Star', img: Star },
  { id: 5, name: 'Start-People', img: StartPeople },
  { id: 6, name: 'Rand-stand', img: RandStand },
  { id: 7, name: 'Star', img: Star },
  { id: 8, name: 'Start-People', img: StartPeople },
  { id: 9, name: 'Rand-stand', img: RandStand },
  { id: 10, name: 'Star', img: Star },
  { id: 11, name: 'Start-People', img: StartPeople },
  { id: 12, name: 'Rand-stand', img: RandStand },
]

export default function SalesTeam() {
  return (
    <>
      <Container className="py-16 sm:pt-20">
        <SectionHeader
          align="center"
          eyeball=""
          title="We've helped thousands of sales teams"
          description=""
        />
        <div className="mt-15">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={2}
            spaceBetween={36}
            breakpoints={{
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="flex items-center"
          >
            {BRANDS_DATA.map((brand) => (
              <SwiperSlide key={brand.id}>
                <img src={brand.img} alt={brand.name} className="h-10 w-full object-contain" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <hr className="border border-b border-dashed border-black/40 mt-20" />
      </Container>
    </>
  )
}
