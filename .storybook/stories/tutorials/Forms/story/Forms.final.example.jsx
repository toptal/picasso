import React from 'react'
import styled from 'styled-components'
import {
  Container,
  Typography,
  Grid,
  Checkbox,
  Select,
  TextField,
  Radio,
  Form
} from '@toptal/picasso'

const FormsExample = () => (
  <div>
    <Grid justify='center' alignItems='center'>
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
            <TextField id='job-title-final' width='full' />
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
                  <TextField id='city-final' width='full' />
                </Form.Field>
              </Grid.Item>
            </Grid>
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor='description-final'>
              Full description
            </Form.Label>
            <TextField id='description-final' width='full' />
          </Form.Field>

          <Form.Field>
            <Form.Label>Desired Commitment</Form.Label>
            <Select options={OPTIONS} />
          </Form.Field>

          <Form.Field>
            <Form.Label>Estimated length:</Form.Label>
            <HorizontalRadioGroup name='variableName' value='radio1'>
              <Radio label='1-2 months' value='radio1' />
              <Radio label='2-4 months' value='radio2' />
              <Radio label='4-12 months' value='radio3' />
            </HorizontalRadioGroup>
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

const HorizontalRadioGroup = styled(Radio.Group)`
  flex-direction: row;
`

export default FormsExample
