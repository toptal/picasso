import React from 'react'
import { storiesOf } from '@storybook/react'
/* eslint-disable no-unused-vars */
import { text, select } from '@storybook/addon-knobs'

import StoryTeller from '../../.storybook/StoryTeller'
import Spacer from '.'

const stories = storiesOf('Spacer', module)

const teller = new StoryTeller('Spacer', '*component description*')
const chapter = teller.addChapter()

chapter.addSection('*section header*', '*section description*', () => (
  <div>
    <Spacer />
  </div>
))

stories.addWithChapters('Spacer', teller.toStory())
