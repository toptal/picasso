import React from 'react'
import { Grid, Form, Input } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid justifyContent='center' alignItems='center'>
      <Grid.Item small={12} medium={8} large={6}>
        <Form>
          <Form.Field>
            <Input width='full' placeholder='Job title' />
          </Form.Field>
        </Form>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
