/* global alert */

import React from 'react'
import { storiesOf } from '@storybook/react'

import StoryTeller from '../../.storybook/StoryTeller'
import Pagination from './'
import Spacer from '../Spacer'

const stories = storiesOf('Pagination', module)

const teller = new StoryTeller(
  'Pagination',
  'Component which allows navigating long data lists'
)
const chapter = teller.addChapter()

chapter
  .addSection('Pagination', 'variations', () => (
    <div>
      <Pagination
        activePage={1}
        onPageChange={page => {
          alert('Page change...' + page)
        }}
        totalPages={10}
      />
      <Spacer bottom={2} />
      <Pagination
        activePage={9}
        onPageChange={page => {
          alert('Page change...' + page)
        }}
        totalPages={10}
      />
      <Spacer bottom={2} />
      <Pagination
        activePage={5}
        onPageChange={page => {
          alert('Page change...' + page)
        }}
        totalPages={10}
      />
      <Spacer bottom={2} />
      <Pagination
        activePage={10}
        onPageChange={page => {
          alert('Page change...' + page)
        }}
        totalPages={10}
      />
    </div>
  ))
  .addSection('Pagination', 'disabled', () => (
    <div>
      <Pagination
        activePage={1}
        disabled
        onPageChange={page => {
          alert('Page change...' + page)
        }}
        totalPages={10}
      />
    </div>
  ))

stories.addWithChapters('Pagination', teller.toStory())
