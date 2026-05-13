# Grid

The layout element which is providing grid container functionality. 
    The grid is built on top of flexbox functionality and the layout can 
    be adjusted using the flexbox technics. The grid is a wrapper for the 
    GridItem components.

## Props

### Grid

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Grid content containing Grid.Item |
| spacing | `0 \| 8 \| 16 \| 24 \| 32 \| 64 \| 72 \| 80` | - | Defines amount of space between Grid.Item components (in px). If spacing is not set, then it will be automatically adjusted based on the screen size (16px for screens smaller than medium, 24px for medium screens, and 32px for screens bigger than medium) |
| direction | `"row" \| "row-reverse" \| "column" \| "column-reverse"` | `row` | Defines the orientation of the grid |
| alignItems | `"flex-start" \| "center" \| "flex-end" \| "stretch" \| "baseline"` | `flex-start` | Defines the align-items style property based on the direction |
| justifyContent | `"flex-start" \| "center" \| "flex-end" \| "space-between" \| "space-around" \| "space-evenly"` | `flex-start` | Defines the justify-content style property based on the direction |
| wrap | `"wrap" \| "nowrap" \| "wrap-reverse"` | `wrap` | Defines the flex-wrap style property based on the direction |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Grid.Item

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Content of Grid.Item |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| xs | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority |
| sm | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the sm breakpoint and wider screens |
| md | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the md breakpoint and wider screens |
| lg | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the lg breakpoint and wider screens |
| xl | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the xl breakpoint and wider screens |

### Alignment

```tsx
import React from 'react'
import { Grid, Button } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid justifyContent='flex-start'>
      <Grid.Item>
        <Button>Left</Button>
      </Grid.Item>
    </Grid>

    <Grid justifyContent='center'>
      <Grid.Item>
        <Button>Center</Button>
      </Grid.Item>
    </Grid>

    <Grid justifyContent='flex-end'>
      <Grid.Item>
        <Button>Right</Button>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
```

### Direction

```tsx
import React from 'react'
import { Grid, Button, Container, Typography } from '@toptal/picasso'
import { SPACING_8, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_8}>
      <Container bottom={SPACING_4}>
        <Typography>Row direction</Typography>
      </Container>

      <Grid direction='row'>
        <Grid.Item>
          <Button>Element A</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>Element B</Button>
        </Grid.Item>
      </Grid>
    </Container>

    <Container bottom={SPACING_4}>
      <Typography>Column direction</Typography>
    </Container>

    <Grid direction='column'>
      <Grid.Item>
        <Button>Element A</Button>
      </Grid.Item>
      <Grid.Item>
        <Button>Element B</Button>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
```

### Wrapping

```tsx
import React from 'react'
import { Grid, Button, Container, Typography } from '@toptal/picasso'
import { SPACING_8, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_8}>
      <Container bottom={SPACING_4}>
        <Typography>Wrap</Typography>
      </Container>
      <Grid wrap='wrap' style={{ maxWidth: '200px' }}>
        <Grid.Item>
          <Button>1</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>2</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>3</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>4</Button>
        </Grid.Item>
      </Grid>
    </Container>

    <Container bottom={SPACING_8}>
      <Container bottom={SPACING_4}>
        <Typography>Nowrap</Typography>
      </Container>
      <Grid wrap='nowrap' style={{ maxWidth: '200px' }}>
        <Grid.Item>
          <Button>1</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>2</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>3</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>4</Button>
        </Grid.Item>
      </Grid>
    </Container>

    <Container bottom={SPACING_8}>
      <Container bottom={SPACING_4}>
        <Typography>Wrap-reverse</Typography>
      </Container>
      <Grid wrap='wrap-reverse' style={{ maxWidth: '200px' }}>
        <Grid.Item>
          <Button>1</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>2</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>3</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>4</Button>
        </Grid.Item>
      </Grid>
    </Container>
  </div>
)

export default Example
```

### Responsive spacing

When `spacing` is not explicitly specified by consumer, grid adjusts it according to the screen size (please see the property description for details). You can try to resize screen, to see how different spacing is applied.

