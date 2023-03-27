import React from 'react'
import { Container } from '@toptal/picasso'
import {
  FormConfigProps,
  FormNonCompound,
  ConfigProvider,
  SubmitButton,
  Autocomplete,
  DatePicker,
  Input,
  NumberInput,
  PasswordInput,
  RichTextEditor,
  Select,
  TagSelector,
  TimePicker,
} from '@toptal/picasso-forms'

const formConfig: FormConfigProps = {
  highlightAutofill: true,
}

const Example = () => (
  <ConfigProvider value={formConfig}>
    <FormNonCompound
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
      initialValues={{
        'highlight-firstName': 'Bruce',
        'highlight-autocomplete': 'foo',
        'highlight-datepicker': new Date(),
        'highlight-numberinput': 1,
        'highlight-passwordinput': 'password',
        'highlight-rte': '<p>Rich Text Editor</p>',
        'highlight-select': 'foo',
        'highlight-tagselector': 'foo',
        'highlight-timepicker': new Date(),
      }}
    >
      <Input
        required
        name='highlight-firstName'
        label='textinput'
        placeholder='e.g. Bruce'
      />

      <Input
        required
        name='highlight-noDefaultValue'
        label='textinput'
        placeholder='e.g. Bruce'
      />

      <Autocomplete
        label='autocomplete'
        value='foo'
        name='highlight-autocomplete'
      />

      <DatePicker label='datepicker' name='highlight-datepicker' />
      <NumberInput label='numberinput' name='highlight-numberinput' />
      <PasswordInput label='passwordinput' name='highlight-passwordinput' />
      <RichTextEditor id='highlight-rte' label='rte' name='highlight-rte' />
      <Select
        options={[{ value: 'foo', text: 'first option ' }]}
        label='select'
        name='highlight-select'
      />
      <TagSelector
        options={[{ value: 'foo', text: 'first option ' }]}
        label='tagselector'
        name='highlight-tagselector'
        inputValue='foo'
      />
      <TimePicker label='timepicker' name='highlight-timepicker' />

      <Container top='small'>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  </ConfigProvider>
)

export default Example
