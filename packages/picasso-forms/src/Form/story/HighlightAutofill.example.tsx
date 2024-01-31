import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import type { FormConfigProps } from '@toptal/picasso-forms'
import {
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
import { htmlToHast } from '@toptal/picasso-rich-text-editor/utils'

const formConfig: FormConfigProps = {
  highlightAutofill: true,
}

const april2nd = new Date(2023, 3, 2)

const INITIAL_RTE_VALUE = '<p>Rich Text Editor</p>'

const Example = () => (
  <ConfigProvider value={formConfig}>
    <FormNonCompound
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
      initialValues={{
        'highlight-firstName': 'Bruce',
        'highlight-autocomplete': 'foo',
        'highlight-datepicker': april2nd,
        'highlight-numberinput': 1,
        'highlight-passwordinput': 'password',
        'highlight-rte': INITIAL_RTE_VALUE,
        'highlight-select': 'foo',
        'highlight-tagselector': 'foo',
        'highlight-timepicker': april2nd,
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
      <RichTextEditor
        id='highlight-rte'
        label='rte'
        name='highlight-rte'
        defaultValue={htmlToHast(INITIAL_RTE_VALUE)} // we expect HAST from BE
      />
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

      <Container top={SPACING_4}>
        <SubmitButton id='highlight-autofill-submit-button'>
          Submit
        </SubmitButton>
      </Container>
    </FormNonCompound>
  </ConfigProvider>
)

export default Example
