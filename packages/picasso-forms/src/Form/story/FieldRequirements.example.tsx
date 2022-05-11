import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

type FormType = {
  password: string
  confirmPassword: string
}

const Example = () => {
  const handleSubmit = ({ password, confirmPassword }: FormType) => {
    window.alert(`Password: ${password}, Confirm Password: ${confirmPassword}`)
  }

  return (
    <Form<FormType>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={{
        password: '',
        confirmPassword: ''
      }}
    >
      <Form.PasswordInput
        label='Password'
        name='fieldRequirements.password'
        required
      />
      <Form.PasswordInput
        label='Confirm password'
        name='fieldRequirements.confirmPassword'
        hideRequirements
        required
        validate={(confirmPassword, allValues) => {
          if ((allValues as FormType).password !== confirmPassword) {
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
