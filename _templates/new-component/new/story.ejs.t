---
to: components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.example.jsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../.storybook/StoryTeller'
import <%= Name %> from './'

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
