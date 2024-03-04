import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, isSubstring } from '@toptal/picasso-utils'
import type { AutocompleteItem as Item } from '@toptal/picasso'
import {
  FormNonCompound,
  Input,
  NumberInput,
  RadioGroup,
  Radio,
  DatePicker,
  TimePicker,
  TagSelector,
  CheckboxGroup,
  Checkbox,
  Select,
  Autocomplete,
  Rating,
  FileInput,
  Switch,
  SubmitButton,
} from '@toptal/picasso-forms'

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
    <FormNonCompound
      autoComplete='off'
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
      initialValues={{ 'titleCase-gender': 'female' }}
    >
      <Input
        titleCase
        enableReset
        onResetClick={(set: (value: string) => void) => {
          set('')
        }}
        required
        name='titleCase-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />
      <NumberInput
        titleCase
        enableReset
        required
        name='titleCase-age'
        label="What's your age?"
        placeholder='e.g. 25'
      />
      <RadioGroup titleCase name='titleCase-gender' label='Select gender'>
        <Radio label='Male' value='male' />
        <Radio label='Female' value='female' />
      </RadioGroup>
      <DatePicker
        titleCase
        name='titleCase-dateOfBirth'
        label='Date of birth'
      />
      <TimePicker
        titleCase
        name='titleCase-timeOfBirth'
        label='Time of birth'
      />
      <TagSelector
        titleCase
        name='titleCase-skills'
        label='Your skills'
        inputValue={skillInputValue}
        options={skillOptions}
        onInputChange={setSkillInputValue}
      />
      <CheckboxGroup titleCase name='titleCase-hobbies' label='Your hobbies'>
        <Checkbox label='Skiing' value='skiing' />
        <Checkbox titleCase label='Free diving' value='freeDiving' />
        <Checkbox label='Dancing' value='dancing' />
      </CheckboxGroup>
      <Select
        titleCase
        enableReset
        required
        name='titleCase-businessType'
        label='Business type'
        width='auto'
        options={[
          { value: 0, text: 'Company' },
          { value: 1, text: 'Individual' },
        ]}
      />
      <Autocomplete
        titleCase
        name='titleCase-current_country'
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
      <Rating.Stars
        name='titleCase-rating'
        label='How much do you love Picasso?'
        required
      />
      <Rating.Thumbs
        name='titleCase-thumbs'
        label='Would you recommend picasso?'
        required
      />
      <FileInput
        titleCase
        required
        name='titleCase-resume'
        label='Your resume'
        status='No file selected.'
      />
      <Checkbox
        titleCase
        required
        name='titleCase-legal'
        label='I confirm that I have legal permission from the client to feature this project.'
      />
      <Switch
        titleCase
        name='titleCase-publicProfile'
        label='Public profile'
        width='auto'
      />

      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  )
}

export default Example
