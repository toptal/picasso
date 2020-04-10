import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const DefaultExample = () => (
  <Form onSubmit={values => console.log(values)}>
    <Form.Input
      enableReset
      onResetClick={(set: (value: string) => void) => {
        set('')
      }}
      required
      name='firstName'
      label='First name'
      placeholder='e.g. Bruce'
    />
    <Form.Input
      required
      name='lastName'
      label='Last name'
      placeholder='e.g. Wayne'
    />
    <Form.NumberInput
      enableReset
      required
      name='age'
      label="What's your age?"
      placeholder='e.g. 25'
    />
    <Form.RadioGroup name='gender' label='Gender'>
      <Form.Radio label='Male' value='male' />
      <Form.Radio label='Female' value='female' />
    </Form.RadioGroup>
    <Form.Select
      enableReset
      required
      name='businessType'
      label='Business type'
      width='auto'
      options={[
        { value: 0, text: 'Company' },
        { value: 1, text: 'Individual' }
      ]}
    />
    <Form.FileInput
      required
      name='avatar'
      label='Avatar'
      status='No file selected.'
    />
    <Form.Checkbox
      required
      name='legal'
      label='I confirm that I have legal permission from the client to feature this project.'
    />

    <Container top='small'>
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Container>
  </Form>
)

export default DefaultExample
