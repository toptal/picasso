import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const minMaxValidator = (value: string) => {
  const number = Number(value)

  if (number < 0) {
    return "Age can't be negative"
  }

  if (number > 120) {
    return "Age can't have value more than 120 years"
  }

  return undefined
}

const DefaultExample = () => (
  <Container>
    <Form onSubmit={values => console.log(values)}>
      <Form.Input
        required
        name='firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />
      <Form.NumberInput
        required
        validate={minMaxValidator}
        name='age'
        label="What's your age?"
        placeholder='e.g. 25'
      />

      <Container top='small'>
        <Button type='submit'>Submit</Button>
      </Container>
    </Form>
  </Container>
)

export default DefaultExample
