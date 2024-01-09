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
