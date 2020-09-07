import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'
import { palette } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container inline>
      <Typography variant='heading' size='small' align='center'>
        Primary (Default)
      </Typography>
      <Container padded='small'>
        <Button.Circular icon={<Settings16 />} />
      </Container>
    </Container>

    <Container inline left='medium'>
      <Typography variant='heading' size='small' align='center'>
        Flat
      </Typography>
      <Container padded='small'>
        <Button.Circular variant='flat' icon={<Settings16 />} />
      </Container>
    </Container>

    <Container inline left='medium'>
      <Typography variant='heading' size='small' align='center'>
        Transparent
      </Typography>
      <Container
        style={{ backgroundColor: palette.blue.main }}
        inline
        padded='small'
      >
        <Button.Circular variant='transparent' icon={<Settings16 />} />
      </Container>
    </Container>
  </div>
)

export default Example
