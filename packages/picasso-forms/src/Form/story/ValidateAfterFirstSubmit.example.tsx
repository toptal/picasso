import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const ValidateAfterFirstSubmitExample = () => {
  return (
    <Form.ConfigProvider value={{ validateAfterFirstSubmit: true }}>
      <Form onSubmit={values => console.log(values)}>
        <Form.Input
          enableReset
          required
          name='middleName'
          label='Your middle name'
          placeholder='e.g. Bruce'
        />
        <Form.Checkbox
          required
          name='consent'
          label='I confirm that I have legal permission from the client to feature this project.'
        />

        <Container top='small'>
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </Container>
      </Form>
    </Form.ConfigProvider>
  )
}

export default ValidateAfterFirstSubmitExample
