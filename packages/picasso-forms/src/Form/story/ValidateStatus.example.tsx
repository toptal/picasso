import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { Item } from '@toptal/picasso/Autocomplete'
import { isSubstring } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'

const skills = [
  { value: 0, text: 'HTML' },
  { value: 1, text: 'CSS' },
  { value: 2, text: 'Javascript' }
]

const EMPTY_INPUT_VALUE = ''

const filterOptions = (str = '', options: Item[] = []): Item[] | null => {
  if (!str) {
    return options
  }
  const result = options.filter(option =>
    option?.text ? isSubstring(str, option.text) : false
  )

  return result.length > 0 ? result : null
}

const Example = () => {
  const [skillInputValue, setSkillInputValue] = useState<string>(
    EMPTY_INPUT_VALUE
  )
  const skillOptions = filterOptions(skillInputValue, skills)

  return (
    <Form
      autoComplete='off'
      onSubmit={values => window.alert(values)}
      initialValues={{ gender: 'female' }}
    >
      <Form.Input
        enableReset
        onResetClick={(set: (value: string) => void) => {
          set('')
        }}
        required
        name='firstName'
        label='First name'
        placeholder='e.g. Bruce'
        showValidState
      />
      <Form.Input
        required
        name='lastName'
        label='Last name'
        placeholder='e.g. Wayne'
        showValidState
      />
      <Form.NumberInput
        enableReset
        required
        name='age'
        label="What's your age?"
        placeholder='e.g. 25'
        showValidState
      />
      <Form.TagSelector
        required
        name='skills'
        label='Skills'
        inputValue={skillInputValue}
        options={skillOptions}
        onInputChange={setSkillInputValue}
        showValidState
      />

      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
