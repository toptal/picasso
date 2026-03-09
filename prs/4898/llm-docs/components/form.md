# Form

Form

  Confused between Form from Picasso and Picasso Forms?
  Take a look at this
  [page](/?path=/story/tutorials-difference-between-picasso-forms-and-base-form-components--difference-between-picasso-forms-and-base-form-components).

## Props

### Form

| Name | Type | Default | Description |
|------|------|---------|-------------|
| disableScrollOnError | `boolean` | `false` | Whether to scroll to the failed field on the form error. |
| autoComplete | `on \| off` | - | HTML Form autocomplete attribute.  The autocomplete attribute specifies whether a form should have autocomplete 'on' or 'off'. When autocomplete is 'on', the browser automatically complete values based on values that the user has entered before.  Tip: It is possible to have autocomplete 'on' for the form, and 'off' for specific input fields, or vice versa. |
| debug | `(state: FormState, fieldStates: { [string]: FieldState }) => void` | - | A callback for debugging that receives the form state and the states of all the fields |
| decorators | `Decorator[]` | - | An array of decorators to apply to the form |
| initialValues | `FormValues \| Object` | - | The initial values of the form |
| initialValuesEqual | `(Object \| undefined, Object \| undefined) => boolean` | - | A predicate to determine whether or not the initialValues prop has changed |
| keepDirtyOnReinitialize | `boolean` | - | If true, only pristine values will be overwritten when initialize(newValues) is called |
| mutators | `object: { [string]: Mutator }` | - | Named mutator functions |
| **onSubmit** | `(values: FormValues, form: FormApi, callback: ?(errors: ?Object) => void) => ?Object \| Promise<?Object> \| void` | - | Function to call when the form is submitted |
| subscription | `object: { [string]: boolean }` | - | An object of the parts of FormState (final-form) to subscribe to |
| validate | `(values: FormValues) => Object \| Promise<Object>` | - | A whole-record validation function that takes all the values of the form and returns any validation errors |
| validateOnBlur | `boolean` | `false` | If true, validation will happen on blur. If false, validation will happen on change |
| successSubmitMessage | `ReactNode` | - | Message to display in a tooltip when form submitted successfully |
| failedSubmitMessage | `ReactNode` | - | Message to display in a tooltip when form submission failed |
| scrollOffsetTop | `number` | - | Offset from the viewport for inputs to focus on, defaults to the center of the window (deprecated, will not have any effect) |

### FieldWrapper

| Name | Type | Default | Description |
|------|------|---------|-------------|
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |
| labelEndAdornment | `ReactNode` | - | The label's end adornment |
| **name** | `string` | - | The field name |
| label | `ReactNode` | - | The field label text |
| hint | `string` | - | The hint of the field with some additional information |
| required | `boolean` | - | Makes field to be required in the form |
| afterSubmit | `() => void` | - | A callback to notify fields after submission has completed successfully |
| allowNull | `boolean` | - | By default null value is converted to empty string |
| beforeSubmit | `() => void \| false` | - | A function to call just before calling onSubmit |
| data | `object` | - | Initial state for arbitrary values to be placed by mutators |
| defaultValue | `any` | - | Default value of the field upon creation |
| format | `(value: any, name: string) => any` | - | A function that takes the value from the form values and the name of the field and formats the value to give to the input |
| formatOnBlur | `boolean` | - | If true, the format function will only be called when the field is blurred. If false, format will be called on every render |
| initialValue | `any` | - | The initial value for the field |
| isEqual | `(a: any, b: any) => boolean` | - | A function to determine if two values are equal |
| parse | `(value: any, name: string) => any` | - | A function that takes the value from the input and name of the field and converts the value into the value you want stored as this field's value in the form |
| status | `OutlinedFieldStatus: "default" \| "error" \| "warning" \| "success"` | - | The status of the field to be used by the OutlinedInput component |
| subscription | `object: { [string]: boolean }` | - | An object of the parts of FieldState (final-form) to subscribe to |
| validate | `(value: ?any, allValues: Object, meta: ?FieldState) => ?any` | - | A function that takes the field value, all the values of the form and the meta data about the field and returns an error if the value is invalid, or undefined if the value is valid |
| validateFields | `string[]` | - | An array of field names to validate when this field changes |
| <all field props> | `any` | - | This component also accepts all the native props from the corresponding form component, ex. Form.Input accepts all the Picasso Input props |
| autoSaveIndicator | `ReactNode` | - | instance of FormAutoSaveIndicator component |

