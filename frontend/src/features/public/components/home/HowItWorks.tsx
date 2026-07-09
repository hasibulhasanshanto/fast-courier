import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Banknote, Building2, CirclePile, Truck } from "lucide-react";

const WORKS_SECTION_DATA = [
  {
    id: 1,
    icon: Truck,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 2,
    icon: Banknote,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 3,
    icon: CirclePile,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 4,
    icon: Building2,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <SectionHeader
            align="left"
            eyebrow=""
            title="How it Works"
            description=""
          />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKS_SECTION_DATA.map((f) => (
              <Card key={f.id}>
                <CardHeader>
                  <f.icon className="h-12 w-12" aria-hidden />
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
