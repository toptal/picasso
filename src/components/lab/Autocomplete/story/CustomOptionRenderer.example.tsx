import React from 'react'
import { Autocomplete } from '@toptal/picasso/lab'
import { Typography } from '@toptal/picasso'

const options = [
  { text: 'Belarus', value: 'BY' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Lithuania', value: 'LU' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Ukraine', value: 'UA' }
]

const CustomOptionRenderer = () => (
  <div>
    <Autocomplete
      placeholder='Start typing country...'
      options={options}
      renderOption={(option, index) => (
        <Typography size='large' color='green'>
          {option.text} ({index})
        </Typography>
      )}
    />
  </div>
)

export default CustomOptionRenderer