Form is a wrapper for 'react-final-form' Form component.
The rest of the form components can be imported from `@toptal/picasso-forms`

### Default

A general look of the form includes the examples of all the input
types supported by picasso-forms.

```tsx
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
```

### Horizontal

Horizontal form with responsive design. Use "FormActionsContainer" component to align form actions according to the form layout or use "useFieldsLayoutContext()" hook to get access to the current form layout.

```tsx
import React, { useState } from 'react'
import {
  Button,
  Container,
  FormActionsContainer,
  Info16,
  Tooltip,
} from '@toptal/picasso'
import { SPACING_4, isSubstring, SPACING_1 } from '@toptal/picasso/utils'
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
  'horizontal-gender': 'female',
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
        name='horizontal-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />
      <Input
        required
        name='horizontal-lastName'
        label='Last name'
        placeholder='e.g. Wayne'
        size='small'
      />
      <Input
        required
        name='horizontal-nickName'
        label='Nick name'
        placeholder='e.g. Batman'
      />
      <Input
        required
        name='horizontal-website'
        label='Website'
        placeholder='e.g. google.com'
        size='large'
      />
      <Input
        name='horizontal-multiline'
        label='Description'
        multiline
        rows={4}
      />
      <RichTextEditor
        name='horizontal-richTextEditorName'
        id='horizontal-richTextEditorName'
        label='Rich text editor'
      />
      <Dropzone label='Attachments' required name='horizontal-attachments' />
      <AvatarUpload
        label='Profile photo xxsmall'
        required
        name='horizontal-avatarUpload-xxsmall'
        size='xxsmall'
      />
      <AvatarUpload
        label='Profile photo xsmall'
        required
        name='horizontal-avatarUpload-xsmall'
        size='xsmall'
      />
      <AvatarUpload
        label='Profile photo'
        required
        name='horizontal-avatarUpload-small'
      />
      <AvatarUpload
        label='Profile photo medium'
        required
        name='horizontal-avatarUpload-medium'
        size='medium'
      />
      <AvatarUpload
        label='Profile photo large'
        required
        name='horizontal-avatarUpload-large'
        size='large'
      />
      <NumberInput
        enableReset
        name='horizontal-age'
        label="What's your age?"
        placeholder='e.g. 25'
        labelEndAdornment={
          <Container inline left={SPACING_1}>
            <Tooltip content='Content goes here...' placement='right'>
              <Button.Circular variant='flat' icon={<Info16 />} />
            </Tooltip>
          </Container>
        }
      />
      <RadioGroup
        name='horizontal-gender'
        label='Gender'
        required
        labelEndAdornment={
          <Container inline left={SPACING_1}>
            <Tooltip content='Content goes here...' placement='right'>
              <Button.Circular variant='flat' icon={<Info16 />} />
            </Tooltip>
          </Container>
        }
      >
        <Radio label='Male' value='male' />
        <Radio label='Female' value='female' />
      </RadioGroup>
      <RadioGroup name='horizontal-language-radio' label='Languages'>
        <Radio label='English' value='english' />
        <Radio label='French' value='french' />
        <Radio label='German' value='german' />
      </RadioGroup>
      <RadioGroup
        name='horizontal-gender-2'
        label='Gender'
        horizontal
        spacing={8}
      >
        <ButtonRadio value='male'>Male</ButtonRadio>
        <ButtonRadio value='female'>Female</ButtonRadio>
      </RadioGroup>
      <CheckboxGroup name='horizontal-hobbies' label='Hobbies'>
        <Checkbox label='Skiing' value='skiing' />
        <Checkbox label='Free diving' value='freeDiving' />
        <Checkbox label='Dancing' value='dancing' />
      </CheckboxGroup>
      <CheckboxGroup name='horizontal-language' label='Languages'>
        <Checkbox label='English' value='english' />
        <Checkbox label='French' value='french' />
      </CheckboxGroup>
      <CheckboxGroup
        name='horizontal-hobbies-buttons'
        label='Hobbies'
        horizontal
        spacing={8}
      >
        <ButtonCheckbox value='skiing'>Skiing</ButtonCheckbox>
        <ButtonCheckbox value='freeDiving'>Free diving</ButtonCheckbox>
        <ButtonCheckbox value='dancing'>Dancing</ButtonCheckbox>
      </CheckboxGroup>
      <DatePicker name='horizontal-dateOfBirth' label='Date of birth' />
      <TimePicker name='horizontal-timeOfBirth' label='Time of birth' />
      <TagSelector
        name='horizontal-skills'
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
        name='horizontal-businessType'
        label='Business type'
        width='auto'
        options={[
          { value: 0, text: 'Company' },
          { value: 1, text: 'Individual' },
        ]}
      />
      <Select
        name='horizontal-origin_country'
        label='Origin country'
        width='auto'
        options={countries}
      />
      <Autocomplete
        name='horizontal-current_country'
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
        name='horizontal-rating'
        label='How much do you love Picasso?'
        required
      />
      <Rating.Thumbs
        name='horizontal-thumbs'
        label='Would you recommend Picasso?'
        required
      />
      <FileInput
        required
        name='horizontal-resume'
        label='Resume'
        status='No file selected.'
      />
      <Checkbox
        required
        name='horizontal-legal'
        label='I confirm that I have legal permission from the client to feature this project.'
      />
      <Switch
        name='horizontal-publicProfile'
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
```

