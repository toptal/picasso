import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Link16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      No icon
    </Typography>
    <Container top='small' bottom='large' style={{ background: 'lightyellow' }}>
      <Button.Action>Default</Button.Action>
      <Button.Action hovered>Hovered</Button.Action>
      <Button.Action focused>Focused</Button.Action>
      <Button.Action active>Active</Button.Action>
      <Button.Action loading>Loading</Button.Action>
      <Button.Action disabled>Disabled</Button.Action>
      <Button.Action icon={<Link16 />}>With Left Icon</Button.Action>
      <Button.Action icon={<Link16 />} iconPosition='right'>
        With Right Icon
      </Button.Action>
    </Container>
  </div>
)

export default Example
