import React from 'react'
import { Form, Grid, Select, Input } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item sm={5}>
      <Form>
        <Form.Field>
          <Form.Label htmlFor='city'>Field label</Form.Label>
          <Input id='city' width='full' />
        </Form.Field>

        <Form.Field>
          <Form.Label requiredDecoration='optional' htmlFor='country'>
            Optional label
          </Form.Label>
          <Input id='country' width='full' />
        </Form.Field>

        <Form.Field error='Error: HTTP 418'>
          <Form.Label htmlFor='district'>Field with error</Form.Label>
          <Input status='error' id='district' width='full' />
        </Form.Field>

        <Form.Field hint='Tip: do not eat the yellow snow'>
          <Form.Label htmlFor='hinted'>Field with a hint</Form.Label>
          <Input id='hinted' width='full' />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default Example
