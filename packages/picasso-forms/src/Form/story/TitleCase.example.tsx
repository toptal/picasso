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
  { value: 'Ukraine', text: 'Ukraine' }
]

const skills = [
  { value: 0, text: 'HTML' },
  { value: 1, text: 'CSS' },
  { value: 2, text: 'Javascript' }
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
  const [skillInputValue, setSkillInputValue] = useState<string>(
    EMPTY_INPUT_VALUE
  )
  const skillOptions = filterOptions(skillInputValue, skills)

  const [autocompleteValue, setAutocompleteValue] = useState<string>(
    EMPTY_INPUT_VALUE
  )
  const [autocompleteOptions, setAutocompleteOptions] = useState<Item[] | null>(
    countries
  )

  return (
    <Form
      autoComplete='off'
      onSubmit={values => window.alert(values)}
      initialValues={{ gender: 'female' }}
    >
      <Form.Input
        titleCase
        enableReset
        onResetClick={(set: (value: string) => void) => {
          set('')
        }}
        required
        name='firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />
      <Form.NumberInput
        titleCase
        enableReset
        required
        name='age'
        label="What's your age?"
        placeholder='e.g. 25'
      />
      <Form.RadioGroup titleCase name='gender' label='Select gender'>
        <Form.Radio label='Male' value='male' />
        <Form.Radio label='Female' value='female' />
      </Form.RadioGroup>
      <Form.DatePicker titleCase name='dateOfBirth' label='Date of birth' />
      <Form.TimePicker titleCase name='timeOfBirth' label='Time of birth' />
      <Form.TagSelector
        titleCase
        name='skills'
        label='Your skills'
        inputValue={skillInputValue}
        options={skillOptions}
        onInputChange={setSkillInputValue}
      />
      <Form.CheckboxGroup titleCase name='hobbies' label='Your hobbies'>
        <Form.Checkbox label='Skiing' value='skiing' />
        <Form.Checkbox titleCase label='Free diving' value='freeDiving' />
        <Form.Checkbox label='Dancing' value='dancing' />
      </Form.CheckboxGroup>
      <Form.Select
        titleCase
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
      <Form.Autocomplete
        titleCase
        name='current_country'
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
      <Form.Rating
        titleCase
        name='rating'
        label='How much do you love Picasso?'
        required
      />
      <Form.FileInput
        titleCase
        required
        name='avatar'
        label='Your avatar'
        status='No file selected.'
      />
      <Form.Checkbox
        titleCase
        required
        name='legal'
        label='I confirm that I have legal permission from the client to feature this project.'
      />
      <Form.Switch
        titleCase
        name='publicProfile'
        label='Public profile'
        width='auto'
      />

      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
