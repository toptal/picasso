import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const FieldValidationExample = () => (
  <Form onSubmit={values => console.log(values)}>
    <Form.Input
      required
      name='firstName'
      label='First name'
      placeholder='e.g. Bruce'
    />
    <Form.Input name='lastName' label='Last name' placeholder='e.g. Wayne' />
    <Container top='small'>
      <Button type='submit'>Submit</Button>
    </Container>
  </Form>
)

export default FieldValidationExample
