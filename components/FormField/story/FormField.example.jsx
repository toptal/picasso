import React from 'react'
import { Form, Grid, Select, TextField, Checkbox } from '@toptal/picasso'

const FormFieldExample = () => (
  <Grid>
    <Grid.Item small={5}>
      <Form>
        <Form.Field>
          <Select label='Current Country' options={OPTIONS} />
        </Form.Field>

        <Form.Field>
          <TextField fullWidth label='City of Residence' />
        </Form.Field>

        <Form.Field>
          <Select label='Timezone' options={OPTIONS} />
        </Form.Field>

        <Form.Field>
          <Checkbox label='I confirm that I have legal permission from the client to feature this project.' />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

export default FormFieldExample
