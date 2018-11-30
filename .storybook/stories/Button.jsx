import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../../components/Button'

storiesOf('Button', module)
  .add('primary', () => (
    <Button
      variant='contained'
      color='primary'
    >
      Primary
    </Button>
  ))
  .add('secondary', () => (
    <Button
      variant='outlined'
      color='secondary'
    >
      Secondary
    </Button>
  ))
  .add('basic', () => (
    <Button variant='outlined'>
      Basic
    </Button>
  ))
  .add('flat', () => (
    <Button variant='flat'>
      Flat
    </Button>
  ))
