import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const minMaxValidator = (value?: string | number) => {
  if (value === undefined) {
    return undefined
  }

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
  <Form onSubmit={values => window.alert(values)}>
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
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Container>
  </Form>
)

export default CustomValidatorExample
