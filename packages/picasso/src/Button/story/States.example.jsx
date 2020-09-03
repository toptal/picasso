import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      Primary-Blue:
    </Typography>
    <Container top='small' bottom='large'>
      <Button>Normal</Button>
      <Button hovered>Hovered</Button>
      <Button focused>Focused</Button>
      <Button active>Active</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </Container>

    <Typography variant='heading' size='small'>
      Primary Red:
    </Typography>
    <Container top='small' bottom='large'>
      <Button variant='primary-red'>Normal</Button>
      <Button hovered variant='primary-red'>
        Hovered
      </Button>
      <Button focused variant='primary-red'>
        Focused
      </Button>
      <Button active variant='primary-red'>
        Active
      </Button>
      <Button loading variant='primary-red'>
        Loading
      </Button>
      <Button disabled variant='primary-red'>
        Disabled
      </Button>
    </Container>

    <Typography variant='heading' size='small'>
      Secondary Blue:
    </Typography>
    <Container top='small' bottom='large'>
      <Button variant='secondary-blue'>Normal</Button>
      <Button hovered variant='secondary-blue'>
        Hovered
      </Button>
      <Button focused variant='secondary-blue'>
        Focused
      </Button>
      <Button active variant='secondary-blue'>
        Active
      </Button>
      <Button loading variant='secondary-blue'>
        Loading
      </Button>
      <Button disabled variant='secondary-blue'>
        Disabled
      </Button>
    </Container>

    <Typography variant='heading' size='small'>
      Secondary White:
    </Typography>
    <Container
      top='small'
      style={{ backgroundColor: palette.blue.main }}
      padded={0.5}
    >
      <Button variant='secondary-white'>Normal</Button>
      <Button hovered variant='secondary-white'>
        Hovered
      </Button>
      <Button focused variant='secondary-white'>
        Focused
      </Button>
      <Button active variant='secondary-white'>
        Active
      </Button>
      <Button loading variant='secondary-white'>
        Loading
      </Button>
      <Button disabled variant='secondary-white'>
        Disabled
      </Button>
    </Container>
  </div>
)

export default Example
