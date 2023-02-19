import React from 'react'
import { Container } from '@toptal/picasso'
import { FormNonCompound, SubmitButton } from '@toptal/picasso-forms';

const onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000))

const Example = () => (
  <FormNonCompound onSubmit={onSubmit}>
    <Container top='small'>
      <SubmitButton>Submit form</SubmitButton>
    </Container>
  </FormNonCompound>
)

export default Example
