import React from 'react'
import { Container, Autocomplete } from '@toptal/picasso'
import { Form, FieldWrapper } from '@toptal/picasso-forms'

const required = (value?: any) => {
  if (!value) {
    return 'required'
  }

  return undefined
}

const FieldWrapperExample = () => (
  <Form onSubmit={values => window.alert(values)}>
    <FieldWrapper name='userAge' validate={required}>
      {(inputProps: any) => <Autocomplete {...inputProps} />}
    </FieldWrapper>

    <Container top='small'>
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Container>
  </Form>
)

export default FieldWrapperExample
