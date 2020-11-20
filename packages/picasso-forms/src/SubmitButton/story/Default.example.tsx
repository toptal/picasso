import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000))

const Example = () => (
  <Form onSubmit={onSubmit}>
    <Container top='small'>
      <Form.SubmitButton>Submit form</Form.SubmitButton>
    </Container>
  </Form>
)

export default Example
