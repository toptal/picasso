import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import StoryTeller from '../../.storybook/StoryTeller'
import Spacer from '../Spacer'
import Checkbox from '.'

const stories = storiesOf('Checkbox', module)

const teller = new StoryTeller('Checkbox')
const chapter = teller.addChapter()

chapter
  .addSection(
    'Uncontrolled',
    'If `checked` prop is not specified checkbox saves the state.',
    () => (
      <div>
        <Spacer bottom={1}>
          <Checkbox
            id="checkbox-uncontrolled"
            label={text('label', 'With label')}
          />
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
