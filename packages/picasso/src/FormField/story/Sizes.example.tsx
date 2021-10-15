import React from 'react'
import { Form, Input, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item small={5}>
      <Form>
        <Form.Field>
          <Form.Label htmlFor='medium'>Medium (default)</Form.Label>
          <Input id='medium' width='full' placeholder='Medium' />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor='large' size='large'>
            Large
          </Form.Label>
          <Input id='large' width='full' placeholder='Large' size='large' />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default Example
