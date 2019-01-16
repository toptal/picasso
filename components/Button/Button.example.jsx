import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, select } from '@storybook/addon-knobs'
import IconSend from '@material-ui/icons/Send'

import StoryTeller from '../../.storybook/StoryTeller'
import Button from './'

const VARIANTS = {
  contained: 'contained',
  outlined: 'outlined',
  flat: 'flat'
}

const COLORS = {
  primary: 'primary',
  secondary: 'secondary',
  default: null
}

const stories = storiesOf('Button', module)

const teller = new StoryTeller('Button', 'A Button')
const chapter = teller.addChapter()

chapter
  .addSection('Contained', 'Contained buttons', () => (
    <div>
      <Button variant='contained'>Default</Button>
      <Button color='primary' variant='contained'>
        Primary
      </Button>
      <Button color='secondary' variant='contained'>
        Secondary
      </Button>
    </div>
  ))
  .addSection('Outlined', 'Outlined buttons', () => (
    <div>
      <Button variant='outlined'>Default</Button>
      <Button color='primary' variant='outlined'>
        Primary
      </Button>
      <Button color='secondary' variant='outlined'>
        Secondary
      </Button>
    </div>
  ))
  .addSection('Flat', 'Flat buttons', () => (
    <div>
      <Button>Default</Button>
      <Button color='primary'>Primary</Button>
      <Button color='secondary'>Secondary</Button>
    </div>
  ))
  .addSection(
    'Icon Button',
    "Buttons with icons (not supported yet as we don't have icon set",
    () => (
      <div>
        <Button icon={<IconSend />} variant='outlined'>
          Default
        </Button>
        <Button color='primary' icon={<IconSend />} variant='contained'>
          Primary
        </Button>
        <Button color='secondary' icon={<IconSend />}>
          Secondary
        </Button>
      </div>
    )
  )

stories.addWithChapters('Button', teller.toStory())

stories.add('variants', () => (
  <div className='section-component-container'>
    <Button
      color='primary'
      variant={select('variant', VARIANTS, VARIANTS.contained, 'MUI Props')}
    >
      {text('text', 'A Button')}
    </Button>
    <Button
      color='secondary'
      variant={select('variant', VARIANTS, VARIANTS.contained, 'MUI Props')}
    >
      {text('text', 'A Button')}
    </Button>
    <Button
      variant={select('variant', VARIANTS, VARIANTS.contained, 'MUI Props')}
    >
      {text('text', 'A Button')}
    </Button>
  </div>
))

stories.add('colors', () => (
  <div className='section-component-container'>
    <Button
      color={select('color', COLORS, COLORS.primary, 'MUI Props')}
      variant='outlined'
    >
      {text('text', 'A Button')}
    </Button>
    <Button
      color={select('color', COLORS, COLORS.primary, 'MUI Props')}
      variant='contained'
    >
      {text('text', 'A Button')}
    </Button>
    <Button color={select('color', COLORS, COLORS.primary, 'MUI Props')}>
      {text('text', 'A Button')}
    </Button>
  </div>
))
