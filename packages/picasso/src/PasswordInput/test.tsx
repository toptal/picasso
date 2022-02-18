import React, { useState, ChangeEventHandler } from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import PasswordInput, { Props as PasswordInputProps } from './PasswordInput'

const PasswordInputRenderer = (
  props: { initialValue: number | string } & Partial<PasswordInputProps>
) => {
  const [value, setValue] = useState(props.initialValue)

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value)
  }

  return <PasswordInput value={value} onChange={handleChange} />
}

const renderPasswordInput = (
  props: Partial<PasswordInputProps> & { initialValue?: number | string } = {}
) => {
  const { initialValue = 'asd' } = props

  return render(
    <PasswordInputRenderer initialValue={initialValue} {...props} />
  )
}

describe('PasswordInput', () => {
  it('renders', () => {
    const { container } = renderPasswordInput()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('increase value', async () => {
    const { getByDisplayValue, getByRole } = renderPasswordInput()

    const input = getByDisplayValue('asd') as HTMLInputElement
    const toggle = getByRole('button')

    expect(input.type).toBe('password')

    fireEvent.click(toggle)

    expect(input.type).toBe('text')
  })
})
