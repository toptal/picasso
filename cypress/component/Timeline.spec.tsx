import React from 'react'
import { Typography, Link } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { Timeline, Note } from '@toptal/picasso-lab'
import { Tasks16, Pencil16, Email16 } from '@toptal/picasso/Icon'
import { mount } from '@cypress/react'

interface RenderTimelineArgs {
  hasIcons?: boolean
  hasDates?: boolean
  trimLastConnector?: boolean
}

const renderTimeline = ({
  hasIcons,
  hasDates,
  trimLastConnector
}: RenderTimelineArgs = {}) => (
  <TestingPicasso>
    <div style={{ maxWidth: 500 }}>
      <Timeline>
        <Timeline.Row
          icon={hasIcons ? <Tasks16 /> : undefined}
          date={hasDates ? 'Jun 24, 2020' : undefined}
        >
          <Typography>
            System marked job{' '}
            <Link>
              Principal Solutions Product Manager (203875) → Cleo O'Connell
            </Link>{' '}
            as inactive
          </Typography>
        </Timeline.Row>
        <Timeline.Row
          icon={hasIcons ? <Pencil16 /> : undefined}
          date={hasDates ? 'Jun 23, 2020' : undefined}
        >
          <Typography inline>
            <Link>Bettina Barreto</Link>
          </Typography>{' '}
          added a note
          <Note>
            <Note.Title>New TOP</Note.Title>
            <Note.Content>
              This part was obfuscated, some content was here.
            </Note.Content>
          </Note>
        </Timeline.Row>
        <Timeline.Row
          icon={hasIcons ? <Tasks16 /> : undefined}
          date={hasDates ? 'Jun 23, 2020' : undefined}
        >
          <Typography>
            <Link>Carolina Della Corte</Link> changed commitment of{' '}
            <Link>
              Principal Solutions Product Manager (203875) → Cleo O'Connell
            </Link>{' '}
            from part-time to hourly
          </Typography>
        </Timeline.Row>
        <Timeline.Row
          icon={hasIcons ? <Email16 /> : undefined}
          date={hasDates ? 'Jun 22, 2020' : undefined}
          hasConnector={!trimLastConnector}
        >
          <Note>
            <Note.Title>Review of your Toptal coding exercize</Note.Title>
            <Note.Content>
              This part was obfuscated, some content was here.
            </Note.Content>
          </Note>
        </Timeline.Row>
      </Timeline>
    </div>
  </TestingPicasso>
)

describe('Timeline', () => {
  it('renders', () => {
    mount(renderTimeline())

    cy.get('body').happoScreenshot()
  })

  it('renders with dates', () => {
    mount(renderTimeline({ hasDates: true }))

    cy.get('body').happoScreenshot()
  })

  it('renders with dates and icons', () => {
    mount(renderTimeline({ hasDates: true, hasIcons: true }))

    cy.get('body').happoScreenshot()
  })

  it('renders without last connector', () => {
    mount(renderTimeline({ hasDates: true, trimLastConnector: true }))

    cy.get('body').happoScreenshot()
  })
})
