import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'
import Container from '../../../.storybook/components/Container'

const stories = storiesOf('Typography', module)

const teller = new StoryTeller(
  'Typography',
  'Our primary typeface is Proxima Nova, a contemporary font that combines humanist proportions with a geometric appearance—making it the perfect typeface.'
)
const chapter = teller.addChapter()

chapter
  .addSection('Default', 'Normal text', () => (
    <Container>
      <CodeExample src='Typography/story/Default-example.jsx' />
    </Container>
  ))
  .addSection('Headings', 'h1 to h6', () => (
    <Container>
      <CodeExample src='Typography/story/Headings-example.jsx' />
    </Container>
  ))
  .addSection(
    'Types',
    'Long-form text uses a 1.5 ratio to calculate line-height values.',
    () => (
      <Container>
        <CodeExample src='Typography/story/Types-example.jsx' />
      </Container>
    )
  )
  .addSection('Alignment', null, () => (
    <Container>
      <CodeExample src='Typography/story/Alignment-example.jsx' />
    </Container>
  ))
  .addSection('Weights', null, () => (
    <Container>
      <CodeExample src='Typography/story/Weights-example.jsx' />
    </Container>
  ))

stories.addWithChapters('Typography', teller.toStory())
