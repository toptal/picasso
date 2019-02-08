import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../.storybook/StoryTeller'
import CodeExample from '../../.storybook/components/CodeExample'

const stories = storiesOf('SomeComponent', module)

const teller = new StoryTeller('SomeComponent', 'SomeComponent title')
// @ts-ignore
const chapter = teller.addChapter()

chapter.addSection('Standalone', 'Standalone radio buttons', () => (
  <CodeExample
    code='SomeComponent/SomeComponent.codeexample.tsx'
    description='Some Component description'
    title='Some Component title'
  />
))

// @ts-ignore
stories.addWithChapters('SomeComponent', teller.toStory())
