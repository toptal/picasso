import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const ParseInputExample = () => (
  <Form onSubmit={values => console.log(values)}>
    <Container bottom='small'>
      <Typography size='medium'>
        I want to trim my first name from the empty spaces:
      </Typography>
    </Container>
    <Container flex alignItems='flex-end'>
      <Form.Input
        name='parseInput.firstName'
        label='First name'
        placeholder='e.g. Bruce'
        parse={value => value.trim()}
        limit={24}
      />

      <Container left='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Container>
  </Form>
)

export default ParseInputExample
