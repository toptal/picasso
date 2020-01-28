import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const DefaultExample = () => (
  <Container>
    <Form onSubmit={values => console.log(values)}>
      <Form.Input
        required
        name='firstName'
        label='First name'
        placeholder='e.g. Bruce'
        autoFocus
      />
      <Form.Checkbox
        required
        name='legal'
        label='I confirm that I have legal permission from the client to feature this project.'
      />

      <Container top='small'>
        <Button type='submit'>Submit</Button>
      </Container>
    </Form>
  </Container>
)

export default DefaultExample
