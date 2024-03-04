// eslint-disable-file
// Direct default import from Icon file
import Check24 from '@toptal/picasso/Icon/Check24'
// Named import from sub-directory
import { Container } from '@toptal/picasso/Container'
// Default import from nested sub-directory
import Button from '@toptal/picasso/Button/Button'
// Incorrect default import name from nested sub-directory
import Butt from '@toptal/picasso/Button/Button'
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
