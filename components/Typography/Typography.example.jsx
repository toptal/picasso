import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../.storybook/StoryTeller'
import Typography from './'
import Spacer from '../Spacer'

const stories = storiesOf('Typography', module)

const teller = new StoryTeller('Typography', '*component description*')
const chapter = teller.addChapter()

chapter
  .addSection('Headings', 'h1 to h6', () => (
    <div>
      <Typography variant='h1'>Heading 1</Typography>
      <Spacer bottom={1} />
      <Typography variant='h2'>Heading 2</Typography>
      <Spacer bottom={1} />
      <Typography variant='h3'>Heading 3</Typography>
      <Spacer bottom={1} />
      <Typography variant='h4'>Heading 4</Typography>
      <Spacer bottom={1} />
      <Typography variant='h5'>Heading 5</Typography>
      <Spacer bottom={1} />
      <Typography variant='h6'>Heading 6</Typography>
      <Spacer bottom={1} />
    </div>
  ))
  .addSection(
    'Long-form text',
    'Long-form text uses a 1.5 ratio to calculate line-height values.',
    () => (
      <div>
        <Typography variant='large'>Large paragraph</Typography>
        <Spacer bottom={1} />
        <Typography>Paragraph</Typography>
        <Spacer bottom={1} />
        <Typography variant='small'>Small paragraph</Typography>
        <Spacer bottom={1} />
        <Typography variant='caption'>Caption</Typography>
      </div>
    )
  )
  .addSection('Alignment', 'hello all directions', () => (
    <div style={{ width: '100%' }}>
      <Typography align='left'>Left</Typography>
      <Spacer bottom={1} />
      <Typography align='center'>Center</Typography>
      <Spacer bottom={1} />
      <Typography align='right'>Right</Typography>
    </div>
  ))
  .addSection('Weight', 'hello all weights', () => (
    <div>
      <Typography weight='thin'>Thin</Typography>
      <Spacer bottom={1} />
      <Typography weight='light'>Light</Typography>
      <Spacer bottom={1} />
      <Typography weight='regular'>Regular</Typography>
      <Spacer bottom={1} />
      <Typography weight='semibold'>Semibold</Typography>
      <Spacer bottom={1} />
      <Typography weight='bold'>Bold</Typography>
      <Spacer bottom={1} />
    </div>
  ))

stories.addWithChapters('Typography', teller.toStory())
