import React from 'react'
import { Form, Grid, TextField } from '@toptal/picasso'

const DefaultExample = () => (
  <Grid>
    <Grid.Item>
      <Form>
        <Form.Field>
          <Form.Label htmlFor='fullName-1'>
            This is a label for my awesome field
          </Form.Label>
          <TextField id='fullName-1' fullWidth />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default DefaultExample
