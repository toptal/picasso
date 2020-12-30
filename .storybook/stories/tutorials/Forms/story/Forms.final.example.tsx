import React from 'react'
import { Grid, Checkbox, Select, Input, Radio, Form } from '@toptal/picasso'

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
            <Form.Label required htmlFor='job-title-final'>
              Job title
            </Form.Label>
            <Input id='job-title-final' width='full' />
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
                  <Form.Label htmlFor='city-final'>
                    City of residence
                  </Form.Label>
                  <Input id='city-final' width='full' />
                </Form.Field>
              </Grid.Item>
            </Grid>
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor='description-final'>
              Full description
            </Form.Label>
            <Input id='description-final' width='full' />
          </Form.Field>

          <Form.Field>
            <Form.Label>Desired Commitment</Form.Label>
            <Select options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Form.Label>Estimated length:</Form.Label>
            <Radio.Group horizontal name='variableName' value='radio1'>
              <Radio label='1-2 months' value='radio1' />
              <Radio label='2-4 months' value='radio2' />
              <Radio label='4-12 months' value='radio3' />
            </Radio.Group>
          </Form.Field>

          <Form.Field hint='A Toptal Director of Engineering ewill work with you to understand you needs and fins you the right talent for you project.'>
            <Checkbox label='We match you to talent' />
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
