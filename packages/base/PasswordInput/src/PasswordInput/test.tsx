import React from 'react'
import { render, fireEvent } from '@toptal/picasso-test-utils'

import type { Props as PasswordInputProps } from './PasswordInput'
import PasswordInput from './PasswordInput'

const testProps: PasswordInputProps = {
  value: 'asd',
  testIds: {
    input: 'password-input',
    toggle: 'password-input-toggle',
    validIcon: 'valid-icon',
  },
}

const renderInput = (props: Partial<PasswordInputProps>) => {
  return render(<PasswordInput {...props} />)
}

describe('PasswordInput', () => {
  it('shows and hides password', async () => {
    const { getByDisplayValue, getByTestId } = renderInput(testProps)

    const input = getByDisplayValue('asd') as HTMLInputElement
    const toggle = getByTestId('password-input-toggle')

    expect(input.type).toBe('password')

    fireEvent.click(toggle)

    expect(input.type).toBe('text')
  })

  describe('when in a valid state', () => {
    it('shows valid icon', () => {
      const { getByTestId, rerender } = renderInput({
        ...testProps,
        status: 'success',
      })

      const validIcon = getByTestId('valid-icon')

      expect(validIcon).toBeVisible()

      // re-render with different props
      rerender(<PasswordInput {...testProps} status='error' />)

      expect(validIcon).not.toBeVisible()
    })
  })
})
