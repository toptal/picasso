import React, { useCallback } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { FormNonCompound, Input, SubmitButton } from '@toptal/picasso-forms'

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
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      <FormNonCompound
        onSubmit={handleSuccessSubmit}
        successSubmitMessage='Login successful!'
      >
        <Input
          required
          name='backendCommunication-successName'
          label='First name'
          placeholder='e.g. Bruce'
          width='full'
        />
        <Input
          required
          name='backendCommunication-successSurname'
          label='Last name'
          placeholder='e.g. Wayne'
          width='full'
        />

        <Container top={SPACING_4}>
          <SubmitButton variant='positive' data-testid='success-submit-button'>
            Login Success
          </SubmitButton>
        </Container>
      </FormNonCompound>

      <FormNonCompound
        onSubmit={handleSubmitWithInlineError}
        failedSubmitMessage='Login failed! Please try another combination of first and last names.'
      >
        <Input
          required
          name='backendCommunication-inlineErrorName'
          label='First name'
          placeholder='e.g. Bruce'
          width='full'
        />
        <Input
          required
          name='backendCommunication-inlineErrorSurname'
          label='Last name'
          placeholder='e.g. Wayne'
          width='full'
        />

        <Container top={SPACING_4}>
          <SubmitButton
            variant='negative'
            data-testid='submit-with-inline-error-button'
          >
            Login with Inline Error
          </SubmitButton>
        </Container>
      </FormNonCompound>

      <FormNonCompound onSubmit={handleSubmitWithCustomNotificationError}>
        <Input
          required
          name='backendCommunication-customNotificationErrorName'
          label='First name'
          placeholder='e.g. Bruce'
          width='full'
        />
        <Input
          required
          name='backendCommunication-customNotificationErrorSurname'
          label='Last name'
          placeholder='e.g. Wayne'
          width='full'
        />

        <Container top={SPACING_4}>
          <SubmitButton
            variant='negative'
            data-testid='submit-with-custom-notification-button'
          >
            Login with Custom Notification Error
          </SubmitButton>
        </Container>
      </FormNonCompound>
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
      'backendCommunication-inlineErrorName': 'Unknown first name',
    })
  },
  submitWithCustomNotificationError: (values: any) => {
    console.log('Submit with Custom Notification Errors. Form values:', values)

    return responseWithDelay('Custom Notification Message!')
  },
}

export default BackendCommunicationExample
