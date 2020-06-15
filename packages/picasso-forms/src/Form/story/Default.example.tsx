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

const filterOptions = (str = '', options: Item[] = []): Item[] | null => {
  if (!str) {
    return options
  }
  const result = options.filter(option =>
    option?.text ? isSubstring(str, option.text) : false
  )

  return result.length > 0 ? result : null
}

const DefaultExample = () => {
  const [skillInputValue, setSkillInputValue] = useState<string>('')
  const skillOptions = filterOptions(skillInputValue, skills)

  return (
    <Form
      onSubmit={values => console.log(values)}
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
      <Form.TagSelector
        name='skills'
        label='Skills'
        inputValue={skillInputValue}
        options={skillOptions}
        onInputChange={setSkillInputValue}
      />
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
}

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
