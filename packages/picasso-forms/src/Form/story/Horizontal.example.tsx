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
  RichTextEditor,
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

// eslint-disable-next-line max-lines-per-function
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
        size='small'
      />
      <Input
        required
        name='default-nickName'
        label='Nick name'
        placeholder='e.g. Batman'
      />
      <Input
        required
        name='default-website'
        label='Website'
        placeholder='e.g. google.com'
        size='large'
      />
      <Input name='default-multiline' label='Description' multiline rows={4} />
      <RichTextEditor
        name='default-richTextEditorName'
        id='default-richTextEditorName'
        label='Rich text editor'
      />
      <Dropzone label='Attachments' required name='default-attachments' />
      <AvatarUpload
        label='Profile photo xxsmall'
        required
        name='default-avatarUpload-xxsmall'
        size='xxsmall'
      />
      <AvatarUpload
        label='Profile photo xsmall'
        required
        name='default-avatarUpload-xsmall'
        size='xsmall'
      />
      <AvatarUpload
        label='Profile photo'
        required
        name='default-avatarUpload-small'
      />
      <AvatarUpload
        label='Profile photo medium'
        required
        name='default-avatarUpload-medium'
        size='medium'
      />
      <AvatarUpload
        label='Profile photo large'
        required
        name='default-avatarUpload-large'
        size='large'
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
      <RadioGroup name='default-language-radio' label='Languages'>
        <Radio label='English' value='english' />
        <Radio label='French' value='french' />
        <Radio label='German' value='german' />
      </RadioGroup>
      <RadioGroup name='default-gender' label='Gender' horizontal spacing={8}>
        <ButtonRadio value='male'>Male</ButtonRadio>
        <ButtonRadio value='female'>Female</ButtonRadio>
      </RadioGroup>
      <CheckboxGroup name='default-hobbies' label='Hobbies'>
        <Checkbox label='Skiing' value='skiing' />
        <Checkbox label='Free diving' value='freeDiving' />
        <Checkbox label='Dancing' value='dancing' />
      </CheckboxGroup>
      <CheckboxGroup name='default-language' label='Languages'>
        <Checkbox label='English' value='english' />
        <Checkbox label='French' value='french' />
      </CheckboxGroup>
      <CheckboxGroup
        name='default-hobbies-buttons'
        label='Hobbies'
        horizontal
        spacing={8}
      >
        <ButtonCheckbox value='skiing'>Skiing</ButtonCheckbox>
        <ButtonCheckbox value='freeDiving'>Free diving</ButtonCheckbox>
        <ButtonCheckbox value='dancing'>Dancing</ButtonCheckbox>
      </CheckboxGroup>
      <DatePicker name='default-dateOfBirth' label='Date of birth' />
      <TimePicker name='default-timeOfBirth' label='Time of birth' />
      <TagSelector
        name='default-skills'
        label='Skills'
        inputValue={skillInputValue}
        options={skillOptions}
        onInputChange={setSkillInputValue}
      />
      <FileInput
        name='file'
        id='file'
        label='Upload file'
        buttonLabel='Upload File'
        hint='Max file size: 25MB'
      />
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
        label='Would you recommend Picasso?'
        required
      />
      <FileInput
        required
        name='default-resume'
        label='Resume'
        status='No file selected.'
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
