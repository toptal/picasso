# Breakpoints

For optimal user experience, we need to be able to adapt layout
      at various breakpoints. Each breakpoint matches with a fixed screen
      width.

### Breakpoints

The list of breakpoint names and pixel-values we use while we design and do layouts

```tsx
import React from 'react'
import { breakpoints, SPACING_4 } from '@toptal/picasso-utils'
import { Grid, Paper, Image, Typography, Container } from '@toptal/picasso'

const breakpointsList = Object.entries(breakpoints)

const Example = () => (
  <Grid justifyContent='center' spacing={16}>
    {breakpointsList.map(([breakpointName, breakpointValue], index) => {
      const nextBreakpoint = breakpointsList[index + 1]
      let nextBreakpointValue

      if (nextBreakpoint) {
        nextBreakpointValue = nextBreakpoint[1]
      }

      const isSmallestBreakpoint = index === 0
      const isLargestBreakpoint = index === breakpointsList.length - 1

      return (
        <Grid.Item key={breakpointName} md={2}>
          <Paper style={{ padding: '2rem' }}>
            <Container flex direction='column' alignItems='center'>
              <Typography variant='heading' size='large'>
                {breakpointName}
              </Typography>
              <Typography size='xsmall'>
                {isSmallestBreakpoint && `< ${nextBreakpointValue} px`}
                {isLargestBreakpoint && `≥ ${breakpointValue} px`}
                {!isSmallestBreakpoint &&
                  !isLargestBreakpoint &&
                  `${breakpointValue} px ≤ ... < ${nextBreakpointValue} px`}
              </Typography>
              <Container top={SPACING_4}>
                <Image
                  src={`./ico-breakpoint-${breakpointName}.svg`}
                  alt={`${breakpointName}`}
                  style={{ height: '7rem' }}
                />
              </Container>
            </Container>
          </Paper>
        </Grid.Item>
      )
    })}
  </Grid>
)

export default Example
```

### Media queries

Picasso provides a function 'screens' to be able to 
    easily create media queries based on the given breakpoints

```tsx
import React from 'react'
import styled from 'styled-components'
import { screens, palette } from '@toptal/picasso-utils'

const StyledBox = styled.div`
  background-color: ${palette.green.main};
  padding: 2rem;

  ${screens('sm', 'md')} {
    background-color: ${palette.blue.main};
  }
`

const Example = () => (
  <StyledBox>Box will become blue on small and medium screen sizes</StyledBox>
)

export default Example
```

### useBreakpoint

Provides programmatic way to check what screen size defined by breakpoints is active

```tsx
import React from 'react'
import { useBreakpoint } from '@toptal/picasso-utils'
import { Typography } from '@toptal/picasso'

const Example = () => {
  const isSmall = useBreakpoint('sm')
  const isSmallOrMedium = useBreakpoint(['sm', 'md'])

  return (
    <>
      <Typography>{`Breakpoint 'small' matches: ${isSmall}`}</Typography>
      <Typography>{`Breakpoint 'small' or 'medium' matches: ${isSmallOrMedium}`}</Typography>
    </>
  )
}

export default Example
```

### useScreens

Provides a programmatic way to switch between different values depending on screen size. The function returned by useScreens is memoized per screen size, so there are no performance penalties if re-rendering happens often.

```tsx
import React from 'react'
import { useScreens, SPACING_8 } from '@toptal/picasso-utils'
import type { ButtonVariantType } from '@toptal/picasso'
import { Typography, Button, Container } from '@toptal/picasso'

const Example = () => {
  const screens = useScreens<ButtonVariantType>()
  const screenTexts = useScreens<string>()

  return (
    <>
      <Container bottom={SPACING_8}>
        <Typography variant='heading' size='medium'>
          Current screen breakpoint:{' '}
          {screenTexts({
            xs: 'xs',
            sm: 'sm',
            md: 'md',
            lg: 'lg',
            xl: 'xl',
          })}
        </Typography>
      </Container>
      <Typography as='span'>
        The button below will use:
        <ul>
          <li>
            <strong>secondary</strong> variant on small screens
          </li>
          <li>
            <strong>positive</strong> variant on large screens
          </li>
          <li>
            <strong>primary</strong> for all other screens (the default value)
          </li>
        </ul>
      </Typography>

      <Button
        variant={screens(
          {
            sm: 'secondary',
            lg: 'positive',
          },
          'primary'
        )}
      >
        {screenTexts(
          {
            sm: 'small (secondary)',
            lg: 'large (positive)',
          },
          'default (primary)'
        )}
      </Button>
    </>
  )
}

export default Example
```
