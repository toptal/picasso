// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Form } from '@toptal/picasso-forms'
import React from 'react'

const Example = () => {
  return (
    <Form autoComplete='off' onSubmit={values => () => values}>
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
      <Form.TagSelector name='default-skills' label='Skills' />
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
      />
      <Form.Autocomplete
        name='default-current_country'
        label='Current country'
        placeholder='Start typing country...'
        width='auto'
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
        name='default-resume'
        label='Resume'
        status='No file selected.'
      />
      <Form.Dropzone label='Attachments' required name='default-attachments' />
      <Form.AvatarUpload
        label='Profile photo'
        required
        name='default-avatarUpload'
      />
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

      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form>
  )
}
