import React from 'react'
import { screen, render, fireEvent } from '@toptal/picasso/test-utils'

import Form from '../Form'
import { FormConfigProps } from './FormConfig'

const TEXT_INPUT_LABEL = 'Test text field'

const renderForm = (configProps: FormConfigProps) => {
  return render(
    <Form.ConfigProvider value={configProps}>
      <Form
        onSubmit={() => {
          console.log('test')
        }}
      >
        <Form.Input label={TEXT_INPUT_LABEL} required name='test' />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form>
    </Form.ConfigProvider>
  )
}

describe('Form.ConfigProvider', () => {
  it('validate only on submit', async () => {
    renderForm({ validateOnSubmit: true })

    fireEvent.blur(screen.getByLabelText(TEXT_INPUT_LABEL))

    expect(
      screen.queryByText('Please complete this field.')
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(
      await screen.findByText('Please complete this field.')
    ).toBeInTheDocument()
  })

  it('validate normally on blur / change', async () => {
    renderForm({ validateOnSubmit: false })

    fireEvent.blur(screen.getByLabelText(TEXT_INPUT_LABEL))

    expect(screen.getByText('Please complete this field.')).toBeInTheDocument()
  })
})
