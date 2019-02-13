import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'
import Container from '../../../.storybook/components/Container'

const stories = storiesOf('Button', module)

const teller = new StoryTeller('Button', null)
const chapter = teller.addChapter()

chapter
  .addSection('Basic', 'A standard button', () => (
    <Container>
      <CodeExample src='Button/story/Basic-example.jsx' />
    </Container>
  ))
  .addSection('Kinds', 'Different kinds of button', () => (
    <Container>
      <CodeExample src='Button/story/Kinds-example.jsx' />
    </Container>
  ))
  .addSection('States', 'Different states of button', () => (
    <Container>
      <CodeExample src='Button/story/States-example.jsx' />
    </Container>
  ))
  .addSection(
    'Disabled',
    'The button shows that currently unable to be interacted with',
    () => (
      <Container>
        <CodeExample src='Button/story/Disabled-example.jsx' />
      </Container>
    )
  )
  .addSection('Sizes', 'Different sizes of button', () => (
    <Container>
      <CodeExample src='Button/story/Sizes-example.jsx' />
    </Container>
  ))
  .addSection('Full width', 'Full width button', () => (
    <Container>
      <CodeExample src='Button/story/FullWidth-example.jsx' />
    </Container>
  ))
  .addSection(
    'Icon Button',
    "Buttons with icons (not supported yet as we don't have icon set",
    () => (
      <Container>
        <CodeExample src='Button/story/IconButtons-example.jsx' />
      </Container>
    )
  )
  .addSection(
    'Button with text and Icon',
    "Buttons with icons (not supported yet as we don't have icon set",
    () => (
      <Container>
        <CodeExample src='Button/story/IconButtonsWithText-example.jsx' />
      </Container>
    )
  )
  .addSection('Loading Button', 'Loading button indicating progress', () => (
    <Container>
      <CodeExample src='Button/story/Loading-example.jsx' />
    </Container>
  ))
  .addSection('Button Group', 'Buttons grouped to a single container', () => (
    <Container>
      <CodeExample src='Button/story/ButtonGroup-example.jsx' />
    </Container>
  ))

stories.addWithChapters('Button', teller.toStory())
