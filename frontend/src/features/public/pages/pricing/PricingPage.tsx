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
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

type ParcelType = 'document' | 'non-document'
type Destination = 'dhaka' | 'chittagong' | 'khulna' | 'rajshahi' | 'sylhet'

// Pricing rules only differentiate Dhaka vs other locations
const pricingRules = {
  dhaka: { base: 80, tier1PerKg: 20, tier2PerKg: 15 },
  'outside-dhaka': { base: 100, tier1PerKg: 30, tier2PerKg: 25 },
} as const

function getRate(destination: Destination) {
  return destination === 'dhaka' ? pricingRules.dhaka : pricingRules['outside-dhaka']
}

function calculateTieredCost(weight: number, destination: Destination): number {
  const { base, tier1PerKg, tier2PerKg } = getRate(destination)

  if (weight <= 1) return base

  let cost = base
  let remainingWeight = weight - 1

  const tier1Kg = Math.min(remainingWeight, 9)
  cost += tier1Kg * tier1PerKg
  remainingWeight -= tier1Kg

  if (remainingWeight > 0) {
    const tier2Kg = Math.min(remainingWeight, 10)
    cost += tier2Kg * tier2PerKg
  }

  return cost
}

export default function PricingPage() {
  const { t } = useTranslation()
  useDocumentTitle('Pricing | Fast Courier')
  const MAX_WEIGHT = 20

  const [parcelType, setParcelType] = useState<ParcelType>('document')
  const [destination, setDestination] = useState<Destination>('dhaka')
  const [weight, setWeight] = useState<number>(0)
  const isOverweight = parcelType === 'non-document' && weight > MAX_WEIGHT

  const parcelTypes = useMemo(
    () => [
      { label: t('pricing.document'), value: 'document' as const },
      { label: t('pricing.nonDocument'), value: 'non-document' as const },
    ],
    [t]
  )

  const destinations = useMemo(
    () => [
      { label: t('pricing.dhaka'), value: 'dhaka' as const },
      { label: t('pricing.chittagong'), value: 'chittagong' as const },
      { label: t('pricing.khulna'), value: 'khulna' as const },
      { label: t('pricing.rajshahi'), value: 'rajshahi' as const },
      { label: t('pricing.sylhet'), value: 'sylhet' as const },
    ],
    [t]
  )

  const courierCharges = useMemo(
    () => [
      {
        id: 1,
        name: t('pricing.insideDhakaTitle'),
        lines: [
          t('pricing.charges.insideDhaka.line1'),
          t('pricing.charges.insideDhaka.line2'),
          t('pricing.charges.insideDhaka.line3'),
        ],
      },
      {
        id: 2,
        name: t('pricing.outsideDhakaTitle'),
        lines: [
          t('pricing.charges.outsideDhaka.line1'),
          t('pricing.charges.outsideDhaka.line2'),
          t('pricing.charges.outsideDhaka.line3'),
        ],
      },
    ],
    [t]
  )

  // Live-computed cost
  const parcelCost = useMemo(() => {
    if (parcelType === 'document') {
      // Document: flat base price, weight irrelevant
      return getRate(destination).base
    }
    // Non-document: tiered pricing based on weight
    const cappedWeight = Math.min(weight, MAX_WEIGHT)
    return calculateTieredCost(cappedWeight, destination)
  }, [parcelType, destination, weight])

  const handleReset = () => {
    setParcelType('document')
    setDestination('dhaka')
    setWeight(0)
  }

  return (
    <section className="mx-3 md:mx-4 lg:mx-16 rounded-2xl py-10 mb-10">
      <Card className="w-full rounded-2xl border bg-background/30 p-4 lg:p-8">
        <SectionHeader
          eyebrow={t('pricing.eyebrow')}
          title={t('pricing.title')}
          description={t('pricing.description')}
        />
        <hr className="mt-5 border-stone-300" />

        <CardContent className="px-0">
          <h2 className="text-2xl font-semibold mb-5 text-center">{t('pricing.calculateTitle')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4">
              <form>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="parcel_type">{t('pricing.parcelType')}</FieldLabel>
                    <Select
                      items={parcelTypes}
                      value={parcelType}
                      onValueChange={(v) => setParcelType(v as ParcelType)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('pricing.selectParcelType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{t('pricing.parcelType')}</SelectLabel>
                          {parcelTypes.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="destination">{t('pricing.deliveryDestination')}</FieldLabel>
                    <Select
                      items={destinations}
                      value={destination}
                      onValueChange={(v) => setDestination(v as Destination)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('pricing.selectDestination')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{t('pricing.destination')}</SelectLabel>
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
                    <FieldLabel htmlFor="weight">{t('pricing.weight')}</FieldLabel>
                    <Input
                      id="weight"
                      className="focus-visible:border-primary focus-visible:ring-0 focus-visible:outline-none"
                      type="number"
                      min="0"
                      placeholder={t('pricing.weightPlaceholder')}
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      disabled={parcelType === 'document'}
                    />
                  </Field>
                  <FieldGroup>
                    <Field className="grid grid-cols-[3fr_7fr] gap-4">
                      <Button variant="outline" type="button" onClick={handleReset}>
                        {t('pricing.reset')}
                      </Button>
                    </Field>
                  </FieldGroup>
                </FieldGroup>
                <h3 className="text-lg font-semibold mt-6">
                  {t('pricing.estimatedCost', { cost: parcelCost.toFixed(2) })}
                </h3>
                {isOverweight && (
                  <p className="text-sm text-red-400 mt-1">{t('pricing.overweightWarning')}</p>
                )}
              </form>
            </Card>

            <div className="mx-1 lg:mx-10 gap-4 lg:gap-8 grid grid-cols-1">
              {courierCharges.map((charge) => (
                <Card key={charge.id} className="bg-primary/10">
                  <CardContent className="text-center p-5">
                    <h3 className="tex-base lg:text-lg text-white font-semibold bg-primary/70 p-3 rounded-lg">
                      {charge.name}
                    </h3>
                    <p className="mt-2 text-stone-500 text-sm">
                      {charge.lines.map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < charge.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
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
