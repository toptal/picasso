import React, { useState, useCallback } from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
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
        name: 'Unknown first name'
      }
    }
  }, [])

  return (
    <Container>
      <Container bottom='medium'>
        <Typography>
          To emulate successful login use &apos;Bruce&apos; as a first name. For
          other values login process will fail.
        </Typography>
      </Container>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          required
          name='name'
          label='First name'
          placeholder='e.g. Bruce'
        />
        <Form.Input
          required
          name='surname'
          label='Last name'
          placeholder='e.g. Wayne'
        />

        <Container top='small'>
          <Button type='submit' loading={isLoading}>
            Login
          </Button>
        </Container>
      </Form>
    </Container>
  )
}

const api = {
  submit: async (values: any) =>
    new Promise(resolve =>
      setTimeout(() => {
        if (values.name.toLowerCase() === 'bruce') {
          resolve('success')
          return
        }

        resolve('fail')
      }, 2000)
    )
}

export default BackendCommunicationExample
