import React from 'react'
import { Form, Grid, TextField } from '@toptal/picasso'

const DefaultExample = () => (
  <Grid>
    <Grid.Item>
      <Form>
        <Form.Field>
          <Form.Label htmlFor='fullName-1'>Label:</Form.Label>
          <TextField htmlId='fullName-1' />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default DefaultExample
