import { SectionHeader } from '@/components/common/SectionHeader'
import { useDocumentTitle } from '@/hooks'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

const courierCharges = [
  {
    id: 1,
    name: 'Inside Dhaka Delivery Charge',
    content: (
      <>
        80 BDT - upto 1 KG <br />
        20 BDT next per kg - upto 10 KG <br />
        15 BDT next per kg - upto 20 KG <br />
      </>
    ),
  },
  {
    id: 2,
    name: 'Outside Dhaka Delivery Charge',
    content: (
      <>
        100 BDT - upto 1 KG <br />
        30 BDT next per kg - upto 10 KG <br />
        25 BDT next per kg - upto 20 KG <br />
      </>
    ),
  },
]

const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple' },
]

const destinations = [
  { label: 'Dhaka', value: 'dhaka' },
  { label: 'Chittagong', value: 'chittagong' },
  { label: 'Khulna', value: 'khulna' },
  { label: 'Rajshahi', value: 'rajshahi' },
  { label: 'Sylhet', value: 'sylhet' },
]

export default function AboutPage() {
  useDocumentTitle('Pricing | Fast Courier')
  const [parcelCost, setParcelCost] = useState(0)

  return (
    <section className="mx-3 md:mx-4 lg:mx-16 rounded-2xl py-10 mb-10">
      <Card className="w-full rounded-2xl border bg-background/30 p-4 lg:p-8">
        <SectionHeader
          eyebrow={'Pricing'}
          title={'Pricing Calculator'}
          description="Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time."
        />
        <hr className="mt-5 border-stone-300" />

        {/* Pricing calculate area */}
        <CardContent className="px-0">
          <h2 className="text-2xl font-semibold mb-5 text-center">Calculate Your Cost</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4">
              <form>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="parcel_type">Parcel Type</FieldLabel>
                    <Select items={items}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parcel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Parcel Type</SelectLabel>
                          {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="destination">Delivery Destination</FieldLabel>
                    <Select items={destinations}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Destination</SelectLabel>
                          {destinations.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="weight">Weight (KG)</FieldLabel>
                    <Input id="weight" type="number" required placeholder="Enter weight in KG" />
                  </Field>
                  <FieldGroup>
                    <Field className="grid grid-cols-[3fr_7fr] gap-4">
                      <Button variant="outline" type="button">
                        Reset
                      </Button>

                      <Button type="submit">Calculate</Button>
                    </Field>
                  </FieldGroup>
                </FieldGroup>
                <h3 className="text-lg font-semibold mt-6">
                  Estimated Cost: {parcelCost.toFixed(2)} BDT
                </h3>
              </form>
            </Card>

            {/* Charges card */}
            <div className="mx-1 lg:mx-10 gap-4 lg:gap-8 grid grid-cols-1">
              {courierCharges.map((charge) => (
                <Card key={charge.id} className="bg-primary/10">
                  <CardContent className="text-center p-5">
                    <h3 className="tex-base lg:text-lg text-white font-semibold bg-primary/70 p-3 rounded-lg">
                      {charge.name}
                    </h3>
                    <p className="mt-2 text-stone-500 text-sm ">{charge.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
