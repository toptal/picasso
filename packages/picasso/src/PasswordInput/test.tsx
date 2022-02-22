import React, { useState, ChangeEventHandler } from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import PasswordInput, { Props as PasswordInputProps } from './PasswordInput'

const PasswordInputRenderer = (
  props: { initialValue: string } & Partial<PasswordInputProps>
) => {
  const [value, setValue] = useState(props.initialValue)

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value)
  }

  return <PasswordInput value={value} onChange={handleChange} />
}

const renderPasswordInput = (
  props: Partial<PasswordInputProps> & { initialValue?: string } = {}
) => {
  const { initialValue = 'asd' } = props

  return render(
    <PasswordInputRenderer initialValue={initialValue} {...props} />
  )
}

describe('PasswordInput', () => {
  it('shows and hides password', async () => {
    const { getByDisplayValue, getByTestId } = renderPasswordInput()

    const input = getByDisplayValue('asd') as HTMLInputElement
    const toggle = getByTestId('password-input-toggle')

    expect(input.type).toBe('password')

    fireEvent.click(toggle)

    expect(input.type).toBe('text')
  })
})
