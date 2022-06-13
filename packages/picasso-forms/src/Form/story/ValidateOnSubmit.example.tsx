import React, { useCallback } from 'react'
import { useField } from 'react-final-form'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

const HIDE_FIELD = 'validateOnSubmit-hide'
const NAME_FIELD = 'validateOnSubmit-name'
const DOB_FIELD = 'validateOnSubmit-dob'

type FormType = {
  [HIDE_FIELD]: boolean
  [NAME_FIELD]: {
    first: string
    last: string
  }
  [DOB_FIELD]: string
}

const FormContent = () => {
  const {
    input: { value: hide },
  } = useField(HIDE_FIELD)

  return (
    <>
      <Form.Checkbox name={HIDE_FIELD} label='Check to hide fields below' />

      {!hide && (
        <>
          <Form.Input
            enableReset
            required
            name={`${NAME_FIELD}.first`}
            label='Your first name'
            placeholder='e.g. Bruce'
          />
          <Form.Input
            enableReset
            required
            name={`${NAME_FIELD}.last`}
            label='Your last name'
            placeholder='e.g. Wayne'
          />
          <Form.DatePicker required name={DOB_FIELD} label='DOB' />
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
