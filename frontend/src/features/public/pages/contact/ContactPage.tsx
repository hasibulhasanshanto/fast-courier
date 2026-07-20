import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/common/Container'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useDocumentTitle } from '@/hooks'

const CONTACT_INFO = [
  { icon: Mail, label: 'support@fastcourier.test' },
  { icon: Phone, label: '(+88)-017XX-XXXXXX' },
  { icon: MapPin, label: 'Banani, Dhaka' },
]

export default function ContactPage() {
  const { t } = useTranslation()
  useDocumentTitle('Contact | Fast Courier')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeader
        align="center"
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        description={t('contact.subtitle')}
      />

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 order-2 md:order-1">
          {CONTACT_INFO.map(({ icon: Icon, label }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-3 py-4">
                <span className="rounded-md bg-muted p-2 text-muted-foreground">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-sm">{label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-2 order-1 md:order-2">
          <CardContent className="pt-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t('contact.name')}
                  </label>
                  <Input
                    id="name"
                    className="focus-visible:border-primary focus-visible:ring-0 focus-visible:outline-none"
                    placeholder="ex. John Doe"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t('contact.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    className="focus-visible:border-primary focus-visible:ring-0 focus-visible:outline-none"
                    placeholder="ex. john@example.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  required
                  placeholder="Write message here..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus-visible:ring-ring/50 focus-visible:border-primary focus-visible:ring-0 focus-visible:outline-none"
                />
              </div>
              {submitted && (
                <p
                  role="status"
                  className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-primary"
                >
                  {t('contact.sent')}
                </p>
              )}
              <Button type="submit">{t('common.send')}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
