import React from 'react'
import { storiesOf } from '@storybook/react'
/* eslint-disable no-unused-vars */
import { text, select } from '@storybook/addon-knobs'

import StoryTeller from '../../.storybook/StoryTeller'
import Checkbox from '.'

const stories = storiesOf('Checkbox', module)

const teller = new StoryTeller('Checkbox')
const chapter = teller.addChapter()

const Spacer = ({ children, top, bottom }) => {
  return (
    <div
      style={{
        marginTop: top + 'em',
        marginBottom: bottom + 'em'
      }}>
      {children}
    </div>
  )
}

chapter
  .addSection(
    'Uncontrolled',
    'If `checked` prop is not specified checkbox saves the state.',
    () => (
      <div>
        <Spacer bottom={1}>
          <Checkbox id="checkbox-uncontrolled" label="With label" />
        </Spacer>
        <div>
          <Checkbox />
        </div>
      </div>
    )
  )
  .addSection(
    'Controlled',
    'Stateless checkbox, to control the state `checked` prop should be used.',
    () => (
      <div>
        <Spacer bottom={1}>
          <Checkbox id="checkbox-unchecked" checked={false} label="Unchecked" />
        </Spacer>
        <div>
          <Checkbox id="checkbox-checked" checked label="Checked" />
        </div>
      </div>
    )
  )
  .addSection('Disabled', null, () => (
    <div>
      <Spacer bottom={1}>
        <Checkbox
          id="checkbox-disabled-unchecked"
          disabled
          checked={false}
          label="Unchecked"
        />
      </Spacer>
      <div>
        <Checkbox
          id="checkbox-disabled-checked"
          disabled
          checked
          label="Checked"
        />
      </div>
    </div>
  ))
  .addSection('Indeterminate', null, () => (
    <div>
      <Checkbox id="checkbox-indeterminate" indeterminate label="Select all" />
    </div>
  ))

stories.addWithChapters('Checkbox', teller.toStory())
