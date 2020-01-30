import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const minMaxValidator = (value: string | number) => {
  const number = Number(value)

  if (number < 0) {
    return "Age can't be negative"
  }

  if (number > 120) {
    return "Age can't have value more than 120 years"
  }

  return undefined
}

const CustomValidatorExample = () => (
  <Form onSubmit={values => console.log(values)}>
    <Form.Input
      required
      name='userName'
      label='First name'
      placeholder='e.g. Bruce'
    />
    <Form.NumberInput
      required
      validate={minMaxValidator}
      name='userAge'
      label="What's your age?"
      placeholder='e.g. 25'
    />

    <Container top='small'>
      <Button type='submit'>Submit</Button>
    </Container>
  </Form>
)

export default CustomValidatorExample
