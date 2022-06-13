import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

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
    <Form<FormType>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={{
        'fieldRequirements-password': '',
        'fieldRequirements-confirmPassword': '',
      }}
    >
      <Form.PasswordInput
        label='Password'
        name='fieldRequirements-password'
        required
      />
      <Form.PasswordInput
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
      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
