import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const ParseInputExample = () => (
  <Form onSubmit={values => console.log(values)} scrollOffsetTop={100}>
    <Container bottom='small'>
      <Typography size='medium'>
        I want to trim my first name from the empty spaces:
      </Typography>
    </Container>
    <Form.Input
      name='userName'
      label='First name'
      placeholder='e.g. Bruce'
      parse={value => value.trim()}
      limit={24}
    />

    <Container top='small'>
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Container>
  </Form>
)

export default ParseInputExample
