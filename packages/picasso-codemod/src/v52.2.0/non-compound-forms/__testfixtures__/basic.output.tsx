// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  FormNonCompound,
  Input,
  NumberInput,
  RadioGroup,
  Radio,
  ButtonRadio,
  DatePicker,
  TimePicker,
  TagSelector,
  CheckboxGroup,
  Checkbox,
  ButtonCheckbox,
  Select,
  Autocomplete,
  Rating,
  FileInput,
  Dropzone,
  AvatarUpload,
  Switch,
  SubmitButton,
} from '@toptal/picasso-forms'
import React from 'react'

const Example = () => {
  return (
    <FormNonCompound autoComplete='off' onSubmit={values => () => values}>
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
      <TagSelector name='default-skills' label='Skills' />
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
      />
      <Autocomplete
        name='default-current_country'
        label='Current country'
        placeholder='Start typing country...'
        width='auto'
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

      <SubmitButton>Submit</SubmitButton>
    </FormNonCompound>
  )
}
