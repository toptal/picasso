import React, { useState } from 'react'
import { Autocomplete, Button, Container, Grid } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Spain', value: 'SP' },
  { text: 'Ukraine', value: 'UA' }
]

const AutocompleteControlledItemExample = () => {
  const [value, setValue] = useState(options[0].value)
  const [inputValue, setInputValue] = useState(options[0].text)

  return (
    <div>
      <Autocomplete
        placeholder='Start typing country...'
        options={options}
        value={value}
        onSelect={newValue => {
          console.log('onSelect value:', newValue)
          setValue(newValue)
        }}
        inputValue={inputValue}
        onChange={e => {
          const newInputValue = e.target.value

          console.log('onChange value:', newInputValue)
          setInputValue(newInputValue)
        }}
      />
      <Container top={2}>
        <Grid>
          <Grid.Item>
            <Button
              onClick={() => {
                setValue(options[3].value)
                setInputValue(options[3].text)
              }}
            >
              Set to country in your profile: Slovakia
            </Button>
            <Button
              onClick={() => {
                setValue(null)
                setInputValue('')
              }}
              variant='secondary-blue'
            >
              Reset
            </Button>
          </Grid.Item>
        </Grid>
      </Container>
    </div>
  )
}

export default AutocompleteControlledItemExample