```tsx
import React, { useState } from 'react'
import { Grid, Container, Button } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { useScreens } from '@toptal/picasso-provider'

const BorderedContainer = () => {
  const screens = useScreens()
  const currentSpacing = screens({
    xs: 'extra-small, 16px spacing',
    sm: 'small, 16px spacing',
    md: 'medium, 24px spacing',
    lg: 'large, 32px spacing',
    xl: 'extra-large, 32px spacing',
  }) as string

  return (
    <Container padded={SPACING_4} bordered rounded>
      {currentSpacing}
    </Container>
  )
}

const Example = () => {
  const gridItem = (
    <Grid.Item sm={6}>
      <BorderedContainer />
    </Grid.Item>
  )

  const [gridItems, setGridItems] = useState([gridItem, gridItem])

  return (
    <>
      <Container>
        <Grid>{gridItems}</Grid>
      </Container>
      <Container top={SPACING_4}>
        <Button onClick={() => setGridItems([...gridItems, gridItem])}>
          Add another grid item
        </Button>
      </Container>
    </>
  )
}

export default Example
```

## Grid Item

The element of the Grid. Should be nested inside the Grid element.

### Default

```tsx
import React from 'react'
import { Grid, Container, Typography } from '@toptal/picasso'
import { SPACING_4, palette } from '@toptal/picasso-utils'

type Props = { children: React.ReactNode }

const ContentContainer = ({ children }: Props) => (
  <Container
    padded={SPACING_4}
    style={{ backgroundColor: palette.blue.lighter }}
  >
    <Typography variant='heading' size='small' align='center'>
      {children}
    </Typography>
  </Container>
)

const Example = () => (
  <Grid>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>

    <Grid.Item sm={12}>
      <ContentContainer>12</ContentContainer>
    </Grid.Item>

    <Grid.Item sm={6}>
      <ContentContainer>6</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={6}>
      <ContentContainer>6</ContentContainer>
    </Grid.Item>

    <Grid.Item sm={3}>
      <ContentContainer>3</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>3</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>3</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>3</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>Sidebar</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={9}>
      <ContentContainer>Main Content</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={9}>
      <ContentContainer>Main Content</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>Sidebar</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>Sidebar</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={6}>
      <ContentContainer>Main Content</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>Sidebar</ContentContainer>
    </Grid.Item>
  </Grid>
)

export default Example
```

### Responsive

You can try to resize screen, to see how different grid widths are applied.

```tsx
import React from 'react'
import { Grid, Container, Typography } from '@toptal/picasso'
import { SPACING_4, palette, useBreakpoint } from '@toptal/picasso-utils'

const ScreenSize = () => {
  const isExtraLarge = useBreakpoint('xl')
  const isLarge = useBreakpoint('lg')
  const isMedium = useBreakpoint('md')

  if (isExtraLarge) {
    return <>Extra Large</>
  }
  if (isLarge) {
    return <>Large</>
  }
  if (isMedium) {
    return <>Medium</>
  }

  return <>Small</>
}

type Props = { children: React.ReactNode }

const ContentContainer = ({ children }: Props) => (
  <Container
    padded={SPACING_4}
    style={{ backgroundColor: palette.blue.lighter }}
  >
    <Typography variant='heading' size='small' align='center'>
      {children}
    </Typography>
  </Container>
)

const Example = () => {
  return (
    <Grid>
      <Grid.Item sm={12} md={6} lg={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item sm={12} md={6} lg={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item sm={12} md={6} lg={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item sm={12} md={6} lg={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
    </Grid>
  )
}

export default Example
```

### Sample Layout

```tsx
import React from 'react'
import { Grid, Page, Typography } from '@toptal/picasso'

const Example = () => (
  <Page>
    <Page.TopBar title='Onboarding' />
    <Page.Content>
      <Grid>
        <Grid.Item sm={8}>
          <SampleContainer>Main Content</SampleContainer>
        </Grid.Item>

        <Grid.Item sm={4}>
          <SampleContainer>Sidebar</SampleContainer>
        </Grid.Item>
      </Grid>
    </Page.Content>
    <Page.Footer />
  </Page>
)

type Props = { children: React.ReactNode }

const SampleContainer = ({ children }: Props) => (
  <div
    style={{
      height: '20rem',
      backgroundColor: '#dfe3e9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography>{children}</Typography>
  </div>
)

export default Example
```

### Centered Layout

```tsx
import React from 'react'
import { Grid, Page, Typography } from '@toptal/picasso'

const Example = () => (
  <Page>
    <Page.TopBar title='Onboarding' />
    <Page.Content>
      <Grid justifyContent='center'>
        <Grid.Item sm={8}>
          <SampleContainer>Content</SampleContainer>
        </Grid.Item>
      </Grid>
    </Page.Content>
    <Page.Footer />
  </Page>
)

type Props = { children: React.ReactNode }

const SampleContainer = ({ children }: Props) => (
  <div
    style={{
      height: '20rem',
      backgroundColor: '#dfe3e9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography>{children}</Typography>
  </div>
)

export default Example
```
