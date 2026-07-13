# PageHead

## Props

### PageHead

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Content |
| rightPadding | `boolean` | `false` | Whether it should have right padding |
| noBorder | `boolean` | `false` | Whether it should hide bottom border |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Tabs, Button, Link, PageHead, Breadcrumbs } from '@toptal/picasso'

const DefaultExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <PageHead>
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
      <PageHead.Main>
        <PageHead.Title>Heading Large</PageHead.Title>
        <PageHead.Actions>
          <Button size='small' variant='secondary'>
            Button
          </Button>
          <Button size='small' variant='secondary'>
            Button
          </Button>
          <Button size='small' variant='secondary'>
            Button
          </Button>
        </PageHead.Actions>
      </PageHead.Main>
      <PageHead.Tabs>
        <Tabs value={value} onChange={handleChange}>
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' />
        </Tabs>
      </PageHead.Tabs>
    </PageHead>
  )
}

export default DefaultExample
```

### Blank

```tsx
import React from 'react'
import { PageHead } from '@toptal/picasso'

const BlankExample = () => (
  <PageHead>
    <PageHead.Main />
  </PageHead>
)

export default BlankExample
```

### No Border

No border should be used only, when PageHead is followed by bordered section

```tsx
import React from 'react'
import {
  Page,
  Section,
  PageHead,
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
            <PageHead noBorder>
              <PageHead.Main>
                <PageHead.Title>Overview</PageHead.Title>
              </PageHead.Main>
            </PageHead>
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
import { PageHead } from '@toptal/picasso'

const TitleExample = () => (
  <PageHead>
    <PageHead.Main>
      <PageHead.Title>Heading Large</PageHead.Title>
    </PageHead.Main>
  </PageHead>
)

export default TitleExample
```

### Steps

```tsx
import React from 'react'
import { PageHead, Stepper } from '@toptal/picasso'

const StepsExample = () => (
  <PageHead>
    <PageHead.Main>
      <Stepper
        steps={['Availability', 'Details', 'Feedback', 'Position', 'Skills']}
      />
    </PageHead.Main>
  </PageHead>
)

export default StepsExample
```

### Title and button

```tsx
import React from 'react'
import { PageHead, Button, Settings16 } from '@toptal/picasso'

const TitleAndButtonExample = () => (
  <PageHead>
    <PageHead.Main>
      <PageHead.Title>Heading Large</PageHead.Title>
      <PageHead.Actions>
        <Button.Circular variant='flat' icon={<Settings16 />} />
      </PageHead.Actions>
    </PageHead.Main>
  </PageHead>
)

export default TitleAndButtonExample
```

### Title and tabs

```tsx
import React from 'react'
import { Tabs, PageHead } from '@toptal/picasso'

const TitleAndTabsExample = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue)
  }

  return (
    <PageHead>
      <PageHead.Main>
        <PageHead.Title>Heading Large</PageHead.Title>
      </PageHead.Main>
      <PageHead.Tabs>
        <Tabs value={value} onChange={handleChange}>
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' />
        </Tabs>
      </PageHead.Tabs>
    </PageHead>
  )
}

export default TitleAndTabsExample
```

### Title and breadcrumbs

```tsx
import React from 'react'
import { Link, PageHead, Breadcrumbs } from '@toptal/picasso'

const TitleAndBreadcrumbsExample = () => (
  <PageHead>
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
    <PageHead.Main>
      <PageHead.Title>Heading Large</PageHead.Title>
    </PageHead.Main>
  </PageHead>
)

export default TitleAndBreadcrumbsExample
```

### With right padding of the container

```tsx
import React from 'react'
import { Button, PageHead } from '@toptal/picasso'

const WithRightPaddingExample = () => (
  <PageHead rightPadding>
    <PageHead.Main>
      <PageHead.Title>Heading Large</PageHead.Title>
      <PageHead.Actions>
        <Button size='small' variant='secondary'>
          Button
        </Button>
        <Button size='small' variant='negative'>
          Reject
        </Button>
        <Button size='small' variant='positive'>
          Accept
        </Button>
      </PageHead.Actions>
    </PageHead.Main>
  </PageHead>
)

export default WithRightPaddingExample
```

### With enabled min height for the container

```tsx
import React from 'react'
import { PageHead } from '@toptal/picasso'

const WithEnabledMinHeight = () => (
  <PageHead>
    <PageHead.Main enableMinHeight>
      <PageHead.Title>
        This is a very long title that extends over multiple lines to
        demonstrate how 'enableMinHeight' prop is working. It provides a clear
        example of how long text will be handled, and we have here some lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae
        justo ultricies lacinia. Nullam sit amet nunc nec libero ultricies
        lacinia. Nullam sit amet nunc nec libero.
      </PageHead.Title>
    </PageHead.Main>
  </PageHead>
)

export default WithEnabledMinHeight
```
