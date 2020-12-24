import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Link16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      No icon
    </Typography>
    <Container top='small' bottom='large'>
      <Button.Action>Default</Button.Action>
      <Button.Action hovered>Hovered</Button.Action>
      <Button.Action focused>Focused</Button.Action>
      <Button.Action active>Active</Button.Action>
      <Button.Action loading>Loading</Button.Action>
      <Button.Action disabled>Disabled</Button.Action>
    </Container>
    <Typography variant='heading' size='small'>
      Icon on the left
    </Typography>
    <Container top='small' bottom='large'>
      <Button.Action icon={<Link16 />}>Default</Button.Action>
      <Button.Action hovered icon={<Link16 />}>
        Hovered
      </Button.Action>
      <Button.Action focused icon={<Link16 />}>
        Focused
      </Button.Action>
      <Button.Action active icon={<Link16 />}>
        Active
      </Button.Action>
      <Button.Action loading icon={<Link16 />}>
        Loading
      </Button.Action>
      <Button.Action disabled icon={<Link16 />}>
        Disabled
      </Button.Action>
    </Container>
    <Typography variant='heading' size='small'>
      Icon on the right
    </Typography>
    <Container top='small' bottom='large'>
      <Button.Action icon={<Link16 />} iconPosition='right'>
        Default
      </Button.Action>
      <Button.Action hovered icon={<Link16 />} iconPosition='right'>
        Hovered
      </Button.Action>
      <Button.Action focused icon={<Link16 />} iconPosition='right'>
        Focused
      </Button.Action>
      <Button.Action active icon={<Link16 />} iconPosition='right'>
        Active
      </Button.Action>
      <Button.Action loading icon={<Link16 />} iconPosition='right'>
        Loading
      </Button.Action>
      <Button.Action disabled icon={<Link16 />} iconPosition='right'>
        Disabled
      </Button.Action>
    </Container>
  </div>
)

export default Example
