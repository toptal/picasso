import React from 'react'
import { storiesOf } from '@storybook/react'
import SearchIcon from '@material-ui/icons/Search'

import TextField from './'

storiesOf('TextField', module)
  .add('text', () => <TextField label='Search...' />)
  .add('text with Icon', () => (
    <TextField Icon={<SearchIcon />} label='Search...' />
  ))
  .add('select', () => (
    <div style={{ width: '300px' }}>
      <TextField
        fullWidth
        label='Gender'
        select
        // eslint-disable-next-line react/jsx-sort-props
        SelectProps={{
          native: true
        }}
      >
        <option value='' />
        <option value='male'>Male</option>
        <option value='female'>Female</option>
      </TextField>
    </div>
  ))
  .add('textarea', () => (
    <TextField label='Description...' multiline rows={4} />
  ))
