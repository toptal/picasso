import React from 'react'
import { storiesOf } from '@storybook/react'
import SearchIcon from '@material-ui/icons/Search'

import TextField from './'

storiesOf('TextField', module)
  .add('text', () => <TextField label='Search...' />)
  .add('error', () => <TextField error label='Search...' />)
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
        <option value='y'>Yes</option>
        <option value='n'>No</option>
      </TextField>
    </div>
  ))
  .add('textarea', () => (
    <TextField label='Description...' multiline rows={4} />
  ))
  .add('all', () => (
    <div style={{ width: '300px' }}>
      <TextField Icon={<SearchIcon />} fullWidth label='Search...' />
      <div style={{ marginBottom: '1em' }} />
      <TextField
        SelectProps={{
          native: true
        }}
        fullWidth
        label='Gender'
        select
      >
        <option value='' />
        <option value='y'>Yes</option>
        <option value='n'>No</option>
      </TextField>
      <div style={{ marginBottom: '1em' }} />
      <TextField fullWidth label='Description...' multiline rows={4} />
    </div>
  ))
