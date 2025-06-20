import React from 'react'
import { Form, Input, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item sm={5}>
      <Form>
        <Form.Field warning='This field is required'>
          <Form.Label htmlFor='district'>District</Form.Label>
          <Input
            status='warning'
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
