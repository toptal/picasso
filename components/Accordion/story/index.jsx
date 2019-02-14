import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../../.storybook/StoryTeller'
import CodeExample from '../../../.storybook/components/CodeExample'
import Container from '../../../.storybook/components/Container'

const stories = storiesOf('Accordion', module)

// Chapter Accordion

const teller = new StoryTeller(
  'Accordion',
  'Accordions store information behind collapsible sections, allowing for more information to be stored in a limited amount of space.'
)
const chapter = teller.addChapter()

chapter.addSection(
  'Default',
  'Styled sections is a default behaviour of Accordion when `expanded` prop is not specified (uncontrolled)',
  () => (
    <Container>
      <CodeExample src='Accordion/story/Default-example.jsx' />
    </Container>
  )
)

chapter.addSection(
  'Controlled',
  'You can control of expansion or collapsing of the Details panel by passing `expanded` prop',
  () => (
    <Container>
      <CodeExample src='Accordion/story/Controlled-example.jsx' />
    </Container>
  )
)

chapter.addSection(
  'Group',
  'Accordions with styled sections in a group',
  () => (
    <Container>
      <CodeExample src='Accordion/story/AccordionGroup-example.jsx' />
    </Container>
  )
)

stories.addWithChapters('Accordion', teller.toStory())
