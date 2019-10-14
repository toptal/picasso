import React from 'react'
import { Autocomplete } from '@toptal/picasso/lab'
import { Item } from '@toptal/picasso/lab/Autocomplete'
import { Typography, Container } from '@toptal/picasso'

interface Country extends Item {
  text: string
  value: string
  capital: string
}

const options: Country[] = [
  { text: 'Belarus', value: 'BY', capital: 'Minsk' },
  { text: 'Croatia', value: 'HR', capital: 'Zagreb' },
  { text: 'Lithuania', value: 'LU', capital: 'Vilnius' },
  { text: 'Slovakia', value: 'SK', capital: 'Bratislava' },
  { text: 'Ukraine', value: 'UA', capital: 'Kyiv' }
]

const CustomOptionRenderer = () => (
  <div>
    <Autocomplete
      value=''
      placeholder='Start typing country...'
      options={options}
      onSelect={(item: Item) => {
        window.console.log('onSelect', item)
      }}
      renderOption={(option: Partial<Country>, index) => (
        <Container>
          <Typography size='medium' weight='semibold'>
            {option.text}
          </Typography>
          <Typography size='inherit' style={{ fontSize: '12px' }}>
            {option.capital} ({index})
          </Typography>
        </Container>
      )}
    />
  </div>
)

export default CustomOptionRenderer
