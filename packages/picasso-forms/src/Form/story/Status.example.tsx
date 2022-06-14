import React from 'react'
import { Container } from '@toptal/picasso'
import { Form, FormConfigProps } from '@toptal/picasso-forms'

const formConfig: FormConfigProps = {
  showValidState: true,
}

const Example = () => (
  <Form.ConfigProvider value={formConfig}>
    <Form
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
    >
      <Form.Input
        required
        name='status-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />

      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  </Form.ConfigProvider>
)

export default Example
