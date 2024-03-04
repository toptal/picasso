import { Check24, Container, Button, Button as Butt } from '@toptal/picasso';
// Named import from utils
import { Transitions } from '@toptal/picasso/utils'
// Import from other Picasso packages remain unchanged
import Picasso from '@toptal/picasso-provider'
import { Form } from '@toptal/picasso-forms'


import React from 'react'

const Example = () => {
  console.log(Transitions)
  return (
    <Container>
      <Check24 />
      <Button />
      <Butt />
    </Container>
  )
}
