---
to: .storybook/stories/<%= h.changeCase.pascalCase(name) %>.jsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, select } from '@storybook/addon-knobs'

import StoryTeller from '../StoryTeller'
import <%= Name %> from '../../components/<%= Name %>'

const stories = storiesOf('<%= Name %>', module)

const teller = new StoryTeller('<%= Name %>', '*component description*')
const chapter = teller.addChapter()

chapter
  .addSection('*section header*', '*section description*', () => (
    <div>
      <<%= Name %>></<%= Name %>>
    </div>
  ))

stories.addWithChapters('<%= Name %>', teller.toStory())
