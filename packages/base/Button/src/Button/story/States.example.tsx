import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_8, SPACING_2, palette } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      Primary (Default)
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button>Normal</Button>
      <Button hovered>Hovered</Button>
      <Button focused>Focused</Button>
      <Button active>Active</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </Container>

    <Typography variant='heading' size='small'>
      Negative
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button variant='negative'>Normal</Button>
      <Button hovered variant='negative'>
        Hovered
      </Button>
      <Button focused variant='negative'>
        Focused
      </Button>
      <Button active variant='negative'>
        Active
      </Button>
      <Button loading variant='negative'>
        Loading
      </Button>
      <Button disabled variant='negative'>
        Disabled
      </Button>
    </Container>

    <Typography variant='heading' size='small'>
      Positive
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button variant='positive'>Normal</Button>
      <Button hovered variant='positive'>
        Hovered
      </Button>
      <Button focused variant='positive'>
        Focused
      </Button>
      <Button active variant='positive'>
        Active
      </Button>
      <Button loading variant='positive'>
        Loading
      </Button>
      <Button disabled variant='positive'>
        Disabled
      </Button>
    </Container>

    <Typography variant='heading' size='small'>
      Secondary
    </Typography>
    <Container top={SPACING_4} bottom={SPACING_8}>
      <Button variant='secondary'>Normal</Button>
      <Button hovered variant='secondary'>
        Hovered
      </Button>
      <Button focused variant='secondary'>
        Focused
      </Button>
      <Button active variant='secondary'>
        Active
      </Button>
      <Button loading variant='secondary'>
        Loading
      </Button>
      <Button disabled variant='secondary'>
        Disabled
      </Button>
    </Container>

    <Typography variant='heading' size='small'>
      Transparent
    </Typography>
    <Container
      top={SPACING_4}
      inline
      style={{ backgroundColor: palette.blue.main }}
      padded={SPACING_2}
    >
      <Button variant='transparent'>Normal</Button>
      <Button hovered variant='transparent'>
        Hovered
      </Button>
      <Button focused variant='transparent'>
        Focused
      </Button>
      <Button active variant='transparent'>
        Active
      </Button>
      <Button loading variant='transparent'>
        Loading
      </Button>
      <Button disabled variant='transparent'>
        Disabled
      </Button>
    </Container>
  </div>
)

export default Example
