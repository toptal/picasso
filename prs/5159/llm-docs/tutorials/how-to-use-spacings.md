# How to use spacings

This tutorials describes how to create simple card component using [`Container`](..?path=/story/layout-container--container) component from Picasso. 
We will focus on explaning inner and outer spacings and stacking of components using flexbox.
Card will render info about job position opening and will show status of filling the position
with list of candidates in a pipeline.

### Goals
 * Explain `Container` component
 * How to define inner/outer spacings
 * How to layout component

### End result

```tsx
import React from 'react'
import { Container, Typography, Paper, Stepper, Avatar } from '@toptal/picasso'

import { SPACING_2, SPACING_6, SPACING_4 } from '@toptal/picasso/utils'

const JobCandidate = () => (
  <Container right={SPACING_2}>
    <Avatar
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      src='./jacqueline-with-flowers-1954-square.jpg'
    />
  </Container>
)

const Example = () => (
  <div style={{ width: '35rem' }}>
    <Paper>
      <Container padded={SPACING_6}>
        <Container
          flex
          justifyContent='space-between'
          alignItems='flex-start'
          bottom={SPACING_4}
        >
          <Container>
            <Typography variant='heading' size='small'>
              UX Designer
            </Typography>
            <Typography size='small'>2 positions Open</Typography>
          </Container>
          <Stepper
            hideLabels
            active={2}
            steps={['Initial', 'Check', 'Interview', 'Agreement']}
          />
        </Container>
        <Typography size='small'>Candidates</Typography>
        <Container top={SPACING_4} flex>
          <JobCandidate />
          <JobCandidate />
          <JobCandidate />
        </Container>
      </Container>
    </Paper>
  </div>
)

export default Example
```

## Tutorial

Step-by-step guide to create simple card component

### First step: Define Card container

We will start with defining basic card container by using
[`Paper`](..?path=/story/layout-paper--paper) and [`Container`](..?path=/story/layout-container--container)
component to get elevated item with inner spacing. 

We are using `padded={SPACING_6}` Container's prop to define inner spacing and it is translated to
`padding: 1.5rem`. Spacing constants are imported from `@toptal/picasso/utils`. Spacing can only take values,
approved by [BASE spacing guidelines](https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing):

| Spacing name    | Value       |
| --------------- | ----------- |
| `SPACING_0`   | `0rem`    |
| `SPACING_1`   | `0.25rem` |
| `SPACING_2`   | `0.5rem`  |
| `SPACING_3`   | `0.75rem` |
| `SPACING_4`   | `1rem`    |
| `SPACING_6`   | `1.5rem`  |
| `SPACING_8`   | `2rem`    |
| `SPACING_10`  | `2.5rem`  |
| `SPACING_12`  | `3rem`    |

**Custom non-BASE spacing**

It is prohibitied to use any spacing with pixel units value not being a multiple of 4 (for example, `55px` is not allowed).
If spacing pixel value is a multiple of 4 and is not present in [BASE spacing guidelines](https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing),
confirm its usage with Design Team first.

```tsx
import React from 'react'
import { Container, Paper } from '@toptal/picasso'

import { SPACING_6 } from '@toptal/picasso/utils'

const Example = () => (
  <div style={{ width: '35rem' }}>
    <Paper>
      <Container padded={SPACING_6}>Card content</Container>
    </Paper>
  </div>
)

export default Example
```

### Second step: Add Card header

Let's add Card header that will contain info about job position name, number of open positions and 
in the right side of the card indicator that represents the status of a process.

We want to create two items in a row, one item will contain position name and number, and another item will
contain an indicator. Plus, first item should go to left, and second item to right. `Container` can use flexbox
functionality to define such layout but we need to pass `flex` prop to it. By default, it behaves as `block`.

As you can see we are creating a layout by composing containers inside other containers. We could say `Container`
is a basic building block along with `Grid`.

```tsx
import React from 'react'
import { Container, Typography, Paper, Stepper } from '@toptal/picasso'

import { SPACING_6 } from '@toptal/picasso/utils'

const Example = () => (
  <div style={{ width: '35rem' }}>
    <Paper>
      <Container padded={SPACING_6}>
        <Container flex justifyContent='space-between' alignItems='flex-start'>
          <Container>
            <Typography variant='heading' size='small'>
              UX Designer
            </Typography>
            <Typography size='small'>2 positions Open</Typography>
          </Container>
          <Stepper
            hideLabels
            active={2}
            steps={['Initial', 'Check', 'Interview', 'Agreement']}
          />
        </Container>
      </Container>
    </Paper>
  </div>
)

export default Example
```

### Third step: Render candidates list

We have a list of candidates with their avatar picture so we will use
[`Avatar`](..?path=/story/components-folder--avatar) component to render each item
in a card. For this example we can use `Grid` but we will use `Container` to show some tricks with
layouts and spacings.

Let's add new `Container` in a card and define it as a `flex` and by
default get horizontal stacking of items in a row. Each job candidate item is implemented as
`JobCandidate` component and passed as children of the container. We want some spacing between
them so we will add some right margin using `right` container prop. The value of this prop will be
`SPACING_6`.

Card header and candidate list are to close to each other so we will also add a bottom margin to
header container using `bottom` prop, using the same `SPACING_6` value.

And that's it, we have implemented a simple job position card.

```tsx
import React from 'react'
import { Container, Typography, Paper, Stepper, Avatar } from '@toptal/picasso'

import { SPACING_2, SPACING_6, SPACING_4 } from '@toptal/picasso/utils'

const JobCandidate = () => (
  <Container right={SPACING_2}>
    <Avatar
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      src='./jacqueline-with-flowers-1954-square.jpg'
    />
  </Container>
)

const Example = () => (
  <div style={{ width: '35rem' }}>
    <Paper>
      <Container padded={SPACING_6}>
        <Container
          flex
          justifyContent='space-between'
          alignItems='flex-start'
          bottom={SPACING_4}
        >
          <Container>
            <Typography variant='heading' size='small'>
              UX Designer
            </Typography>
            <Typography size='small'>2 positions Open</Typography>
          </Container>
          <Stepper
            hideLabels
            active={2}
            steps={['Initial', 'Check', 'Interview', 'Agreement']}
          />
        </Container>
        <Typography size='small'>Candidates</Typography>
        <Container top={SPACING_4} flex>
          <JobCandidate />
          <JobCandidate />
          <JobCandidate />
        </Container>
      </Container>
    </Paper>
  </div>
)

export default Example
```
