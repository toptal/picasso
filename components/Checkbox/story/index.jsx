import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'
import Container from '../../../.storybook/components/Container'

const stories = storiesOf('Checkbox', module)

const teller = new StoryTeller('Checkbox')
const chapter = teller.addChapter()

chapter
  .addSection('Uncontrolled', 'Can control its state by itself', () => (
    <Container>
      <CodeExample src='Checkbox/story/Uncontrolled-example.jsx' />
    </Container>
  ))
  .addSection(
    'Controlled',
    'Stateless checkbox, state should be controlled using prop',
    () => (
      <Container>
        <CodeExample src='Checkbox/story/Controlled-example.jsx' />
      </Container>
    )
  )
  .addSection('Disabled', null, () => (
    <Container>
      <CodeExample src='Checkbox/story/Disabled-example.jsx' />
    </Container>
  ))
  .addSection('Indeterminate', null, () => (
    <Container>
      <CodeExample src='Checkbox/story/Indeterminate-example.jsx' />
    </Container>
  ))

stories.addWithChapters('Checkbox', teller.toStory())
