import React from 'react'
import { storiesOf } from '@storybook/react'

import Select from './'

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
  .add('default', () => <Select label='Select' options={OPTIONS} value={3} />)
  .add('outlined', () => (
    <Select label='Select' options={OPTIONS} value={3} variant='outlined' />
  ))
  .add('outlined open', () => (
    <Select
      label='Select'
      onClose={() => {}}
      open
      options={OPTIONS}
      value={3}
      variant='outlined'
    />
  ))
