import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { Item } from '@toptal/picasso/Autocomplete'
import { isSubstring } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'

const countries = [
  { value: 'Afghanistan', text: 'Afghanistan' },
  { value: 'Albania', text: 'Albania' },
  { value: 'Algeria', text: 'Algeria' },
  { value: 'Belarus', text: 'Belarus' },
  { value: 'Croatia', text: 'Croatia' },
  { value: 'Lithuania', text: 'Lithuania' },
  { value: 'Slovakia', text: 'Slovakia' },
  { value: 'Spain', text: 'Spain' },
  { value: 'Ukraine', text: 'Ukraine' },
]

const skills = [
  { value: 0, text: 'HTML' },
  { value: 1, text: 'CSS' },
  { value: 2, text: 'Javascript' },
]

const EMPTY_INPUT_VALUE = ''
const getAutocompleteDisplayValue = (item: Item | null) =>
  item?.text || EMPTY_INPUT_VALUE

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
  const [skillInputValue, setSkillInputValue] =
    useState<string>(EMPTY_INPUT_VALUE)
  const skillOptions = filterOptions(skillInputValue, skills)

  const [autocompleteValue, setAutocompleteValue] =
    useState<string>(EMPTY_INPUT_VALUE)
  const [autocompleteOptions, setAutocompleteOptions] = useState<Item[] | null>(
    countries
  )

  return (
    <Form
      autoComplete='off'
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
      initialValues={{ 'default-gender': 'female' }}
    >
      <Form.Input
        enableReset
        onResetClick={(set: (value: string) => void) => {
          set('')
        }}
        required
        name='default-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />
      <Form.Input
        required
        name='default-lastName'
        label='Last name'
        placeholder='e.g. Wayne'
      />
      <Form.NumberInput
        enableReset
        required
        name='default-age'
        label="What's your age?"
        placeholder='e.g. 25'
      />
      <Form.RadioGroup name='default-gender' label='Gender'>
        <Form.Radio label='Male' value='male' />
        <Form.Radio label='Female' value='female' />
      </Form.RadioGroup>
      <Form.RadioGroup
        name='default-gender'
        label='Gender'
        horizontal
        spacing={8}
      >
        <Form.ButtonRadio value='male'>Male</Form.ButtonRadio>
        <Form.ButtonRadio value='female'>Female</Form.ButtonRadio>
      </Form.RadioGroup>
      <Form.DatePicker name='default-dateOfBirth' label='Date of birth' />
      <Form.TimePicker name='default-timeOfBirth' label='Time of birth' />
      <Form.TagSelector
        name='default-skills'
        label='Skills'
        inputValue={skillInputValue}
        options={skillOptions}
        onInputChange={setSkillInputValue}
      />
      <Form.CheckboxGroup name='default-hobbies' label='Hobbies'>
        <Form.Checkbox label='Skiing' value='skiing' />
        <Form.Checkbox label='Free diving' value='freeDiving' />
        <Form.Checkbox label='Dancing' value='dancing' />
      </Form.CheckboxGroup>
      <Form.CheckboxGroup
        name='default-hobbies'
        label='Hobbies'
        horizontal
        spacing={8}
      >
        <Form.ButtonCheckbox value='skiing'>Skiing</Form.ButtonCheckbox>
        <Form.ButtonCheckbox value='freeDiving'>
          Free diving
        </Form.ButtonCheckbox>
        <Form.ButtonCheckbox value='dancing'>Dancing</Form.ButtonCheckbox>
      </Form.CheckboxGroup>
      <Form.Select
        enableReset
        required
        name='default-businessType'
        label='Business type'
        width='auto'
        options={[
          { value: 0, text: 'Company' },
          { value: 1, text: 'Individual' },
        ]}
      />
      <Form.Select
        name='default-origin_country'
        label='Origin country'
        width='auto'
        options={countries}
      />
      <Form.Autocomplete
        name='default-current_country'
        label='Current country'
        placeholder='Start typing country...'
        width='auto'
        value={autocompleteValue}
        options={autocompleteOptions}
        onSelect={(item: Item) => {
          console.log('onSelect returns item object:', item)

          const itemValue = getAutocompleteDisplayValue(item)

          if (autocompleteValue !== itemValue) {
            setAutocompleteValue(itemValue)
          }
        }}
        onChange={(newValue: string) => {
          console.log('onChange returns just item value:', newValue)

          setAutocompleteOptions(filterOptions(newValue, countries))
          setAutocompleteValue(newValue)
        }}
        getDisplayValue={getAutocompleteDisplayValue}
      />
      <Form.Rating.Stars
        name='default-rating'
        label='How much do you love Picasso?'
        required
      />
      <Form.Rating.Thumbs
        name='default-thumbs'
        label='Would you recommend picasso?'
        required
      />
      <Form.FileInput
        required
        name='default-avatar'
        label='Avatar'
        status='No file selected.'
      />
      <Form.Dropzone label='Attachments' required name='default-attachments' />
      <Form.Checkbox
        required
        name='default-legal'
        label='I confirm that I have legal permission from the client to feature this project.'
      />
      <Form.Switch
        name='default-publicProfile'
        label='Public Profile'
        width='auto'
      />

      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
