import React, { useCallback } from 'react'
import { useField } from 'react-final-form'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

type FormType = {
  hide: boolean
  test: {
    middleName: string
  }
  consent: boolean
}

const FormContent = () => {
  const {
    input: { value: hide }
  } = useField('hide')
  return (
    <>
      <Form.Checkbox name='hide' label='Check to hide fields below' />

      {!hide && (
        <>
          <Form.Input
            enableReset
            required
            name='test.middleName'
            label='Your midden name'
            placeholder='e.g. Bruce'
          />
          <Form.DatePicker required name='hiddenDate' label='DOB' />
        </>
      )}
    </>
  )
}

const ValidateOnSubmitExample = () => {
  const handleSubmit = useCallback(async (values: FormType) => {
    const result = await api.submit(values)

    if (result !== 'success') {
      return {
        test: {
          middleName: 'Unknown middle name'
        }
      }
    }

    console.log('success')
  }, [])

  return (
    <Form.ConfigProvider value={{ validateOnSubmit: true }}>
      <Form<FormType> onSubmit={handleSubmit}>
        <FormContent />

        <Container top='small'>
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </Container>
      </Form>
    </Form.ConfigProvider>
  )
}

// the emulation of the api call
const api = {
  submit: async (values: FormType) =>
    new Promise(resolve =>
      setTimeout(() => {
        if (values.hide || values?.test?.middleName.toLowerCase() === 'bruce') {
          resolve('success')
          return
        }

        resolve('fail')
      }, 2000)
    )
}

export default ValidateOnSubmitExample
