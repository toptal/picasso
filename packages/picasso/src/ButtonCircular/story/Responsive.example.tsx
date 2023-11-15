import React from 'react'
import {
  Button,
  Container,
  Settings16,
  SettingsResponsive,
  Typography,
} from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container inline>
      <Typography variant='heading' size='small' align='center'>
        Responsive
      </Typography>
      <Container padded={SPACING_4}>
        <Button.Circular responsive icon={<SettingsResponsive />} />
      </Container>
    </Container>
    <Container inline left={SPACING_6}>
      <Typography variant='heading' size='small' align='center'>
        Default
      </Typography>
      <Container padded={SPACING_4}>
        <Button.Circular icon={<Settings16 />} />
      </Container>
    </Container>
  </div>
)

export default Example
