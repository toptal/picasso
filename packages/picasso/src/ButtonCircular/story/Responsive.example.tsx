import React from 'react'
import {
  Button,
  Container,
  Settings16,
  SettingsResponsive,
  Typography,
} from '@toptal/picasso'

const Example = () => (
  <div>
    <Container inline>
      <Typography variant='heading' size='small' align='center'>
        Responsive
      </Typography>
      <Container padded='small'>
        <Button.Circular responsive icon={<SettingsResponsive />} />
      </Container>
    </Container>
    <Container inline left='medium'>
      <Typography variant='heading' size='small' align='center'>
        Default
      </Typography>
      <Container padded='small'>
        <Button.Circular icon={<Settings16 />} />
      </Container>
    </Container>
  </div>
)

export default Example
