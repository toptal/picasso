import React, { useState } from 'react'
import { FormActionsContainer } from '@toptal/picasso'
import { SPACING_4, isSubstring } from '@toptal/picasso-utils'
import type { Item } from '@toptal/picasso/Autocomplete'
import {
  FormNonCompound as Form,
  NumberInput,
  Input,
  RadioGroup,
  Radio,
  SubmitButton,
  ButtonRadio,
  CheckboxGroup,
  Checkbox,
  DatePicker,
  TimePicker,
  ButtonCheckbox,
  Autocomplete,
  FileInput,
  Dropzone,
  AvatarUpload,
  Rating,
  TagSelector,
  Select,
  Switch,
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

const initialValues = {
  'default-gender': 'female',
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
      initialValues={initialValues}
      layout='horizontal'
    >
      <Input
        enableReset
        onResetClick={(set: (value: string) => void) => {
          set('')
        }}
        required
        name='default-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />
      <Input
        required
        name='default-lastName'
        label='Last name'
        placeholder='e.g. Wayne'
      />
      <NumberInput
        enableReset
        required
        name='default-age'
        label="What's your age?"
        placeholder='e.g. 25'
      />
      <RadioGroup name='default-gender' label='Gender'>
        <Radio label='Male' value='male' />
        <Radio label='Female' value='female' />
      </RadioGroup>
      <RadioGroup name='default-gender' label='Gender' horizontal spacing={8}>
        <ButtonRadio value='male'>Male</ButtonRadio>
        <ButtonRadio value='female'>Female</ButtonRadio>
      </RadioGroup>
      <DatePicker name='default-dateOfBirth' label='Date of birth' />
      <TimePicker name='default-timeOfBirth' label='Time of birth' />
      <TagSelector
        name='default-skills'
        label='Skills'
        inputValue={skillInputValue}
        options={skillOptions}
        onInputChange={setSkillInputValue}
      />
      <CheckboxGroup name='default-hobbies' label='Hobbies'>
        <Checkbox label='Skiing' value='skiing' />
        <Checkbox label='Free diving' value='freeDiving' />
        <Checkbox label='Dancing' value='dancing' />
      </CheckboxGroup>
      <CheckboxGroup
        name='default-hobbies'
        label='Hobbies'
        horizontal
        spacing={8}
      >
        <ButtonCheckbox value='skiing'>Skiing</ButtonCheckbox>
        <ButtonCheckbox value='freeDiving'>Free diving</ButtonCheckbox>
        <ButtonCheckbox value='dancing'>Dancing</ButtonCheckbox>
      </CheckboxGroup>
      <Select
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
      <Select
        name='default-origin_country'
        label='Origin country'
        width='auto'
        options={countries}
      />
      <Autocomplete
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
      <Rating.Stars
        name='default-rating'
        label='How much do you love Picasso?'
        required
      />
      <Rating.Thumbs
        name='default-thumbs'
        label='Would you recommend picasso?'
        required
      />
      <FileInput
        required
        name='default-resume'
        label='Resume'
        status='No file selected.'
      />
      <Dropzone label='Attachments' required name='default-attachments' />
      <AvatarUpload
        label='Profile photo'
        required
        name='default-avatarUpload'
      />
      <Checkbox
        required
        name='default-legal'
        label='I confirm that I have legal permission from the client to feature this project.'
      />
      <Switch
        name='default-publicProfile'
        label='Public Profile'
        width='auto'
      />

      <FormActionsContainer top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </FormActionsContainer>
    </Form>
  )
}

export default Example
