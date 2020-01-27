import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const DefaultExample = () => (
  <Container>
    <Form onSubmit={values => console.log(values)}>
      <Form.Input
        required
        name='firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />
      <Form.Input name='lastName' label='Last name' placeholder='e.g. Wayne' />
      <Form.NumberInput
        required
        name='age'
        label='Age'
        placeholder='e.g. 25'
        step='1'
        max='100'
        min='0'
      />
      <Form.Select
        required
        name='kids'
        label='Kids'
        width='auto'
        options={[
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3+' }
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
        <Button type='submit'>Submit</Button>
      </Container>
    </Form>
  </Container>
)

export default DefaultExample
