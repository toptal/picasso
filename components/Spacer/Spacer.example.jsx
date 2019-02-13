import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../.storybook/StoryTeller'
import Spacer from '.'

const stories = storiesOf('Spacer', module)

const teller = new StoryTeller(
  'Spacer',
  'Use Spacer to add space between 2 elements'
)
const chapter = teller.addChapter()

chapter.addSection(null, null, () => (
  <div>
    <Spacer bottom={5}>Some text</Spacer>
    <div>Some more text</div>
  </div>
))

stories.addWithChapters('Spacer', teller.toStory())
