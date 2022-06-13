import React, { useCallback } from 'react'
import { useField } from 'react-final-form'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

type FormType = {
  'validateOnSubmit-hide': boolean
  'validateOnSubmit-name': {
    first: string
    last: string
  }
  'validateOnSubmit-dob': string
}

const FormContent = () => {
  const {
    input: { value: hide },
  } = useField('validateOnSubmit-hide')

  return (
    <>
      <Form.Checkbox
        name='validateOnSubmit-hide'
        label='Check to hide fields below'
      />

      {!hide && (
        <>
          <Form.Input
            enableReset
            required
            name='validateOnSubmit-name.first'
            label='Your first name'
            placeholder='e.g. Bruce'
          />
          <Form.Input
            enableReset
            required
            name='validateOnSubmit-name.last'
            label='Your last name'
            placeholder='e.g. Wayne'
          />
          <Form.DatePicker required name='validateOnSubmit-dob' label='DOB' />
        </>
      )}
    </>
  )
}

const Example = () => {
  const handleSubmit = useCallback((values: FormType) => api.submit(values), [])

  return (
    <Form.ConfigProvider value={{ validateOnSubmit: true }}>
      <Form<FormType>
        onSubmit={handleSubmit}
        successSubmitMessage='Success!'
        failedSubmitMessage='Failure!'
      >
        <FormContent />

        <Container top='small'>
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </Container>
      </Form>
    </Form.ConfigProvider>
  )
}

// the emulation of the api call
const responseWithDelay = async (response: any) =>
  new Promise(resolve => setTimeout(() => resolve(response), 2000))

const api = {
  submit: async ({
    'validateOnSubmit-name': name,
    'validateOnSubmit-hide': hide,
  }: FormType) => {
    if (hide || name?.first.toLowerCase() === 'bruce') {
      return responseWithDelay(undefined)
    }

    return responseWithDelay({
      name: {
        first: 'Unknown first name',
      },
    })
  },
}

export default Example
