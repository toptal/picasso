import React from 'react'
import { Form, Grid, Select, Input } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item small={5}>
      <Form>
        <Form.Field>
          <Form.Label>Country</Form.Label>
          <Select placeholder='e.g., Spain' options={OPTIONS} />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor='city'>City</Form.Label>
          <Input id='city' width='full' placeholder='e.g., Barcelona' />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

const OPTIONS = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

export default Example
