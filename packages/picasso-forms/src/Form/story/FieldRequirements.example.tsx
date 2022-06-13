import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const PASSWORD_FIELD = `fieldRequirements-password`
const CONFIRM_PASSWORD_FIELD = `fieldRequirements-confirmPassword`

type FormType = {
  [PASSWORD_FIELD]: string
  [CONFIRM_PASSWORD_FIELD]: string
}

const Example = () => {
  const handleSubmit = ({
    [PASSWORD_FIELD]: password,
    [CONFIRM_PASSWORD_FIELD]: confirmPassword,
  }: FormType) => {
    window.alert(`Password: ${password}, Confirm Password: ${confirmPassword}`)
  }

  return (
    <Form<FormType>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={{
        [PASSWORD_FIELD]: '',
        [CONFIRM_PASSWORD_FIELD]: '',
      }}
    >
      <Form.PasswordInput label='Password' name={PASSWORD_FIELD} required />
      <Form.PasswordInput
        label='Confirm password'
        name={CONFIRM_PASSWORD_FIELD}
        hideRequirements
        required
        validate={(confirmPassword, allValues) => {
          if ((allValues as FormType)[PASSWORD_FIELD] !== confirmPassword) {
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
