import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'

const stories = storiesOf('Label', module)

const teller = new StoryTeller(
  'Label',
  `Labels are used to describe other topics, incluidng textareas,
  form fields, users, and more. By default, labels are read-only UI elements.
  They are used to surface important information about a topic. Labels may also
  be used to convey status, or used within a group to show selection.`
)
const chapter = teller.addChapter()

const Container = ({ children }) => <div style={{ flex: 1 }}>{children}</div>

chapter.addSection('Default', null, () => (
  <Container>
    <CodeExample src='Label/story/Default-example.tsx' />
  </Container>
))

chapter.addSection('Dismissible', null, () => (
  <Container>
    <CodeExample src='Label/story/Dismissible-example.tsx' />
  </Container>
))

chapter.addSection('Flat', null, () => (
  <Container>
    <CodeExample src='Label/story/Flat-example.tsx' />
  </Container>
))

chapter.addSection('Statuses', 'Use these to communicate status.', () => (
  <Container>
    <CodeExample src='Label/story/Statuses-example.tsx' />
  </Container>
))

stories.addWithChapters('Label', teller.toStory())
