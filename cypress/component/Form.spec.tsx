/* eslint-disable react/no-array-index-key */
import React, { useCallback, useState } from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'

const RESPONSE_TIME = 1000
const ANIMATION_TIME = 300

// the emulation of the api call
const responseWithDelay = async (response: any) =>
  new Promise(resolve => setTimeout(() => resolve(response), RESPONSE_TIME))

const api = {
  successSubmit: (values: any) => {
    // do something with received values
    console.log('Success submit. Form values:', values)

    return responseWithDelay(undefined)
  },
  submitWithInlineError: (values: any) => {
    console.log('Submit with Inline Errors. Form values:', values)

    return responseWithDelay({
      inlineErrorName: 'Unknown first name',
    })
  },
  submitWithCustomNotificationError: (values: any) => {
    console.log('Submit with Custom Notification Errors. Form values:', values)

    return responseWithDelay('Custom Notification Message!')
  },
}

const FormExample = () => {
  const [state, setState] = useState(false)
  const handleSuccessSubmit = useCallback(
    (values: any) => api.successSubmit(values),
    []
  )
  const handleSubmitWithInlineError = useCallback((values: any) => {
    setState(true)

    return api.submitWithInlineError(values)
  }, [])

  const handleSubmitWithCustomNotificationError = useCallback(
    (values: any) => api.submitWithCustomNotificationError(values),
    []
  )

  return (
    <>
      <Container
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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

      <Container top='large' bottom='large'>
        <Form
          onSubmit={handleSubmitWithInlineError}
          failedSubmitMessage='Login failed! Please try another combination of first and last names.'
        >
          <Container>State: {state.toString()}</Container>
          <Form.Input
            data-testid='submit-with-inline-error-first-name'
            required
            name='inlineErrorName'
            label='First name'
            placeholder='e.g. Bruce'
            width='full'
          />

          {Array.from({ length: 10 }).map((_, index) => (
            <Container top='large' bottom='large' key={index}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
              assumenda suscipit amet ad libero, explicabo eaque fugiat sapiente
              beatae, earum consequatur enim. Esse aut unde possimus quam illum
              laudantium debitis.
            </Container>
          ))}

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
      </Container>
    </>
  )
}

const countries = [
  { value: 'Afghanistan', text: 'Afghanistan' },
  { value: 'Albania', text: 'Albania' },
  { value: 'Algeria', text: 'Algeria' },
  { value: 'Belarus', text: 'Belarus' },
  { value: 'Croatia', text: 'Croatia' },
  { value: 'Lithuania', text: 'Lithuania' },
  { value: 'Slovakia', text: 'Slovakia' },
  { value: 'Spain', text: 'Spain' },
  { value: 'Ukraine', text: 'Ukraine' },
]

const skills = [
  { value: '0', text: 'HTML' },
  { value: '1', text: 'CSS' },
  { value: '2', text: 'Javascript' },
]

const DisabledFieldsExample = () => {
  return (
    <Form onSubmit={noop}>
      <Form.Input disabled name='disabledInput' label='Name' value='Example' />
      <Form.NumberInput
        disabled
        name='disabledAge'
        label="What's your age?"
        value={25}
        placeholder='e.g. 25'
      />
      <Form.RadioGroup disabled name='disabledGender' label='Gender'>
        <Form.Radio disabled label='Male' value='male' />
        <Form.Radio disabled label='Female' value='female' />
      </Form.RadioGroup>
      <Form.DatePicker
        disabled
        name='disabledDateOfBirth'
        label='Date of birth'
      />
      <Form.TimePicker
        disabled
        name='disabledTimeOfBirth'
        label='Time of birth'
      />
      <Form.TagSelector
        disabled
        name='disabledSkills'
        label='Skills'
        inputValue='0'
        options={skills}
      />
      <Form.CheckboxGroup
        disabled
        value={['freeDiving']}
        name='disabledHobbies'
        label='Hobbies'
      >
        <Form.Checkbox disabled label='Skiing' value='skiing' />
        <Form.Checkbox disabled label='Free diving' value='freeDiving' />
        <Form.Checkbox disabled label='Dancing' value='dancing' />
      </Form.CheckboxGroup>
      <Form.Select
        disabled
        name='disabledBusinessType'
        label='Business type'
        width='auto'
        value={0}
        options={[
          { value: 0, text: 'Company' },
          { value: 1, text: 'Individual' },
        ]}
      />
      <Form.Autocomplete
        disabled
        name='disabledCurrentCountry'
        label='Current country'
        placeholder='Start typing country...'
        width='auto'
        value='Spain'
        options={countries}
        getDisplayValue={it => it?.text ?? 'None'}
      />
      <Form.Rating.Stars
        disabled
        interactive={false}
        value={5}
        name='disabledRating'
        label='How much do you love Picasso?'
        required
      />
      <Form.Rating.Thumbs
        value
        disabled
        interactive={false}
        name='disabledThumbs'
        label='Would you recommend picasso?'
        required
      />
      <Form.FileInput
        disabled
        name='disabledAvatar'
        label='Avatar'
        status='No file selected.'
      />
      <Form.Dropzone
        disabled
        label='Attachments'
        required
        name='disabledAttachments'
      />
      <Form.Checkbox
        disabled
        required
        name='disabledLegal'
        value='confimation'
        label='I confirm that I have legal permission from the client to feature this project.'
      />
      <Form.Switch
        disabled
        value='public'
        name='disabledPublicProfile'
        label='Public Profile'
        width='auto'
      />

      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

const component = 'Form'

describe('Form', () => {
  it('submits the form with success result', () => {
    cy.mount(<FormExample />)

    cy.get('#successName').type('name')
    cy.get('#successSurname').type('surname')

    cy.getByTestId('success-submit-button').click()

    cy.getByRole('presentation')
      .should('be.visible')
      .and('contain', 'Login successful!')
  })

  it('submits the form with the inline error', () => {
    cy.mount(<FormExample />)

    cy.get('#inlineErrorName').type('name')
    cy.get('#inlineErrorSurname').type('surname')

    cy.getByTestId('submit-with-inline-error-button').click()

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(RESPONSE_TIME + ANIMATION_TIME)

    cy.getByTestId('submit-with-inline-error-first-name')
      .contains('Unknown first name')
      .should('be.visible')
      .isWithinViewport()

    cy.getByRole('presentation')
      .should('be.visible')
      .and(
        'contain',
        'Login failed! Please try another combination of first and last names.'
      )
  })

  it('submits the form and return a string from onSubmit, which should be shown as a notification', () => {
    cy.mount(<FormExample />)

    cy.get('#customNotificationErrorName').type('name')
    cy.get('#customNotificationErrorSurname').type('surname')

    cy.getByTestId('submit-with-custom-notification-button').click()

    cy.getByRole('presentation')
      .should('be.visible')
      .and('contain', 'Custom Notification Message!')
  })

  it('renders all fields disabled', () => {
    cy.mount(<DisabledFieldsExample />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'disabled',
    })
  })
})
