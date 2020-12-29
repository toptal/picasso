import React, { useCallback } from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

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
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }}
    >
      <Form
        onSubmit={handleSuccessSubmit}
        successSubmitMessage='Login successful!'
      >
        <Form.Input
          required
          name='successName'
          label='First name'
          placeholder='e.g. Bruce'
          width='full'
        />
        <Form.Input
          required
          name='successSurname'
          label='Last name'
          placeholder='e.g. Wayne'
          width='full'
        />

        <Container top='small'>
          <Form.SubmitButton
            variant='positive'
            data-testid='success-submit-button'
          >
            Login Success
          </Form.SubmitButton>
        </Container>
      </Form>

      <Form
        onSubmit={handleSubmitWithInlineError}
        failedSubmitMessage='Login failed! Please try another combination of first and last names.'
      >
        <Form.Input
          required
          name='inlineErrorName'
          label='First name'
          placeholder='e.g. Bruce'
          width='full'
        />
        <Form.Input
          required
          name='inlineErrorSurname'
          label='Last name'
          placeholder='e.g. Wayne'
          width='full'
        />

        <Container top='small'>
          <Form.SubmitButton
            variant='negative'
            data-testid='submit-with-inline-error-button'
          >
            Login with Inline Error
          </Form.SubmitButton>
        </Container>
      </Form>

      <Form onSubmit={handleSubmitWithCustomNotificationError}>
        <Form.Input
          required
          name='customNotificationErrorName'
          label='First name'
          placeholder='e.g. Bruce'
          width='full'
        />
        <Form.Input
          required
          name='customNotificationErrorSurname'
          label='Last name'
          placeholder='e.g. Wayne'
          width='full'
        />

        <Container top='small'>
          <Form.SubmitButton
            variant='negative'
            data-testid='submit-with-custom-notification-button'
          >
            Login with Custom Notification Error
          </Form.SubmitButton>
        </Container>
      </Form>
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
      inlineErrorName: 'Unknown first name'
    })
  },
  submitWithCustomNotificationError: (values: any) => {
    console.log('Submit with Custom Notification Errors. Form values:', values)

    return responseWithDelay('Custom Notification Message!')
  }
}

export default BackendCommunicationExample
