import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const failWithAnError = () => ({
  fieldName: 'This form will always blame on a wrong user name'
})

const NoScrollingExample = () => (
  <Container>
    <Container top='small'>
      <Form onSubmit={failWithAnError}>
        <Form.Input
          required
          name='fieldName'
          label='With scrolling'
          placeholder='Some field'
        />
        <Container top='small'>
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </Container>
      </Form>
    </Container>

    <Container top='small'>
      <Form disableScrollOnError onSubmit={failWithAnError}>
        <Form.Input
          required
          name='fieldName'
          label='No scrolling'
          placeholder='Some field'
        />
        <Container top='small'>
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </Container>
      </Form>
    </Container>
  </Container>
)

export default NoScrollingExample
