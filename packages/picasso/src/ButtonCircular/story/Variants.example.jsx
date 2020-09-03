import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'
import { palette } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      Primary Blue:
    </Typography>
    <Container top='small' bottom='large'>
      <Button.Circular icon={<Settings16 />} />
    </Container>

    <Typography variant='heading' size='small'>
      Flat:
    </Typography>
    <Container top='small' bottom='large'>
      <Button.Circular variant='flat' icon={<Settings16 />} />
    </Container>

    <Typography variant='heading' size='small'>
      Transparent:
    </Typography>
    <Container
      top='small'
      style={{ backgroundColor: palette.blue.main }}
      padded={0.5}
    >
      <Button.Circular variant='transparent' icon={<Settings16 />} />
    </Container>
  </div>
)

export default Example
