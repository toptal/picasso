import React from 'react'
import { Item } from '@toptal/picasso/Autocomplete'
import { Typography, Container, Autocomplete } from '@toptal/picasso'

interface Country extends Item {
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
      value=''
      placeholder='Start typing country...'
      options={options}
      onSelect={(item: Item) => {
        window.console.log('onSelect returns item object:', item)
        window.console.log('selected capital:', item.capital)
      }}
      getKey={(item: Item) => (item as Country).code}
      getDisplayValue={(item: Item | null) =>
        (item && (item as Country).country) || ''
      }
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
