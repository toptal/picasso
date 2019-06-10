import React from 'react'
import { Form, Grid, Select, TextField, Checkbox, Radio } from '@toptal/picasso'

const FormFieldExample = () => (
  <Grid>
    <Grid.Item small={5}>
      <Form>
        <Form.Field>
          <Form.Label>Country</Form.Label>
          <Select placeholder='e.g., Spain' options={OPTIONS} />
        </Form.Field>

        <Form.Field>
          <Form.Label required htmlFor='city'>
            City
          </Form.Label>
          <TextField id='city' fullWidth placeholder='e.g., Barcelona' />
          <Form.Hint>Choose city where you would like to live</Form.Hint>
        </Form.Field>

        <Form.Field
          error='This field is required'
          hint='Choose the place where you would like to live'
        >
          <Form.Label htmlFor='district' required>
            District
          </Form.Label>
          <TextField
            id='district'
            fullWidth
            placeholder='e.g., Sant Marti'
            error
          />
        </Form.Field>

        <Form.Field>
          <Form.Label required>Choose one of the following skills</Form.Label>
          <Radio.Group name='skills'>
            <Radio label='Front-End' value='front-end' />
            <Radio label='Back-End' value='back-end' />
            <Radio label='Dev Ops' value='dev-ops' />
          </Radio.Group>
        </Form.Field>

        <Form.Field>
          <Form.Label required>Timezone</Form.Label>
          <Select placeholder='e.g., UTC+01:00' options={OPTIONS} />
        </Form.Field>

        <Form.Field>
          <Checkbox
            label='I confirm that I have legal permission from the client to feature this project.'
            required
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            label='I confirm that I have legal permission from the client to feature this project.'
            required
            error
          />
          <Form.Error>This is required</Form.Error>
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
