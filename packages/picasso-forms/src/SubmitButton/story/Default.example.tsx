import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { FormNonCompound, SubmitButton } from '@toptal/picasso-forms'

const onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000))

const Example = () => (
  <FormNonCompound onSubmit={onSubmit}>
    <Container top={SPACING_4}>
      <SubmitButton>Submit form</SubmitButton>
    </Container>
  </FormNonCompound>
)

export default Example
