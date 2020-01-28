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
      <Form.NumberInput
        required
        name='age'
        label='Age'
        placeholder='e.g. 25'
        step='1'
        max='100'
        min='0'
      />

      <Container top='small'>
        <Button type='submit'>Submit</Button>
      </Container>
    </Form>
  </Container>
)

export default DefaultExample
