import { SectionHeader } from '@/components/common/SectionHeader'
import { useDocumentTitle } from '@/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AboutPage() {
  useDocumentTitle('About | Fast Courier')

  return (
    <section className="mx-3 md:mx-4 lg:mx-16 rounded-2xl py-10 mb-10">
      <Card className="w-full rounded-2xl border bg-background/30 p-8">
        <SectionHeader
          eyebrow="About"
          title="Built for teams that have to ship"
          description="Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time."
        />
        <hr className="border border-b border-solid border-black/40 mt-5" />

        <CardContent className="px-0">
          <Tabs defaultValue="story" className="w-full">
            <TabsList>
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="mission">Mission</TabsTrigger>
              <TabsTrigger value="success">Success</TabsTrigger>
              <TabsTrigger value="team">Team & others</TabsTrigger>
            </TabsList>
            <TabsContent value="story">
              <Card>
                <CardHeader>
                  <CardTitle>Story</CardTitle>
                  <CardDescription>
                    Founded in 2025, Fast Courier started with a simple problem: deliveries were
                    slow, unreliable, and hard to track. What began as a small team with a handful
                    of riders in Dhaka has grown into a full-scale logistics network serving 110
                    cities across Bangladesh. We built our platform around real-time tracking,
                    verified riders, and same-day delivery — because we believe speed and trust
                    shouldn't be a trade-off. Today, we move thousands of parcels every day, powered
                    by technology and a team that treats every delivery like it's the only one that
                    matters.
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="mission">
              <Card>
                <CardHeader>
                  <CardTitle>Mission</CardTitle>
                  <CardDescription>
                    To make fast, reliable delivery accessible to every business and individual — no
                    matter how big or small. We're on a mission to eliminate delivery delays, reduce
                    failed drop-offs, and give businesses the logistics backbone they need to grow.
                    Through smart route optimization, live tracking, and a rider-first culture, we
                    aim to be the fastest and most dependable courier network in [Region/Country].
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="success">
              <Card>
                <CardHeader>
                  <CardTitle>Success</CardTitle>
                  <CardDescription>
                    <ul className="list-disc list-inside space-y-2 mt-6">
                      <li>50K+ deliveries completed</li>
                      <li>98% on-time delivery rate</li>
                      <li>25+ cities covered</li>
                      <li>12K+ happy customers</li>
                      <li>300+ active riders and partners</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Every number here represents a promise kept — a package delivered on time, a
                  business kept running, a customer who trusted us with something important.
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle>Team & others</CardTitle>
                  <CardDescription>
                    Behind every fast delivery is a team obsessed with getting it right. From our
                    operations and logistics experts who optimize every route, to our developers
                    building smarter tracking systems, to the riders on the ground who brave traffic
                    and weather to get your parcel there — we're one team with one goal: delivering
                    excellence, every time.
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}
