# Final Form

Final Form

### Form Spy

Sometimes you might want to perform a conditional action based on the value of another field in the form or its overall state.
            For smaller forms, you can just directly work with values, but with a larger form you can avoid prop drilling with FormSpy.

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import {
  FormSpy,
  FormNonCompound,
  Input,
  SubmitButton,
} from '@toptal/picasso-forms'

const Example = () => (
  <FormNonCompound
    onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
  >
    <Input
      required
      name='firstName'
      label='First name'
      placeholder='e.g. Bruce'
    />

    <FormSpy>
      {({ values }) => (
        <Input
          required
          name='lastName'
          disabled={!values?.firstName}
          label='Last name'
          placeholder='Disabled until first name is filled out'
        />
      )}
    </FormSpy>

    <Container top={SPACING_4}>
      <FormSpy>
        {({ pristine, values }) => {
          const isDisabled = pristine || !values?.lastName

          return (
            <SubmitButton disabled={isDisabled}>
              {isDisabled ? 'Fill out form to enable' : 'Submit'}
            </SubmitButton>
          )
        }}
      </FormSpy>
    </Container>
  </FormNonCompound>
)

export default Example
```

### Deserialization

By default final-form converts all values to strings.
            If want to pass a boolean or a number value to a field, 
            you should pass it serialized and deserialize it later.

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import {
  FormNonCompound,
  RadioGroup,
  Radio,
  SubmitButton,
} from '@toptal/picasso-forms'

const deserializeValue = (value: unknown) => {
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }

  return value
}

const Example = () => (
  <FormNonCompound
    onSubmit={values => {
      console.log('Raw: ', { foo: values.foo })
      console.log('Deserialized: ', { foo: deserializeValue(values.foo) })
    }}
    initialValues={{ foo: 'true' }}
  >
    <RadioGroup name='foo' label='Foo'>
      <Radio label='yes' value='true' />
      <Radio label='no' value='false' />
    </RadioGroup>
    <Container top={SPACING_4}>
      <SubmitButton>Submit</SubmitButton>
    </Container>
  </FormNonCompound>
)

export default Example
```
