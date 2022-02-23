import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import PasswordInput, { Props as PasswordInputProps } from './PasswordInput'

const renderPasswordInput = (
  props: Partial<PasswordInputProps> & { initialValue?: string } = {}
) => {
  const { initialValue } = props

  return render(<PasswordInput {...props} value={initialValue} />)
}

describe('PasswordInput', () => {
  it('shows and hides password', async () => {
    const { getByDisplayValue, getByTestId } = renderPasswordInput({
      initialValue: 'asd',
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
})
