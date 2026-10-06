# Container

Use Container to add space between 2 elements.

## Props

### Container

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Content of Container |
| inline | `boolean` | - | Whether container should act as inline element `display: inline-block` |
| flex | `boolean` | - | Use flexbox |
| direction | `"row" \| "column" \| "row-reverse" \| "column-reverse"` | - | Set flex direction |
| alignItems | `"flex-start" \| "flex-end" \| "center" \| "stretch" \| "baseline"` | - | Defines the align-items style property |
| justifyContent | `"flex-start" \| "flex-end" \| "center" \| "space-between" \| "space-around" \| "space-evenly"` | - | Defines the justify-content style property |
| wrap | `"wrap" \| "nowrap" \| "wrap-reverse"` | - | Defines flex-wrap style property |
| bordered | `boolean` | - | Whether (`white`, `transparent`) container has border or not |
| rounded | `boolean` | - | Whether container has 8px border-radius applied or not |
| variant | `"transparent" \| "white" \| "red" \| "green" \| "yellow" \| "blue" \| "grey"` | - | Style variant of Notification |
| as | `"div" \| "span"` | - | Component used for the root node |
| align | `"center" \| "inherit" \| "left" \| "right" \| "justify"` | - | Text align of the inner text |
| top | `SpacingType` | - | margin-top for the container transformed to `rem` |
| bottom | `SpacingType` | - | margin-bottom for the container transformed to `rem` |
| left | `SpacingType` | - | margin-left for the container transformed to `rem` |
| right | `SpacingType` | - | margin-right for the container transformed to `rem` |
| padded | `SpacingType` | - | padding for the container transformed to `rem` |
| gap | `SpacingType` | - | Gap between elements for a flex container |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_8}>Some text</Container>
    <Container left={SPACING_4}>Some more text with a small margin</Container>
  </div>
)

export default Example
```

### Spacing

Creating inner and outer space for component

```tsx
import React from 'react'
import { Container, Paper, Grid } from '@toptal/picasso'
import {
  SPACING_4,
  SPACING_2,
  SPACING_6,
  SPACING_8,
} from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>Outer spacing</Container>
    <Grid>
      <Grid.Item>
        <Container
          top={SPACING_2}
          bottom={SPACING_2}
          left={SPACING_2}
          right={SPACING_2}
        >
          <Paper>
            <span>xsmall</span>
          </Paper>
        </Container>
      </Grid.Item>
      <Grid.Item>
        <Container
          top={SPACING_4}
          bottom={SPACING_4}
          left={SPACING_4}
          right={SPACING_4}
        >
          <Paper>
            <span>small</span>
          </Paper>
        </Container>
      </Grid.Item>
      <Grid.Item>
        <Container
          top={SPACING_6}
          bottom={SPACING_6}
          left={SPACING_6}
          right={SPACING_6}
        >
          <Paper>
            <span>medium</span>
          </Paper>
        </Container>
      </Grid.Item>
      <Grid.Item>
        <Container
          top={SPACING_8}
          bottom={SPACING_8}
          left={SPACING_8}
          right={SPACING_8}
        >
          <Paper>
            <span>large</span>
          </Paper>
        </Container>
      </Grid.Item>
    </Grid>

    <Container bottom={SPACING_4}>Inner spacing</Container>
    <Grid>
      <Grid.Item>
        <Paper>
          <Container padded={SPACING_2}>
            <span>xsmall</span>
          </Container>
        </Paper>
      </Grid.Item>
      <Grid.Item>
        <Paper>
          <Container padded={SPACING_4}>
            <span>small</span>
          </Container>
        </Paper>
      </Grid.Item>
      <Grid.Item>
        <Paper>
          <Container padded={SPACING_6}>
            <span>medium</span>
          </Container>
        </Paper>
      </Grid.Item>
      <Grid.Item>
        <Paper>
          <Container padded={SPACING_8}>
            <span>large</span>
          </Container>
        </Paper>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
```

### Responsive Spacing

```tsx
import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import {
  SPACING_10,
  SPACING_12,
  SPACING_4,
  SPACING_6,
  SPACING_8,
} from '@toptal/picasso-utils'

