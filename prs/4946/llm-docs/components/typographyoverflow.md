# TypographyOverflow

Show tooltip when typography overflows

## Props

### TypographyOverflow

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | A typography which can possibly overflow |
| lines | `number` | - | Number of lines displayed |
| tooltipContent | `ReactNode` | - | A content to show in tooltip when typography overflows. By default, TypographyOverflow's children are used. |
| tooltipDelay | `"short" \| "long"` | - | A delay in showing the tooltip when typography overflows. |
| disableTooltip | `boolean` | - | Do not show tooltips for shorten content. |
| placement | `"bottom-end" \| "bottom-start" \| "bottom" \| "left-end" \| "left-start" \| "left" \| "right-end" \| "right-start" \| "right" \| "top-end" \| "top-start" \| "top"` | - | Where should the tooltip be positioned |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| variant | `"heading" \| "body"` | - | Font variant for inner text |
| inline | `boolean` | - | Controls whether the Typography is inline or not |
| align | `"left" \| "right" \| "inherit" \| "center" \| "justify"` | - | Text align of the inner text |
| size | `"inherit" \| "xxsmall" \| "xsmall" \| "small" \| "medium" \| "large" \| "xlarge"` | - | Size of the inner text |
| weight | `"inherit" \| "regular" \| "semibold"` | - | Font weight of the inner text |
| invert | `boolean` | - | Invert color |
| color | `"inherit" \| "green" \| "red" \| "yellow" \| "light-grey" \| "grey" \| "grey-main-2" \| "dark-grey" \| "black" \| "light-blue"` | - | Text color |
| noWrap | `boolean` | - | Enable ellipsis for overflowing text |
| as | `ElementType<HTMLAttributes<HTMLElement>>` | - | Rendered HTML markup |
| underline | `"solid" \| "dashed"` | - | Controls when the Typography should have an underline |
| lineThrough | `boolean` | - | Controls when the Typography should have line through |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Default

```tsx
import React from 'react'
import { TypographyOverflow, Container } from '@toptal/picasso'
import { SPACING_1, SPACING_2, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const label =
    'This is a label, long enough to overflow the container and be truncated with an ellipsis.'
  const smallScreen = true
  const description =
    'This is a description, long enough to overflow the container and be truncated with an ellipsis.'

  return (
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      padded={SPACING_4}
      rounded
      data-testid='menu-widget-card-layout'
      style={{ maxWidth: '236px' }}
    >
      <Container
        flex
        alignItems='center'
        gap={SPACING_2}
        style={{ minWidth: 0 }}
      >
        <Container style={{ minWidth: 0 }}>
          <Container
            flex
            alignItems={description && smallScreen ? 'flex-start' : 'center'}
            direction={description && smallScreen ? 'column-reverse' : 'row'}
            gap={SPACING_2}
            bottom={description ? SPACING_1 : undefined}
          >
            <TypographyOverflow
              lines={smallScreen ? 2 : 1}
              size='medium'
              weight='semibold'
              color='black'
              data-testid='menu-widget-card-layout-label'
            >
              {label}
            </TypographyOverflow>
          </Container>

          {description && (
            <Container style={{ maxWidth: '236px' }}>
              <TypographyOverflow
                size='small'
                lines={smallScreen ? 2 : 1}
                data-testid='menu-widget-card-layout-description'
              >
                {description}
              </TypographyOverflow>
            </Container>
          )}
        </Container>
      </Container>
    </Container>
  )
}

export default Example
```

### Multiline

```tsx
import React from 'react'
import { TypographyOverflow, Container } from '@toptal/picasso'
import styled from 'styled-components'

const DynamicWidthContainer = styled(Container)`
  margin-top: 1rem;
  width: 300px;
  padding-right: 20px;
  resize: horizontal;
  overflow: auto;
  border-right: 3px solid black;
`

const Example = () => {
  return (
    <>
      <DynamicWidthContainer style={{ marginTop: 150 }}>
        <TypographyOverflow lines={2} as='p' data-testid='ellipsed-text-lines2'>
          Two lines typography with a very long text and{' '}
          <a href='#'>two words link</a> and dynamic width. Try to resize.
        </TypographyOverflow>
      </DynamicWidthContainer>
      <DynamicWidthContainer>
        <TypographyOverflow lines={3} as='p' data-testid='ellipsed-text-lines3'>
          Three lines typography with a very long text and a very long text and{' '}
          a very long text and <a href='#'>two words link</a> and dynamic width.
          Try to resize.
        </TypographyOverflow>
      </DynamicWidthContainer>
      <DynamicWidthContainer>
        <TypographyOverflow lines={4} as='p' data-testid='ellipsed-text-lines4'>
          &lt;https://longlong.longlong.html/very/long/html/link/very/long/html/link/&gt;
          Four lines typography with a very long text and a very long text and a
          very long text and a very long text and a very long text and a very
          long text and a very long text and <a href='#'>two words link</a> and
          dynamic width. Try to resize.
        </TypographyOverflow>
      </DynamicWidthContainer>
    </>
  )
}

export default Example
```

### Checkbox label

```tsx
import React from 'react'
import { Checkbox, TypographyOverflow } from '@toptal/picasso'

const Example = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginTop: 100, maxWidth: '150px', flexBasis: '150px' }}>
        <Checkbox
          label={
            <TypographyOverflow data-testid='ellipsed-text'>
              This typography is very long and therefore it overflows.
            </TypographyOverflow>
          }
        />
      </div>
    </div>
  )
}

export default Example
```

### Custom tooltip content

```tsx
import React from 'react'
import { TypographyOverflow, Typography } from '@toptal/picasso'

const Example = () => {
  return (
    <div style={{ width: 300, marginTop: 100 }}>
      <TypographyOverflow
        data-testid='ellipsed-text'
        tooltipContent={
          <Typography color='yellow' weight='semibold'>
            This typography is very long and therefore it overflows.
          </Typography>
        }
      >
        This typography is very long and therefore it overflows.
      </TypographyOverflow>
    </div>
  )
}

export default Example
```

### Delay

```tsx
import React from 'react'
import { TypographyOverflow, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const Example = () => {
  return (
    <Container flex>
      <div style={{ width: 300, marginTop: 100 }}>
        <TypographyOverflow data-testid='default-delay-tooltip'>
          Default delay. This typography is very long and therefore it
          overflows.
        </TypographyOverflow>
      </div>

      <Container left={SPACING_8}>
        <div style={{ width: 300, marginTop: 100 }}>
          <TypographyOverflow
            tooltipDelay='long'
            data-testid='long-delay-tooltip'
          >
            Long delay. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </div>
      </Container>
    </Container>
  )
}

export default Example
```

### Placement

```tsx
import React from 'react'
import { TypographyOverflow, Container, Grid } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container style={{ padding: 50, width: 900 }}>
    <Container>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='top-start'>
            top-start. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='top'>
            top. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='top-end'>
            top-end. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='left-start'>
            left-start. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <TypographyOverflow placement='right-start'>
            right-start. This typography is very long and therefore it
            overflows.
          </TypographyOverflow>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='left'>
            left. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <TypographyOverflow placement='right'>
            right. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='left-end'>
            left-end. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <TypographyOverflow placement='right-end'>
            right-end. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='bottom-start'>
            bottom-start. This typography is very long and therefore it
            overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='bottom'>
            bottom. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='bottom-end'>
            bottom-end. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
      </Grid>
    </Container>
  </Container>
)

export default Example
```
