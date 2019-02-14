import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'
import Container from '../../../.storybook/components/Container'

const stories = storiesOf('Spacer', module)

const teller = new StoryTeller(
  'Spacer',
  'Use Spacer to add space between 2 elements.'
)
const chapter = teller.addChapter()

chapter.addSection('Default', null, () => (
  <Container>
    <CodeExample src='Spacer/story/Default-example.jsx' />
  </Container>
))

chapter.addSection('Inline', null, () => (
  <Container>
    <CodeExample src='Spacer/story/Inline-example.jsx' />
  </Container>
))

stories.addWithChapters('Spacer', teller.toStory())
