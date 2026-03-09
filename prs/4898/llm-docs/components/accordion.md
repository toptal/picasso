# Accordion

Accordions store information behind collapsible sections,
    allowing for more information to be stored in a limited amount of space.

## Props

### Accordion

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Always visible part of accordion |
| **content** | `ReactNode` | - | Collapsible content of `Accordion` |
| expanded | `boolean` | - | Define accordion content state, whether it should be collapsed or expanded |
| defaultExpanded | `boolean` | `false` | Define accordion initial content state |
| disabled | `boolean` | `false` | Whether the Accordion is disabled |
| expandIcon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Customize icon indicating expanded status |
| borders | `"all" \| "middle" \| "none"` | `all` | Defines where the horizontal borders show |
| onChange | `((event: ChangeEvent<{}>, expanded: boolean) => void)` | `() => {}` | Callback invoked when `Accordion` item is toggled |
| transitionProps | `TransitionProps` | - | Animation lifecycle callbacks. Backed by [react-transition-group/Transition](https://reactcommunity.org/react-transition-group/transition#Transition-props) |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Accordion.Details

| Name | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Accordion.Summary

| Name | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

Accordion is uncontrolled until the `expanded` prop is specified.

```tsx
import React from 'react'
import { Accordion, Check16, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item sm={6}>
      <Accordion
        content={<DetailsDogDefinitionPanel />}
        expandIcon={<Check16 />}
      >
        <Accordion.Summary>What is a dog?</Accordion.Summary>
      </Accordion>
    </Grid.Item>
    <Grid.Item sm={6}>
      <Accordion defaultExpanded content={<DetailsDogDefinitionPanel />}>
        <Accordion.Summary>What is a dog?</Accordion.Summary>
      </Accordion>
    </Grid.Item>
  </Grid>
)

const DetailsDogDefinitionPanel = () => (
  <Accordion.Details>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </Accordion.Details>
)

export default Example
```

### Disabled

Accordion ignores pointer events when the `disabled` prop is truthy.

```tsx
import React from 'react'
import { Accordion, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item sm={6}>
      <Accordion disabled content={<DetailsDogDefinitionPanel />}>
        <Accordion.Summary>What is a dog?</Accordion.Summary>
      </Accordion>
    </Grid.Item>
    <Grid.Item sm={6}>
      <Accordion
        disabled
        defaultExpanded
        content={<DetailsDogDefinitionPanel />}
      >
        <Accordion.Summary>What is a dog?</Accordion.Summary>
      </Accordion>
    </Grid.Item>
  </Grid>
)

const DetailsDogDefinitionPanel = () => (
  <Accordion.Details>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </Accordion.Details>
)

export default Example
```

### Borders and Groups

Accordions have configurable borders and can be grouped

```tsx
import React from 'react'
import { Accordion, Container, Grid, Typography } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => {
  return (
    <Grid>
      <Grid.Item sm={4}>
        <Container bottom={SPACING_6}>
          <Typography variant='heading'>All Borders</Typography>
        </Container>

        <Accordion
          defaultExpanded
          borders='all'
          content={<DetailsDogDefinitionPanel />}
        >
          <Accordion.Summary>What is a dog?</Accordion.Summary>
        </Accordion>
        <Accordion content={<DetailsDogKindPanel />} borders='all'>
          <Accordion.Summary>What kinds of dogs are there?</Accordion.Summary>
        </Accordion>
        <Accordion content={<DetailsDogAcquirePanel />} borders='all'>
          <Accordion.Summary>How do you acquire a dog?</Accordion.Summary>
        </Accordion>
      </Grid.Item>

      <Grid.Item sm={4}>
        <Container bottom={SPACING_6}>
          <Typography variant='heading'>Middle Borders</Typography>
        </Container>

        <Accordion content={<DetailsDogDefinitionPanel />} borders='middle'>
          <Accordion.Summary>What is a dog?</Accordion.Summary>
        </Accordion>
        <Accordion
          defaultExpanded
          content={<DetailsDogKindPanel />}
          borders='middle'
        >
          <Accordion.Summary>What kinds of dogs are there?</Accordion.Summary>
        </Accordion>
        <Accordion content={<DetailsDogAcquirePanel />} borders='middle'>
          <Accordion.Summary>How do you acquire a dog?</Accordion.Summary>
        </Accordion>
      </Grid.Item>
      <Grid.Item sm={4}>
        <Container bottom={SPACING_6}>
          <Typography variant='heading'>No Borders</Typography>
        </Container>

        <Accordion content={<DetailsDogDefinitionPanel />} borders='none'>
          <Accordion.Summary>What is a dog?</Accordion.Summary>
        </Accordion>
        <Accordion content={<DetailsDogKindPanel />} borders='none'>
          <Accordion.Summary>What kinds of dogs are there?</Accordion.Summary>
        </Accordion>
        <Accordion
          defaultExpanded
          content={<DetailsDogAcquirePanel />}
          borders='none'
        >
          <Accordion.Summary>How do you acquire a dog?</Accordion.Summary>
        </Accordion>
      </Grid.Item>
    </Grid>
  )
}

const DetailsDogDefinitionPanel = () => (
  <Accordion.Details>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </Accordion.Details>
)

const DetailsDogKindPanel = () => (
  <Accordion.Details>
    There are many breeds of dogs. Each breed varies in size and temperament.
    Owners often select a breed of dog that they find to be compatible with
    their own lifestyle and desires from a companion.
  </Accordion.Details>
)

const DetailsDogAcquirePanel = () => (
  <Accordion.Details>
    Three common ways for a prospective owner to acquire a dog is from pet
    shops, private owners, or shelters. A pet shop may be the most convenient
    way to buy a dog. Buying a dog from a private owner allows you to assess the
    pedigree and upbringing of your dog before choosing to take it home. Lastly,
    finding your dog from a shelter, helps give a good home to a dog who may not
    find one so readily.
  </Accordion.Details>
)

export default Example
```

### Controlled

Accordion can be controlled via the `expanded` prop.

```tsx
import React from 'react'
import {
  Accordion,
  Button,
  Container,
  Typography,
  Plus16,
} from '@toptal/picasso'
import { SPACING_4, SPACING_8, SPACING_2 } from '@toptal/picasso-utils'

const Example = () => {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <Container style={{ width: '500px' }}>
      <Container bottom={SPACING_4}>
        <Button onClick={() => setExpanded(!expanded)}>Toggle state</Button>
      </Container>
      <Container flex>
        <Container right={SPACING_8}>
          <Accordion
            content={<DetailsDogDefinitionPanel />}
            expanded={expanded}
            expandIcon={<Plus16 />}
          >
            <Accordion.Summary>What is a dog?</Accordion.Summary>
          </Accordion>
        </Container>
        <Container>
          <Accordion content={<DetailsDogKindPanel />} expanded={expanded} />
        </Container>
      </Container>
    </Container>
  )
}

const DetailsDogDefinitionPanel = () => (
  <Accordion.Details>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </Accordion.Details>
)

const DetailsDogKindPanel = () => (
  <Accordion.Details>
    <Container top={SPACING_2} bottom={SPACING_2}>
      <Typography size='medium' weight='semibold' color='black'>
        Breeds of dogs
      </Typography>
    </Container>
    There are many breeds of dogs. Each breed varies in size and temperament.
    Owners often select a breed of dog that they find to be compatible with
    their own lifestyle and desires from a companion.
  </Accordion.Details>
)

export default Example
```

### Custom Summary

Accordion's summary is customizable. It either can be passed as `children` or be an external custom component.

```tsx
import React, { useState } from 'react'
import { Accordion, Typography, Button, Container, Link } from '@toptal/picasso'
import {
  SPACING_4,
  SPACING_6,
  SPACING_2,
  palette,
  Transitions,
} from '@toptal/picasso-utils'
import {
  ArrowDownMinor16,
  Drag16,
  Bell16,
  Time16,
  VideoOn16,
} from '@toptal/picasso-icons'

const Summary = ({
  onClick,
  expanded,
}: {
  onClick: () => void
  expanded: boolean
}) => (
  <Container
    flex
    alignItems='center'
    justifyContent='space-between'
    bottom={SPACING_4}
    top={SPACING_4}
  >
    <Typography variant='heading' size='medium'>
      Upcoming interviews (1)
    </Typography>
    <Container>
      <Button
        variant='secondary'
        icon={
          <Transitions.Rotate180 on={expanded}>
            <ArrowDownMinor16 />
          </Transitions.Rotate180>
        }
        onClick={onClick}
        data-testid='trigger'
      >
        {expanded ? 'Hide' : 'Show'}
      </Button>
      <Button.Circular variant='flat' icon={<Drag16 />} />
    </Container>
  </Container>
)

const InterviewCard = () => (
  <Container
    style={{ flex: 1, border: `1px solid ${palette.grey.light2}` }}
    flex
    data-testid='content'
  >
    <Container
      flex
      direction='column'
      padded={SPACING_6}
      alignItems='center'
      justifyContent='center'
    >
      <Typography weight='semibold' size='xsmall' color='black'>
        Fri
      </Typography>
      <Typography variant='heading' size='large'>
        18
      </Typography>
      <Typography weight='semibold' size='xsmall' color='black'>
        Jan
      </Typography>
    </Container>

    <div
      style={{
        width: '1px',
        backgroundColor: palette.grey.light2,
        margin: '1.5em 0',
      }}
    />

    <Container padded={SPACING_6} style={{ flex: 1 }}>
      <Container flex justifyContent='space-between' bottom={SPACING_2}>
        <Container>
          <Typography size='medium' as='span'>
            <Link href='#'>React Front End Developer</Link>
          </Typography>
          <Container left={SPACING_2} inline>
            <Typography size='medium' as='span'>
              with Walsh Group
            </Typography>
          </Container>
        </Container>

        <Container>
          <Bell16 />
          <Container left={SPACING_2} right={SPACING_4} inline>
            <Typography size='xsmall' as='span'>
              <Link href='#'>Add to calendar</Link>
            </Typography>
          </Container>
          <Button
            data-testid='start-onboarding'
            size='small'
            onClick={() => window.alert('Onboarding started')}
          >
            Start Interview Onboarding
          </Button>
        </Container>
      </Container>

      <Container flex justifyContent='space-between' alignItems='center'>
        <Container>
          <Container bottom={SPACING_2}>
            <Time16 />
            <Container left={SPACING_4} inline>
              <Typography size='medium' as='span'>
                07:00 PM – 07:30 PM (UTC+02:00) Europe – Belgrade
              </Typography>
            </Container>
          </Container>

          <Container>
            <VideoOn16 />
            <Container left={SPACING_4} right={SPACING_2} inline>
              <Typography size='medium' as='span'>
                Bluejeans Conference
              </Typography>
            </Container>
            <Typography size='xsmall' as='span'>
              <Link href='#'>Show URL</Link>
            </Typography>
          </Container>
        </Container>

        <Typography size='xsmall' align='right' style={{ width: '207px' }}>
          If anything comes prior to the interview, please{' '}
          <Link href='#'>reschedule.</Link>
        </Typography>
      </Container>
    </Container>
  </Container>
)

const Example = () => {
  const [expanded, setExpanded] = useState(true)

  const handleClick = () => {
    setExpanded(prevExpanded => !prevExpanded)
  }

  return (
    <div style={{ width: '910px' }}>
      <Summary onClick={handleClick} expanded={expanded} />
      <Accordion
        content={<InterviewCard />}
        expanded={expanded}
        borders='none'
      />
    </div>
  )
}

export default Example
```
