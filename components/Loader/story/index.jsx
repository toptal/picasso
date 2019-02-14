import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'
import Container from '../../../.storybook/components/Container'

const stories = storiesOf('Loader', module)

const teller = new StoryTeller(
  'Loader',
  'Loaders indicate that an action is underway and that the user must wait to proceed until it is finished.'
)
const chapter = teller.addChapter()

chapter
  .addSection('Default', null, () => (
    <Container>
      <CodeExample src='Loader/story/Default-example.jsx' />
    </Container>
  ))
  .addSection('With label', null, () => (
    <Container>
      <CodeExample src='Loader/story/WithLabel-example.jsx' />
    </Container>
  ))
  .addSection('Inline', 'Place loader inline with content', () => (
    <Container>
      <CodeExample src='Loader/story/Inline-example.jsx' />
    </Container>
  ))
  .addSection('Indeterminate', null, () => (
    <Container>
      <CodeExample src='Loader/story/Indeterminate-example.jsx' />
    </Container>
  ))
  .addSection('Sizes', null, () => (
    <Container>
      <CodeExample src='Loader/story/Sizes-example.jsx' />
    </Container>
  ))
  .addSection(
    'Controlled value',
    'Loader with determined or static values',
    () => (
      <Container>
        <CodeExample src='Loader/story/ControlledValue-example.jsx' />
      </Container>
    )
  )

stories.addWithChapters('Loader', teller.toStory())
