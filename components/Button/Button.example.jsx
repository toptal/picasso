import React from 'react'
import { storiesOf } from '@storybook/react'
import IconSave from '@material-ui/icons/Save'
import IconSend from '@material-ui/icons/Send'
import IconDelete from '@material-ui/icons/Delete'
import IconLeft from '@material-ui/icons/KeyboardArrowLeft'

import StoryTeller from '../../.storybook/StoryTeller'
import Button from '../../components/Button/Button'

const stories = storiesOf('Button', module)

const teller = new StoryTeller('Button', 'A Button')
const chapter = teller.addChapter()

const generateSection = (text, Icon, color = 'primary') => (
  <div>
    <Button color={color} variant='text'>
      {text}
    </Button>
    <Button color={color} variant='outlined'>
      {text}
    </Button>
    <Button color={color} variant='contained'>
      {text}
    </Button>
    <Button color={color} icon={<Icon />} variant='contained'>
      {text}
    </Button>
    <Button color={color} icon={<Icon />} variant='text'>
      {text}
    </Button>
    <Button color={color} icon={<Icon />} variant='outlined'>
      {text}
    </Button>
    <Button color={color} icon={<Icon />} variant='contained'>
      {text}
    </Button>
    <Button color={color} compact icon={<Icon />} variant='text' />
    <Button color={color} compact icon={<Icon />} variant='outlined' />
    <Button color={color} compact icon={<Icon />} variant='contained' />
  </div>
)

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
  .addSection('Loading Button', 'Loading button indicating progress', () => (
    <div>
      <Button color='primary' loading variant='contained'>
        Default
      </Button>

      <Button color='secondary' loading variant='contained'>
        Default
      </Button>
    </div>
  ))

stories.addWithChapters('Button', teller.toStory())

chapter
  .addSection(
    'Primary',
    'Primary buttons are representing the primary CTA on page',
    () => generateSection('Send', IconSend, 'primary')
  )
  .addSection(
    'Secondary',
    'Outlined buttons are representing secondary or positive action',
    () => generateSection('Save', IconSave, 'secondary')
  )
  .addSection(
    'Negative',
    'Negative buttons are representing destroyable action on page',
    () => generateSection('Delete', IconDelete, 'negative')
  )
  .addSection(
    'Basic',
    'Primary buttons are representing not important action on page',
    () => generateSection('Back', IconLeft, 'default')
  )

  .addSection('Button Group', 'Buttons grouped to a single container', () => (
    <div>
      <Button.Group>
        <Button variant='contained'>First</Button>
        <Button compact variant='contained'>
          &lt;
        </Button>
        <Button compact variant='contained'>
          1
        </Button>
        <Button compact disabled variant='contained'>
          ..
        </Button>
        <Button compact variant='contained'>
          3
        </Button>
        <Button compact variant='contained'>
          &gt;
        </Button>
        <Button variant='contained'>Last</Button>
      </Button.Group>
      <br />
      <Button.Group>
        <Button color='default' variant='outlined'>
          First
        </Button>
        <Button color='default' compact variant='outlined'>
          &lt;
        </Button>
        <Button color='default' compact variant='outlined'>
          1
        </Button>
        <Button color='default' compact disabled variant='outlined'>
          ..
        </Button>
        <Button color='default' compact variant='outlined'>
          3
        </Button>
        <Button color='default' compact variant='outlined'>
          &gt;
        </Button>
        <Button color='default' variant='outlined'>
          Last
        </Button>
      </Button.Group>
    </div>
  ))

stories.addWithChapters('Button', teller.toStory())
