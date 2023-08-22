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
        Default for responsive layouts
      </Typography>
      <Container padded='small'>
        <Button.Circular icon={<SettingsResponsive />} />
      </Container>
    </Container>
    <Container inline left='medium'>
      <Typography variant='heading' size='small' align='center'>
        Force responsive to false
      </Typography>
      <Container padded='small'>
        <Button.Circular responsive={false} icon={<Settings16 />} />
      </Container>
    </Container>
  </div>
)

export default Example