### Horizontal with custom label width

Customize the label width of your horizontal form, so it doesn't have too much empty space

```tsx
import { FormNonCompound as Form, Input } from '@toptal/picasso-forms'
import React from 'react'

const Example = () => {
  return (
    <Form
      autoComplete='off'
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
      layout='horizontal'
      labelWidth={{ md: 4, lg: 3, xl: 2 }}
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
    </Form>
  )
}

export default Example
```

### Custom validator

We have a 'required' validator included by default to each input type,
however, you may need custom validators for more complex types of fields.

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import {
  FormNonCompound,
  Input,
  NumberInput,
  SubmitButton,
} from '@toptal/picasso-forms'

const minMaxValidator = (value?: string | number) => {
  if (value === undefined) {
    return undefined
  }

  const number = Number(value)

  if (number < 0) {
    return "Age can't be negative"
  }

  if (number > 120) {
    return "Age can't have value more than 120 years"
  }

  return undefined
}

const CustomValidatorExample = () => (
  <FormNonCompound
    onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
  >
    <Input
      required
      name='customValidator-userName'
      label='First name'
      placeholder='e.g. Bruce'
    />
    <NumberInput
      required
      validate={minMaxValidator}
      name='customValidator-userAge'
      label="What's your age?"
      placeholder='e.g. 25'
    />

    <Container top={SPACING_4}>
      <SubmitButton>Submit</SubmitButton>
    </Container>
  </FormNonCompound>
)

export default CustomValidatorExample
```

### Change form input value

When you use picasso-forms your form input components are no longer
      completely controlled and they are controlled by final-form, which
      gives you the opportunity to rely on it with displaying errors,
      validations, etc.

      However, sometimes you may need to be able to modify the form input
      value.

```tsx
import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { FormNonCompound, Input, SubmitButton } from '@toptal/picasso-forms'

