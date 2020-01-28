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
        autoFocus
      />
      <Form.Select
        required
        name='kids'
        label='How many kids do you have?'
        width='auto'
        options={[
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3+' }
        ]}
      />

      <Container top='small'>
        <Button type='submit'>Submit</Button>
      </Container>
    </Form>
  </Container>
)

export default DefaultExample
