import React, { useState } from 'react'
import { Autocomplete, Button, Container, Grid } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const AutocompleteControlledItemExample = () => {
  const [value, setValue] = useState('BY')

  return (
    <div>
      <Autocomplete
        placeholder='Start typing country...'
        options={options}
        onSelect={item => setValue(item && item.value)}
        value={value}
      />

      <Container top={2}>
        <Grid>
          <Grid.Item>
            <Button onClick={() => setValue('SK')}>
              Set to country in your profile: Slovakia
            </Button>
            <Button onClick={() => setValue(null)} variant='secondary-blue'>
              Reset
            </Button>
          </Grid.Item>
        </Grid>
      </Container>
    </div>
  )
}

export default AutocompleteControlledItemExample
