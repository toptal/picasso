import React, { useState } from 'react'
import { Button, Container, Grid } from '@toptal/picasso'
import { Autocomplete } from '@toptal/picasso/lab'

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
        onChange={newInputValue => {
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
              }}
            >
              Set to country in your profile: Slovakia
            </Button>
            <Button
              onClick={() => {
                setValue(null)
                // We need this to clear input too for the time being. WIP.
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
