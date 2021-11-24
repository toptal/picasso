import React from 'react'
import { Timeline } from '@toptal/picasso-lab'
import { Typography, Link } from '@toptal/picasso'

const Example = () => (
  <Timeline>
    <Timeline.Row date='May 21, 11:17 PM'>
      <Typography as='div'>
        <Link>Lavinia Maluf</Link> commented task{' '}
        <Typography weight='semibold'>
          “Mark meetings’ outcome (through the Unresolved Meetings page)”
        </Typography>{' '}
        on <Link>Obfuscated subject for meeting 124555</Link>
      </Typography>
    </Timeline.Row>

    <Timeline.Row date='May 23, 9:19 AM' hasConnector={false}>
      <Typography as='div'>
        <Link>Tomas Urban</Link> commented task{' '}
        <Typography weight='semibold'>
          “Mark meetings’ outcome (through the Unresolved Meetings page)”
        </Typography>{' '}
        on <Link>Obfuscated subject for meeting 124555</Link>
      </Typography>
    </Timeline.Row>
  </Timeline>
)

export default Example
