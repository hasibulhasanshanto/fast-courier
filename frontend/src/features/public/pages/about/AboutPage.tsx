import type { ReactNode } from 'react'
import { SectionHeader } from '@/components/common/SectionHeader'
import { useDocumentTitle } from '@/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const aboutTabs: {
  id: number
  value: string
  title: string
  content: ReactNode
}[] = [
  {
    id: 1,
    value: 'story',
    title: 'Story',
    content: (
      <>
        <p>
          Every successful company begins with a problem worth solving, and Fast Courier is no
          exception. Our journey started with a simple observation: sending a parcel should never be
          stressful. Businesses struggled with delayed deliveries, customers had little visibility
          into where their packages were, and communication between senders, riders, and recipients
          often broke down at the moments when reliability mattered most. We saw countless
          individuals and businesses losing valuable time trying to coordinate deliveries, respond
          to customer inquiries, and recover from missed shipments. Rather than accepting these
          frustrations as an unavoidable part of logistics, we believed technology, transparency,
          and exceptional customer service could completely transform the delivery experience.
        </p>

        <p className="mt-6">
          Fast Courier was founded with one clear vision: to create a logistics company that
          customers could genuinely trust. Our founders combined experience in technology, business
          operations, and customer service to build a delivery platform focused on reliability
          instead of complexity. What started as a small operation with only a handful of dedicated
          team members and local delivery riders quickly evolved into a rapidly growing courier
          network serving businesses and individuals across Bangladesh. Every milestone in our
          journey has been driven by listening carefully to our customers and continuously improving
          our services based on real-world feedback.
        </p>

        <p className="mt-6">
          During our early days, we handled every delivery with extraordinary attention to detail.
          Every successful shipment strengthened customer confidence, while every challenge became
          an opportunity to improve our systems and processes. Instead of focusing solely on rapid
          expansion, we concentrated on building operational excellence from the ground up. We
          invested in route planning, rider training, shipment verification, and customer
          communication because we understood that sustainable growth can only be achieved through
          consistent quality.
        </p>

        <p className="mt-6">
          Technology has always been at the heart of Fast Courier. From the very beginning, we
          recognized that modern logistics requires more than simply moving packages from one
          location to another. Customers deserve complete visibility throughout the delivery
          process. That's why we invested in real-time tracking, intelligent dispatch systems,
          automated status updates, digital proof of delivery, and centralized shipment management.
          These innovations help eliminate uncertainty while allowing both individuals and
          businesses to monitor every stage of a delivery with confidence.
        </p>

        <p className="mt-6">
          As our customer base expanded, so did our responsibility. Small businesses began relying
          on us to deliver products to their customers. E-commerce entrepreneurs trusted us with
          thousands of daily shipments. Families depended on us to send important documents, gifts,
          and personal belongings across cities. Every parcel carried not only physical goods but
          also someone's expectations, commitments, and trust. Understanding this responsibility
          continues to inspire every decision we make today.
        </p>

        <p className="mt-6">
          One of the defining principles behind Fast Courier is that logistics should empower
          businesses rather than create obstacles. We have worked closely with startups, online
          stores, retailers, manufacturers, and corporate organizations to understand their unique
          operational challenges. By developing flexible delivery solutions, business-friendly APIs,
          streamlined booking systems, and transparent pricing models, we enable organizations of
          every size to focus on growth while we handle the complexity of logistics.
        </p>

        <p className="mt-6">
          Behind every successful delivery is an extraordinary team of professionals working
          together seamlessly. Our riders navigate busy city streets with dedication and
          professionalism. Our customer support team resolves inquiries quickly and empathetically.
          Our operations specialists continuously optimize routes and schedules to improve
          efficiency. Our engineers build innovative software that simplifies shipment management,
          enhances security, and provides real-time visibility for customers. Each department plays
          a vital role in ensuring that every parcel reaches its destination safely and on time.
        </p>
      </>
    ),
  },
  {
    id: 2,
    value: 'mission',
    title: 'Mission',
    content: (
      <>
        <p className="mt-6">
          Growth has never changed our commitment to customer satisfaction. While our delivery
          network has expanded to serve more cities and communities, our core philosophy remains
          exactly the same: every customer deserves dependable service, honest communication, and
          complete transparency. We measure our success not only by the number of parcels we deliver
          but also by the trust we earn from every individual and business that chooses Fast
          Courier.
        </p>

        <p className="mt-6">
          Innovation remains a continuous journey rather than a destination. The logistics industry
          evolves rapidly, and customer expectations continue to grow. We actively invest in modern
          technologies including route optimization, predictive analytics, digital payment
          integration, warehouse automation, and scalable cloud infrastructure to ensure our
          platform remains reliable, secure, and future-ready. Every improvement we make is designed
          with one goal in mind: creating a faster, smarter, and more enjoyable delivery experience.
        </p>

        <p className="mt-6">
          Sustainability has also become an increasingly important part of our long-term vision. As
          our operations expand, we continue exploring more environmentally responsible delivery
          practices, optimized transportation routes, reduced paper usage through digital workflows,
          and operational efficiencies that minimize unnecessary fuel consumption. We believe that
          responsible logistics should contribute positively to both business growth and
          environmental stewardship.
        </p>

        <p className="mt-6">
          Throughout our journey, we have celebrated countless success stories. We've helped small
          businesses scale into nationwide brands, supported entrepreneurs during their busiest
          sales seasons, delivered urgent medical supplies when timing was critical, and connected
          families separated by distance. Every successful delivery reminds us that our work extends
          beyond transportation—we help people fulfill promises, strengthen relationships, and grow
          opportunities.
        </p>

        <p className="mt-6">
          Looking ahead, Fast Courier is committed to becoming one of the most trusted logistics
          companies in the region. Our roadmap includes expanding our delivery network, introducing
          smarter automation, enhancing customer self-service capabilities, strengthening business
          integrations, and continuing to invest in our people. We believe the future of logistics
          will be defined by intelligence, speed, transparency, and customer-centric innovation, and
          we are determined to help shape that future.
        </p>

        <p className="mt-6">
          Today, Fast Courier stands as more than a delivery company. We are a technology-driven
          logistics partner committed to helping individuals, entrepreneurs, and enterprises move
          forward with confidence. Every shipment represents a promise entrusted to us, and every
          successful delivery reinforces the values that inspired our journey from day one:
          reliability, innovation, transparency, and exceptional service. As we continue to grow,
          these principles will remain the foundation of everything we do, ensuring that every
          customer experiences logistics the way it should be—simple, dependable, and remarkably
          fast.
        </p>
      </>
    ),
  },
  {
    id: 3,
    value: 'success',
    title: 'Success',
    content: (
      <>
        <ul className="list-disc list-inside space-y-2">
          <li>50K+ deliveries completed</li>
          <li>98% on-time delivery rate</li>
          <li>25+ cities covered</li>
          <li>12K+ happy customers</li>
          <li>300+ active riders and partners</li>
        </ul>

        <p className="mt-6 text-sm text-muted-foreground">
          Every statistic tells a story of commitment, consistency, and the trust our customers
          place in us every single day. Completing more than{' '}
          <strong>50,000 successful deliveries</strong> is not simply a milestone—it represents
          thousands of businesses fulfilling customer orders on time, families staying connected
          across cities, and individuals relying on us to transport their most valuable parcels
          safely. Behind every completed shipment is a carefully coordinated effort involving our
          operations team, delivery partners, customer support specialists, and technology platform,
          all working together to ensure a seamless delivery experience.
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          Maintaining a <strong>98% on-time delivery rate</strong> reflects our unwavering
          commitment to reliability. We understand that timely deliveries directly impact customer
          satisfaction and business success. Whether it is an urgent business shipment, an important
          document, or an online purchase, our team continuously optimizes delivery routes, monitors
          shipment progress, and adapts to real-time conditions to minimize delays. Our investment
          in technology, experienced logistics professionals, and trained delivery partners enables
          us to consistently deliver on our promises while exceeding customer expectations.
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          Expanding our network to serve <strong>25+ cities</strong> demonstrates our ambition to
          make reliable logistics accessible to more communities. Every new city we enter represents
          new opportunities for local businesses to grow, entrepreneurs to reach wider markets, and
          customers to enjoy faster, more dependable delivery services. As our coverage continues to
          expand, we remain focused on maintaining the same high standards of service quality,
          operational efficiency, and customer care that have defined Fast Courier since the
          beginning.
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          Our community of more than <strong>12,000 satisfied customers</strong> is one of our
          greatest achievements. Their continued trust motivates us to innovate, improve, and
          deliver better experiences every day. From small online sellers and local retailers to
          corporate organizations and individual customers, we are proud to support people from
          every walk of life. Their feedback helps shape our services, strengthen our operations,
          and inspire us to continuously raise the standard for modern courier and logistics
          solutions.
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          None of these accomplishments would be possible without our network of more than
          <strong> 300 dedicated riders and business partners</strong>. Their professionalism,
          commitment, and passion form the backbone of our delivery ecosystem. Together, they ensure
          that every parcel is handled with care, every customer is treated with respect, and every
          shipment receives the attention it deserves. As we continue to grow, these milestones
          serve not as a final destination but as motivation to innovate further, expand our reach,
          strengthen our partnerships, and continue delivering exceptional logistics experiences for
          businesses and individuals alike. Every number reflects a promise fulfilled, a
          relationship strengthened, and another step toward our vision of becoming the most trusted
          courier and logistics partner in the region.
        </p>
      </>
    ),
  },
  {
    id: 4,
    value: 'team',
    title: 'Team & Others',
    content: (
      <>
        <p>
          At Fast Courier, our success is built on people. While technology powers our platform and
          streamlines our operations, it is our dedicated team that transforms every shipment into a
          dependable delivery experience. Every package we transport represents someone's trust—a
          business fulfilling a customer's order, a family sending a thoughtful gift, or an
          individual delivering something important. We understand the responsibility that comes
          with every parcel, and our people work together every day to ensure that trust is never
          compromised.
        </p>
        <p className="mt-6">
          Our organization brings together professionals from diverse backgrounds, including
          logistics, software engineering, operations, customer support, finance, marketing, and
          business development. Each department has a unique role, but they all share one common
          objective: delivering an exceptional customer experience. By combining expertise across
          multiple disciplines, we continuously improve our services, streamline internal processes,
          and create innovative solutions that help both individuals and businesses ship with
          confidence.
        </p>
        <p className="mt-6">
          Behind every successful delivery is a highly coordinated operations team. From assigning
          riders and optimizing routes to monitoring shipment progress and resolving unexpected
          challenges, our operations specialists work around the clock to keep deliveries moving
          efficiently. Their careful planning minimizes delays, improves delivery accuracy, and
          ensures that every parcel reaches its destination as quickly and safely as possible. Their
          ability to adapt to changing traffic conditions, weather, and customer requirements is one
          of the key reasons our network remains dependable every day.
        </p>
        <p className="mt-6">
          Our delivery partners and riders are the face of Fast Courier. They are more than
          transportation professionals—they are ambassadors of our brand. Every rider is trained to
          handle parcels with care, communicate professionally with customers, and maintain the
          highest standards of safety and reliability. Whether navigating busy city streets or
          delivering to remote locations, they consistently demonstrate dedication and
          professionalism. Their commitment ensures that every delivery is completed with accuracy,
          respect, and a customer-first mindset.
        </p>
        <p className="mt-6">
          Innovation is driven by our engineering team, who continuously develop and enhance the
          technology behind Fast Courier. They build scalable systems that power shipment tracking,
          automated notifications, route optimization, secure payment processing, business
          integrations, and customer management. By embracing modern technologies and best
          engineering practices, our developers ensure that our platform remains fast, secure, and
          capable of supporting the evolving needs of businesses and consumers alike.
        </p>
        <p className="mt-6">
          Equally important is our customer support team, whose mission is to provide prompt,
          friendly, and effective assistance whenever customers need help. Whether answering
          shipment inquiries, resolving delivery issues, or guiding first-time users through our
          services, they approach every interaction with patience, professionalism, and empathy. We
          believe that excellent customer service is just as valuable as fast delivery, and our
          support specialists work tirelessly to ensure every customer feels heard, respected, and
          valued.
        </p>
        <p className="mt-6">
          Collaboration is one of the defining characteristics of our culture. Rather than working
          in isolation, our departments communicate openly, share ideas, and solve challenges
          together. Regular planning sessions, knowledge sharing, and continuous feedback help us
          identify opportunities for improvement and deliver better results for our customers. This
          collaborative environment encourages innovation while ensuring that everyone contributes
          toward a common vision.
        </p>
        <p className="mt-6">
          Looking toward the future, our greatest strength will continue to be our people. As we
          expand our delivery network, introduce new technologies, and serve more businesses across
          the country, we remain committed to building a workplace where talented individuals can
          thrive, innovate, and make a meaningful impact. Together, we are creating more than a
          courier company—we are building a trusted logistics ecosystem powered by passionate
          professionals, modern technology, and a shared commitment to excellence. Every successful
          delivery reflects the dedication of our entire team, and every satisfied customer inspires
          us to continue raising the standard for logistics and delivery services.
        </p>
      </>
    ),
  },
]

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
          <Tabs defaultValue={aboutTabs[0].value} className="w-full">
            <TabsList>
              {aboutTabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.value}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {aboutTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.value}>
                <Card>
                  <CardHeader>
                    <CardTitle>{tab.title}</CardTitle>
                    <CardDescription>{tab.content}</CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}
