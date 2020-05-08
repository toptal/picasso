import React from 'react'
import { Typography, Container, Autocomplete } from '@toptal/picasso'

interface Country {
  country: string
  capital: string
  code: string
}

const options: Country[] = [
  { country: 'Belarus', capital: 'Minsk', code: 'BE' },
  { country: 'Croatia', capital: 'Zagreb', code: 'HR' },
  { country: 'Lithuania', capital: 'Vilnius', code: 'LU' },
  { country: 'Slovakia', capital: 'Bratislava', code: 'SK' },
  { country: 'Ukraine', capital: 'Kyiv', code: 'UA' }
]

const CustomOptionRenderer = () => (
  <div>
    <Autocomplete
      value={options[0]}
      placeholder='Start typing country...'
      options={options}
      onSelect={item => {
        window.console.log('onSelect returns item object:', item)
        window.console.log('selected capital:', item.capital)
      }}
      getKey={({ code }) => code}
      getDisplayValue={item => (item ? item.country : '')}
      renderOption={(option: Partial<Country>, index) => (
        <Container>
          <Typography size='medium' weight='semibold'>
            {option.country}
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
