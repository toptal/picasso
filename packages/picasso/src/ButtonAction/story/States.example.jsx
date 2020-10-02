import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Link16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
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
  </div>
)

export default Example
