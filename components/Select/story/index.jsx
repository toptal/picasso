import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'
import Container from '../../../.storybook/components/Container'

const stories = storiesOf('Select', module)

const teller = new StoryTeller(
  'Select',
  'Selects are interactive elements that prompt users to make selections or take actions from a set of list of available options.'
)
const chapter = teller.addChapter()

chapter.addSection('Default', null, () => (
  <Container>
    <CodeExample src='Select/story/Default-example.jsx' />
  </Container>
))

chapter.addSection('Types', null, () => (
  <Container>
    <CodeExample src='Select/story/Types-example.jsx' />
  </Container>
))

chapter.addSection('With label', null, () => (
  <Container>
    <CodeExample src='Select/story/WithLabel-example.jsx' />
  </Container>
))

chapter.addSection('Disabled', null, () => (
  <Container>
    <CodeExample src='Select/story/Disabled-example.jsx' />
  </Container>
))

chapter.addSection(
  'Chosen option',
  'Renders Select component with already chosen one of the options',
  () => (
    <Container>
      <CodeExample src='Select/story/ChosenOption-example.jsx' />
    </Container>
  )
)

chapter.addSection('Full width', null, () => (
  <Container>
    <CodeExample src='Select/story/FullWidth-example.jsx' />
  </Container>
))

chapter.addSection(
  'Custom options',
  'Options of the Select component could be not only text, but custom components',
  () => (
    <Container>
      <CodeExample src='Select/story/CustomOptions-example.jsx' />
    </Container>
  )
)

stories.addWithChapters('Select', teller.toStory())
