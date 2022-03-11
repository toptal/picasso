import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import PasswordInput, { Props as PasswordInputProps } from './PasswordInput'

const renderInput = (props: Partial<PasswordInputProps>) => {
  return render(<PasswordInput {...props} />)
}

describe('PasswordInput', () => {
  it('shows and hides password', async () => {
    const { getByDisplayValue, getByTestId } = renderInput({
      value: 'asd',
      testIds: {
        input: 'password-input',
        toggle: 'password-input-toggle'
      }
    })

    const input = getByDisplayValue('asd') as HTMLInputElement
    const toggle = getByTestId('password-input-toggle')

    expect(input.type).toBe('password')

    fireEvent.click(toggle)

    expect(input.type).toBe('text')
  })

  it('shows check icon if validateStatus equals to success', () => {
    const { getByTestId } = renderInput({
      value: 'asd',
      validateStatus: 'success',
      testIds: { validIcon: 'valid-icon' }
    })

    const validIcon = getByTestId('valid-icon')

    expect(validIcon).toBeVisible()
  })
})
