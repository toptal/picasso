import React, { useState } from 'react'
import { Button, Container, Grid, Autocomplete } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Spain', value: 'SP' },
  { text: 'Ukraine', value: 'UA' }
]

const Example = () => {
  const [value, setValue] = useState(options[0].text)

  return (
    <div>
      <Autocomplete
        placeholder='Start typing country...'
        options={options}
        value={value}
        onSelect={item => {
          console.log('onSelect returns item object:', item)
          setValue(item.text)
        }}
        onChange={newValue => {
          console.log('onChange returns just item value:', newValue)
          setValue(newValue)
        }}
      />
      <Container top={2}>
        <Grid>
          <Grid.Item>
            <Button
              onClick={() => {
                setValue(options[3].text)
              }}
            >
              Set to country in your profile: Slovakia
            </Button>
            <Button
              onClick={() => {
                setValue('')
              }}
              variant='secondary'
            >
              Reset
            </Button>
          </Grid.Item>
        </Grid>
      </Container>
    </div>
  )
}

export default Example
