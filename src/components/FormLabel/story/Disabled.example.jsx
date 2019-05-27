import React from 'react'
import { Form, Grid, TextField } from '@toptal/picasso'

const DefaultExample = () => (
  <Grid>
    <Grid.Item>
      <Form>
        <Form.Field>
          <Form.Label htmlFor='fullName-2' disabled>
            Disabled label:
          </Form.Label>
          <TextField id='fullName-2' fullWidth disabled />
        </Form.Field>
      </Form>
    </Grid.Item>

    <Grid.Item>
      <Form>
        <Form.Field>
          <Form.Label htmlFor='fullName-2' disabled required>
            Disabled required label:
          </Form.Label>
          <TextField id='fullName-2' fullWidth disabled />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default DefaultExample
