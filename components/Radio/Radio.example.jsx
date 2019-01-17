import React from 'react'
import { storiesOf } from '@storybook/react'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Radio from './'
import StoryTeller from '../../.storybook/StoryTeller'

const stories = storiesOf('Radio', module)

const teller = new StoryTeller('Radio', 'A Radio Button')
const chapter = teller.addChapter()

chapter.addSection('Standalone', 'Standalone radio buttons', () => (
  <div>
    <Radio color='default' />
    <Radio color='primary' />
    <Radio color='secondary' />
  </div>
))

class RadioGroupComponent extends React.Component {
  state = {
    value: ''
  }
  render () {
    const { value } = this.state
    const { children } = this.props

    return (
      <div>
        <RadioGroup
          name='name'
          onChange={({ target: { value } }) =>
            this.setState({ value: String(value) })
          }
          value={value}
          {...this.props}
        >
          {children}
        </RadioGroup>
      </div>
    )
  }
}

chapter.addSection('RadioGroup', 'Simple radio group', () => (
  <RadioGroupComponent>
    <Radio color='default' value='default' />
    <Radio color='primary' value='primary' />
    <Radio color='secondary' value='secondary' />
  </RadioGroupComponent>
))

chapter.addSection('Labels', 'Radio with label', () => (
  <FormControl component='fieldset'>
    <RadioGroupComponent style={{ flexDirection: 'row' }}>
      <FormControlLabel
        control={<Radio color='primary' />}
        label='First Option'
        value='first'
      />
      <FormControlLabel
        control={<Radio color='primary' />}
        label='Second Option'
        value='second'
      />
      <FormControlLabel
        control={<Radio color='primary' />}
        label='Third Option'
        value='third'
      />

      <FormControlLabel
        control={<Radio color='primary' disabled />}
        label='Disabled Option'
        value='disabled'
      />
    </RadioGroupComponent>
  </FormControl>
))

chapter.addSection('Disabled', 'Disabled radio buttons', () => (
  <div>
    <Radio color='default' disabled />
    <Radio color='primary' disabled />
    <Radio color='secondary' disabled />
  </div>
))

stories.addWithChapters('Radio', teller.toStory())
