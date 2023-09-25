import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <Form onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}>
    <Form.Input
      required
      name='userName'
      label='First name'
      placeholder='e.g. Bruce'
    />
    <Form.NumberInput
      required
      name='userAge'
      label="What's your age?"
      placeholder='e.g. 25'
    />

    <Container top={SPACING_4}>
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Container>
  </Form>
)

export default Example
