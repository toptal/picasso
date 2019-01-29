import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../.storybook/StoryTeller'
import Label from '.'
import Spacer from '../Spacer'

const stories = storiesOf('Label', module)

const teller = new StoryTeller(
  'Label',
  `Labels are used to describe other topics, incluidng textareas,
  form fields, users, and more. By default, labels are read-only UI elements.
  They are used to surface important information about a topic. Labels may also
  be used to convey status, or used within a group to show selection.`
)
const chapter = teller.addChapter()

function handleDelete () {
  alert('You clicked the delete icon.') // eslint-disable-line no-undef
}

chapter.addSection('Default', null, () => (
  <div>
    <Label label='Javascript' />
  </div>
))

chapter.addSection('Dismissible', null, () => (
  <div>
    <Label label='React JS' onDelete={handleDelete} />
  </div>
))

chapter.addSection('Flat', null, () => (
  <div>
    <Label label='Ember JS' variant='flat' />
  </div>
))

chapter.addSection('Statuses', 'Use these to communicate status.', () => (
  <>
    <Spacer right={1}>
      <Label label={`Yay! It's done!`} variant='success' />
    </Spacer>
    <div>
      <Label label='Nope! Please, try one more time' variant='error' />
    </div>
  </>
))

stories.addWithChapters('Label', teller.toStory())
