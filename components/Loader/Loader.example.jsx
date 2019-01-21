import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../.storybook/StoryTeller'
import Loader from './'
import Spacer from '../Spacer'

const stories = storiesOf('Loader', module)

const teller = new StoryTeller('Loader', 'indicate progress')
const chapter = teller.addChapter()

chapter
  .addSection('Default', 'Default loader', () => <Loader />)
  .addSection('Labeled', 'Loader with label', () => (
    <Loader label='Loading...' />
  ))
  .addSection('Indeterminate', 'Indeterminate loader', () => (
    <Loader indeterminate label='Loading...' />
  ))
  .addSection('Sizes', 'Different size loader', () => (
    <div>
      <Loader label='small' size='small' />
      <Spacer bottom={2} />
      <Loader label='default' size='default' />
      <Spacer bottom={2} />
      <Loader label='large' size='large' />
    </div>
  ))
  .addSection('Inline', 'Place loader inline with content', () => (
    <div style={{ width: '100%' }}>
      <Loader inline />
      <span>Content...</span>
    </div>
  ))
  .addSection('Value', 'Loader with determined or static values', () => (
    <div>
      <Loader label='50%' value={50} variant='static' />
      <Spacer bottom={2} />
      <Loader label='13%' value={13} variant='determinate' />
    </div>
  ))

stories.addWithChapters('Loader', teller.toStory())
