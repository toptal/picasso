import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Link16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Container top='small'>
      <Button.Action>Default</Button.Action>
      <Button.Action hovered>Hovered</Button.Action>
      <Button.Action focused>Focused</Button.Action>
      <Button.Action active>Active</Button.Action>
      <Button.Action loading>Loading</Button.Action>
      <Button.Action disabled>Disabled</Button.Action>
    </Container>
    <Container top='small' bottom='large'>
      <Button.Action icon={<Link16 />}>Default with icon</Button.Action>
      <Button.Action hovered icon={<Link16 />}>
        Hovered with icon
      </Button.Action>
      <Button.Action focused icon={<Link16 />}>
        Focused with icon
      </Button.Action>
      <Button.Action active icon={<Link16 />}>
        Active with icon
      </Button.Action>
      <Button.Action loading icon={<Link16 />}>
        Loading with icon
      </Button.Action>
      <Button.Action disabled icon={<Link16 />}>
        Disabled with icon
      </Button.Action>
    </Container>
  </div>
)

export default Example