const Example = () => (
  <Container style={{ backgroundColor: 'lightgray' }}>
    <Typography>
      Try resizing the window to see how the spacing changes
    </Typography>

    <Container
      inline
      style={{ backgroundColor: 'royalblue' }}
      padded={{
        xs: SPACING_12,
        sm: SPACING_10,
        md: SPACING_8,
        lg: SPACING_6,
        xl: SPACING_4,
      }}
      left={{
        xs: SPACING_12,
        sm: SPACING_10,
        md: SPACING_8,
        lg: SPACING_6,
        xl: SPACING_4,
      }}
    >
      Lorem reiciendis quis lorem doloribus quos doloremque! Temporibus
      dignissimos deleniti accusamus aliquam voluptatibus? Quibusdam laboriosam
      neque saepe odit quidem! Incidunt hic corporis repudiandae laudantium
      reiciendis ex, doloribus Delectus dolorem adipisci.
    </Container>
  </Container>
)

export default Example
```

### Inline

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container inline right={SPACING_8}>
      <span>Some inline text</span>
    </Container>
    <span>Another inline text</span>
  </div>
)

export default Example
```

### With border

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bordered rounded padded={SPACING_6}>
      With default border
    </Container>
  </div>
)

export default Example
```

### Variants

```tsx
import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex direction='column'>
    <Container bottom={SPACING_6}>
      <Typography variant='heading' size='medium'>
        Bordered
      </Typography>

      <Container
        bordered
        rounded
        padded={SPACING_6}
        bottom={SPACING_4}
        top={SPACING_4}
      >
        White
      </Container>
      <Container rounded variant='red' padded={SPACING_6} bottom={SPACING_4}>
        Red
      </Container>
      <Container rounded variant='yellow' padded={SPACING_6} bottom={SPACING_4}>
        Yellow
      </Container>
      <Container rounded variant='green' padded={SPACING_6} bottom={SPACING_4}>
        Green
      </Container>
      <Container rounded variant='blue' padded={SPACING_6} bottom={SPACING_4}>
        Blue
      </Container>
      <Container rounded variant='grey' padded={SPACING_6}>
        Grey
      </Container>
    </Container>

    <Container>
      <Typography variant='heading' size='medium'>
        Non-bordered
      </Typography>

      <Container rounded padded={SPACING_6} bottom={SPACING_4} top={SPACING_4}>
        White
      </Container>
    </Container>
  </Container>
)

export default Example
```

### TextAlign

```tsx
import React from 'react'
import { Container, Grid, Paper } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item sm={6}>
      <Container align='left'>
        <Paper>Text align left</Paper>
      </Container>
    </Grid.Item>
    <Grid.Item sm={6}>
      <Container align='center'>
        <Paper>Text align center</Paper>
      </Container>
    </Grid.Item>
    <Grid.Item sm={6}>
      <Container align='right'>
        <Paper>Text align right</Paper>
      </Container>
    </Grid.Item>
    <Grid.Item sm={6}>
      <Container align='justify'>
        <Paper>Text align justify</Paper>
      </Container>
    </Grid.Item>
  </Grid>
)

export default Example
```

### Wrap

```tsx
import React from 'react'
import { Container, Grid, Typography } from '@toptal/picasso'

const LargeContent = () => {
  return (
    <>
      <Container variant='red' padded='xlarge'>
        1
      </Container>
      <Container variant='red' padded='xlarge'>
        2
      </Container>
      <Container variant='red' padded='xlarge'>
        3
      </Container>
      <Container variant='red' padded='xlarge'>
        4
      </Container>
      <Container variant='red' padded='xlarge'>
        5
      </Container>
      <Container variant='red' padded='xlarge'>
        6
      </Container>
      <Container variant='red' padded='xlarge'>
        7
      </Container>
    </>
  )
}

const Example = () => (
  <Grid>
    <Grid.Item sm={6} style={{ overflow: 'hidden' }}>
      <Typography variant='heading' size='medium'>
        Default (nowrap)
      </Typography>

      <Container top='small' flex gap='xlarge'>
        <LargeContent />
      </Container>
    </Grid.Item>
    <Grid.Item sm={6} style={{ overflow: 'hidden' }}>
      <Typography variant='heading' size='medium'>
        Explicit nowrap
      </Typography>

      <Container top='small' flex gap='xlarge' wrap='nowrap'>
        <LargeContent />
      </Container>
    </Grid.Item>
    <Grid.Item sm={6}>
      <Typography variant='heading' size='medium'>
        Wrap
      </Typography>
      <Container top='small' flex gap='xlarge' wrap='wrap'>
        <LargeContent />
      </Container>
    </Grid.Item>
    <Grid.Item sm={6}>
      <Typography variant='heading' size='medium'>
        Wrap (reverse)
      </Typography>

      <Container top='small' flex gap='xlarge' wrap='wrap-reverse'>
        <LargeContent />
      </Container>
    </Grid.Item>
  </Grid>
)

export default Example
```
