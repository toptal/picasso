import React, { useState } from 'react'
import { Form } from '@toptal/picasso-forms'
import { isSubstring } from '@toptal/picasso/utils'
import { Item } from '@toptal/picasso/Autocomplete'
import { Container } from '@toptal/picasso'

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

const DisabledStateExample = () => {
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
    <Form onSubmit={values => window.alert(JSON.stringify(values))}>
      <Form.Input disabled name='disabledInput' label='Name' value='Example' />
      <Form.NumberInput
        disabled
        name='disabledAge'
        label="What's your age?"
        value={25}
        placeholder='e.g. 25'
      />
      <Form.RadioGroup disabled name='disabledGender' label='Gender'>
        <Form.Radio disabled label='Male' value='male' />
        <Form.Radio disabled label='Female' value='female' />
      </Form.RadioGroup>
      <Form.DatePicker
        disabled
        name='disabledDateOfBirth'
        label='Date of birth'
      />
      <Form.TimePicker
        disabled
        name='disabledTimeOfBirth'
        label='Time of birth'
      />
      <Form.TagSelector
        disabled
        name='disabledSkills'
        label='Skills'
        inputValue={skillInputValue}
        options={skillOptions}
        onInputChange={setSkillInputValue}
      />
      <Form.CheckboxGroup
        disabled
        value='freeDiving'
        name='disabledHobbies'
        label='Hobbies'
      >
        <Form.Checkbox disabled label='Skiing' value='skiing' />
        <Form.Checkbox disabled label='Free diving' value='freeDiving' />
        <Form.Checkbox disabled label='Dancing' value='dancing' />
      </Form.CheckboxGroup>
      <Form.Select
        disabled
        name='disabledBusinessType'
        label='Business type'
        width='auto'
        value={0}
        options={[
          { value: 0, text: 'Company' },
          { value: 1, text: 'Individual' }
        ]}
      />
      <Form.Autocomplete
        disabled
        name='disabledCurrentCountry'
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
        disabled
        interactive={false}
        value={5}
        name='disabledRating'
        label='How much do you love Picasso?'
        required
      />
      <Form.Rating.Thumbs
        value
        disabled
        interactive={false}
        name='disabledThumbs'
        label='Would you recommend picasso?'
        required
      />
      <Form.FileInput
        disabled
        name='disabledAvatar'
        label='Avatar'
        status='No file selected.'
      />
      <Form.Dropzone
        disabled
        label='Attachments'
        required
        name='disabledAttachments'
      />
      <Form.Checkbox
        disabled
        required
        name='disabledLegal'
        value='confimation'
        label='I confirm that I have legal permission from the client to feature this project.'
      />
      <Form.Switch
        disabled
        value='public'
        name='disabledPublicProfile'
        label='Public Profile'
        width='auto'
      />

      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default DisabledStateExample
