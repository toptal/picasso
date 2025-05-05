import React from 'react'
import {
  Button,
  Container,
  Form,
  FormLevelWarning,
  Input,
  Grid,
} from '@toptal/picasso'

const Example = () => {
  return (
    <Grid>
      <Grid.Item sm={5}>
        <Form>
          <Form.Field>
            <Form.Label>Username</Form.Label>
            <Input
              value='johndoe'
              placeholder='Enter your username'
              width='full'
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>Email</Form.Label>
            <Input
              value='johndoe@example.com'
              placeholder='Enter your email'
              type='email'
              width='full'
            />
          </Form.Field>

          <FormLevelWarning>
            Please review the information before submitting
          </FormLevelWarning>

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
