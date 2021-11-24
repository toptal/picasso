import React from 'react'
import { Timeline, Note } from '@toptal/picasso-lab'
import { Tasks16, Pencil16, Email16 } from '@toptal/picasso/Icon'
import { Link, Typography } from '@toptal/picasso'

const Example = () => (
  <div style={{ maxWidth: 500 }}>
    <Timeline>
      <Timeline.Row icon={<Tasks16 />} date='Jun 24, 2020'>
        <Typography>
          System marked job{' '}
          <Link>
            Principal Solutions Product Manager (203875) → Cleo O'Connell
          </Link>{' '}
          as inactive
        </Typography>
      </Timeline.Row>
      <Timeline.Row icon={<Pencil16 />} date='Jun 23, 2020'>
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
      <Timeline.Row icon={<Tasks16 />} date='Jun 23, 2020'>
        <Typography>
          <Link>Carolina Della Corte</Link> changed commitment of{' '}
          <Link>
            Principal Solutions Product Manager (203875) → Cleo O'Connell
          </Link>{' '}
          from part-time to hourly
        </Typography>
      </Timeline.Row>
      <Timeline.Row icon={<Email16 />} date='Jun 22, 2020'>
        <Note>
          <Note.Title>Review of your Toptal coding exercize</Note.Title>
          <Note.Content>
            This part was obfuscated, some content was here.
          </Note.Content>
        </Note>
      </Timeline.Row>
    </Timeline>
  </div>
)

export default Example
