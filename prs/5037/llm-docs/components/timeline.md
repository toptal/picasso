# Timeline

## Props

### Timeline

| Name | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| **children** | `ReactNode` | - | Timeline rows |

### Timeline.Row

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Timeline row content |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Icon for the row between lines |
| date | `string` | - | Timeline row date |
| hasConnector | `boolean` | `true` | Whether to render a connector line after the row |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Timeline, Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Timeline>
    <Timeline.Row>
      <Typography size='medium' variant='heading'>
        Founder
      </Typography>
      <Container bottom={SPACING_4}>
        <Typography size='xsmall'>Brutalism 2019 - PRESENT</Typography>
      </Container>
      <Typography size='medium'>
        Founded a private practice focusing on computational design and art.
      </Typography>
    </Timeline.Row>

    <Timeline.Row>
      <Typography size='medium' variant='heading'>
        Computational Geometry Engineer
      </Typography>
      <Container bottom={SPACING_4}>
        <Typography size='xsmall'>Arkio 2018 - 2019</Typography>
      </Container>
      <Typography size='medium'>
        Worked on the core engine supporting Arkio's computational geometry
        operations in VR.
      </Typography>
    </Timeline.Row>
  </Timeline>
)

export default Example
```

### Dates

```tsx
import React from 'react'
import { Timeline, Note, Link, Typography } from '@toptal/picasso'
import { Tasks16, Pencil16, Email16 } from '@toptal/picasso-icons'

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
```

### Trim last connector

You can trim last connector by passing `hasConnector={false}` to the `Timeline.Row` component. It can be useful in situation when you sort date points in the ascending order.

```tsx
import React from 'react'
import { Timeline, Typography, Link } from '@toptal/picasso'

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

    <Timeline.Row date='May 23, 9:19 AM (weekend)' hasConnector={false}>
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
```
