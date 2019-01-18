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
            id='checkbox-uncontrolled'
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
          <Checkbox checked={false} id='checkbox-unchecked' label='Unchecked' />
        </Spacer>
        <div>
          <Checkbox checked id='checkbox-checked' label='Checked' />
        </div>
      </div>
    )
  )
  .addSection('Disabled', null, () => (
    <div>
      <Spacer bottom={1}>
        <Checkbox
          checked={false}
          disabled
          id='checkbox-disabled-unchecked'
          label='Unchecked'
        />
      </Spacer>
      <Spacer bottom={1}>
        <Checkbox
          checked
          disabled
          id='checkbox-disabled-checked'
          label='Checked'
        />
      </Spacer>
      <div>
        <Checkbox disabled id='checkbox-disabled-without-label' />
      </div>
    </div>
  ))
  .addSection('Indeterminate', null, () => (
    <div>
      <Checkbox id='checkbox-indeterminate' indeterminate label='Select all' />
    </div>
  ))

stories.addWithChapters('Checkbox', teller.toStory())
