import React from 'react'
import { Grid, Form, TextField } from '@toptal/picasso'

const FormsExample = () => (
  <div>
    <Grid justifyContent='center' alignItems='center'>
      <Grid.Item small={12} medium={8} large={6}>
        <Form>
          <Form.Field>
            <TextField width='full' placeholder='Job title' />
          </Form.Field>
        </Form>
      </Grid.Item>
    </Grid>
  </div>
)

export default FormsExample
