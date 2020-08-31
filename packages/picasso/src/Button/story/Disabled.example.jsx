import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'
import { Settings16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Button disabled>Disabled</Button>
    <Button disabled icon={<Settings16 />}>
      Disabled
    </Button>
    <Button disabled variant='secondary-blue'>
      Secondary Disabled
    </Button>
    <Button disabled variant='secondary-blue' icon={<Settings16 />}>
      Secondary Disabled
    </Button>
    <Container
      top='small'
      bottom='large'
      style={{ backgroundColor: palette.blue.main }}
      padded={0.5}
    >
      <Button disabled variant='secondary-white'>
        Secondary Disabled
      </Button>
      <Button disabled variant='secondary-white' icon={<Settings16 />}>
        Secondary Disabled
      </Button>
    </Container>
  </div>
)

export default Example
