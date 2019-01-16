import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from '../Button'

storiesOf('ButtonGroup', module).add('default', () => (
  <Button.Group>
    <Button key='first'>First</Button>
    <Button key='prev'>&lt;</Button>
    <Button key='1'>1</Button>
    <Button key='2'>2</Button>
    <Button key='3'>3</Button>
    <Button key='next'>&gt;</Button>
    <Button key='last'>Last</Button>
  </Button.Group>
))
