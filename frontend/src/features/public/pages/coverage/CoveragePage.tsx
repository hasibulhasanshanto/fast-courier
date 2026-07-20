import { SectionHeader } from '@/components/common/SectionHeader'
import { useDocumentTitle } from '@/hooks'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useLoaderData } from 'react-router'
import 'leaflet/dist/leaflet.css'

const bangladeshCenter: [number, number] = [23.685, 90.3563]

export default function CoveragePage() {
  useDocumentTitle('Coverage | Fast Courier')

  const serviceCenters = useLoaderData()

  return (
    <section className="mx-3 md:mx-4 lg:mx-16 rounded-2xl py-10 mb-10">
      <Card className="w-full rounded-2xl border bg-background/30 p-4 lg:p-8">
        <SectionHeader
          eyebrow={'Coverage'}
          title={'We are available in 64 districts and more than 100+ cities across Bangladesh'}
        />
        <div className="mt-4 max-w-xl">
          <Field orientation="horizontal">
            <Input
              type="search"
              placeholder="Search location..."
              className="focus-visible:border-primary focus-visible:ring-0 focus-visible:outline-none"
            />
            <Button>Search</Button>
          </Field>
        </div>
        <hr className="mt-5 border-stone-300" />

        {/* map with markers */}
        <CardContent className="px-0">
          <h2 className="text-xl font-semibold mb-5">We deliver almost all over Bangladesh</h2>
          <MapContainer
            center={bangladeshCenter}
            zoom={8}
            scrollWheelZoom={false}
            className="h-200 w-full rounded-xl z-10"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {serviceCenters.map((area: any) => (
              <Marker key={area.id} position={[area.latitude, area.longitude]}>
                <Popup>
                  <strong>Hub: {area.city}</strong>
                  <br />
                  Covered area: {area.covered_area.join(', ')}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </CardContent>
      </Card>
    </section>
  )
}
