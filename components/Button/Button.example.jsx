import React from 'react'
import { storiesOf } from '@storybook/react'
import IconSave from '@material-ui/icons/Save'
import IconSend from '@material-ui/icons/Send'
import IconDelete from '@material-ui/icons/Delete'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import StoryTeller from '../../.storybook/StoryTeller'
import Button from './Button'
import Spacer from '../Spacer'

const stories = storiesOf('Button', module)

const teller = new StoryTeller('Button', 'A Button')
const chapter = teller.addChapter()

const renderStates = variant => {
  return (
    <TableRow style={{ marginBottom: '1em' }}>
      <TableCell>
        <Button variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      </TableCell>
      <TableCell>
        <Button hovered variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      </TableCell>
      <TableCell>
        <Button disabled variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      </TableCell>
      <TableCell>
        <Button focused variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      </TableCell>
      <TableCell>
        <Button active variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      </TableCell>
    </TableRow>
  )
}

chapter
  .addSection('Kinds', 'Different kind of button', () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>None</TableCell>
          <TableCell>Hovered</TableCell>
          <TableCell>Disabled</TableCell>
          <TableCell>Focused</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {renderStates('default')}
        {renderStates('primary')}
        {renderStates('secondary')}
        {renderStates('flat')}
        {renderStates('basic')}
        {renderStates('positive')}
        {renderStates('negative')}
      </TableBody>
    </Table>
  ))
  .addSection('Sizes', 'Different sizes of button', () => (
    <div>
      <Button size='small'>Small</Button>
      <Button size='medium'>Medium (default)</Button>
      <Button size='large'>Large</Button>
    </div>
  ))
  .addSection('Full width', 'Full width button', () => (
    <Button fullWidth>Full width</Button>
  ))
  .addSection(
    'Icon Button',
    "Buttons with icons (not supported yet as we don't have icon set",
    () => (
      <div>
        <Button icon={<IconSend />} size='small' />
        <Button icon={<IconSave />} />
        <Button icon={<IconDelete />} size='large' />
      </div>
    )
  )
  .addSection(
    'Button with text and Icon',
    "Buttons with icons (not supported yet as we don't have icon set",
    () => (
      <div>
        <div>
          <Button icon={<IconSend />} size='small'>
            Send
          </Button>
          <Button icon={<IconSave />} size='small'>
            Save
          </Button>
          <Button icon={<IconDelete />} size='small'>
            Delete
          </Button>
        </div>
        <Spacer bottom={1} />
        <div>
          <Button icon={<IconSend />}>Send</Button>
          <Button icon={<IconSave />}>Save</Button>
          <Button icon={<IconDelete />}>Delete</Button>
        </div>
        <Spacer bottom={1} />
        <div>
          <Button icon={<IconSend />} iconPosition='right'>
            Send
          </Button>
          <Button icon={<IconSave />} iconPosition='right'>
            Save
          </Button>
          <Button icon={<IconDelete />} iconPosition='right'>
            Delete
          </Button>
        </div>
        <Spacer bottom={1} />
        <div>
          <Button icon={<IconSend />} size='large'>
            Send
          </Button>
          <Button icon={<IconSave />} size='large'>
            Save
          </Button>
          <Button icon={<IconDelete />} size='large'>
            Delete
          </Button>
        </div>
      </div>
    )
  )
  .addSection('Loading Button', 'Loading button indicating progress', () => (
    <div>
      <Button loading>Default</Button>

      <Button loading variant='primary'>
        Default
      </Button>
    </div>
  ))
  .addSection('Button Group', 'Buttons grouped to a single container', () => (
    <div>
      <Button.Group>
        <Button variant='basic'>First</Button>
        <Button variant='basic'>Second</Button>
        <Button variant='basic'>Third</Button>
        <Button variant='basic'>Fourth</Button>
      </Button.Group>
    </div>
  ))

stories.addWithChapters('Button', teller.toStory())
