import React from 'react'
import { Form, Grid, TextField } from '@toptal/picasso'

const FormHintExample = () => (
  <Grid>
    <Grid.Item small={5}>
      <Form>
        <Form.Field>
          <TextField fullWidth placeholder='Full Name' />
          <Form.Hint>
            Your full name as you would like it to appear to clients on your
            profile
          </Form.Hint>
        </Form.Field>

        <Form.Field>
          <TextField fullWidth placeholder='About me' multiline rows={4} />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default FormHintExample
