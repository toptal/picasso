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
