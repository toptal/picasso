import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { text, select } from '@storybook/addon-knobs'

import StoryTeller from '../StoryTeller'
import Radio from '../../components/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const stories = storiesOf('Radio', module)

const teller = new StoryTeller('Radio', 'A Radio Button')
const chapter = teller.addChapter()

chapter.addSection('Standalone', 'Standalone radio buttons', () => (
  <div>
    <Radio color="default" />
    <Radio color="primary" />
    <Radio color="secondary" />
  </div>
))

class RadioGroupComponent extends React.Component {
  state = {
    value: ''
  }
  render() {
    return (
      <div>
        <RadioGroup
          name="name"
          value={this.state.value}
          onChange={({ target: { value } }) =>
            this.setState({ value: String(value) })
          }
          {...this.props}>
          {this.props.children}
        </RadioGroup>
      </div>
    )
  }
}

chapter.addSection('RadioGroup', 'Simple radio group', () => (
  <RadioGroupComponent>
    <Radio color="default" value="default" />
    <Radio color="primary" value="primary" />
    <Radio color="secondary" value="secondary" />
  </RadioGroupComponent>
))

chapter.addSection('Labels', 'Radio with label', () => (
  <FormControl component="fieldset">
    <RadioGroupComponent style={{ flexDirection: 'row' }}>
      <FormControlLabel
        value="first"
        control={<Radio color="primary" />}
        label="First Option"
      />
      <FormControlLabel
        value="second"
        control={<Radio color="primary" />}
        label="Second Option"
      />
      <FormControlLabel
        value="third"
        control={<Radio color="primary" />}
        label="Third Option"
      />

      <FormControlLabel
        value="disabled"
        control={<Radio color="primary" disabled />}
        label="Disabled Option"
      />
    </RadioGroupComponent>
  </FormControl>
))

chapter.addSection('Disabled', 'Disabled radio buttons', () => (
  <div>
    <Radio color="default" disabled />
    <Radio color="primary" disabled />
    <Radio color="secondary" disabled />
  </div>
))

stories.addWithChapters('Radio', teller.toStory())
