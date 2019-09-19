import React from 'react'
import { Autocomplete } from '@toptal/picasso/lab'
import { Typography, Container } from '@toptal/picasso'
type Country = { text: string; value: string; capital: string }

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
      placeholder='Start typing country...'
      options={options}
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
