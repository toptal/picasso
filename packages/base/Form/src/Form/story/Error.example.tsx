import React from 'react'
import {
  Button,
  Container,
  Form,
  Input,
  FormLevelError,
  Grid,
} from '@toptal/picasso'

const Example = () => {
  return (
    <Grid>
      <Grid.Item sm={5}>
        <Form>
          <FormLevelError>Please correct the errors in the form</FormLevelError>

          <Form.Field>
            <Form.Label>Username</Form.Label>
            <Input
              required
              value=''
              placeholder='Enter your username'
              width='full'
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>Email</Form.Label>
            <Input
              required
              value=''
              placeholder='Enter your email'
              type='email'
              width='full'
            />
          </Form.Field>

          <Container flex justifyContent='flex-end' className='mt-4'>
            <Button type='submit' variant='primary'>
              Submit
            </Button>
          </Container>
        </Form>
      </Grid.Item>
    </Grid>
  )
}

export default Example
