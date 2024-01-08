import React from 'react'
import { Form, Grid, Input, Typography, Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' },
]

const AutofillExample = () => (
  <Grid>
    <Grid.Item sm={5}>
      <Typography variant='heading'>Autofill enabled for country</Typography>
      <Form>
        <Form.Field>
          <Form.Label>Address</Form.Label>
          <Input
            name='ship-address'
            width='full'
            autoComplete='shipping street-address'
            placeholder='123 Any Street'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>City</Form.Label>
          <Input
            placeholder='New York'
            name='ship-city'
            autoComplete='shipping locality'
            width='full'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Zip</Form.Label>
          <Input
            name='ship-zip'
            autoComplete='shipping postal-code'
            width='full'
            placeholder='10011'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Country</Form.Label>
          <Autocomplete
            value=''
            options={options}
            width='full'
            name='country'
            autoComplete='shipping country-name'
            placeholder='USA'
            enableAutofill
          />
        </Form.Field>
      </Form>
    </Grid.Item>

    <Grid.Item sm={5}>
      <Typography variant='heading'>Autofill disabled for country</Typography>
      <Form>
        <Form.Field>
          <Form.Label>Address</Form.Label>
          <Input
            name='ship-address'
            width='full'
            autoComplete='shipping street-address'
            placeholder='123 Any Street'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>City</Form.Label>
          <Input
            placeholder='New York'
            name='ship-city'
            autoComplete='shipping locality'
            width='full'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Zip</Form.Label>
          <Input
            name='ship-zip'
            autoComplete='shipping postal-code'
            width='full'
            placeholder='10011'
          />
        </Form.Field>

        <Form.Field>
          <Form.Label>Country</Form.Label>
          <Autocomplete
            value=''
            options={options}
            width='full'
            name='country'
            autoComplete='shipping country-name'
            placeholder='USA'
          />
        </Form.Field>
      </Form>
    </Grid.Item>
  </Grid>
)

export default AutofillExample
