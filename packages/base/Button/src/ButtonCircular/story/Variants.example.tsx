import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_6, palette } from '@toptal/picasso-utils'
import { Settings16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Container inline>
      <Typography variant='heading' size='small' align='center'>
        Primary (Default)
      </Typography>
      <Container padded={SPACING_4}>
        <Button.Circular icon={<Settings16 />} />
      </Container>
    </Container>

    <Container inline left={SPACING_6}>
      <Typography variant='heading' size='small' align='center'>
        Flat
      </Typography>
      <Container padded={SPACING_4}>
        <Button.Circular variant='flat' icon={<Settings16 />} />
      </Container>
    </Container>

    <Container inline left={SPACING_6}>
      <Typography variant='heading' size='small' align='center'>
        Transparent
      </Typography>
      <Container
        style={{ backgroundColor: palette.blue.main }}
        inline
        padded={SPACING_4}
      >
        <Button.Circular variant='transparent' icon={<Settings16 />} />
      </Container>
    </Container>
  </div>
)

export default Example
