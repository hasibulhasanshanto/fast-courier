import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/common/Container";
import ServiceIcon from "@/assets/images/icons/service-icon.svg";

const SERVICES_DATA = [
  {
    id: 1,
    icon: ServiceIcon,
    title: "Express  & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    id: 2,
    icon: ServiceIcon,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    id: 3,
    icon: ServiceIcon,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    id: 4,
    icon: ServiceIcon,
    title: "Express  & Standard Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    id: 5,
    icon: ServiceIcon,
    title: "Express  & Standard Delivery",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    id: 6,
    icon: ServiceIcon,
    title: "Express  & Standard Delivery",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

export default function OurServices() {
  return (
    <>
      <section className="bg-fuchsia-800 mx-3 md:mx-16 rounded-2xl">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">
              Our Services
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-[#DADADA]">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
            {SERVICES_DATA.map((service) => (
              <Card
                className="flex flex-col justify-center text-center p-5 md:p-8 hover:bg-pink-300 cursor-pointer"
                key={service.id}
              >
                <CardHeader className="flex flex-col items-center">
                  <img
                    src={service.icon}
                    alt="service-icon"
                    className="h-20 w-20"
                  />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
