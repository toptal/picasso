import React, { useState, useCallback } from 'react'
import { Button, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'

const BackendCommunicationExample = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { showSuccess, showError } = useNotifications()

  const handleSubmit = useCallback(async (values: any) => {
    setIsLoading(true)
    const result = await api.submit(values)

    setIsLoading(false)
    if (result === 'success') {
      showSuccess('Login successful!')
    } else {
      showError(
        'Login failed! Please try another combination of first and last names.'
      )
      return {
        firstName: 'Unknown first name'
      }
    }
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        required
        name='firstName'
        label='First name'
        placeholder='e.g. Bruce'
      />
      <Form.Input
        required
        name='lastName'
        label='Last name'
        placeholder='e.g. Wayne'
      />

      <Container top='small'>
        <Button type='submit' loading={isLoading}>
          Login
        </Button>
      </Container>
    </Form>
  )
}

const api = {
  submit: async (values: any) =>
    new Promise(resolve => {
      setTimeout(() => {
        if (values.firstName === 'picasso') {
          resolve('success')
          return
        }

        resolve('fail')
      }, 2000)
    })
}

export default BackendCommunicationExample
