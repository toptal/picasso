import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const deserializeValue = (value: unknown) => {
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }

  return value
}

const Example = () => (
  <Form
    onSubmit={values => {
      console.log('Raw: ', { foo: values.foo })
      console.log('Deserialized: ', { foo: deserializeValue(values.foo) })
    }}
    initialValues={{ foo: 'true' }}
  >
    <Form.RadioGroup name='foo' label='Foo'>
      <Form.Radio label='yes' value='true' />
      <Form.Radio label='no' value='false' />
    </Form.RadioGroup>
    <Container top='small'>
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Container>
  </Form>
)

export default Example
