import React from 'react'
import { Form, Input, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item sm={5}>
      <Form>
        <Form.Field error='This field is required'>
          <Form.Label htmlFor='district'>District</Form.Label>
          <Input
            status='error'
            id='district'
            width='full'
            placeholder='e.g., Sant Marti'
          />
        </Form.Field>

        <Form.Field error={<span>This field is required</span>}>
          <Form.Label htmlFor='region'>Region</Form.Label>
          <Input
            status='error'
            id='region'
            width='full'
            placeholder='e.g., Catalonia'
          />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default Example
