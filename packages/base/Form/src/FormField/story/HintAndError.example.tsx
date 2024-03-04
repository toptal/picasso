import React from 'react'
import { Form, Input, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item sm={5}>
      <Form>
        <Form.Field
          error='This field is required'
          hint='Choose the place where you would like to live'
        >
          <Form.Label htmlFor='district'>District</Form.Label>
          <Input
            status='error'
            id='district'
            width='full'
            placeholder='e.g., Sant Marti'
          />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default Example
