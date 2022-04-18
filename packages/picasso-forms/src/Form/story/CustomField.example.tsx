import React from 'react'
import { Container, Autocomplete, AutocompleteProps } from '@toptal/picasso'
import { Form, FieldWrapper } from '@toptal/picasso-forms'

const FieldWrapperExample = () => (
  <Form onSubmit={values => window.alert(values)}>
    <FieldWrapper name='city' required>
      {(inputProps: AutocompleteProps) => <Autocomplete {...inputProps} />}
    </FieldWrapper>

    <Container top='small'>
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Container>
  </Form>
)

export default FieldWrapperExample
