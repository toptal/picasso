import React from 'react'
import { Form, Input, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item small={5}>
      <Form>
        <Form.Field error='This field is required'>
          <Form.Label htmlFor='district'>District</Form.Label>
          <Input
            error
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
