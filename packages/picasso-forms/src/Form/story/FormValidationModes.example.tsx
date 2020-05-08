import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const Example = () => (
  <Container flex>
    <Container padded='small'>
      <Typography variant='heading' size='medium'>
        On Submit form validation:
      </Typography>
      <Container top='small'>
        <FormWithOnSubmitValidation />
      </Container>
    </Container>
    <Container padded='small'>
      <Typography variant='heading' size='medium'>
        On Change form validation:
      </Typography>
      <Container top='small'>
        <FormWithOnChangeValidation />
      </Container>
    </Container>
  </Container>
)

const FormWithOnSubmitValidation = () => (
  <Form onSubmit={values => console.log(values)}>
    <Form.Input
      required
      name='onsubmit-userName'
      label='First name'
      placeholder='e.g. Bruce'
    />
    <Form.NumberInput
      required
      validate={minMaxValidator}
      name='onsubmit-userAge'
      label="What's your age?"
      placeholder='e.g. 25'
    />

    <Container top='small'>
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Container>
  </Form>
)

const FormWithOnChangeValidation = () => (
  <Form onSubmit={values => console.log(values)} validationMode='onChange'>
    <Form.Input
      required
      name='onchange-userName'
      label='First name'
      placeholder='e.g. Bruce'
    />
    <Form.NumberInput
      required
      validate={minMaxValidator}
      name='onchange-userAge'
      label="What's your age?"
      placeholder='e.g. 25'
    />

    <Container top='small'>
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Container>
  </Form>
)

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

export default Example
