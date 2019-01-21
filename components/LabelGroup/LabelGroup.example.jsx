import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../.storybook/StoryTeller'
import Label from '../Label'

const stories = storiesOf('Label Group', module)

const teller = new StoryTeller('Label Group', null)
const chapter = teller.addChapter()

function handleDelete () {
  alert('You clicked the delete icon.') // eslint-disable-line no-undef
}

chapter
  .addSection(
    'Default',
    'You can combine different variants and styles of the Label inside the group.',
    () => (
      <Label.Group>
        <Label label='Angular JS' />
        <Label label='React JS' />
        <Label label='Ember JS' onDelete={handleDelete} />
        <Label label='Vue JS' />
      </Label.Group>
    )
  )

  .addSection('Multiline', '', () => (
    <Label.Group style={{ width: '300px' }}>
      <Label label='Angular JS' />
      <Label label='React JS' />
      <Label label='Ember JS' onDelete={handleDelete} />
      <Label label='Vue JS' />
      <Label label='Backbone JS' />
      <Label label='Aurelia JS' />
    </Label.Group>
  ))

stories.addWithChapters('LabelGroup', teller.toStory())
