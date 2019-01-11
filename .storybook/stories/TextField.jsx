import React from 'react'
import { storiesOf } from '@storybook/react'
import TextField from '../../components/TextField'
import SearchIcon from '@material-ui/icons/Search'

storiesOf('TextField', module)
  .add('text', () => <TextField label="Search..." />)
  .add('text with Icon', () => (
    <TextField label="Search..." Icon={<SearchIcon />} />
  ))
  .add('select', () => (
    <div style={{ width: '300px' }}>
      <TextField
        label="Gender"
        select
        fullWidth
        SelectProps={{
          native: true
        }}>
        <option value="" />
        <option value="male">Male</option>
        <option value="female">Female</option>
      </TextField>
    </div>
  ))
  .add('textarea', () => (
    <TextField label="Description..." rows={4} multiline />
  ))
