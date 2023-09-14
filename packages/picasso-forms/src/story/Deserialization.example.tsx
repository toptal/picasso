import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
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
