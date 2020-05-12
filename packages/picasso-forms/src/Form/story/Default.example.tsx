import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const skills = [
  { value: 0, text: 'HTML' },
  { value: 1, text: 'CSS' },
  { value: 2, text: 'Javascript' }
]

const SkillSelector = props => {
  const [inputValue, setInputValue] = useState<string>('')
  const options = skills.filter(({ text }) =>
    text.toLowerCase().includes(inputValue.toLowerCase())
  )
  return (
    <Form.TagSelector
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      inputValue={inputValue}
      options={options}
      onInputChange={setInputValue}
      getKey={({ value }) => value}
      initialValue={[]}
    />
  )
}

const watchers = [
  { value: 0, text: 'Watcher 1' },
  { value: 1, text: 'Watcher 2' },
  { value: 2, text: 'Watcher 3' }
]

const WatcherAutocomplete = props => {
  const [inputValue, setInputValue] = useState<string>('')
  const options = watchers.filter(({ text }) =>
    text.toLowerCase().includes(inputValue.toLowerCase())
  )
  return (
    <Form.Autocomplete
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onInputChange={setInputValue}
      options={options}
      initialValue={watchers[2]}
      getDisplayValue={({ text }) => text}
    />
  )
}

const DefaultExample = () => (
  <Form onSubmit={values => console.log(values)}>
    <Form.Input
      enableReset
      onResetClick={(set: (value: string) => void) => {
        set('')
      }}
      required
      name='firstName'
      label='First name'
      placeholder='e.g. Bruce'
    />
    <Form.Input
      required
      name='lastName'
      label='Last name'
      placeholder='e.g. Wayne'
    />
    <Form.NumberInput
      enableReset
      required
      name='age'
      label="What's your age?"
      placeholder='e.g. 25'
    />
    <Form.RadioGroup name='gender' label='Gender'>
      <Form.Radio label='Male' value='male' />
      <Form.Radio label='Female' value='female' />
    </Form.RadioGroup>
    <Form.DatePicker name='dateOfBirth' label='Date of birth' />
    <SkillSelector name='skills' label='Skills' />
    <Form.Select
      enableReset
      required
      name='businessType'
      label='Business type'
      width='auto'
      options={[
        { value: 0, text: 'Company' },
        { value: 1, text: 'Individual' }
      ]}
    />
    <Form.Select
      name='country'
      label='Country'
      width='auto'
      options={options}
    />
    <Form.FileInput
      required
      name='avatar'
      label='Avatar'
      status='No file selected.'
    />
    <WatcherAutocomplete name='watcher' label='Watcher' />
    <Form.Checkbox
      required
      name='legal'
      label='I confirm that I have legal permission from the client to feature this project.'
    />

    <Container top='small'>
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Container>
  </Form>
)

const options = [
  { value: 'Afghanistan', text: 'Afghanistan' },
  { value: 'Albania', text: 'Albania' },
  { value: 'Algeria', text: 'Algeria' },
  { value: 'Belarus', text: 'Belarus' },
  { value: 'Croatia', text: 'Croatia' },
  { value: 'Lithuania', text: 'Lithuania' },
  { value: 'Slovakia', text: 'Slovakia' },
  { value: 'Spain', text: 'Spain' },
  { value: 'Ukraine', text: 'Ukraine' }
]

export default DefaultExample
