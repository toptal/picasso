import React, { useCallback } from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

type FormType = {
  middleName: string
  consent: boolean
}

const ValidateOnSubmitExample = () => {
  const handleSubmit = useCallback(async (values: FormType) => {
    const result = await api.submit(values)

    if (result !== 'success') {
      return {
        middleName: 'Unknown middle name'
      }
    }

    console.log('success')
  }, [])

  return (
    <Form.ConfigProvider value={{ validateOnSubmit: true }}>
      <Form<FormType> onSubmit={handleSubmit}>
        <Form.Input
          enableReset
          required
          name='middleName'
          label='Your middle name'
          placeholder='e.g. Bruce'
        />
        <Form.Checkbox
          name='consent'
          label='I confirm that I have legal permission from the client to feature this project.'
        />

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
        if (values.middleName.toLowerCase() === 'bruce') {
          resolve('success')
          return
        }

        resolve('fail')
      }, 2000)
    )
}

export default ValidateOnSubmitExample
