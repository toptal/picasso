import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'
import Container from '../../../.storybook/components/Container'

const stories = storiesOf('Pagination', module)

const teller = new StoryTeller(
  'Pagination',
  'Component which allows navigating long data lists.'
)
const chapter = teller.addChapter()

chapter
  .addSection('Default', null, () => (
    <Container>
      <CodeExample src='Pagination/story/Default-example.jsx' />
    </Container>
  ))
  .addSection('Disabled', null, () => (
    <Container>
      <CodeExample src='Pagination/story/Disabled-example.jsx' />
    </Container>
  ))

stories.addWithChapters('Pagination', teller.toStory())
