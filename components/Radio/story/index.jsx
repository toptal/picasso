import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'
import Container from '../../../.storybook/components/Container'

const stories = storiesOf('Radio', module)

const teller = new StoryTeller(
  'Radio',
  'Radio buttons are best used when users need to select a single option from a set of unfamiliar choices. Radio buttons surface all the options and allow the user to compare choices before making a selection.'
)
const chapter = teller.addChapter()

chapter.addSection('Default', null, () => (
  <Container>
    <CodeExample src='Radio/story/Default-example.jsx' />
  </Container>
))

chapter.addSection('Types', null, () => (
  <Container>
    <CodeExample src='Radio/story/Types-example.jsx' />
  </Container>
))

chapter.addSection('Disabled', null, () => (
  <Container>
    <CodeExample src='Radio/story/Disabled-example.jsx' />
  </Container>
))

chapter.addSection('Radio group vertical', null, () => (
  <Container>
    <CodeExample src='Radio/story/RadioGroupVertical-example.jsx' />
  </Container>
))

chapter.addSection('Radio group horizontal', null, () => (
  <Container>
    <CodeExample src='Radio/story/RadioGroupHorizontal-example.jsx' />
  </Container>
))

stories.addWithChapters('Radio', teller.toStory())
