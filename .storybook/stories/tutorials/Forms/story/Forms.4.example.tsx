import React from 'react'
import { Grid, Checkbox, Select, Input, Form } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid justifyContent='center' alignItems='center'>
      <Grid.Item small={12} medium={8} large={6}>
        <Form>
          <Form.Field>
            <Form.Label>Select talent</Form.Label>
            <Select options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Form.Label required htmlFor='job-title-4'>
              Job title
            </Form.Label>
            <Input id='job-title-4' width='full' />
          </Form.Field>

          <Form.Field>
            <Grid direction='row'>
              <Grid.Item small={6}>
                <Form.Field>
                  <Form.Label>Current country</Form.Label>
                  <Select options={OPTIONS} />
                </Form.Field>
              </Grid.Item>
              <Grid.Item small={6}>
                <Form.Field>
                  <Form.Label htmlFor='city-4'>City of residence</Form.Label>
                  <Input id='city-4' width='full' />
                </Form.Field>
              </Grid.Item>
            </Grid>
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor='description'>Full description</Form.Label>
            <Input id='description' width='full' />
          </Form.Field>

          <Form.Field>
            <Form.Label>Desired Commitment</Form.Label>
            <Select options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Checkbox label='We match you to talent' />
            <Form.Hint>
              A Toptal Director of Engineering ewill work with you to understand
              you needs and fins you the right talent for you project.
            </Form.Hint>
          </Form.Field>
        </Form>
      </Grid.Item>
    </Grid>
  </div>
)

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

export default Example