const ParseInputExample = () => (
  <FormNonCompound
    onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
  >
    <Container bottom={SPACING_4}>
      <Typography size='medium'>
        I want to trim my first name from the empty spaces:
      </Typography>
    </Container>
    <Container flex alignItems='flex-end'>
      <Input
        name='parseInput-firstName'
        label='First name'
        placeholder='e.g. Bruce'
        parse={(value: string) => value.trim()}
        limit={24}
      />

      <Container left={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </Container>
  </FormNonCompound>
)

export default ParseInputExample
```

### Backend communication

The form usually need to send data to backend, so we need to have
        backend communication and display the process of submission and
        the results. The form-level results are represented by notifications.

```tsx
import React, { useCallback } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { FormNonCompound, Input, SubmitButton } from '@toptal/picasso-forms'

const BackendCommunicationExample = () => {
  const handleSuccessSubmit = useCallback(
    (values: any) => api.successSubmit(values),
    []
  )
  const handleSubmitWithInlineError = useCallback(
    (values: any) => api.submitWithInlineError(values),
    []
  )
  const handleSubmitWithCustomNotificationError = useCallback(
    (values: any) => api.submitWithCustomNotificationError(values),
    []
  )

  return (
    <Container
      style={{
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      <FormNonCompound
        onSubmit={handleSuccessSubmit}
        successSubmitMessage='Login successful!'
      >
        <Input
          required
          name='backendCommunication-successName'
          label='First name'
          placeholder='e.g. Bruce'
          width='full'
        />
        <Input
          required
          name='backendCommunication-successSurname'
          label='Last name'
          placeholder='e.g. Wayne'
          width='full'
        />

        <Container top={SPACING_4}>
          <SubmitButton variant='positive' data-testid='success-submit-button'>
            Login Success
          </SubmitButton>
        </Container>
      </FormNonCompound>

      <FormNonCompound
        onSubmit={handleSubmitWithInlineError}
        failedSubmitMessage='Login failed! Please try another combination of first and last names.'
      >
        <Input
          required
          name='backendCommunication-inlineErrorName'
          label='First name'
          placeholder='e.g. Bruce'
          width='full'
        />
        <Input
          required
          name='backendCommunication-inlineErrorSurname'
          label='Last name'
          placeholder='e.g. Wayne'
          width='full'
        />

        <Container top={SPACING_4}>
          <SubmitButton
            variant='negative'
            data-testid='submit-with-inline-error-button'
          >
            Login with Inline Error
          </SubmitButton>
        </Container>
      </FormNonCompound>

      <FormNonCompound onSubmit={handleSubmitWithCustomNotificationError}>
        <Input
          required
          name='backendCommunication-customNotificationErrorName'
          label='First name'
          placeholder='e.g. Bruce'
          width='full'
        />
        <Input
          required
          name='backendCommunication-customNotificationErrorSurname'
          label='Last name'
          placeholder='e.g. Wayne'
          width='full'
        />

        <Container top={SPACING_4}>
          <SubmitButton
            variant='negative'
            data-testid='submit-with-custom-notification-button'
          >
            Login with Custom Notification Error
          </SubmitButton>
        </Container>
      </FormNonCompound>
    </Container>
  )
}

// the emulation of the api call
const responseWithDelay = async (response: any) =>
  new Promise(resolve => setTimeout(() => resolve(response), 2000))

const api = {
  successSubmit: (values: any) => {
    // do something with received values
    console.log('Success submit. Form values:', values)

    return responseWithDelay(undefined)
  },
  submitWithInlineError: (values: any) => {
    console.log('Submit with Inline Errors. Form values:', values)

    return responseWithDelay({
      'backendCommunication-inlineErrorName': 'Unknown first name',
    })
  },
  submitWithCustomNotificationError: (values: any) => {
    console.log('Submit with Custom Notification Errors. Form values:', values)

    return responseWithDelay('Custom Notification Message!')
  },
}

export default BackendCommunicationExample
```

### Form Level Configurations

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import type { FormConfigProps } from '@toptal/picasso-forms'
import {
  FormNonCompound,
  ConfigProvider,
  Input,
  SubmitButton,
} from '@toptal/picasso-forms'

const formConfig: FormConfigProps = {
  requiredVariant: 'asterisk',
}

const Example = () => (
  <ConfigProvider value={formConfig}>
    <FormNonCompound
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
    >
      <Input
        required
        name='formConfig-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />

      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  </ConfigProvider>
)

export default Example
```

### Validate only on submit

All fields should not show any validation error messages until submission is made.

```tsx
import React, { useCallback } from 'react'
import { useField } from 'react-final-form'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import {
  FormNonCompound,
  Checkbox,
  Input,
  DatePicker,
  ConfigProvider,
  SubmitButton,
} from '@toptal/picasso-forms'

type FormType = {
  'validateOnSubmit-hide': boolean
  'validateOnSubmit-name': {
    first: string
    last: string
  }
  'validateOnSubmit-dob': string
}

const FormContent = () => {
  const {
    input: { value: hide },
  } = useField('validateOnSubmit-hide')

  return (
    <>
      <Checkbox
        name='validateOnSubmit-hide'
        label='Check to hide fields below'
      />

      {!hide && (
        <>
          <Input
            enableReset
            required
            name='validateOnSubmit-name.first'
            label='Your first name'
            placeholder='e.g. Bruce'
          />
          <Input
            enableReset
            required
            name='validateOnSubmit-name.last'
            label='Your last name'
            placeholder='e.g. Wayne'
          />
          <DatePicker required name='validateOnSubmit-dob' label='DOB' />
        </>
      )}
    </>
  )
}

const Example = () => {
  const handleSubmit = useCallback((values: FormType) => api.submit(values), [])

  return (
    <ConfigProvider value={{ validateOnSubmit: true }}>
      <FormNonCompound<FormType>
        onSubmit={handleSubmit}
        successSubmitMessage='Success!'
        failedSubmitMessage='Failure!'
      >
        <FormContent />

        <Container top={SPACING_4}>
          <SubmitButton>Submit</SubmitButton>
        </Container>
      </FormNonCompound>
    </ConfigProvider>
  )
}

// the emulation of the api call
const responseWithDelay = async (response: any) =>
  new Promise(resolve => setTimeout(() => resolve(response), 2000))

const api = {
  submit: async ({
    'validateOnSubmit-name': name,
    'validateOnSubmit-hide': hide,
  }: FormType) => {
    if (hide || name?.first.toLowerCase() === 'bruce') {
      return responseWithDelay(undefined)
    }

    return responseWithDelay({
      name: {
        first: 'Unknown first name',
      },
    })
  },
}

export default Example
```

### File input on a Form

Showcase how to upload files on the form submission

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { FormNonCompound, FileInput, SubmitButton } from '@toptal/picasso-forms'
import type { FileUpload } from '@toptal/picasso/FileInput'

type FormType = {
  'fileInput-attachments': FileUpload[]
}

const Example = () => {
  const MAX_SIZE = 2
  const initialAttachments = [
    { file: new File(['image.png'], 'image.png') },
    { file: new File(['resume.pdf'], 'resume.pdf') },
  ]

  const handleSubmit = ({ 'fileInput-attachments': attachments }: FormType) => {
    window.alert(
      `Uploading: ${attachments.map(({ file }) => file.name).join(', ')}`
    )
  }

  return (
    <FormNonCompound<FormType>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={{
        'fileInput-attachments': initialAttachments,
      }}
    >
      <FileInput
        name='fileInput-attachments'
        hint={`Max file size: ${MAX_SIZE}MB.`}
      />
      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  )
}

export default Example
```

### Dropzone on a Form

Showcase how to upload files on the form submission using dropzone

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { FormNonCompound, Dropzone, SubmitButton } from '@toptal/picasso-forms'
import type { FileUpload } from '@toptal/picasso/FileInput'

type FormType = {
  'dropzone-attachments': FileUpload[]
}

const Example = () => {
  const MAX_SIZE = 2
  const initialAttachments = [{ file: new File(['resume.pdf'], 'resume.pdf') }]

  const handleSubmit = ({ 'dropzone-attachments': attachments }: FormType) => {
    window.alert(
      `Uploading: ${attachments.map(({ file }) => file.name).join(', ')}`
    )
  }

  return (
    <FormNonCompound<FormType>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={{
        'dropzone-attachments': initialAttachments,
      }}
    >
      <Dropzone
        required
        name='dropzone-attachments'
        dropzoneHint={`Max file size: ${MAX_SIZE}MB.`}
        hint='These documents will be used to analyze and identify your potential.'
      />
      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  )
}

export default Example
```

### Title case

Display the field's label in title case.

```tsx
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
```

### No scrolling case

Showcase Form's behavior on form submission error.

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { FormNonCompound, Input, SubmitButton } from '@toptal/picasso-forms'

const failWithAnError = () => ({
  fieldName: 'This form will always blame on a wrong user name',
})

const NoScrollingExample = () => (
  <Container>
    <Container top={SPACING_4}>
      <FormNonCompound onSubmit={failWithAnError}>
        <Input
          required
          name='noScrollingDefault-fieldName'
          label='With scrolling'
          placeholder='Some field'
        />
        <Container top={SPACING_4}>
          <SubmitButton>Submit</SubmitButton>
        </Container>
      </FormNonCompound>
    </Container>

    <Container top={SPACING_4}>
      <FormNonCompound disableScrollOnError onSubmit={failWithAnError}>
        <Input
          required
          name='noScrollingDisableScroll-fieldName'
          label='No scrolling'
          placeholder='Some field'
        />
        <Container top={SPACING_4}>
          <SubmitButton>Submit</SubmitButton>
        </Container>
      </FormNonCompound>
    </Container>
  </Container>
)

export default NoScrollingExample
```

### Rich text editor

Showcase how to use RichTextEditor in the form.

```tsx
import React from 'react'
import type { ASTType } from '@toptal/picasso-rich-text-editor'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import {
  FormNonCompound,
  RichTextEditor,
  SubmitButton,
} from '@toptal/picasso-forms'

const DEFAULT_EXAMPLE: ASTType = {
  type: 'root',
  children: [{ type: 'text', value: 'Example of default text' }],
}

const RichTextEditorExample = () => (
  <FormNonCompound onSubmit={data => window.alert(JSON.stringify(data))}>
    <Container bottom={SPACING_4}>
      <RichTextEditor
        required
        defaultValue={DEFAULT_EXAMPLE}
        label='Text editor'
        id='editor'
        name='richTextEditor-editor'
      />
    </Container>

    <SubmitButton>Submit</SubmitButton>
  </FormNonCompound>
)

export default RichTextEditorExample
```

### Field requirements

Showcase how to display field requirements.

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import {
  FormNonCompound,
  PasswordInput,
  SubmitButton,
} from '@toptal/picasso-forms'

type FormType = {
  'fieldRequirements-password': string
  'fieldRequirements-confirmPassword': string
}

const Example = () => {
  const handleSubmit = ({
    'fieldRequirements-password': password,
    'fieldRequirements-confirmPassword': confirmPassword,
  }: FormType) => {
    window.alert(`Password: ${password}, Confirm Password: ${confirmPassword}`)
  }

  return (
    <FormNonCompound<FormType>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={{
        'fieldRequirements-password': '',
        'fieldRequirements-confirmPassword': '',
      }}
    >
      <PasswordInput
        label='Password'
        name='fieldRequirements-password'
        required
      />
      <PasswordInput
        label='Confirm password'
        name='fieldRequirements-confirmPassword'
        hideRequirements
        required
        validate={(confirmPassword, allValues) => {
          if (
            (allValues as FormType)['fieldRequirements-password'] !==
            confirmPassword
          ) {
            return 'Passwords do not match'
          }
        }}
      />
      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  )
}

export default Example
```

### Form Level Status Configuration

Showcase how to enable success status via form configuration.

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import type { FormConfigProps } from '@toptal/picasso-forms'
import {
  FormNonCompound,
  ConfigProvider,
  Input,
  SubmitButton,
} from '@toptal/picasso-forms'

const formConfig: FormConfigProps = {
  showValidState: true,
}

const Example = () => (
  <ConfigProvider value={formConfig}>
    <FormNonCompound
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
    >
      <Input
        required
        name='status-firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />

      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  </ConfigProvider>
)

export default Example
```

### AvatarUpload

Showcase how to handle avatar upload with external upload service.

```tsx
import React, { useState } from 'react'
import type {
  AvatarUploadFileUpload,
  AvatarUploadFileRejection,
} from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Container } from '@toptal/picasso'
import {
  FormNonCompound as Form,
  useForm,
  AvatarUpload,
  SubmitButton,
} from '@toptal/picasso-forms'

type FormType = {
  avatarUpload: AvatarUploadFileUpload
}

const FormRenderer = () => {
  const { change } = useForm()
  const [uploading, setUploading] = useState<boolean>(false)

  const handleDrop = (
    acceptedFile: File | null,
    fileRejection: AvatarUploadFileRejection | null
  ) => {
    if (acceptedFile) {
      // simulate upload with external upload service
      const reader = new FileReader()

      reader.readAsDataURL(acceptedFile)

      reader.onload = () => {
        setUploading(true)

        setTimeout(() => {
          setUploading(false)

          // set result of upload to form
          change('avatarUpload', { src: reader.result as string })
        }, 1000)
      }

      reader.onerror = error => {
        console.log('Error: upload failed, ', error)
      }
    } else if (fileRejection) {
      // file rejected
      console.log(fileRejection.errors.join(', '))
    }
  }

  return (
    <>
      <AvatarUpload
        required
        name='avatarUpload'
        onDrop={handleDrop}
        uploading={uploading}
      />

      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </>
  )
}

const Example = () => {
  const handleSubmit = ({ avatarUpload }: FormType) => {
    window.alert(`src: ${avatarUpload.src}`)
  }

  return (
    <Form<FormType> autoComplete='off' onSubmit={handleSubmit}>
      <FormRenderer />
    </Form>
  )
}

export default Example
```

### Auto-save

Showcase how to use auto-save functionality.

```tsx
import React, { useCallback, useState } from 'react'
import { Container, FormAutoSaveIndicator, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'
import type { ChangedFields } from '@toptal/picasso-forms'
import {
  FormNonCompound as Form,
  useFormAutoSave,
  Input,
  RichTextEditor,
  SubmitButton,
} from '@toptal/picasso-forms'

// the emulation of the api call
const saveWithDelay = async () =>
  new Promise(resolve => setTimeout(() => resolve('success'), 2000))

interface FormData {
  'autoSave-firstName'?: string
  'autoSave-lastName'?: string
  'autoSave-about'?: string
  'autoSave-bio'?: string
}

const autoSaveSubscribedFields: (keyof FormData)[] = [
  'autoSave-about',
  'autoSave-bio',
]

const Example = () => {
  const [autoSaveValues, setAutoSaveValues] = useState<FormData>({
    'autoSave-firstName': undefined,
    'autoSave-lastName': undefined,
    'autoSave-about': undefined,
    'autoSave-bio': undefined,
  })

  const handleFormValuesChange = useCallback(
    async (changedFields: ChangedFields<FormData>, values: FormData) => {
      await saveWithDelay()

      setAutoSaveValues(values)
    },
    []
  )

  const { autoSaveDecorator, savingFields } = useFormAutoSave({
    subscribedFields: autoSaveSubscribedFields,
    onFormValuesChange: handleFormValuesChange,
  })

  return (
    <Form<FormData>
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
      decorators={[autoSaveDecorator]}
    >
      <Container flex direction='row' gap={SPACING_6}>
        <Container>
          <Input
            required
            name='autoSave-firstName'
            label='First name'
            placeholder='e.g. Bruce'
          />
          <Input
            required
            name='autoSave-lastName'
            label='Last name'
            placeholder='e.g. Wayne'
          />
          <Input
            required
            name='autoSave-about'
            multiline
            limit={100}
            rows={5}
            label='About'
            hint='Tell us about yourself'
            placeholder='Please tell us about yourself'
            autoSaveIndicator={
              <FormAutoSaveIndicator
                saving={savingFields?.['autoSave-about']}
              />
            }
          />
          <RichTextEditor
            id='autoSave-rich-text-editor'
            label='Bio'
            required
            name='autoSave-bio'
            hint='Write a short bio'
            placeholder='Write a short bio'
            minLength={5}
            maxLength={25}
            autoSaveIndicator={
              <FormAutoSaveIndicator saving={savingFields?.['autoSave-bio']} />
            }
          />
        </Container>
        <Container variant='grey' padded={SPACING_6}>
          <Typography size='small'>
            Values should be updated only after subscribed fields changes.
          </Typography>
          <pre style={{ width: 500 }}>
            Saved values: {JSON.stringify(autoSaveValues, undefined, 2)}
          </pre>
          {(savingFields?.['autoSave-bio'] ||
            savingFields?.['autoSave-about']) && (
            <Typography size='medium'>Saving...</Typography>
          )}
        </Container>
      </Container>

      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
```

### Highlight fields with default value

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
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
```
