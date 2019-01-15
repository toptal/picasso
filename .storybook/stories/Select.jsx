import React from 'react'
import { storiesOf } from '@storybook/react'
import { Select } from '../../components'

const OPTIONS = [
  { value: 1, text: 'Item 1' },
  { value: 2, text: 'Item 2' },
  { value: 3, text: 'Item 3' },
  { value: 4, text: 'Item 4' },
  {
    value: 5,
    text: (
      <div>
        Hello <b>world!</b>
      </div>
    )
  }
]

storiesOf('Select', module)
  .add('default', () => <Select label="Select" value={3} options={OPTIONS} />)
  .add('outlined', () => (
    <Select label="Select" value={3} variant="outlined" options={OPTIONS} />
  ))
  .add('outlined open', () => (
    <Select
      label="Select"
      value={3}
      variant="outlined"
      options={OPTIONS}
      open
      onClose={() => {}}
    />
  ))
