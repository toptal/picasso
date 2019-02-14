import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'
import Container from '../../../.storybook/components/Container'

const stories = storiesOf('TextField', module)

const teller = new StoryTeller(
  'TextField',
  'Input fields are UI elements through which users submit information to the system. Input fields should be clearly labeled by the topic to ensure users know exactly what is being asked of them.'
)
const chapter = teller.addChapter()

chapter.addSection('Default', null, () => (
  <Container>
    <CodeExample src='TextField/story/Default-example.jsx' />
  </Container>
))

chapter.addSection('With icon', null, () => (
  <Container>
    <CodeExample src='TextField/story/WithIcon-example.jsx' />
  </Container>
))

chapter.addSection('Error', null, () => (
  <Container>
    <CodeExample src='TextField/story/Error-example.jsx' />
  </Container>
))

chapter.addSection('Multiline/Textarea', null, () => (
  <Container>
    <CodeExample src='TextField/story/Multiline-example.jsx' />
  </Container>
))

stories.addWithChapters('TextField', teller.toStory())
