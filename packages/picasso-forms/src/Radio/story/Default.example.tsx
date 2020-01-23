import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const DefaultExample = () => (
  <Container>
    <Form onSubmit={values => console.log(values)}>
      <Form.RadioGroup
        name='color'
        required
        label="What's your favorite color?"
      >
        <Form.Radio label='Crimson' value='#ed143d' />
        <Form.Radio label='Moccasin' value='#ffe4b5' />
        <Form.Radio label='Turquoise' value='#40e0d0' />
      </Form.RadioGroup>

      <Container top='small'>
        <Button type='submit'>Submit</Button>
      </Container>
    </Form>
  </Container>
)

export default DefaultExample
