# PageHeadBase

## Props

### PageHeadBase

| Name | Type | Default | Description |
|------|------|---------|-------------|
| actions | `ReactNode` | - | Buttons or other actions to be rendered on the right side of the title |
| breadcrumbs | `ReactNode` | - | Breadcrumbs component to be rendered above the title |
| rightPadding | `boolean` | `false` | Whether it should have right padding |
| noBorder | `boolean` | `false` | Whether it should hide bottom border |
| titleAdornments | `ReactNode[]` | - | Render components next to the title. |
| title | `string` | - | Title |
| titleLoading | `boolean` | `false` | Shows the loading skeleton when title is loading |
| subtitle | `string` | - | Subtitle |
| subtitleLoading | `boolean` | `false` | Shows the loading skeleton when subtitle is loading |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Default

```tsx
import React from 'react'
import { Button, Link, PageHeadBase, Breadcrumbs, Badge } from '@toptal/picasso'
import { TagRectangular } from '@toptal/picasso-tag'

const DefaultExample = () => {
  const breadcrumbs = (
    <Breadcrumbs>
      <Breadcrumbs.Item
        as={Link}
        variant='action'
        href='https://en.wikipedia.org/wiki/United_States'
      >
        USA
      </Breadcrumbs.Item>
      <Breadcrumbs.Item
        as={Link}
        variant='action'
        href='https://en.wikipedia.org/wiki/Software'
      >
        Software
      </Breadcrumbs.Item>
      <Breadcrumbs.Item as={Link} variant='action' href='https://toptal.com'>
        Toptal
      </Breadcrumbs.Item>
    </Breadcrumbs>
  )

  const actions = (
    <>
      <Button size='small' variant='secondary'>
        Button
      </Button>
      <Button.Split size='small' variant='secondary'>
        Button
      </Button.Split>
      <Button size='small' variant='secondary'>
        Button
      </Button>
    </>
  )

  return (
    <PageHeadBase
      actions={actions}
      breadcrumbs={breadcrumbs}
      subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      title='Heading Large'
      titleAdornments={[
        <Badge variant='white' content={1} />,
        <TagRectangular variant='green'>Label</TagRectangular>,
      ]}
    />
  )
}

export default DefaultExample
```

### Blank

```tsx
import React from 'react'
import { PageHeadBase } from '@toptal/picasso'

const BlankExample = () => <PageHeadBase />

export default BlankExample
```

### No Border

No border should be used only, when PageHead is followed by bordered section

```tsx
import React from 'react'
import {
  Page,
  Section,
  PageHeadBase,
  Typography,
  Container,
  Button,
} from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'

const BlankExample = () => (
  <div>
    <Page>
      <Page.Content>
        <Container>
          <Page.Article>
            <PageHeadBase noBorder title='Overview' />
          </Page.Article>
          <Page.Article style={{ marginTop: '1rem' }}>
            <Section variant='bordered'>
              <Container bottom={SPACING_4}>
                <Typography variant='heading' size='large'>
                  Next step: Speak with ToptTal representative
                </Typography>
              </Container>
              <Container bottom={SPACING_8}>
                <Typography>
                  On this call, we will discuss the scope of the project and go
                  over how Toptal works to se if we can be a good fir to for
                  your project. This only takes approximately 15 minutes.
                </Typography>
              </Container>
              <Button onClick={() => {}}>Request a Call</Button>
            </Section>
          </Page.Article>
        </Container>
      </Page.Content>
    </Page>
  </div>
)

export default BlankExample
```

### Title

```tsx
import React from 'react'
import { PageHeadBase } from '@toptal/picasso'

const TitleExample = () => <PageHeadBase title='Heading Large' />

export default TitleExample
```

### Steps

```tsx
import React from 'react'
import { PageHeadBase, Stepper } from '@toptal/picasso'

const steps = (
  <Stepper
    steps={['Availability', 'Details', 'Feedback', 'Position', 'Skills']}
    overflowEllipsis
  />
)

const StepsExample = () => (
  <PageHeadBase title='Heading Large' noBorder actions={steps} />
)

export default StepsExample
```

### Loading

```tsx
import React from 'react'
import { Badge, PageHeadBase, SkeletonLoader } from '@toptal/picasso'
import { TagRectangular } from '@toptal/picasso-tag'

const isLoading = true

const Loading = () => (
  <PageHeadBase
    title='Heading large'
    subtitle='Description'
    subtitleLoading={isLoading}
    titleAdornments={[
      isLoading ? (
        <SkeletonLoader.Typography style={{ width: '20px' }} />
      ) : (
        <Badge variant='white' content={1} />
      ),
      <TagRectangular variant='green'>Label</TagRectangular>,
    ]}
  />
)

export default Loading
```

### Title and button

```tsx
import React from 'react'
import { PageHeadBase, Button, Settings16 } from '@toptal/picasso'

const TitleAndButtonExample = () => (
  <PageHeadBase
    title='Heading Large'
    actions={<Button.Circular variant='flat' icon={<Settings16 />} />}
  />
)

export default TitleAndButtonExample
```

### Title and tabs

```tsx
import React from 'react'
import { Tabs, PageHeadBase } from '@toptal/picasso'

const TitleAndTabsExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}> | null, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <PageHeadBase title='Heading Large' noBorder />

      <Tabs value={value} onChange={handleChange}>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>
    </>
  )
}

export default TitleAndTabsExample
```

### Title and breadcrumbs

```tsx
import React from 'react'
import { Link, PageHeadBase, Breadcrumbs } from '@toptal/picasso'

const breadcrumbs = (
  <Breadcrumbs>
    <Breadcrumbs.Item
      as={Link}
      variant='action'
      href='https://en.wikipedia.org/wiki/United_States'
    >
      USA
    </Breadcrumbs.Item>
    <Breadcrumbs.Item
      as={Link}
      variant='action'
      href='https://en.wikipedia.org/wiki/Software'
    >
      Software
    </Breadcrumbs.Item>
    <Breadcrumbs.Item as={Link} variant='action' href='https://toptal.com'>
      Toptal
    </Breadcrumbs.Item>
  </Breadcrumbs>
)

const TitleAndBreadcrumbsExample = () => (
  <PageHeadBase breadcrumbs={breadcrumbs} title='Heading Large' />
)

export default TitleAndBreadcrumbsExample
```

### Notification

```tsx
import React from 'react'
import { Notification, PageHeadBase } from '@toptal/picasso'

const NotificationExample = () => (
  <>
    <PageHeadBase title='Heading Large' noBorder />

    <Notification>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </Notification>
  </>
)

export default NotificationExample
```

### NotificationAndTabs

```tsx
import React from 'react'
import { Notification, PageHeadBase, Tabs } from '@toptal/picasso'

const NotificationAndTabsExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}> | null, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <PageHeadBase title='Heading Large' noBorder />

      <div className='mb-3'>
        <Notification>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Notification>
      </div>

      <Tabs value={value} onChange={handleChange}>
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
        <Tabs.Tab label='Label' />
      </Tabs>
    </>
  )
}

export default NotificationAndTabsExample
```

### With right padding of the container

```tsx
import React from 'react'
import { Button, PageHeadBase } from '@toptal/picasso'

const actions = (
  <>
    <Button size='small' variant='secondary'>
      Button
    </Button>
    <Button size='small' variant='negative'>
      Reject
    </Button>
    <Button size='small' variant='positive'>
      Accept
    </Button>
  </>
)

const WithRightPaddingExample = () => (
  <PageHeadBase rightPadding title='Heading Large' actions={actions} />
)

export default WithRightPaddingExample
```
