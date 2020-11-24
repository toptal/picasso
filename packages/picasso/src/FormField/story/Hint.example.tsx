import React from 'react'
import { Form, Input, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item small={5}>
      <Form>
        <Form.Field hint='Choose the place where you would like to live'>
          <Form.Label htmlFor='district'>District</Form.Label>
          <Input id='district' width='full' placeholder='e.g., Sant Marti' />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default Example
