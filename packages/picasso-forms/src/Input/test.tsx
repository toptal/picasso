import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { Button } from '@toptal/picasso'

import Form, { Props as FormProps } from '../Form/Form'
import { Props as InputProps } from './Input'

type TestFormProps = Pick<FormProps, 'onSubmit'> & Pick<InputProps, 'onFocus'>

const renderForm = (props: TestFormProps) => {
  const { onFocus, onSubmit } = props

  return render(
    <Form onSubmit={onSubmit}>
      <Form.Input onFocus={onFocus} name='test' placeholder='test input' />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

describe('Input', () => {
  it('fires the onFocus callback after focusing the input', () => {
    const handleFocus = jest.fn()

    const { getByPlaceholderText } = renderForm({
      onSubmit: () => {},
      onFocus: handleFocus
    })

    fireEvent.focus(getByPlaceholderText('test input'))

    expect(handleFocus).toHaveBeenCalled()
  })
})
