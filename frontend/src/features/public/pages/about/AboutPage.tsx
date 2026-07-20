import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SectionHeader } from '@/components/common/SectionHeader'
import { useDocumentTitle } from '@/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const TAB_VALUES = ['story', 'mission', 'success', 'team'] as const

function Paragraphs({
  keys,
  firstClassName,
  restClassName,
}: {
  keys: string[]
  firstClassName?: string
  restClassName?: string
}) {
  const { t } = useTranslation()

  return keys.map((key, index) => (
    <p key={key} className={index === 0 ? firstClassName : restClassName}>
      {t(key)}
    </p>
  ))
}

function SuccessParagraphs({ keys }: { keys: string[] }) {
  return keys.map((key, index) => (
    <p
      key={key}
      className={
        index === 0 ? 'mt-6 text-sm text-muted-foreground' : 'mt-4 text-sm text-muted-foreground'
      }
    >
      <Trans i18nKey={key} components={{ strong: <strong /> }} />
    </p>
  ))
}

export default function AboutPage() {
  const { t } = useTranslation()
  useDocumentTitle('About | Fast Courier')

  const aboutTabs = useMemo(
    () => [
      {
        id: 1,
        value: TAB_VALUES[0],
        title: t('about.tabs.story.title'),
        content: (
          <Paragraphs
            keys={[
              'about.tabs.story.p1',
              'about.tabs.story.p2',
              'about.tabs.story.p3',
              'about.tabs.story.p4',
              'about.tabs.story.p5',
              'about.tabs.story.p6',
              'about.tabs.story.p7',
            ]}
            restClassName="mt-6"
          />
        ),
      },
      {
        id: 2,
        value: TAB_VALUES[1],
        title: t('about.tabs.mission.title'),
        content: (
          <Paragraphs
            keys={[
              'about.tabs.mission.p1',
              'about.tabs.mission.p2',
              'about.tabs.mission.p3',
              'about.tabs.mission.p4',
              'about.tabs.mission.p5',
              'about.tabs.mission.p6',
            ]}
            firstClassName="mt-6"
            restClassName="mt-6"
          />
        ),
      },
      {
        id: 3,
        value: TAB_VALUES[2],
        title: t('about.tabs.success.title'),
        content: (
          <>
            <ul className="list-disc list-inside space-y-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n}>{t(`about.tabs.success.stat${n}`)}</li>
              ))}
            </ul>
            <SuccessParagraphs
              keys={[
                'about.tabs.success.p1',
                'about.tabs.success.p2',
                'about.tabs.success.p3',
                'about.tabs.success.p4',
                'about.tabs.success.p5',
              ]}
            />
          </>
        ),
      },
      {
        id: 4,
        value: TAB_VALUES[3],
        title: t('about.tabs.team.title'),
        content: (
          <Paragraphs
            keys={[
              'about.tabs.team.p1',
              'about.tabs.team.p2',
              'about.tabs.team.p3',
              'about.tabs.team.p4',
              'about.tabs.team.p5',
              'about.tabs.team.p6',
              'about.tabs.team.p7',
              'about.tabs.team.p8',
            ]}
            restClassName="mt-6"
          />
        ),
      },
    ],
    [t]
  )

  return (
    <section className="mx-3 md:mx-4 lg:mx-16 rounded-2xl py-10 mb-10">
      <Card className="w-full rounded-2xl border bg-background/30 p-4 lg:p-8">
        <SectionHeader
          eyebrow={t('about.eyebrow')}
          title={t('about.title')}
          description={t('about.subtitle')}
        />
        <hr className="mt-5 border-stone-300" />

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
