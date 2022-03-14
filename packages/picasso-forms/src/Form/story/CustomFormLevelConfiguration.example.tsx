import React from 'react'
import { Container } from '@toptal/picasso'
import { Form, FormConfigProps } from '@toptal/picasso-forms'

const formConfig: FormConfigProps = {
  requiredVariant: 'asterisk'
}

const Example = () => (
  <Form.ConfigProvider value={formConfig}>
    <Form onSubmit={() => {}}>
      <Form.Input
        required
        name='formConfig.firstName'
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
